-- ============================================================================
-- THITRONIK Thi — Grundgerüst für Login, Rollen, Korrekturen, Audit, Zähler.
-- ----------------------------------------------------------------------------
-- Wird per Supabase-MCP (apply_migration) eingespielt. Alles im Schema
-- `thi`, damit im Dashboard auf einen Blick klar ist, was zu THI gehört.
--
-- Rollen: mitarbeiter | wissensmanager | admin
--   mitarbeiter    Fälle aufnehmen, Antworten lesen, Korrekturen einreichen
--   wissensmanager zusätzlich freigeben, zurückziehen, im-wiki, gewichten
--   admin          zusätzlich Nutzer einladen/sperren, Rollen setzen
--
-- Zugriff aus den Netlify Functions erfolgt mit dem Service-Key (serverseitig,
-- nie im Browser). Der Browser spricht nur mit Supabase Auth (Login) und mit
-- den Functions. Deshalb sind alle Tabellen mit RLS gesperrt: Kein Client
-- liest oder schreibt direkt — auch nicht mit dem Publishable Key.
-- ============================================================================

create schema if not exists thi;

-- ─── Profile: eine Zeile je Auth-Nutzer ─────────────────────────────────────
create table if not exists thi.profile (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null unique,
  name        text not null default '',
  rolle       text not null default 'mitarbeiter'
              check (rolle in ('mitarbeiter', 'wissensmanager', 'admin')),
  sprache     text not null default 'de' check (sprache in ('de', 'fr')),
  aktiv       boolean not null default true,
  erstellt    timestamptz not null default now(),
  geaendert   timestamptz not null default now()
);

-- Beim Anlegen eines Auth-Nutzers ein THI-Profil anlegen — aber NUR, wenn die
-- Einladung ausdrücklich für THI war (app_metadata.system = 'thi'). Das
-- Projekt wird mit dem Thitronik Campus geteilt; dessen Nutzer bekommen kein
-- THI-Profil und damit keinen Zugang zu THI.
create or replace function thi.profil_anlegen()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(new.raw_app_meta_data->>'system', '') <> 'thi' then
    return new;
  end if;
  insert into thi.profile (id, email, name, rolle, sprache)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_app_meta_data->>'rolle', 'mitarbeiter'),
    coalesce(new.raw_user_meta_data->>'sprache', 'de')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists thi_profil_anlegen on auth.users;
create trigger thi_profil_anlegen
  after insert on auth.users
  for each row execute function thi.profil_anlegen();

-- ─── Audit-Log: jede Freigabe, Rollenänderung, Sperre ───────────────────────
create table if not exists thi.audit (
  id          bigserial primary key,
  zeit        timestamptz not null default now(),
  wer         uuid references thi.profile(id) on delete set null,
  wer_email   text,
  aktion      text not null,           -- z. B. korrektur.freigeben, nutzer.rolle
  ziel        text,                    -- Korrektur-ID, Nutzer-ID, Route
  details     jsonb not null default '{}'::jsonb
);
create index if not exists audit_zeit on thi.audit (zeit desc);

-- ─── Korrekturen: ersetzt data/korrekturen.json ─────────────────────────────
-- Gleiches Schema wie bisher (lib/korrekturen.mjs), nur als Tabelle. Wirkt
-- damit sofort statt nach dem Deploy; die Historie liegt in thi.audit.
create table if not exists thi.korrektur (
  id                 text primary key,
  lang               text not null check (lang in ('de', 'fr')),
  titel              text not null,
  text               text not null,
  widerspricht       text not null default '',
  bezug_route        text not null,
  bezug_anchor       text not null default '',
  bezug_titel        text not null default '',
  autor_id           uuid references thi.profile(id) on delete set null,
  autor              text not null,
  status             text not null default 'ungeprueft'
                     check (status in ('ungeprueft','wartet-freigabe','freigegeben','zurueckgezogen','im-wiki')),
  sicherheitsrelevant boolean not null default false,
  sicherheitsgrund   text,
  freigegeben_von    text,
  freigegeben_am     timestamptz,
  begruendung        text,
  ausloeser          jsonb,
  erstellt           timestamptz not null default now(),
  geaendert          timestamptz not null default now()
);
create index if not exists korrektur_status on thi.korrektur (status);
create index if not exists korrektur_bezug on thi.korrektur (bezug_route);

-- ─── Quellengewichtung je Artikel (Wissensmanager) ──────────────────────────
create table if not exists thi.gewichtung (
  route       text primary key,          -- z. B. /de/wipro-iii
  faktor      numeric(4,2) not null default 1.00 check (faktor between 0.10 and 3.00),
  status      text not null default 'normal' check (status in ('normal','bevorzugt','veraltet')),
  notiz       text not null default '',
  gesetzt_von text,
  geaendert   timestamptz not null default now()
);

-- ─── Geteilte Zähler für Rate-Limit und Tageslimit ──────────────────────────
-- Ersetzt die In-Memory-Maps, die pro Function-Instanz zählten.
create table if not exists thi.zaehler (
  schluessel  text primary key,          -- ip:1.2.3.4 | tag:2026-09-17 | nutzer:<uuid>
  anzahl      integer not null default 0,
  bis         timestamptz not null
);
create index if not exists zaehler_bis on thi.zaehler (bis);

-- Atomar erhöhen; liefert den neuen Stand. Läuft das Fenster ab, beginnt es neu.
create or replace function thi.zaehlen(p_schluessel text, p_fenster_sekunden integer)
returns integer language plpgsql security definer set search_path = thi as $$
declare v_anzahl integer;
begin
  insert into thi.zaehler (schluessel, anzahl, bis)
  values (p_schluessel, 1, now() + make_interval(secs => p_fenster_sekunden))
  on conflict (schluessel) do update
    set anzahl = case when thi.zaehler.bis < now() then 1 else thi.zaehler.anzahl + 1 end,
        bis    = case when thi.zaehler.bis < now() then now() + make_interval(secs => p_fenster_sekunden) else thi.zaehler.bis end
  returning anzahl into v_anzahl;
  return v_anzahl;
end $$;

-- ─── Content-Lücken: Fälle mit niedriger Sicherheit (Signal fürs Wiki) ──────
create table if not exists thi.luecke (
  id          bigserial primary key,
  zeit        timestamptz not null default now(),
  sprache     text not null,
  frage       text not null,
  produkte    text[] not null default '{}',
  fahrzeug    text,
  sicherheit  integer,
  bester_score integer,
  nutzer_id   uuid references thi.profile(id) on delete set null
);

-- ─── RLS: alles dicht. Zugriff nur über die Functions mit Service-Key. ──────
alter table thi.profile    enable row level security;
alter table thi.audit      enable row level security;
alter table thi.korrektur  enable row level security;
alter table thi.gewichtung enable row level security;
alter table thi.zaehler    enable row level security;
alter table thi.luecke     enable row level security;

-- Einzige Ausnahme: Ein eingeloggter Nutzer darf sein EIGENES Profil lesen
-- (Name, Rolle für die Kopfzeile) — mehr nicht.
drop policy if exists eigenes_profil_lesen on thi.profile;
create policy eigenes_profil_lesen on thi.profile
  for select to authenticated using (id = auth.uid());

grant usage on schema thi to authenticated, service_role;
grant select on thi.profile to authenticated;
grant all on all tables in schema thi to service_role;
grant all on all sequences in schema thi to service_role;
grant execute on all functions in schema thi to service_role;
