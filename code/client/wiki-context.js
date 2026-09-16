"use client";

/**
 * Wiki context providers — bundle wiki JSON resources and derive role helpers
 * from the existing `Auth` system so wiki pages don't fetch data over and over.
 *
 * - WikiDataProvider loads wiki-data, search-index, audit-report, glossary,
 *   and wiki-sources once on mount and caches them in React state.
 * - WikiRoleProvider derives canEdit / canViewInternal etc. from Auth roles
 *   (admin → canEdit + canAdmin, trainer → canViewInternal, learner → dealer).
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './auth';

const WikiDataContext = createContext(null);
const WikiRoleContext = createContext(null);

// wiki-index.json (slim) statt wiki-data.json (full) — Artikel-Body wird per
// useArticleBody pro Aufruf lazy nachgeladen. Editor-Sources liegen seit Mai
// 2026 ebenfalls pro Artikel unter /wiki-sources/{lang}/{slug}.json und werden
// via useWikiSource(route) erst beim Editor-Open gefetched.
// Seit Issue #17 kommt ALLES (inkl. Glossar) über den gegateten Bootstrap —
// es gibt keine öffentlichen Wiki-JSONs in public/ mehr (anon → 401).
const RESOURCES = [
  { key: 'bootstrap', url: '/api/wiki/bootstrap', critical: true },
];

// Fetch mit Retry und Exponential Backoff. Im Dev-Modus (Turbopack) können
// Static-File-Requests parallel zur Route-Kompilierung abgebrochen werden,
// was als TypeError("Failed to fetch") zurückkommt. Drei Retries mit jeweils
// 300/700/1500 ms decken diese Race ab, ohne den User echte Netzwerkfehler
// 5 s lang verbergen zu lassen.
function authHeaders(accessToken) {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function fetchWithRetry(url, { retries = 3, baseDelayMs = 300, signal, accessToken } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (signal?.aborted) throw new Error('aborted');
    try {
      const res = await fetch(url, { signal, headers: authHeaders(accessToken), cache: 'no-store' });
      if (!res.ok) throw new Error(`${url} responded ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      if (signal?.aborted) throw err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, baseDelayMs * Math.pow(2, attempt)));
      }
    }
  }
  throw lastErr;
}

export function WikiDataProvider({ children }) {
  const { currentUser, Auth } = useAuth();
  const [data, setData] = useState(null);
  const [searchIndex, setSearchIndex] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(null);
  const [auditReport, setAuditReport] = useState(null);
  const [glossary, setGlossary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const accessToken = Auth.getAccessToken?.() || null;
    // Issue #17: Ohne Login liefert die Wiki-API nur 401 — gar nicht erst
    // anfragen (vermeidet Retry-Rauschen auf /login und /register). Im
    // Demo-Modus (--local-auth) gibt es keine Tokens, dort lädt der Server frei.
    const IS_LOCAL_MODE = (process.env.NEXT_PUBLIC_AUTH_MODE || '').toLowerCase() === 'local';
    if (!accessToken && !IS_LOCAL_MODE) {
      queueMicrotask(() => {
        setData(null);
        setSearchIndex(null);
        setSectionIndex(null);
        setAuditReport(null);
        setGlossary(null);
        setErrors({});
        setLoading(false);
      });
      return undefined;
    }
    queueMicrotask(() => setLoading(true));
    const controller = new AbortController();
    Promise.allSettled(
      RESOURCES.map((r) => fetchWithRetry(r.url, { signal: controller.signal, accessToken })),
    ).then((results) => {
      if (controller.signal.aborted) return;
      const nextErrors = {};
      results.forEach((result, i) => {
        const { key, critical } = RESOURCES[i];
        if (result.status === 'fulfilled') {
          if (key === 'bootstrap') {
            setData(result.value?.data || null);
            setSearchIndex(result.value?.searchIndex || null);
            setSectionIndex(result.value?.sectionIndex || null);
            setAuditReport(result.value?.auditReport || null);
            setGlossary(result.value?.glossary || null);
          }
        } else {
          nextErrors[key] = result.reason?.message || String(result.reason);
          const level = critical ? 'error' : 'warn';
          console[level](`[WikiData] Failed to load ${key} (after retries):`, result.reason);
        }
      });
      setErrors(nextErrors);
      setLoading(false);
    });
    return () => { controller.abort(); };
  }, [Auth, currentUser?.id, currentUser?.role, currentUser?._accessToken]);

  return (
    <WikiDataContext.Provider value={{ data, searchIndex, sectionIndex, auditReport, glossary, loading, errors }}>
      {children}
    </WikiDataContext.Provider>
  );
}

export function useWikiData() {
  return useContext(WikiDataContext) || { data: null, searchIndex: null, sectionIndex: null, auditReport: null, glossary: null, loading: true, errors: {} };
}

export function useArticles(lang) {
  const { data } = useWikiData();
  if (!data) return [];
  return data.articles.filter((a) => a.lang === lang);
}

export function useArticle(lang, route) {
  const { data } = useWikiData();
  if (!data) return null;
  let article = data.articles.find((a) => a.route === route);
  if (!article && lang !== 'de') {
    const deRoute = route.replace(`/${lang}/`, '/de/').replace(`/${lang}`, '/de');
    article = data.articles.find((a) => a.route === deRoute);
    if (article) return { ...article, _fallback: true, _fallbackLang: 'de' };
  }
  return article;
}

// Cache für bereits geladene Artikel-Bodies. Lebt im Modul-Scope, damit
// Re-Mounts den gleichen Body nicht ein zweites Mal über die Leitung holen.
const ARTICLE_BODY_CACHE = new Map();

function articleBodyUrl(route) {
  const rel = route.startsWith('/') ? route.slice(1) : route;
  return `/api/wiki/article/${rel}`;
}

/**
 * Lazy-Loader für den Artikel-Body. Nimmt die Meta-Felder aus dem Index
 * (route, title, lang, visibility, primaryImage, …) und mergt sie mit dem
 * geladenen Body (html, dealerHtml, headings, sources, relatedLinks, …).
 *
 * Returns: { article: { ...meta, ...body } | null, loading, error }
 */
