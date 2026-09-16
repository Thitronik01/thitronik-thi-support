"use client";

// Thi (KI-Assistent) läuft im normalen App-Rahmen (AppLayout) und nutzt das
// V2-Design-System für den Seiteninhalt (.v2-scope) — Scoped Re-Skin wie
// Arbeitskarte/Forum/Kurs-Kernpfad (Overrides in v2-system.css, Markup
// unverändert). AP5 Flip 6 (2026-07-03).
import '../v2/v2-system.css';

export default function ThiLayout({ children }) {
  return <div className="v2-scope">{children}</div>;
}
