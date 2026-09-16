"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import db from '@/lib/db';
import { logContentGapDb } from '@/lib/content-gaps-db';
import { useWikiData, useWikiRole } from '@/lib/wiki-context';
import {
  searchWiki,
  searchSections,
  bestSectionForRoute,
  buildRetrievalQuery,
  extractSnippet,
  findRelatedArticles,
  buildQuizRefIndex,
  matchQuizRefs,
  mergeCuratedHits,
  sourceMatchPercent,
  DEFAULT_WIKI_LANG,
} from '@/lib/wiki';
import { renderRichText } from '@/lib/rich-text';
import ThiAvatar from '@/components/ThiAvatar';
import { Send, Trash2, ShieldAlert, BookOpen, ClipboardList, Compass, Phone, Mic, Copy, Check, MessagesSquare, Square, RotateCcw, Wrench, ChevronDown, CornerDownRight, History, Plus } from 'lucide-react';

// Strukturierte Fallaufnahme statt freier Gesprächsaufhänger: Monteure liefern
// gleich die harten Diagnosekriterien, damit Thi ohne Rückfrage-Schleife die
// passende Einstellung/Fehlersuche findet. Reihenfolge = Ausfüll-Reihenfolge.
// `key` landet im zusammengefassten Anfragetext, `optional:false` erzwingt eine
// Angabe vor dem Absenden.
const INTAKE_FIELDS = [
  { key: 'baujahr', label: 'Baujahr des Fahrzeugs', placeholder: 'z. B. 2019', type: 'text', inputMode: 'numeric' },
  { key: 'modell', label: 'Fahrzeugmodell', placeholder: 'z. B. Fiat Ducato, Mercedes Sprinter', type: 'text' },
  { key: 'seriennummer', label: 'Seriennummer des THITRONIK-Produkts', placeholder: 'z. B. SN045…', type: 'text' },
  { key: 'produkte', label: 'Welche THITRONIK-Produkte sind eingebaut?', placeholder: 'z. B. WiPro III, Pro-Finder, G.A.S.-pro III', type: 'text' },
  { key: 'einbauSeit', label: 'Seit wann ist die Alarmanlage eingebaut?', placeholder: 'z. B. seit 03/2024, Neueinbau', type: 'text' },
  { key: 'problem', label: 'Welches Problem liegt vor?', placeholder: 'Symptom, Fehlerbild oder Frage möglichst konkret beschreiben …', type: 'textarea', required: true },
];

const EMPTY_INTAKE = INTAKE_FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {});
const THI_HISTORY_KEY = 'thiChatHistory';
const THI_LEGACY_KEY = 'thiChat';
const THI_HISTORY_LIMIT = 20;
const THI_MESSAGE_LIMIT = 40;