export function useArticleBody(articleMeta) {
  const { Auth } = useAuth();
  const accessToken = Auth.getAccessToken?.() || null;
  const [state, setState] = useState(() => {
    if (!articleMeta?.route) return { body: null, loading: false, error: null };
    if (ARTICLE_BODY_CACHE.has(articleMeta.route)) {
      return { body: ARTICLE_BODY_CACHE.get(articleMeta.route), loading: false, error: null };
    }
    return { body: null, loading: true, error: null };
  });

  useEffect(() => {
    if (!articleMeta?.route) return;
    if (ARTICLE_BODY_CACHE.has(articleMeta.route)) {
      queueMicrotask(() => setState({
        body: ARTICLE_BODY_CACHE.get(articleMeta.route),
        loading: false,
        error: null,
      }));
      return;
    }
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setState((prev) => ({ ...prev, loading: true, error: null }));
    });
    fetch(articleBodyUrl(articleMeta.route), { headers: authHeaders(accessToken), cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`${articleMeta.route} body responded ${res.status}`);
        return res.json();
      })
      .then((body) => {
        if (cancelled) return;
        ARTICLE_BODY_CACHE.set(articleMeta.route, body);
        setState({ body, loading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({ body: null, loading: false, error });
      });
    return () => { cancelled = true; };
  }, [articleMeta?.route, accessToken]);

  const article = useMemo(() => {
    if (!articleMeta) return null;
    if (!state.body) return articleMeta;
    return { ...articleMeta, ...state.body };
  }, [articleMeta, state.body]);

  return { article, loading: state.loading, error: state.error };
}

// ───────────────────────────────────────────────────────────────
// Editor-Source (Roh-Markdown) — pro Artikel lazy, modulweiter Cache.
// Wird nur vom Wiki-Editor benutzt; alle anderen Seiten kommen ohne aus.
// ───────────────────────────────────────────────────────────────
const SOURCE_CACHE = new Map();

function sourceUrlForRoute(route) {
  const rel = route.startsWith('/') ? route.slice(1) : route;
  return `/api/wiki/source/${rel}`;
}

