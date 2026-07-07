-- ────────────────────────────────────────────────────────────
--  Birthday Bloom — Supabase schema
--  Run this in your Supabase SQL Editor to set up the database.
-- ────────────────────────────────────────────────────────────

-- 1. Create the surprises table
CREATE TABLE IF NOT EXISTS surprises (
  id             TEXT PRIMARY KEY,
  recipient_name TEXT NOT NULL,
  message        TEXT NOT NULL,
  relationship   TEXT NOT NULL DEFAULT 'friend',
  recipient_gender TEXT NOT NULL DEFAULT 'neutral',
  theme          TEXT NOT NULL DEFAULT 'pink-lavender',
  gift_style     TEXT NOT NULL DEFAULT 'classic',
  cat_style      TEXT NOT NULL DEFAULT 'default',
  song_url       TEXT,
  song_name      TEXT,
  song_type      TEXT,                -- 'upload' | 'spotify' | 'youtube' | null
  photos         JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at     TIMESTAMPTZ,
  auto_delete_enabled BOOLEAN DEFAULT TRUE,
  deletion_period INTEGER
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE surprises ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to read surprises (recipients need public access)
CREATE POLICY "Anyone can read surprises"
  ON surprises FOR SELECT
  USING (true);

-- 4. Allow anyone to insert surprises (creators don't need auth)
CREATE POLICY "Anyone can create surprises"
  ON surprises FOR INSERT
  WITH CHECK (true);

-- ────────────────────────────────────────────────────────────
--  STORAGE SETUP (do this in the Supabase Dashboard):
--
--  1. Create bucket "photos" → public access
--  2. Create bucket "songs"  → public access
--
--  Or run these if you have the storage admin API:
-- ────────────────────────────────────────────────────────────
-- INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('songs', 'songs', true);

-- ────────────────────────────────────────────────────────────
--  AUTOMATIC CLEANUP SYSTEM
--
--  1. Enable the pg_cron extension:
--     CREATE EXTENSION IF NOT EXISTS pg_cron;
--
--  2. Enable the pg_net extension (required to call edge functions):
--     CREATE EXTENSION IF NOT EXISTS pg_net;
--
--  3. Create the cron job to call the cleanup-expired edge function every day at 03:00 UTC:
--     SELECT cron.schedule(
--       'birthdaybloom-cleanup',
--       '0 3 * * *',
--       $$
--       SELECT net.http_post(
--           url:='https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/cleanup-expired',
--           headers:='{"Authorization": "Bearer <YOUR_ANON_KEY>"}'::jsonb
--       )
--       $$
--     );
-- ────────────────────────────────────────────────────────────
