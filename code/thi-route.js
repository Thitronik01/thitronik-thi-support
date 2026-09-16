// ============================================
// THI — Route Handler (Server). Proxyt Anfragen an die Anthropic Messages-API
// und streamt die Antwort als reinen Text zurück.
//
// Hinweis zur Umsetzung: In dieser Umgebung ist kein npm verfügbar, um
// @anthropic-ai/sdk zu installieren. Daher wird die API direkt per HTTPS
// (eingebautes fetch, Node 18+) angesprochen — funktional äquivalent
// (Streaming, Prompt-Caching, adaptives Thinking), nur ohne SDK-Wrapper.
//
// Der ANTHROPIC_API_KEY bleibt serverseitig und gelangt NIE ins Frontend.
//
// SCHUTZ (wichtig): Da die App-Auth komplett clientseitig ist, kann dieser
// Endpunkt KEINE echte Session prüfen. Damit die Route bei einem öffentlichen
// Deployment kein offener, kostenpflichtiger Claude-Proxy ist, greifen hier:
//   - Same-Origin-Check (blockt naive Cross-Site-/Bot-Aufrufe)
//   - Rate-Limit pro IP (In-Memory, pro Server-Prozess)
//   - globales Tageslimit (Notbremse gegen Kosten-Explosion)
//   - Input-Caps pro Anfrage (Nachrichtenanzahl/-länge, Kontextgröße)
// Echte Authentifizierung erfordert ein Backend (→ Supabase-Migration).
// ============================================

import { getRequestAccess, LOCAL_AUTH_MODE } from '@/lib/server-auth';
import { THI_TOOL_DEFINITIONS, executeThiTool, thiSearchIndexForAccess } from '@/lib/thi-tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── KI-Provider ────────────────────────────────────────────────────────────
// Thi kann direkt die Anthropic-API ODER eine Anymize-/OpenAI-kompatible API
// nutzen. Steuerung über THI_PROVIDER ('anthropic' | 'anymize').
//   anthropic: api.anthropic.com  (x-api-key, /v1/messages, SSE content_block_delta)
//   anymize:   DSGVO-konforme KI, OpenAI-kompatibel ANGENOMMEN (Authorization: Bearer,
//              /v1/chat/completions, SSE choices[].delta.content).
//   ⚠️ Anymize-Endpoint (Anymize_API_URL) + Format final gegen die Anymize-Doku prüfen.
const PROVIDER = (process.env.THI_PROVIDER || 'anthropic').toLowerCase();
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANYMIZE_API_URL = process.env.Anymize_API_URL || process.env.ANYMIZE_API_URL || '';
const ANYMIZE_API_KEY = process.env.Anymize_API_KEY || process.env.ANYMIZE_API_KEY || '';

// Standardmodell: Opus 4.8 (Anthropic). Über THI_MODEL überschreibbar. Bei Anymize
// muss der Wert ein dort gültiger Modellname sein (ggf. setzen/anpassen).
const MODEL = process.env.THI_MODEL || 'claude-opus-4-8';

// ─── Schutz-Konfiguration (per ENV überschreibbar) ───
const RL_WINDOW_MS = 5 * 60 * 1000; // Fenster fürs IP-Limit
const RL_MAX = Number(process.env.THI_RATE_LIMIT || 30); // Anfragen pro IP/Fenster
const DAILY_MAX = Number(process.env.THI_DAILY_LIMIT || 1000); // globale Anfragen/Tag
const MAX_MESSAGES = 30; // max. Verlaufslänge
const MAX_MSG_CHARS = 4000; // max. Zeichen der letzten Nutzernachricht
const MAX_CONTEXT = 8; // max. RAG-Kontexteinträge

// ─── Agentic Tools (Stufe 2, nur Anymize) ───────────────────────────────────
// Wenn aktiviert, kann Thi SELBST per wiki_suchen/artikel_lesen nachschlagen,
// statt nur den vorab injizierten <kontext>-Block zu nutzen. Default an für
// Anymize (Function-Calling live verifiziert). THI_TOOLS=false schaltet zurück
// auf den reinen Streaming-Pfad. Bricht der Tool-Loop, fällt die Route
// automatisch auf den klassischen Pfad zurück.
const TOOLS_ENABLED =
  PROVIDER === 'anymize' &&
  String(process.env.THI_TOOLS ?? 'true').toLowerCase() !== 'false';
const MAX_TOOL_HOPS = Math.max(1, Number(process.env.THI_TOOL_HOPS || 3));

