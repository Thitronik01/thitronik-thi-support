"use client";

/**
 * Reine Helper-Funktionen für Wiki-Daten — keine React-Hooks, kein Fetch,
 * kein Auth-Zugriff. Datenladung läuft über `WikiDataProvider`, Rollenchecks
 * über `useWikiRole()` aus `@/lib/wiki-context`.
 */
import { API } from '@/lib/store';

export const DEFAULT_WIKI_LANG = 'de';
export const WIKI_LANGS = ['de', 'en', 'fr', 'es', 'it', 'nl', 'da', 'sv', 'no', 'pl', 'cs'];

export function routeForArticle(lang, slugParts = []) {
  const safeLang = WIKI_LANGS.includes(lang) ? lang : DEFAULT_WIKI_LANG;
  const suffix = Array.isArray(slugParts) ? slugParts.join('/') : String(slugParts || '');
  return suffix ? `/${safeLang}/${suffix}` : `/${safeLang}`;
}

export function findArticle(data, route, lang = DEFAULT_WIKI_LANG) {
  if (!data?.articles) return null;
  let article = data.articles.find((item) => item.route === route);
  if (!article && lang !== DEFAULT_WIKI_LANG) {
    const fallbackRoute = route.replace(`/${lang}`, `/${DEFAULT_WIKI_LANG}`);
    article = data.articles.find((item) => item.route === fallbackRoute);
    if (article) return { ...article, _fallback: true, _fallbackLang: DEFAULT_WIKI_LANG };
  }
  return article || null;
}

export function getVisibleArticles(data, access, lang = DEFAULT_WIKI_LANG) {
  const articles = data?.articles || [];
  return articles.filter((article) => {
    if (article.lang !== lang) return false;
    if (article.visibility === 'internal' && !access.canViewInternal) return false;
    return true;
  });
}

// Such-/Retrieval-Kern lebt in `lib/search-core.js` (rein, node-testbar) —
// hier nur re-exportiert, damit bestehende Importe stabil bleiben.
export {
  normalizeSearch,
  searchWiki,
  searchSections,
  bestSectionForRoute,
  expandSearchQuery,
  buildRetrievalQuery,
  extractSnippet,
  findRelatedArticles,
  buildQuizRefIndex,
  matchQuizRefs,
  mergeCuratedHits,
  sourceMatchPercent,
} from './search-core';

export function getTrainingProgress(userId) {
  return API.getTrainingProgress?.(userId) || { modules: {} };
}

export function saveTrainingProgress(userId, progress) {
  API.saveTrainingProgress?.(userId, progress);
}

export function buildAssetUrl(relativePath) {
  if (!relativePath) return null;
  return `/assets/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}