/**
 * Lädt den Editor-Quellcode eines einzelnen Artikels.
 * Returns: { source: { frontmatter, body, path } | null, loading, error }
 */
export function useWikiSource(route) {
  const { Auth } = useAuth();
  const accessToken = Auth.getAccessToken?.() || null;
  const [state, setState] = useState(() => {
    if (!route) return { source: null, loading: false, error: null };
    if (SOURCE_CACHE.has(route)) return { source: SOURCE_CACHE.get(route), loading: false, error: null };
    return { source: null, loading: true, error: null };
  });

  useEffect(() => {
    if (!route) return;
    if (SOURCE_CACHE.has(route)) {
      queueMicrotask(() => setState({
        source: SOURCE_CACHE.get(route),
        loading: false,
        error: null,
      }));
      return;
    }
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setState((prev) => ({ ...prev, loading: true, error: null }));
    });
    fetch(sourceUrlForRoute(route), { headers: authHeaders(accessToken), cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`${route} source responded ${res.status}`);
        return res.json();
      })
      .then((source) => {
        if (cancelled) return;
        SOURCE_CACHE.set(route, source);
        setState({ source, loading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({ source: null, loading: false, error });
      });
    return () => { cancelled = true; };
  }, [route, accessToken]);

  return state;
}

/**
 * Lädt den Source-Index (Liste aller bearbeitbaren Artikel). Wird im
 * Editor-Landing einmalig geholt; ist klein (~100 KB).
 */
export function useWikiSourceIndex() {
  const { Auth } = useAuth();
  const accessToken = Auth.getAccessToken?.() || null;
  const [state, setState] = useState({ items: [], loading: true, error: null });

  useEffect(() => {
    const sourceIndexPromise = fetch('/api/wiki/source', { headers: authHeaders(accessToken), cache: 'no-store' })
      .then((res) => { if (!res.ok) throw new Error(`source index ${res.status}`); return res.json(); });
    let cancelled = false;
    sourceIndexPromise
      .then((items) => { if (!cancelled) setState({ items, loading: false, error: null }); })
      .catch((error) => { if (!cancelled) setState({ items: [], loading: false, error }); });
    return () => { cancelled = true; };
  }, [accessToken]);

  return state;
}

/**
 * Role mapping: Online's Auth has admin / trainer / learner.
 *   admin   → admin (full edit + audit + arbeitskarte)
 *   trainer → trainer (internal view + arbeitskarte + manage training)
 *   learner → dealer (read-only + dealer training)
 *
 * The "internal" role exists historically for the wiki-ml app; we map it from
 * admin/trainer so existing wiki UI checks keep working.
 */
export function WikiRoleProvider({ children }) {
  const { currentUser, Auth } = useAuth();
  const value = useMemo(() => {
    const isAdmin = Auth?.isAdmin?.() || false;
    const isTrainer = Auth?.isTrainer?.() || false;
    const role = isAdmin ? 'admin' : isTrainer ? 'trainer' : currentUser ? 'dealer' : 'guest';
    return {
      role,
      isAdmin,
      isTrainer,
      isDealer: !isAdmin && !isTrainer && !!currentUser,
      isInternal: isAdmin || isTrainer,
      canEdit: isAdmin,
      canAdmin: isAdmin,
      canViewInternal: isAdmin || isTrainer,
      canViewAudit: isAdmin || isTrainer,
      canUseEditor: isAdmin,
      canUseArbeitskarte: !!currentUser,
      canManageTraining: isAdmin || isTrainer,
      canViewDealer: !!currentUser,
      dealerMode: !(isAdmin || isTrainer),
    };
  }, [Auth, currentUser]);

  return <WikiRoleContext.Provider value={value}>{children}</WikiRoleContext.Provider>;
}

export function useWikiRole() {
  return useContext(WikiRoleContext) || { role: 'guest', isAdmin: false, isTrainer: false, isDealer: false, isInternal: false, canEdit: false, canAdmin: false, canViewInternal: false, canViewAudit: false, canUseEditor: false, canUseArbeitskarte: false, canManageTraining: false, canViewDealer: false, dealerMode: true };
}
