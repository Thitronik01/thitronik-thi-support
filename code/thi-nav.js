// ============================================================================
// THI App-Navigation — Routen-Manifest (Stufe 2, Schritt 1).
// ----------------------------------------------------------------------------
// Die EINZIGE Quelle erlaubter Sprungziele für das THI-Tool `app_navigieren`.
// Das LLM liefert nie einen freien Pfad, sondern nur ein Stichwort (ziel); der
// Server löst es ausschließlich gegen diese Whitelist auf — kein Open-Redirect,
// keine Pfad-Injection möglich.
//
// Server-importierbar (reine Daten + reine Funktion, KEIN fs/React/Next), damit
// es sowohl die THI-Route (Node) als auch perspektivisch der Cmd+K-Client
// (components/wiki/WikiSearchModal.js PAGE_TARGETS) nutzen kann. Abgeleitet von
// PAGE_TARGETS, ergänzt um Deep-Link-Ziele (/nachweis, /lernpfade, /anleitungen)
// und deutsche Such-Stichwörter (keywords) für die Absichtserkennung.
//
// Rollen-Flags wie in PAGE_TARGETS:
//   internal: true  → nur canViewInternal (admin/trainer/editor)
//   admin:    true  → nur role === 'admin'
//   langScoped:true → Route wird mit /<lang> vorangestellt (de-only Kontext)
//   resolver:'anleitung' → versucht zusätzlich, auf ein konkretes PDF zu deep-linken
// ============================================================================
import { normalizeSearch } from './search-core.js';

export const NAV_TARGETS = [
  { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: 'LayoutDashboard',
    keywords: ['dashboard', 'start', 'startseite', 'uebersicht', 'home'] },
  { id: 'courses', label: 'Kurse & Schulungen', route: '/courses', icon: 'GraduationCap',
    keywords: ['kurs', 'kurse', 'schulung', 'schulungen', 'lernen', 'quiz', 'weiterbildung', 'training'] },
  { id: 'lernpfade', label: 'Lernpfade', route: '/lernpfade', icon: 'Route',
    keywords: ['lernpfad', 'lernpfade', 'lernweg', 'schulungspfad', 'pfad'] },
  { id: 'nachweis', label: 'Mein Nachweis (Zertifikate)', route: '/nachweis', icon: 'Award',
    keywords: ['zertifikat', 'zertifikate', 'nachweis', 'urkunde', 'abschluss', 'bescheinigung', 'kompetenz'] },
  { id: 'anleitungen', label: 'Bedienungsanleitungen', route: '/anleitungen', icon: 'FileText', resolver: 'anleitung',
    keywords: ['anleitung', 'anleitungen', 'bedienungsanleitung', 'handbuch', 'montageanleitung', 'installationsanleitung', 'einbauanleitung', 'pdf', 'kurzanleitung'] },
  { id: 'forum', label: 'Händler-Forum', route: '/forum', icon: 'MessagesSquare',
    keywords: ['forum', 'community', 'austausch', 'diskussion', 'beitrag'] },
  { id: 'glossar', label: 'Glossar', route: '/glossar', icon: 'BookA', langScoped: true,
    keywords: ['glossar', 'begriff', 'begriffe', 'fachbegriff', 'lexikon', 'definition'] },
  { id: 'arbeitskarte', label: 'Digitale Arbeitskarte', route: '/tools/arbeitskarte', icon: 'ClipboardList',
    keywords: ['arbeitskarte', 'auftrag', 'werkstatt', 'sichtkontrolle', 'uebergabe', 'montagekarte'] },
  { id: 'soundboard', label: 'Soundboard', route: '/tools/soundboard', icon: 'Volume2',
    keywords: ['soundboard', 'alarmton', 'alarmtoene', 'toene', 'sound', 'signalton'] },
  { id: 'profile', label: 'Mein Profil', route: '/profile', icon: 'User',
    keywords: ['profil', 'fortschritt', 'meine daten'] },
  { id: 'settings', label: 'Einstellungen', route: '/settings', icon: 'Settings',
    keywords: ['einstellung', 'einstellungen', 'theme', 'darstellung', 'sprache', 'konto'] },
  { id: 'support', label: 'Support & Kontakt', route: '/support', icon: 'LifeBuoy',
    keywords: ['support', 'hilfe', 'kontakt', 'telefon', 'ansprechpartner'] },

  // — Intern (nur canViewInternal) —
  { id: 'assets', label: 'Asset-Bibliothek', route: '/assets', icon: 'FolderDown', langScoped: true, internal: true,
    keywords: ['asset', 'assets', 'download', 'downloads', 'bibliothek', 'medien', 'logo'] },
  { id: 'company-ci', label: 'Unternehmen & CI', route: '/company-ci', icon: 'Building2', langScoped: true, internal: true,
    keywords: ['unternehmen', 'firma', 'marke', 'corporate', 'ci'] },
  { id: 'admin', label: 'Admin-Dashboard', route: '/admin', icon: 'Shield', internal: true,
    keywords: ['admin', 'verwaltung', 'administration'] },
  { id: 'reporting', label: 'Reporting', route: '/admin/reporting', icon: 'BarChart3', internal: true,
    keywords: ['reporting', 'auswertung', 'auswertungen', 'statistik', 'bericht'] },
  { id: 'content-gaps', label: 'Content-Lücken', route: '/admin/content-gaps', icon: 'FileWarning', internal: true,
    keywords: ['content-luecke', 'luecken', 'fehlende artikel', 'content gaps'] },
  { id: 'audit', label: 'Wiki-Audit', route: '/wiki/audit', icon: 'ClipboardCheck', internal: true,
    keywords: ['audit', 'wiki-audit', 'content-qualitaet', 'qualitaet'] },

  // — Nur Admin —
  { id: 'users', label: 'Händler verwalten', route: '/admin/users', icon: 'Users', admin: true,
    keywords: ['haendler anlegen', 'konto anlegen', 'nutzer verwalten', 'benutzer', 'konten'] },
  { id: 'editor', label: 'Wiki-Editor', route: '/editor', icon: 'PenSquare', langScoped: true, admin: true,
    keywords: ['editor', 'wiki-editor', 'artikel bearbeiten', 'bearbeiten'] },
];

// Reiner Matcher (ohne Rollen-Gating — das macht der Aufrufer). Liefert das
// best passende Ziel oder null. Schwelle verhindert schwache Zufallstreffer.
export function matchNavTarget(text) {
  const norm = normalizeSearch(text);
  const tokens = norm.split(/\s+/).filter((t) => t.length >= 3);
  if (!tokens.length) return null;
  let best = null;
  for (const target of NAV_TARGETS) {
    const idN = normalizeSearch(target.id);
    const labelN = normalizeSearch(target.label);
    // Phrasen-Keywords ("konto anlegen") in Tokens zerlegen, damit der exakte
    // (+5)-Pfad auch für Mehrwort-Stichwörter greift — sonst matchen sie nur
    // schwach per Substring.
    const kw = (target.keywords || []).flatMap((k) => normalizeSearch(k).split(/\s+/)).filter(Boolean);
    let score = 0;
    for (const tok of tokens) {
      if (kw.includes(tok)) score += 5;
      else if (kw.some((k) => k.includes(tok) || tok.includes(k))) score += 3;
      if (idN === tok) score += 4;
      else if (idN.includes(tok)) score += 2;
      if (labelN.includes(tok)) score += 2;
    }
    if (score > (best ? best.score : 0)) best = { target, score };
  }
  return best && best.score >= 3 ? best.target : null;
}
