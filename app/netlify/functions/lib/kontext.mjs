import { bestSectionForRoute, extractSnippet } from './search-core.js';

// Den zitierten Abschnitt möglichst vollständig im Modelltext erhalten. Ein Artikelfenster
// kann die richtige Quelle finden und trotzdem deren entscheidenden Absatz
// abschneiden. Sichtbarkeit, Sprache und Route gelten auch für Abschnittstexte.
export function artikelKontext(artikel, sektionen, query, {
  limit = 6000, canViewInternal = false, anchor,
} = {}) {
  const budget = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 6000;
  if (!budget || !artikel || (!canViewInternal && artikel.visibility === 'internal')) return '';
  const voll = String(artikel.body || artikel.excerpt || '');
  const fenster = extractSnippet(voll, query, budget).slice(0, budget);
  const sichtbar = (sektionen || []).filter((s) =>
    s.route === artikel.route && s.lang === artikel.lang &&
    (canViewInternal || s.visibility !== 'internal'));
  const passend = anchor === undefined
    ? bestSectionForRoute(sichtbar, artikel.route, query, artikel.lang)
    : { anchor };
  const abschnitt = sichtbar.find((s) => s.anchor === passend?.anchor);
  const beleg = String(abschnitt?.body || '').trim();
  if (!beleg) return fenster;

  // Umgangssprachliche Fragen können zwei Abläufe berühren (z. B. Finger
  // registrieren vs. ohne Master zurücksetzen). Einen zweiten passenden
  // Abschnitt ebenfalls erhalten, sofern er vollständig ins Budget passt.
  const weitere = sichtbar.filter((s) => s.anchor && s.anchor !== abschnitt.anchor);
  const zweiterTreffer = bestSectionForRoute(weitere, artikel.route, query, artikel.lang);
  const zweiter = weitere.find((s) => s.anchor === zweiterTreffer?.anchor);
  const abschnittText = (s) => `${String(s.headingPath || s.heading || '').trim()}\n${String(s.body || '').trim()}`.trim();
  const ersterText = abschnittText(abschnitt);
  // Einen zu langen Abschnitt nicht anstelle des bewährten Artikelfensters
  // nochmals beliebig beschneiden: dabei könnten Voraussetzungen aus einem
  // benachbarten Absatz verschwinden (CO-Sensor/Softwarestand).
  if (ersterText.length > budget) return fenster;
  const zweiterText = zweiter?.body ? abschnittText(zweiter) : '';
  const beidePassen = zweiterText && ersterText.length + zweiterText.length + 2 <= budget;
  if (fenster.includes(beleg) && (!beidePassen || fenster.includes(zweiter.body.trim()))) return fenster;

  // Den ausgewählten Beleg voranstellen, verbleibendes Budget als Kontext
  // nutzen. Das bisherige Zeichenlimit je Quelle wird nicht erhöht.
  const passage = beidePassen
    ? `${ersterText}\n\n${zweiterText}`
    : ersterText;
  const rest = budget - passage.length - 2;
  if (rest < 200) return passage;
  const umfeld = extractSnippet(voll, query, rest).slice(0, rest);
  return umfeld ? `${passage}\n\n${umfeld}` : passage;
}