// In-Memory-State (lebt pro Server-Prozess; in Multi-Instance-Setups pro Instanz).
const ipHits = new Map(); // ip -> { count, resetAt }
let daily = { count: 0, day: new Date().toDateString() };

function clientIp(request) {
  // X-Forwarded-For ist client-setzbar: ein Angreifer kann beliebige Werte voranstellen und
  // so das per-IP-Limit aushebeln. Vertrauenswürdige Proxies HÄNGEN die echte Verbindungs-IP
  // rechts an — daher den Eintrag links der vertrauenswürdigen Hops nehmen (Default: 1),
  // nicht den (frei wählbaren) ersten Eintrag.
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) {
      const hops = Math.max(1, Number(process.env.THI_TRUSTED_PROXIES || 1));
      const idx = parts.length - hops;
      return parts[idx >= 0 ? idx : parts.length - 1];
    }
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(request) {
  const today = new Date().toDateString();
  if (daily.day !== today) daily = { count: 0, day: today };
  if (daily.count >= DAILY_MAX) return 'daily';

  const ip = clientIp(request);
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
  } else {
    entry.count += 1;
    if (entry.count > RL_MAX) return 'ip';
  }
  daily.count += 1;

  // Gelegentliches Aufräumen abgelaufener Einträge.
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) if (now > v.resetAt) ipHits.delete(k);
  }
  return null;
}