function createChat(messages = []) {
  const now = new Date().toISOString();
  return {
    id: globalThis.crypto?.randomUUID?.() || `thi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: chatTitle(messages),
    messages: messages.slice(-THI_MESSAGE_LIMIT),
    createdAt: now,
    updatedAt: now,
  };
}

function chatTitle(messages) {
  const firstQuestion = messages.find((message) => message?.role === 'user')?.content || '';
  const compact = firstQuestion.replace(/\s+/g, ' ').trim();
  if (!compact) return 'Neuer Chat';
  return compact.length > 52 ? `${compact.slice(0, 51).trim()}…` : compact;
}

function normalizeHistory(value) {
  if (!value || !Array.isArray(value.chats)) return null;
  const chats = value.chats
    .filter((chat) => chat && typeof chat.id === 'string' && Array.isArray(chat.messages))
    .map((chat) => ({
      id: chat.id,
      title: chat.title || chatTitle(chat.messages),
      messages: chat.messages.slice(-THI_MESSAGE_LIMIT),
      createdAt: chat.createdAt || chat.updatedAt || new Date().toISOString(),
      updatedAt: chat.updatedAt || chat.createdAt || new Date().toISOString(),
    }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, THI_HISTORY_LIMIT);
  if (!chats.length) return null;
  const activeChatId = chats.some((chat) => chat.id === value.activeChatId)
    ? value.activeChatId
    : chats[0].id;
  return { version: 2, activeChatId, chats };
}

function formatChatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

function chatExchangeLabel(messages) {
  const count = Math.ceil(messages.length / 2);
  return `${count} ${count === 1 ? 'Beitrag' : 'Beiträge'}`;
}

// Tageszeit-abhaengige Begruessung (Client-only, daher kein Hydration-Mismatch).
function greeting() {
  const h = new Date().getHours();
  if (h < 11) return 'Guten Morgen';
  if (h >= 18) return 'Guten Abend';
  return 'Hallo';
}

export default function ThiPage() {
  const { currentUser, Auth } = useAuth();
  const router = useRouter();
  const { searchIndex, sectionIndex } = useWikiData();
  const { canViewInternal } = useWikiRole();

  const [mounted, setMounted] = useState(false);
  const [historyReady, setHistoryReady] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([]); // [{ role, content }]
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null); // { type: 'info' | 'error', text }
  const [lastSources, setLastSources] = useState([]); // [{ title, route }]
  const [relatedArticles, setRelatedArticles] = useState([]); // 0-Treffer-UX: [{ title, route }]

  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [thinkingStatus, setThinkingStatus] = useState('');
  const [followups, setFollowups] = useState([]); // klickbare Folgefragen aus der letzten Antwort
  const [openSource, setOpenSource] = useState(null); // Route der aufgeklappten Quellen-Vorschau
  const [intake, setIntake] = useState(EMPTY_INTAKE); // strukturierte Fallaufnahme im Leerzustand

  const scrollRef = useRef(null);
  const autoSentRef = useRef(false);
  const recognitionRef = useRef(null);
  const abortRef = useRef(null);
  const chatHistoryRef = useRef([]);
  const activeChatIdRef = useRef(null);
  // Kuratierte Quiz→Wiki-Verweise (AP2 wiki_refs); lazy beim ersten Senden geladen.
  const quizRefIndexRef = useRef(null);

  const writeHistory = useCallback((nextChats, nextActiveId) => {
    const sortedChats = [...nextChats]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, THI_HISTORY_LIMIT);
    const resolvedActiveId = sortedChats.some((chat) => chat.id === nextActiveId)
      ? nextActiveId
      : sortedChats[0]?.id || null;
    const payload = { version: 2, activeChatId: resolvedActiveId, chats: sortedChats };

    chatHistoryRef.current = sortedChats;
    activeChatIdRef.current = resolvedActiveId;
    setChatHistory(sortedChats);
    setActiveChatId(resolvedActiveId);
    API.saveThiChatHistory(currentUser?.id, payload);
    if (currentUser?.id) {
      db.setUserStorage(currentUser.id, THI_HISTORY_KEY, payload, {
        accessToken: Auth.getAccessToken?.(),
      }).catch(() => {});
    }
  }, [currentUser, Auth]);

  const persist = useCallback((msgs) => {
    const now = new Date().toISOString();
    let chatId = activeChatIdRef.current;
    let activeChat = chatHistoryRef.current.find((chat) => chat.id === chatId);
    if (!activeChat) {
      activeChat = createChat();
      chatId = activeChat.id;
    }
    const updatedChat = {
      ...activeChat,
      title: chatTitle(msgs),
      messages: msgs.slice(-THI_MESSAGE_LIMIT),
      updatedAt: now,
    };
    writeHistory(
      [updatedChat, ...chatHistoryRef.current.filter((chat) => chat.id !== chatId)],
      chatId,
    );
  }, [writeHistory]);

  useEffect(() => {
    if (!currentUser) { router.push('/login'); return; }
    setMounted(true);
    let cancelled = false;
    setHistoryReady(false);

    (async () => {
      const opts = { accessToken: Auth.getAccessToken?.() };
      const localHistory = normalizeHistory(API.getThiChatHistory(currentUser.id));
      let storedHistory = null;
      try {
        const row = await db.getUserStorage(currentUser.id, THI_HISTORY_KEY, opts);
        storedHistory = normalizeHistory(row?.wert);
      } catch {}

      let history = storedHistory || localHistory;
      if (!history) {
        try {
          const legacyRow = await db.getUserStorage(currentUser.id, THI_LEGACY_KEY, opts);
          if (Array.isArray(legacyRow?.wert) && legacyRow.wert.length) {
            const migrated = createChat(legacyRow.wert);
            history = { version: 2, activeChatId: migrated.id, chats: [migrated] };
          }
        } catch {}
      }

      if (!history) {
        const initialChat = createChat();
        history = { version: 2, activeChatId: initialChat.id, chats: [initialChat] };
      }
      if (cancelled) return;

      const activeChat = history.chats.find((chat) => chat.id === history.activeChatId) || history.chats[0];
      chatHistoryRef.current = history.chats;
      activeChatIdRef.current = activeChat.id;
      setChatHistory(history.chats);
      setActiveChatId(activeChat.id);
      setMessages(activeChat.messages);
      setHistoryReady(true);
      API.saveThiChatHistory(currentUser.id, history);
      if (!storedHistory) {
        db.setUserStorage(currentUser.id, THI_HISTORY_KEY, history, opts).catch(() => {});
      }
    })();

    // Phase 3: Verlauf aus user_storage (DB, geräteübergreifend) laden.
    return () => { cancelled = true; };
  }, [currentUser, router, Auth]);

  // Auto-Scroll ans Ende NUR, wenn der Nutzer bereits unten ist — sonst stört es
  // das Zurückscrollen/Lesen während die Antwort streamt (UI-Audit).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  const resetConversationUi = useCallback((nextMessages = []) => {
    setMessages(nextMessages);
    setInput('');
    setIntake(EMPTY_INTAKE);
    setLastSources([]);
    setRelatedArticles([]);
    setFollowups([]);
    setOpenSource(null);
    setNotice(null);
    setCopiedIdx(null);
  }, []);

  const createNewChat = () => {
    if (busy) return;
    const current = chatHistoryRef.current.find((chat) => chat.id === activeChatIdRef.current);
    if (current && current.messages.length === 0) {
      resetConversationUi();
      setHistoryOpen(false);
      return;
    }
    const newChat = createChat();
    resetConversationUi();
    writeHistory([newChat, ...chatHistoryRef.current], newChat.id);
    setHistoryOpen(false);
  };

  const selectChat = (chatId) => {
    if (busy || chatId === activeChatIdRef.current) {
      setHistoryOpen(false);
      return;
    }
    const chat = chatHistoryRef.current.find((item) => item.id === chatId);
    if (!chat) return;
    resetConversationUi(chat.messages);
    writeHistory(chatHistoryRef.current, chat.id);
    setHistoryOpen(false);
  };

  const deleteChat = (chatId) => {
    if (busy) return;
    const chat = chatHistoryRef.current.find((item) => item.id === chatId);
    if (!chat) return;
    const label = chat.messages.length ? `„${chat.title}“` : 'diesen leeren Chat';
    if (!window.confirm(`Möchtest du ${label} wirklich löschen?`)) return;

    const remaining = chatHistoryRef.current.filter((item) => item.id !== chatId);
    const fallback = remaining[0] || createChat();
    const nextChats = remaining.length ? remaining : [fallback];
    const nextActiveId = chatId === activeChatIdRef.current
      ? fallback.id
      : activeChatIdRef.current;
    if (chatId === activeChatIdRef.current) resetConversationUi(fallback.messages);
    writeHistory(nextChats, nextActiveId);
  };

  // ─── Sprach-Eingabe (Web Speech API) ──────────────────────────────────────
  // Freisprech-Eingang für Monteure mit schmutzigen Händen am Fahrzeug. Rein
  // clientseitig, kein Backend; nur sichtbar, wenn der Browser SpeechRecognition
  // kann (Chrome/Edge). Diktat füllt das Eingabefeld — Absenden bleibt bewusst
  // ein eigener Schritt (Quittierung vor dem Senden).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.SpeechRecognition || window.webkitSpeechRecognition) setVoiceSupported(true);
  }, []);

  const stopVoice = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch {}
    recognitionRef.current = null;
    setListening(false);
  }, []);

  const toggleVoice = () => {
    if (listening) { stopVoice(); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'de-DE';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      setInput(text);
    };
    rec.onend = () => { recognitionRef.current = null; setListening(false); };
    rec.onerror = (e) => {
      recognitionRef.current = null;
      setListening(false);
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
        setNotice({ type: 'error', text: 'Mikrofon-Zugriff wurde blockiert. Bitte in den Browser-Einstellungen erlauben.' });
      }
    };
    recognitionRef.current = rec;
    setListening(true);
    try { rec.start(); } catch { setListening(false); }
  };

  const copyAnswer = (text, idx) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((cur) => (cur === idx ? null : cur)), 1500);
    }).catch(() => {});
  };

  // Forum-Brücke: eine offene Frage (kein Wiki-Treffer) in einen vorausgefüllten
  // Forum-Thread überführen — aus der Sackgasse wird durchsuchbarer Community-Inhalt.
  const askInForum = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
    if (!lastUser) { router.push('/forum/new'); return; }
    const title = lastUser.replace(/\s+/g, ' ').trim().slice(0, 120);
    const body = `${lastUser.trim()}\n\n— Über THI gefragt; dazu gab es keinen passenden Wiki-Artikel. Wer kann weiterhelfen?`;
    router.push(`/forum/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`);
  };

  // Fallaufnahme → eine zusammengefasste, gut lesbare Anfrage an Thi bauen.
  // Nur ausgefüllte Felder werden aufgenommen; „Problem" ist Pflicht (Button
  // ist sonst deaktiviert). Die klaren Feld-Labels helfen dem RAG-Retrieval
  // (Modell + Baujahr + Produkt landen wortwörtlich in der Query).
  const submitIntake = (e) => {
    e?.preventDefault?.();
    if (busy) return;
    const problem = intake.problem.trim();
    if (!problem) return;
    const daten = INTAKE_FIELDS
      .filter((f) => !f.required && intake[f.key].trim())
      .map((f) => `- ${f.label}: ${intake[f.key].trim()}`);
    const parts = [];
    if (daten.length) parts.push(`Fallaufnahme:\n${daten.join('\n')}`);
    parts.push(`Problem/Frage: ${problem}`);
    setIntake(EMPTY_INTAKE);
    send(parts.join('\n\n'));
  };

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    if (listening) stopVoice();
    // Onboarding-Signal: Thi wurde ausprobiert (geräte-lokal, siehe „Erste Schritte").
    if (currentUser?.id) API.recordThiUsed(currentUser.id);
    setNotice(null);
    setFollowups([]);
    setOpenSource(null);

    const base = [...messages, { role: 'user', content: q }];
    setMessages([...base, { role: 'assistant', content: '' }]);
    persist(base);
    setInput('');
    setBusy(true);

    // Wiki-Retrieval (RAG) — rollenbewusst: interne Inhalte nur für Admin/Trainer.
    // THI-RAG Quick Wins (AP3): Gesprächskontext + Produkt-Aliasse in der Query,
    // Recall Top-8, Passagen-Fenster um die Trefferstelle, kuratierte
    // Quiz-wiki_refs als Zusatzkontext, verwandte Artikel bei 0 Treffern.
    let context = [];
    let sources = [];
    let hitCount = 0;
    let related = [];
    if (searchIndex) {
      const access = { canViewInternal };
      const prevUserTexts = messages.filter((m) => m.role === 'user').slice(-2).map((m) => m.content);
      const retrievalQuery = buildRetrievalQuery(q, prevUserTexts);
      let hits = searchWiki(searchIndex, retrievalQuery, access, DEFAULT_WIKI_LANG, 8);
      hitCount = hits.length;

      // Kuratierte Quiz-Verweise (wiki_refs) anhängen, sofern nicht schon getroffen.
      // Seit 2026-07-22 login-gegated über /api/wiki/quizzes (vorher öffentlich
      // unter /dealer-quizzes.de.json — statischer Kanal am Wiki-Gate vorbei).
      if (!quizRefIndexRef.current) {
        const quizToken = Auth.getAccessToken?.() || null;
        quizRefIndexRef.current = fetch('/api/wiki/quizzes', {
          headers: quizToken ? { Authorization: `Bearer ${quizToken}` } : {},
          cache: 'no-store',
        })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => buildQuizRefIndex(data))
          .catch(() => []);
      }
      const quizIndex = await quizRefIndexRef.current;
      hits = mergeCuratedHits(
        searchIndex,
        hits,
        matchQuizRefs(quizIndex || [], retrievalQuery, 3),
        access,
        DEFAULT_WIKI_LANG,
        8,
      );

      // 0-Treffer-UX: verwandte Artikel als weichen Kontext + aktives Angebot.
      if (hits.length === 0) {
        related = findRelatedArticles(searchIndex, retrievalQuery, access, DEFAULT_WIKI_LANG, 3);
      }

      // Abschnitts-Anker: jeder Artikel-Treffer bekommt – falls vorhanden – den
      // am besten zur Frage passenden Abschnitt, damit Thi die JEWEILIGE STELLE
      // (route#anker) zitieren/verlinken kann statt nur den ganzen Artikel.
      const sectionFor = (route) => (sectionIndex ? bestSectionForRoute(sectionIndex, route, retrievalQuery, DEFAULT_WIKI_LANG) : null);
      context = hits.map((h) => {
        const sec = sectionFor(h.route);
        return {
          title: h.title,
          route: h.route,
          anchor: sec?.anchor || '',
          headingPath: sec?.headingPath || '',
          snippet: extractSnippet(h.body || h.excerpt || '', retrievalQuery),
        };
      });

      // Eigenständige starke Abschnitte aus ANDEREN Artikeln (Sub-Themen, die das
      // artikelweise Scoring verdrängt – z. B. „Zusatzhupe an Pin …" steht in
      // sirenen-hupen, während die Frage „WiPro III" den Produktartikel hochzieht).
      // Direkt nach den Top-Treffern eingefügt, damit der Server-Cap (Top 8) sie behält.
      if (sectionIndex) {
        const hitRoutes = new Set(hits.map((h) => h.route));
        const extra = [];
        for (const s of searchSections(sectionIndex, retrievalQuery, access, DEFAULT_WIKI_LANG, 6)) {
          if (hitRoutes.has(s.route) || extra.some((e) => e.route === s.route)) continue;
          extra.push({
            title: s.title,
            route: s.route,
            anchor: s.anchor || '',
            headingPath: s.headingPath || '',
            snippet: extractSnippet(s.body || '', retrievalQuery),
          });
          if (extra.length >= 2) break;
        }
        if (extra.length) context.splice(Math.min(2, context.length), 0, ...extra);
      }

      context.push(...related.map((h) => ({
        title: `${h.title} (verwandter Artikel, kein direkter Treffer)`,
        route: h.route,
        snippet: extractSnippet(h.body || h.excerpt || '', retrievalQuery),
      })));
      // Anzeige: nur die Top 3 Quellen, mit Frage-Abdeckung in Prozent
      // (sourceMatchPercent auf die ORIGINALE Frage, nicht die angereicherte
      // Retrieval-Query) und Deep-Link auf den passenden Abschnitt. Der RAG-Kontext
      // oben behält bewusst alle Treffer.
      sources = hits.slice(0, 3).map((h) => {
        const sec = sectionFor(h.route);
        return {
          title: h.title,
          route: h.route,
          anchor: sec?.anchor || '',
          headingPath: sec?.headingPath || '',
          match: sourceMatchPercent(h, q),
          snippet: extractSnippet(h.body || h.excerpt || '', retrievalQuery, 280),
        };
      });
    }
    setLastSources(sources);
    setRelatedArticles(related.map((h) => ({ title: h.title, route: h.route })));

    // Content-Lücke: Thi-Frage mit schwachem/keinem Wiki-Treffer protokollieren.
    // DB-Pfad (content_luecken) mit LocalStorage-Fallback, falls DB nicht erreichbar.
    if (hitCount < 2) {
      const gap = { type: 'thi', query: q, lang: DEFAULT_WIKI_LANG, userId: currentUser.id, resultCount: hitCount };
      logContentGapDb(gap).catch(() => API.logContentGap?.(gap));
    }

    setThinkingStatus('');
    const controller = new AbortController();
    abortRef.current = controller;
    let answer = '';
    try {
      const res = await fetch('/api/thi', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // Phase 2: Access-Token mitsenden, damit die Route die Session
          // serverseitig prüfen kann (Thi nur für angemeldete Nutzer).
          ...(currentUser?._accessToken
            ? { Authorization: `Bearer ${currentUser._accessToken}` }
            : {}),
        },
        body: JSON.stringify({ messages: base, context }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        let data = {};
        try { data = await res.json(); } catch {}
        setMessages(base); // leeren Assistenten-Platzhalter entfernen
        setLastSources([]);
        // Verständliche, statusbasierte Microcopy statt nacktem Status-Code.
        const fallback =
          res.status === 429 ? 'Zu viele Anfragen in kurzer Zeit. Bitte einen Moment warten und erneut versuchen.'
          : res.status === 503 ? 'Thi ist gerade nicht verfügbar. Bitte später erneut versuchen.'
          : (res.status === 401 || res.status === 403) ? 'Keine Berechtigung für diese Anfrage – bitte neu anmelden.'
          : res.status >= 500 ? 'Auf dem Server ist ein Fehler aufgetreten. Bitte später erneut versuchen.'
          : `Anfrage fehlgeschlagen (Status ${res.status}).`;
        setNotice({
          type: data.error === 'no_key' ? 'info' : 'error',
          text: data.message || fallback,
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = '';
      const STATUS_RE = /\[\[STATUS:([^\]]*)\]\]/;
      const FOLLOWUP_RE = /\[\[FOLGEFRAGEN:([^\]]*)\]\]/;
      const parseFollowups = (s) => s.split('|').map((t) => t.trim()).filter(Boolean).slice(0, 3);
      // Markiert ein "[[", das (der Anfang) eines bekannten Markers sein könnte —
      // damit weder Status- noch Folgefragen-Marker in den Antworttext sickern.
      const couldBeMarker = (seg) => ['[[STATUS:', '[[FOLGEFRAGEN:'].some((p) => p.startsWith(seg) || seg.startsWith(p));
      const drainMarkers = () => {
        let m;
        while ((m = STATUS_RE.exec(raw))) { setThinkingStatus(m[1]); raw = raw.slice(0, m.index) + raw.slice(m.index + m[0].length); }
        while ((m = FOLLOWUP_RE.exec(raw))) { setFollowups(parseFollowups(m[1])); raw = raw.slice(0, m.index) + raw.slice(m.index + m[0].length); }
      };
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        drainMarkers();
        const open = raw.indexOf('[[');
        const holdMarker = open !== -1 && couldBeMarker(raw.slice(open));
        const cut = holdMarker ? open : raw.length;
        const ready = raw.slice(0, cut);
        raw = raw.slice(cut);
        if (ready) { answer += ready; setThinkingStatus(''); }
        setMessages([...base, { role: 'assistant', content: answer }]);
      }
      drainMarkers();
      if (raw && !raw.startsWith('[[')) answer += raw;
      if (answer) { setMessages([...base, { role: 'assistant', content: answer }]); persist([...base, { role: 'assistant', content: answer }]); }
      else setMessages(base);
    } catch (err) {
      if (err?.name === 'AbortError') {
        // Nutzer hat gestoppt: Teilantwort behalten, kein Fehler anzeigen.
        if (answer) { setMessages([...base, { role: 'assistant', content: answer }]); persist([...base, { role: 'assistant', content: answer }]); }
        else setMessages(base);
      } else {
        setMessages(base);
        setNotice({ type: 'error', text: `Netzwerkfehler: ${err?.message || err}` });
      }
    } finally {
      abortRef.current = null;
      setThinkingStatus('');
      setBusy(false);
    }
  };

  const stopAnswer = () => { try { abortRef.current?.abort(); } catch {} };

  const retryLast = () => {
    if (busy) return;
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUser) send(lastUser.content);
  };

  // Aus „Frag Thi" (?q=…) genau einmal automatisch absenden.
  useEffect(() => {
    if (!mounted || !historyReady || autoSentRef.current) return;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q && q.trim()) {
      autoSentRef.current = true;
      send(q.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, historyReady]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!mounted || !currentUser || !historyReady) return null;

  const isEmpty = messages.length === 0;
  const lastMsg = messages[messages.length - 1];
  const showSources = !busy && lastSources.length > 0 && lastMsg?.role === 'assistant' && lastMsg.content;
  const showRelated = !busy && lastSources.length === 0 && relatedArticles.length > 0
    && lastMsg?.role === 'assistant' && lastMsg.content;

  return (
    <div className="thi-page animate-fade-in-up">
      <h1 className="sr-only">THI – THITRONIK Intelligence</h1>

      {notice && (
        <div className={`thi-notice ${notice.type === 'error' ? 'thi-notice--error' : 'thi-notice--info'}`}>
          <ShieldAlert size={18} />
          <span>{notice.text}</span>
        </div>
      )}

      <div className="thi-history-mobilebar">
        <button
          type="button"
          className="thi-history-toggle"
          onClick={() => setHistoryOpen((open) => !open)}
          aria-expanded={historyOpen}
          aria-controls="thi-history-panel"
        >
          <History size={17} /> Chats <span>{chatHistory.length}</span>
        </button>
        <button type="button" className="thi-new-chat thi-new-chat--compact" onClick={createNewChat} disabled={busy}>
          <Plus size={17} /> Neuer Chat
        </button>
      </div>

      <div className="thi-workspace">
        <aside id="thi-history-panel" className={`card thi-history${historyOpen ? ' is-open' : ''}`} aria-label="THI Chat-History">
          <div className="thi-history-header">
            <div>
              <span className="thi-history-eyebrow"><History size={14} /> Verlauf</span>
              <h2>Deine Chats</h2>
            </div>
          </div>
          <button type="button" className="thi-new-chat thi-new-chat--wide" onClick={createNewChat} disabled={busy}>
            <Plus size={17} /> Neuer Chat
          </button>
          <div className="thi-history-list">
            {chatHistory.map((chat) => (
              <div key={chat.id} className={`thi-history-item${chat.id === activeChatId ? ' is-active' : ''}`}>
                <button type="button" className="thi-history-select" onClick={() => selectChat(chat.id)} disabled={busy}>
                  <span className="thi-history-title">{chat.title}</span>
                  <span className="thi-history-meta">
                    {formatChatTime(chat.updatedAt)} · {chatExchangeLabel(chat.messages)}
                  </span>
                </button>
                <button
                  type="button"
                  className="thi-history-delete"
                  onClick={() => deleteChat(chat.id)}
                  disabled={busy}
                  aria-label={`Chat „${chat.title}“ löschen`}
                  title="Chat löschen"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="thi-history-note">Bis zu {THI_HISTORY_LIMIT} Gespräche – in deinem Konto gespeichert.</p>
        </aside>

        <div className="card thi-chat">
          <div className="thi-chat-toolbar">
            <div className="thi-chat-identity">
              <ThiAvatar size={34} />
              <div>
                <strong>THI Assistent</strong>
                <span>Wiki-gestützte Diagnose</span>
              </div>
            </div>
            {!isEmpty && (
              <button type="button" className="thi-delete-chat" onClick={() => deleteChat(activeChatId)} disabled={busy}>
                <Trash2 size={15} /> Chat löschen
              </button>
            )}
          </div>
        <div className="thi-messages" ref={scrollRef} role="log" aria-label="Chat-Verlauf mit THI">
          {isEmpty ? (
            <div className="thi-empty">
              <ThiAvatar size={64} className="thi-empty-icon" />
              <h2>{greeting()} {currentUser.firstName}, ich bin Thi.</h2>
              <p>Für eine schnelle Diagnose nimm den Fall kurz auf. Je genauer Fahrzeug, Produkt und Einbau, desto gezielter finde ich die passende Einstellung oder Fehlerursache im Wiki. Nur das <strong>Problem</strong> ist Pflicht – den Rest ergänzt du, was du weißt.</p>
              <form className="thi-intake" onSubmit={submitIntake} aria-label="Fallaufnahme für die Diagnose">
                <div className="thi-intake-title"><ClipboardList size={15} /> Fallaufnahme</div>
                <div className="thi-intake-grid">
                  {INTAKE_FIELDS.map((f) => (
                    <label
                      key={f.key}
                      className={`thi-intake-field${f.type === 'textarea' ? ' thi-intake-field--wide' : ''}`}
                    >
                      <span className="thi-intake-label">
                        {f.label}{f.required && <span className="thi-intake-req" aria-hidden="true"> *</span>}
                      </span>
                      {f.type === 'textarea' ? (
                        <textarea
                          name={f.key}
                          className="thi-intake-input"
                          value={intake[f.key]}
                          onChange={(e) => setIntake((s) => ({ ...s, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          rows={2}
                          required
                        />
                      ) : (
                        <input
                          name={f.key}
                          className="thi-intake-input"
                          type={f.type}
                          inputMode={f.inputMode}
                          value={intake[f.key]}
                          onChange={(e) => setIntake((s) => ({ ...s, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="thi-intake-actions">
                  <button type="submit" className="btn btn-primary" disabled={!intake.problem.trim() || busy}>
                    <Send size={16} /> Fall an Thi senden
                  </button>
                  <span className="thi-intake-hint">
                    <Wrench size={13} /> Oder unten einfach frei eine Frage eingeben.
                  </span>
                </div>
              </form>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`thi-msg thi-msg--${m.role}`}>
                <div className="thi-msg-avatar" aria-hidden="true">
                  {m.role === 'assistant' ? <ThiAvatar size={26} /> : (currentUser.firstName?.[0] || 'U')}
                </div>
                <div className="thi-msg-bubble">
                  {m.role === 'assistant'
                    ? (m.content
                        ? <>
                            {renderRichText(m.content)}
                            <button
                              type="button"
                              className="thi-copy"
                              onClick={() => copyAnswer(m.content, i)}
                              title="Antwort kopieren"
                              aria-label="Antwort kopieren"
                            >
                              {copiedIdx === i ? <><Check size={13} /> Kopiert</> : <><Copy size={13} /> Kopieren</>}
                            </button>
                          </>
                        : <span className="thi-thinking-row">
                            <span className="thi-typing" role="status" aria-label="THI antwortet, bitte warten …"><span /><span /><span /></span>
                            {thinkingStatus && <span className="thi-status-text">{thinkingStatus}</span>}
                          </span>)
                    : <div className="thi-user-text">{m.content}</div>}
                </div>
              </div>
            ))
          )}

          {showSources && (
            <div className="thi-sources">
              <div className="thi-sources-title"><BookOpen size={14} /> Quellen aus dem Wiki</div>
              <div className="thi-sources-list thi-sources-list--stacked">
                {lastSources.map((s) => (
                  <div key={s.route} className="thi-source-item">
                    <div className="thi-source-row">
                      <a
                        href={s.anchor ? `${s.route}#${s.anchor}` : s.route}
                        className="thi-source-link"
                    title={typeof s.match === 'number'
                      ? `Deine Frage wird hier zu ca. ${s.match} % abgedeckt — ${s.anchor ? `${s.route}#${s.anchor}` : s.route}`
                      : (s.anchor ? `${s.route}#${s.anchor}` : s.route)}
                  >
                    {s.title}
                    {s.headingPath && (
                      <span className="thi-source-section" title={`Abschnitt: ${s.headingPath}`}>
                        <CornerDownRight size={12} /> {s.headingPath}
                      </span>
                    )}
                    {typeof s.match === 'number' && (
                      <span className="thi-source-match" aria-label={`Übereinstimmung ${s.match} Prozent`}>
                        {s.match}{' '}%
                      </span>
                    )}
                      </a>
                      {s.snippet && (
                        <button
                          type="button"
                          className={`thi-source-toggle${openSource === s.route ? ' is-open' : ''}`}
                          onClick={() => setOpenSource(openSource === s.route ? null : s.route)}
                          aria-expanded={openSource === s.route}
                          aria-label={openSource === s.route ? `Textauszug für ${s.title} ausblenden` : `Textauszug für ${s.title} anzeigen`}
                          title="Textauszug anzeigen"
                        >
                          <ChevronDown size={14} /> Auszug
                        </button>
                      )}
                    </div>
                    {openSource === s.route && s.snippet && (
                      <p className="thi-source-snippet">{s.snippet}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showRelated && (
            <div className="thi-sources">
              <div className="thi-sources-title">
                <Compass size={14} /> Kein direkter Wiki-Treffer — diese Artikel könnten weiterhelfen
              </div>
              <div className="thi-sources-list">
                {relatedArticles.map((s) => (
                  <a key={s.route} href={s.route} className="thi-source-link" title={s.route}>
                    {s.title}
                  </a>
                ))}
              </div>
              <div className="thi-related-actions">
                <button type="button" className="thi-forum-bridge" onClick={askInForum}>
                  <MessagesSquare size={14} /> Im Händler-Forum fragen
                </button>
                <span className="thi-sources-title">
                  <Phone size={14} /> Oder direkt zum THITRONIK-Support: +49 (0)4351 76744-112
                </span>
              </div>
            </div>
          )}

          {!busy && followups.length > 0 && lastMsg?.role === 'assistant' && lastMsg.content && (
            <div className="thi-followups">
              <div className="thi-followups-title"><CornerDownRight size={13} /> Weiterfragen</div>
              {followups.map((f) => (
                <button key={f} type="button" className="thi-followup" onClick={() => send(f)}>{f}</button>
              ))}
            </div>
          )}

          {!busy && lastMsg?.role === 'assistant' && lastMsg.content && (
            <div className="thi-answer-actions">
              <button type="button" className="thi-retry" onClick={retryLast}>
                <RotateCcw size={13} /> Antwort neu generieren
              </button>
            </div>
          )}
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">{busy ? 'Thi erstellt eine Antwort …' : ''}</div>
        <form
          className="thi-input-row"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <div className="thi-input-control">
            <label htmlFor="thi-message-input" className="thi-input-label">
              <Send size={13} aria-hidden="true" /> Deine Eingabe an THI
            </label>
          <textarea
            id="thi-message-input"
            name="message"
            className="thi-input"
            value={input}
            onChange={(e) => { setInput(e.target.value); const t = e.target; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 160) + 'px'; }}
            onKeyDown={onKeyDown}
            placeholder={listening ? 'Sprich jetzt … (Mikrofon hört zu)' : 'Frage an Thi eingeben… (Enter zum Senden, Shift+Enter für neue Zeile)'}
            rows={1}
            aria-busy={busy}
            autoComplete="off"
          />
          </div>
          {voiceSupported && (
            <button
              type="button"
              className={`thi-mic${listening ? ' is-listening' : ''}`}
              onClick={toggleVoice}
              disabled={busy}
              title={listening ? 'Spracheingabe stoppen' : 'Per Sprache eingeben'}
              aria-label={listening ? 'Spracheingabe stoppen' : 'Per Sprache eingeben'}
              aria-pressed={listening}
            >
              <Mic size={18} />
            </button>
          )}
          {busy ? (
            <button type="button" className="btn btn-secondary thi-send" onClick={stopAnswer} title="Antwort stoppen">
              <Square size={14} /> Stopp
            </button>
          ) : (
            <button type="submit" className="btn btn-primary thi-send" disabled={!input.trim()}>
              <Send size={16} /> Senden
            </button>
          )}
        </form>
        <p className="thi-disclaimer">
          THI kann Fehler machen – prüfe wichtige Angaben (Artikelnummern, DIP-Stellungen,
          Anschlüsse) und frag bei sicherheitskritischen Themen den THITRONIK-Support.
        </p>
        </div>
      </div>
    </div>
  );
}
