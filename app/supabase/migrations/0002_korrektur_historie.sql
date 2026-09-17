-- ============================================================================
-- THITRONIK Thi — Korrekturen: Historie und Freigeber-ID.
-- ----------------------------------------------------------------------------
-- Ergänzt thi.korrektur um die Felder, die der Git-Speicher bisher im JSON
-- trug. Die Function übernimmt beim ersten Lesen den Bestand aus
-- data/korrekturen.json automatisch in die Tabelle (Upsert je id).
-- ============================================================================

alter table thi.korrektur
  add column if not exists historie jsonb not null default '[]'::jsonb,
  add column if not exists freigegeben_von_id uuid references thi.profile(id) on delete set null;

-- Lücken: Index für die Auswertung nach Zeit.
create index if not exists luecke_zeit on thi.luecke (zeit desc);