function sameOriginOk(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // kein Origin (z. B. serverseitige Aufrufe/Tests) — nicht hart blocken
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

// ─── Session-Prüfung (Phase 2) ──────────────────────────────────────────────
// Verifiziert das vom Client gesendete Supabase-Access-Token serverseitig
// (getRequestAccess → GoTrue /auth/v1/user + aktives Profil). So ist Thi nur
// für angemeldete, freigeschaltete Nutzer nutzbar.
//
// FAIL-CLOSED (Security-Review 2026-07-22, Finding P2 Runde 2): Auth wird IMMER
// verlangt, AUSSER im ausdrücklichen Demo-Modus (NEXT_PUBLIC_AUTH_MODE=local)
// oder bei explizitem THI_REQUIRE_AUTH=false (lokale Tests). Früher hing das am
// Vorhandensein der Supabase-Keys — fehlten sie (unvollständige Vercel-Config),
// kippte REQUIRE_AUTH auf false und Thi wurde ungewollt ein offener Proxy.
// Jetzt entkoppelt: Fehlen bei verlangter Auth die Keys, kommt NIEMAND durch.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';
const AUTH_EXPLICITLY_DISABLED =
  String(process.env.THI_REQUIRE_AUTH ?? '').toLowerCase() === 'false';
const REQUIRE_AUTH = !LOCAL_AUTH_MODE && !AUTH_EXPLICITLY_DISABLED;

const SYSTEM_PROMPT = `Du bist **Thi**, der digitale Assistent der THITRONIK Campus-/Händlerplattform.
Du unterstützt Händler, Monteure und Mitarbeiter bei Fragen zu THITRONIK-Produkten
(u. a. Funk-Alarmanlage WiPro III und Zubehör, Gaswarner der G.A.S.-Reihe, Pro-finder GPS-Ortung,
Bedienung per App/Handsender/NFC, Einbau in Fahrzeugen und Fehlersuche).

Verhaltensregeln:
- Antworte immer auf Deutsch: präzise, freundlich, fachlich korrekt und so knapp wie möglich.
- Stütze deine Antwort AUSSCHLIESSLICH auf den bereitgestellten Wiki-Kontext im <kontext>-Block.
  Erfinde niemals technische Details, Artikelnummern, DIP-Stellungen oder Anschlusspläne.
- WORTLAUT SCHLÄGT ANNAHME: Eine EXPLIZITE Aussage im Kontext (z. B. „Standalone immer nutzbar",
  „auch ohne WiPro verwendbar", „nicht kompatibel mit …") hat IMMER Vorrang vor dem Produktnamen,
  dem Artikeltitel („… für WiPro III") oder deinem Vorwissen. Schließe NIEMALS von einer
  Produktkategorie (Zubehör/„für X") auf eine zwingende Voraussetzung, wenn der Text das nicht
  ausdrücklich sagt. Bei Voraussetzungs-/Kompatibilitätsfragen zitiere die belegende Stelle kurz.
- LENKE DAS GESPRÄCH: Hängt eine präzise Antwort von Angaben ab, die der Nutzer noch nicht
  gemacht hat — die harten Fallaufnahme-Kriterien sind Fahrzeugmodell, Baujahr des Fahrzeugs,
  Seriennummer des THITRONIK-Produkts (bzw. Softwarestand), welche THITRONIK-Produkte verbaut
  sind, seit wann die Alarmanlage eingebaut ist und das genaue Problem/Fehlerbild; ebenso die
  Produktvariante (z. B. WiPro III vs. WiPro III safe.lock, G.A.S.-pro vs. G.A.S.-pro III) —
  dann stelle ZUERST genau eine kurze, gezielte Rückfrage nach dieser Angabe, statt zu raten
  oder einfach alle Varianten aufzuzählen. Frage nur nach dem, was wirklich fehlt (eine,
  höchstens zwei Angaben). Sobald die Angabe vorliegt, antworte konkret.
- SUPPORT-VERWEIS: Steht die Antwort nicht im Kontext (oder nur unsicher), rate NICHT.
  Sage ehrlich, dass du dazu nichts Gesichertes findest, und verweise auf den THITRONIK-Support:
  Telefon +49 (0)4351 76744-112. Dasselbe gilt bei sicherheitskritischer Unsicherheit.
- Enthält der Kontext nur Einträge, die als "(verwandter Artikel, kein direkter Treffer)"
  markiert sind, sage zuerst kurz, dass es zum genauen Thema keinen Wiki-Artikel gibt,
  fasse Nützliches aus den verwandten Artikeln zusammen (ohne zu spekulieren) und nenne den
  Support mit der Rufnummer.
- ZITIEREN & AUF DIE STELLE VERWEISEN: Jeder Kontext-Eintrag ist nummeriert und nennt in
  Klammern seinen genauen Pfad inkl. Abschnitts-Anker (z. B. (/de/wipro-iii#batterie)) und das
  Label „Abschnitt: …". Verweise den Nutzer auf den KONKRETEN Abschnitt (z. B. „siehe Abschnitt
  ‚Batterie' im WiPro-III-Artikel"). Nenne am Ende unter "Quellen:" die tatsächlich genutzten
  Einträge als „Titel — Abschnitt" (z. B. „WiPro III — Batterie"). Gib KEINE eigenen URLs/Pfade
  aus und erfinde niemals einen Pfad oder Anker — die App zeigt die anklickbaren, geprüften
  Quell-Links mit Abschnitt direkt darunter an.
- FOLGEFRAGEN: Gibt es sinnvolle nächste Schritte, schließe ganz am Ende (nach den Quellen) mit
  ein bis zwei klickbaren Folgefragen im exakten Format ab: [[FOLGEFRAGEN: Erste Frage? | Zweite Frage?]].
  Keine Folgefragen bei einer reinen Rückfrage oder wenn du nichts gefunden hast.
- Strukturiere längere Antworten mit kurzen Aufzählungen.
- Bei sicherheitsrelevanten Themen (Scharf-/Unscharfschalten, Gaswarnung, Diebstahlschutz)
  arbeite besonders sorgfältig und weise auf Risiken hin, wenn der Kontext dazu Angaben macht.
- Wenn keine Frage erkennbar ist, bitte freundlich um eine konkrete Frage.`;

// Variante für den Agentic-Modus: gleiche Haltung, aber statt „nur <kontext>"
// darf (und soll) Thi bei Lücken selbst im Wiki suchen.
const SYSTEM_PROMPT_TOOLS = `Du bist **Thi**, der digitale Assistent der THITRONIK Campus-/Händlerplattform.
Du unterstützt Händler, Monteure und Mitarbeiter bei Fragen zu THITRONIK-Produkten
(u. a. Funk-Alarmanlage WiPro III und Zubehör, Gaswarner der G.A.S.-Reihe, Pro-finder GPS-Ortung,
Bedienung per App/Handsender/NFC, Einbau in Fahrzeugen und Fehlersuche).

Du hast drei Werkzeuge:
- wiki_suchen(query): durchsucht Wiki, Bedienungsanleitungen und FAQ-PDFs.
- artikel_lesen(route): liest einen gefundenen Eintrag im Volltext.
- app_navigieren(ziel, frage?): schlägt einen direkten Sprung in einen App-Bereich vor (Zertifikate, Anleitung öffnen, Arbeitskarte, Kurse, Lernpfade, Forum, Glossar …).

Arbeitsweise:
- WORTLAUT SCHLÄGT ANNAHME: Stütze JEDE Sachaussage ausschließlich auf den Wiki-Text. Eine
  EXPLIZITE Aussage (z. B. „Standalone immer nutzbar", „auch ohne WiPro verwendbar", „nicht
  kompatibel mit …") hat IMMER Vorrang vor dem Produktnamen, dem Artikeltitel („… für WiPro III")
  oder deinem Vorwissen. Schließe NIEMALS von einer Produktkategorie (Zubehör/Erweiterung/„für X")
  auf eine zwingende Voraussetzung, wenn der Text das nicht ausdrücklich so sagt.
- VORAUSSETZUNGS-/JA-NEIN-/KOMPATIBILITÄTS-/DETAIL-FRAGEN („Brauche ich X für Y?", „Geht Y ohne X?",
  „Ist Y mit Z kompatibel?", „Welche/welcher … (nur/ausschließlich/nicht empfohlen/Ausnahme)?",
  konkrete Werte/Pins/Mengen): Verlasse dich NICHT auf den kurzen <kontext>-Auszug — die
  entscheidende Aussage steht oft in einem späteren Abschnitt, einer Tabelle oder im FAQ. Lies den
  relevantesten Artikel ZUERST via artikel_lesen im VOLLTEXT und zitiere die belegende Stelle kurz
  wörtlich, bevor du Ja/Nein sagst oder einen Wert nennst.
- KEINE-ANGABE-FALLE: Bevor du behauptest, das Wiki sage zu etwas NICHTS / mache dazu KEINE
  Angabe (z. B. zu einer empfohlenen oder NICHT empfohlenen Marke, einer Ausnahme, einem
  Detailwert), lies den relevantesten Artikel via artikel_lesen im VOLLTEXT — solche Angaben
  stehen häufig in Tabellen, Hinweis-Kästen oder im FAQ. Erst wenn sie dort wirklich fehlt, sage das.
- Im ersten <kontext>-Block stehen bereits vorab gefundene Auszüge. Reicht er NUR für eine
  unsichere oder unvollständige Antwort (oder bei den o. g. Voraussetzungsfragen), nutze
  wiki_suchen und artikel_lesen für den Volltext. Lieber ein- bis zweimal gezielt nachschlagen
  als raten.
- LENKE DAS GESPRÄCH statt zu raten: Hängt die präzise Antwort von Angaben ab, die der
  Nutzer noch nicht gemacht hat — die harten Fallaufnahme-Kriterien sind Fahrzeugmodell,
  Baujahr, Seriennummer des THITRONIK-Produkts/Softwarestand, welche THITRONIK-Produkte
  verbaut sind, seit wann die Alarmanlage eingebaut ist und das genaue Problem; ebenso die
  Produktvariante (WiPro III vs. WiPro III safe.lock, G.A.S.-pro vs.
  G.A.S.-pro III) — stelle ZUERST genau eine kurze, gezielte Rückfrage nach dieser Angabe,
  statt alle Varianten aufzuzählen oder zu raten. Frage nur nach dem, was wirklich fehlt
  (eine, höchstens zwei Angaben). Liegt die Angabe vor, schlage gezielt nach und antworte
  konkret. (Beispiel: Bei „Welche DIP-Schalter brauche ich?" zuerst nach Fahrzeug + Baujahr
  fragen; bei Funktionen wie easy-add 3.0 nach der Seriennummer.)
- SUPPORT-VERWEIS: Findest du auch nach gezielter Suche nichts Belastbares, rate NICHT.
  Sage ehrlich, dass du dazu nichts Gesichertes hast, und verweise auf den THITRONIK-Support:
  Telefon +49 (0)4351 76744-112. Dasselbe gilt bei sicherheitskritischer Unsicherheit.
- NAVIGATION: Will der Nutzer zu einem App-Bereich ("Bring mich zu …", "Öffne …",
  "Wo finde ich …" — z. B. Zertifikate, Anleitung öffnen, Arbeitskarte, Kurse, Lernpfade),
  nutze app_navigieren statt wiki_suchen. Liefert es ok:true, gib dem Nutzer den Sprung als
  Markdown-Link im Format [label](route) aus — nimm route und label UNVERÄNDERT aus dem
  Tool-Ergebnis, damit der Link direkt funktioniert. Eine Navigation ist meist die FINALE
  Aktion: danach nicht weitersuchen. Liefert es ok:false, behandle es als normalen
  Nichttreffer (suchen oder Support).

Antwortregeln:
- Antworte immer auf Deutsch: präzise, freundlich, fachlich korrekt und so knapp wie möglich.
- Erfinde niemals technische Details, Artikelnummern, DIP-Stellungen oder Anschlusspläne.
- ZITIEREN & AUF DIE STELLE VERWEISEN: Die Einträge im <kontext> wie die Treffer aus
  wiki_suchen/artikel_lesen nennen ihren genauen Pfad inkl. Abschnitts-Anker (route#anker, z. B.
  /de/wipro-iii#batterie). Verweise den Nutzer auf den KONKRETEN Abschnitt ("siehe Abschnitt
  ‚Batterie'"). Nenne am Ende unter "Quellen:" die tatsächlich genutzten Einträge als
  „Titel — Abschnitt". Gib KEINE eigenen URLs/Pfade aus und erfinde niemals einen Pfad oder
  Anker — die App zeigt die anklickbaren, geprüften Quell-Links mit Abschnitt darunter an. Bei
  einer reinen Rückfrage (noch keine inhaltliche Antwort) keine Quellenzeile.
- FOLGEFRAGEN: Gibt es sinnvolle nächste Schritte, schließe deine Nachricht GANZ am Ende (nach
  den Quellen) mit ein bis zwei kurzen, klickbaren Folgefragen im exakten Format ab:
  [[FOLGEFRAGEN: Erste Frage? | Zweite Frage?]] — knappe, eigenständige Fragen aus Nutzersicht.
  KEINE Folgefragen bei einer reinen Rückfrage oder wenn du nichts Belastbares gefunden hast.
- Strukturiere längere Antworten mit kurzen Aufzählungen.
- Bei sicherheitsrelevanten Themen (Scharf-/Unscharfschalten, Gaswarnung, Diebstahlschutz, Abschalteinrichtung)
  arbeite besonders sorgfältig und weise auf Risiken hin, wenn die Quellen dazu Angaben machen.
- Wenn keine Frage erkennbar ist, bitte freundlich um eine konkrete Frage.`;

// ─── Anymize: ein Chat-Aufruf (nicht-streamend, JSON) ───────────────────────
async function anymizeChat(apiKey, messages, { tools } = {}) {
  const res = await fetch(ANYMIZE_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      messages,
      ...(tools ? { tools, tool_choice: 'auto' } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`anymize ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

// ─── Agentic-Loop (Anymize) ─────────────────────────────────────────────────
// Führt bis zu MAX_TOOL_HOPS Tool-Runden aus und liefert den finalen
// Antworttext. WICHTIG (Anymize-Bug, live verifiziert 2026-06-12): role:"tool"
// wird vom llm-anonymous-Endpoint mit 400 abgelehnt. Tool-Ergebnisse gehen
// daher als user-Message mit [TOOL-ERGEBNIS …]-Präfix zurück; die assistant-
// Message darf ihr natives tool_calls-Feld behalten.
// Deutsche Status-Phrasen pro Tool — für die Live-Statuszeile im Chat.
const TOOL_STATUS = {
  wiki_suchen: 'Durchsucht Wiki & Anleitungen …',
  artikel_lesen: 'Liest den passenden Artikel …',
  app_navigieren: 'Sucht den passenden Bereich …',
};

async function runAgentic(apiKey, baseMessages, access, onStatus) {
  const msgs = [...baseMessages];
  for (let hop = 0; ; hop++) {
    const useTools = hop < MAX_TOOL_HOPS;
    if (onStatus) onStatus(hop === 0 ? 'Denkt nach …' : 'Wertet die Treffer aus …');
    const data = await anymizeChat(apiKey, msgs, { tools: useTools ? THI_TOOL_DEFINITIONS : null });
    const msg = data?.choices?.[0]?.message || {};
    const calls = Array.isArray(msg.tool_calls) ? msg.tool_calls : [];
    if (useTools && calls.length) {
      if (onStatus) onStatus(TOOL_STATUS[calls[0]?.function?.name] || 'Schlägt nach …');
      msgs.push({ role: 'assistant', content: msg.content || '', tool_calls: calls });
      const blocks = calls.map((tc) => {
        const name = tc.function?.name || '';
        const rawArgs = tc.function?.arguments || '{}';
        const result = executeThiTool(name, rawArgs, access);
        return `[TOOL-ERGEBNIS ${name}(${rawArgs})]\n${result}`;
      });
      msgs.push({
        role: 'user',
        content: `${blocks.join('\n\n---\n\n')}\n\nNutze diese Ergebnisse. Beantworte jetzt die ursprüngliche Frage, oder rufe bei Bedarf gezielt ein weiteres Tool auf.`,
      });
      continue;
    }
    return String(msg.content || '').trim();
  }
}

// Agentic-Antwort als Stream: erst Live-Status-Marker (\0…\0) WÄHREND der
// Tool-Hops, dann der finale Antworttext (gechunkt). Der Client (app/thi/page.js)
// trennt Status-Marker vom Antworttext. Status-Text enthält nie ein \0.
// Hinweis: Mit aktivem Status streamen wir live; ein Fehler im Loop wird hier
// in-stream als freundliche Meldung ausgegeben (kein stiller Fallback mehr auf
// den Nicht-Tool-Pfad — der bleibt nur für THI_TOOLS=false).
function agenticStream(apiKey, baseMessages, access) {
  const encoder = new TextEncoder();
  const CHUNK = 80;
  return new ReadableStream({
    async start(controller) {
      const status = (t) => { try { controller.enqueue(encoder.encode(`[[STATUS:${t}]]`)); } catch {} };
      try {
        const answer = await runAgentic(apiKey, baseMessages, access, status);
        const text = answer
          || 'Dazu habe ich leider keine gesicherte Antwort gefunden. Bitte wende dich an den THITRONIK-Support: +49 (0)4351 76744-112.';
        for (let i = 0; i < text.length; i += CHUNK) controller.enqueue(encoder.encode(text.slice(i, i + CHUNK)));
      } catch (err) {
        console.error('[thi] Agentic-Stream-Fehler:', err);
        controller.enqueue(encoder.encode('Entschuldige, beim Nachschlagen ist ein Fehler aufgetreten. Bitte versuche es erneut oder wende dich an den THITRONIK-Support: +49 (0)4351 76744-112.'));
      } finally {
        try { controller.close(); } catch {}
      }
    },
  });
}

function buildContextBlock(context) {
  if (!Array.isArray(context) || context.length === 0) return '';
  const parts = context
    .filter((c) => c && (c.title || c.snippet || c.body))
    .map((c, i) => {
      const title = c.title || 'Ohne Titel';
      const route = c.route || '';
      // Abschnitts-Zitat: gibt es einen Anker, wird der genaue Abschnitt als
      // route#anker zitierbar — so kann Thi auf die JEWEILIGE STELLE verweisen
      // statt nur auf den Artikel.
      const cite = route ? (c.anchor ? `${route}#${c.anchor}` : route) : '';
      const sectionLabel = c.headingPath ? ` — Abschnitt: ${c.headingPath}` : '';
      // 2026-06-18: Serverseitig mit Volltext angereicherte Top-Quellen (c.body)
      // bekommen bis 6000 Zeichen, damit benachbarte Fakten (z. B. „empfohlen:
      // Panasonic / nicht empfohlen: Duracell") nicht durch ein 800-Zeichen-Snippet
      // zerschnitten werden; reine Snippet-Quellen bleiben bei 2500.
      const body = String(c.body || c.snippet || c.excerpt || '').slice(0, c.body ? 6000 : 2500);
      return `[${i + 1}] ${title}${sectionLabel}${cite ? ` (${cite})` : ''}\n${body}`;
    });
  if (parts.length === 0) return '';
  return `<kontext>\n${parts.join('\n\n')}\n</kontext>`;
}

export async function POST(request) {
  // 1) Same-Origin-Check (defense-in-depth gegen Cross-Site-Aufrufe).
  if (!sameOriginOk(request)) {
    return Response.json({ error: 'forbidden', message: 'Ungültiger Origin.' }, { status: 403 });
  }

  // 1.5) Session-Prüfung + Sichtbarkeit in EINEM Schritt. getRequestAccess
  // validiert das Bearer-Token gegen GoTrue und lädt das aktive Profil; ohne
  // Token (Demo/local-auth) ergibt sich sofort Händler-Sicht ohne Netzwerk-Call.
  // Dasselbe access-Objekt steuert unten die Tool-Sichtbarkeit UND die
  // Kontextanreicherung — interne Teilinhalte erreichen Händler damit nie.
  let access = { role: 'anon', canViewInternal: false };
  try { access = await getRequestAccess(request); } catch { /* Default = Händler-Sicht */ }

  if (REQUIRE_AUTH) {
    // Fail-closed: Auth verlangt, aber Supabase serverseitig nicht konfiguriert
    // → NIEMAND durch (nie ein versehentlich offener Proxy). Klare 503-Diagnose.
    if (!SUPABASE_URL || !SUPABASE_ANON) {
      return Response.json(
        { error: 'auth_unconfigured', message: 'Thi-Authentifizierung ist serverseitig nicht konfiguriert.' },
        { status: 503 },
      );
    }
    if (access.role === 'anon' || access.role === 'disabled') {
      return Response.json(
        { error: 'unauthorized', message: 'Bitte anmelden, um Thi zu nutzen.' },
        { status: 401 },
      );
    }
  }

  // 2) Rate-Limit / Tageslimit (Kostenschutz).
  const limited = checkRateLimit(request);
  if (limited) {
    return Response.json(
      {
        error: 'rate_limited',
        message:
          limited === 'daily'
            ? 'Das Tageslimit für Thi-Anfragen ist erreicht. Bitte später erneut versuchen.'
            : 'Zu viele Anfragen in kurzer Zeit — bitte einen Moment warten.',
      },
      { status: 429 },
    );
  }

  // 3) Key-/Konfig-Check (provider-abhängig).
  const apiKey = PROVIDER === 'anymize' ? ANYMIZE_API_KEY : process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: 'no_key',
        message:
          PROVIDER === 'anymize'
            ? 'Thi ist noch nicht aktiviert: In der Serverkonfiguration fehlt der Anymize_API_KEY (Datei .env.local). Nach dem Eintragen den Server neu starten.'
            : 'Thi ist noch nicht aktiviert: In der Serverkonfiguration fehlt der ANTHROPIC_API_KEY (Datei .env.local). Nach dem Eintragen den Dev-Server neu starten.',
      },
      { status: 503 },
    );
  }
  if (PROVIDER === 'anymize' && !ANYMIZE_API_URL) {
    return Response.json(
      {
        error: 'no_endpoint',
        message:
          'Thi (Anymize) ist nicht vollständig konfiguriert: Anymize_API_URL fehlt in .env.local.',
      },
      { status: 503 },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'bad_request', message: 'Ungültiger Request-Body.' }, { status: 400 });
  }

  const { messages = [], context = [] } = payload || {};

  // Nur valide user/assistant-Textnachrichten zulassen.
  const cleaned = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content }));

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== 'user') {
    return Response.json({ error: 'bad_request', message: 'Die letzte Nachricht muss vom Nutzer stammen.' }, { status: 400 });
  }

  // 4) Input-Caps gegen Kostenexplosion pro Anfrage. Der Zeichen-Cap gilt für
  //    JEDE Nachricht — nicht nur die letzte —, sonst könnten die übrigen bis zu
  //    MAX_MESSAGES-1 Einträge beliebig groß werden und Speicher, Provider-Limits
  //    und Kosten belasten.
  const trimmed = cleaned.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role,
    content: m.content.length > MAX_MSG_CHARS ? m.content.slice(0, MAX_MSG_CHARS) : m.content,
  }));
  const lastIdx = trimmed.length - 1;
  const safeContext = (Array.isArray(context) ? context : []).slice(0, MAX_CONTEXT);

  // Top-Quellen serverseitig mit Volltext anreichern: das Modell sieht so immer den
  // VOLLSTÄNDIGEN Top-Artikel statt nur den ~800-Zeichen-Client-Snippet — verlässlicher,
  // als auf eine Volltext-Lese-Entscheidung des Modells zu hoffen (verhinderte z. B., dass
  // „nicht empfohlen: Duracell" neben „empfohlen: Panasonic" abgeschnitten wurde).
  // WICHTIG (Finding P1 Runde 2): Der Volltext kommt aus dem ROLLEN-PROJIZIERTEN
  // Index — für Händler ist e.body die bereinigte Dealer-Fassung (ohne „Service &
  // Intern“-Abschnitt), interne Artikel fehlen ganz. Vorher wurde der bereits
  // bereinigte Client-Snippet hier wieder durch den vollen Runtime-body ersetzt.
  try {
    const scopedIndex = thiSearchIndexForAccess(access);
    if (Array.isArray(scopedIndex)) {
      const byRoute = new Map(scopedIndex.map((e) => [e.route, e]));
      for (const c of safeContext.slice(0, 2)) {
        const e = c && c.route ? byRoute.get(c.route) : null;
        if (e && e.body && e.visibility !== 'internal') c.body = e.body;
      }
    }
  } catch { /* Snippet-Fallback bleibt */ }

  // Wiki-Kontext (volatil pro Anfrage) in die letzte Nutzernachricht einbetten —
  // bewusst NACH dem gecachten System-Prompt, damit der Cache-Prefix stabil bleibt.
  const contextBlock = buildContextBlock(safeContext);
  const lastContent = trimmed[lastIdx].content; // bereits auf MAX_MSG_CHARS gekappt (s. o.)
  trimmed[lastIdx] = {
    role: 'user',
    content: contextBlock ? `${contextBlock}\n\nFrage des Nutzers:\n${lastContent}` : lastContent,
  };

  // ─── Agentic-Pfad (Anymize + Tools) ───────────────────────────────────────
  // Thi schlägt bei Bedarf selbst nach. Bricht etwas, fällt die Route lautlos
  // auf den klassischen Streaming-Pfad unten zurück (kein harter Fehler für
  // den Nutzer). Latenz ist hier bewusst akzeptiert (mehrere Roundtrips).
  if (TOOLS_ENABLED) {
    try {
      // Sichtbarkeit für die Tools: interne Artikel nur für Admin/Trainer/Editor.
      // access wurde bereits oben (1.5) einmal ermittelt und steuert hier die
      // Tool-Sichtbarkeit — ohne Token (Demo/local-auth) canViewInternal:false.
      const baseMessages = [{ role: 'system', content: SYSTEM_PROMPT_TOOLS }, ...trimmed];
      return new Response(agenticStream(apiKey, baseMessages, access), {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Accel-Buffering': 'no',
        },
      });
    } catch (err) {
      // Konnte der Agentic-Pfad nicht einmal STARTEN (z. B. getRequestAccess/
      // Setup-Fehler), fällt die Route auf den klassischen Streaming-Pfad unten
      // zurück. Fehler INNERHALB des Streams behandelt agenticStream selbst.
      console.error('[thi] Agentic-Setup fehlgeschlagen, Fallback auf Streaming:', err);
    }
  }

  // Provider-spezifischen Upstream-Request bauen.
  const upstreamUrl = PROVIDER === 'anymize' ? ANYMIZE_API_URL : ANTHROPIC_API_URL;
  const upstreamHeaders =
    PROVIDER === 'anymize'
      ? { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' }
      : {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        };
  const body =
    PROVIDER === 'anymize'
      ? {
          // OpenAI-kompatibel: System als erste Nachricht; kein Anthropic-Caching/Thinking.
          model: MODEL,
          max_tokens: 8192,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmed],
          stream: true,
        }
      : {
          model: MODEL,
          max_tokens: 8192,
          thinking: { type: 'adaptive' },
          system: [
            // Stabiler Prefix → Prompt-Caching (der volatile Kontext bleibt absichtlich draußen).
            { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
          ],
          messages: trimmed,
          stream: true,
        };

  let apiRes;
  try {
    apiRes = await fetch(upstreamUrl, {
      method: 'POST',
      headers: upstreamHeaders,
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('[thi] Upstream-Verbindungsfehler:', err);
    return Response.json(
      { error: 'upstream', message: 'Der KI-Dienst ist momentan nicht erreichbar. Bitte später erneut versuchen.' },
      { status: 502 },
    );
  }

  if (!apiRes.ok || !apiRes.body) {
    let detail = '';
    try {
      const e = await apiRes.json();
      detail = e?.error?.message || JSON.stringify(e);
    } catch {
      detail = await apiRes.text().catch(() => '');
    }
    // Details nur serverseitig loggen, nicht an den Client durchreichen (kein Provider-/Config-Leak).
    console.error(`[thi] Upstream-Fehler ${apiRes.status}:`, detail);
    return Response.json(
      {
        error: 'upstream',
        message: 'Der KI-Dienst ist momentan nicht verfügbar. Bitte später erneut versuchen.',
      },
      { status: apiRes.status === 401 ? 401 : 502 },
    );
  }

  // SSE-Stream der Anthropic-API parsen und nur die Text-Deltas weiterreichen.
  const upstream = apiRes.body;
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            let evt;
            try {
              evt = JSON.parse(data);
            } catch {
              continue;
            }
            // Text-Delta provider-abhängig extrahieren.
            const deltaText =
              PROVIDER === 'anymize'
                ? evt.choices?.[0]?.delta?.content // OpenAI-kompatibel
                : evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta'
                  ? evt.delta.text // Anthropic
                  : null;
            if (deltaText) {
              controller.enqueue(encoder.encode(deltaText));
            } else if (evt.type === 'error' || evt.error) {
              console.error('[thi] Streaming-Upstream-Fehler:', evt.error?.message || evt);
              controller.enqueue(encoder.encode('\n\n[FEHLER] Der KI-Dienst meldete einen Fehler.'));
            }
          }
        }
      } catch (err) {
        console.error('[thi] Streaming abgebrochen:', err);
        try {
          controller.enqueue(encoder.encode('\n\n[FEHLER] Übertragung abgebrochen.'));
        } catch {}
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
}
