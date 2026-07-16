-- ═══════════════════════════════════════════════════════════════════════════
-- Great Moving Train Social Club International — Supabase Schema
-- Run this file in the Supabase SQL Editor to create all tables.
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug              TEXT UNIQUE NOT NULL,
  full_name         TEXT NOT NULL,
  profile_image_url TEXT,
  biography         TEXT,
  personal_quote    TEXT,
  profession        TEXT,
  country           TEXT,
  city              TEXT,
  chapter           TEXT,
  membership_year   INTEGER,
  membership_status TEXT DEFAULT 'active' CHECK (membership_status IN ('active','former','probationary','archived')),
  public_visibility BOOLEAN DEFAULT TRUE,
  is_founder        BOOLEAN DEFAULT FALSE,
  is_pioneer        BOOLEAN DEFAULT FALSE,
  is_featured       BOOLEAN DEFAULT FALSE,
  data_status       TEXT DEFAULT 'awaiting_confirmation' CHECK (data_status IN ('verified','awaiting_confirmation','archived','private')),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEADERSHIP ROLES ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leadership_roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID REFERENCES profiles(id) ON DELETE CASCADE,
  position    TEXT NOT NULL,
  start_date  DATE,
  end_date    DATE,
  is_current  BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── GALLERY ALBUMS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_albums (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT,
  cover_image_url TEXT,
  event_date      DATE,
  location        TEXT,
  visibility      TEXT DEFAULT 'public' CHECK (visibility IN ('public','members')),
  is_featured     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── GALLERY IMAGES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id          UUID REFERENCES gallery_albums(id) ON DELETE SET NULL,
  uploaded_by       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  image_url         TEXT NOT NULL,
  thumbnail_url     TEXT,
  caption           TEXT,
  alt_text          TEXT,
  event_name        TEXT,
  location          TEXT,
  date_taken        DATE,
  category          TEXT,
  visibility        TEXT DEFAULT 'members' CHECK (visibility IN ('public','members')),
  moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending','approved','rejected','archived')),
  moderation_note   TEXT,
  is_featured       BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── EVENTS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  description      TEXT,
  start_date       TIMESTAMPTZ,
  end_date         TIMESTAMPTZ,
  location         TEXT,
  banner_image_url TEXT,
  registration_url TEXT,
  status           TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming','completed','cancelled')),
  visibility       TEXT DEFAULT 'public' CHECK (visibility IN ('public','members')),
  is_featured      BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── MEMBERSHIP APPLICATIONS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS membership_applications (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number     TEXT UNIQUE NOT NULL,
  full_name            TEXT NOT NULL,
  email                TEXT NOT NULL,
  phone                TEXT,
  whatsapp             TEXT,
  country              TEXT,
  city                 TEXT,
  nationality          TEXT,
  occupation           TEXT,
  referring_member     TEXT,
  reason_for_joining   TEXT,
  brotherhood_meaning  TEXT,
  proposed_contribution TEXT,
  application_status   TEXT DEFAULT 'pending' CHECK (application_status IN ('pending','under_review','accepted','rejected','on_hold')),
  admin_notes          TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ── ANNOUNCEMENTS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  body         TEXT NOT NULL,
  visibility   TEXT DEFAULT 'members' CHECK (visibility IN ('public','members')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── CONTACT MESSAGES ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  status     TEXT DEFAULT 'unread' CHECK (status IN ('unread','read','replied','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── AUDIT LOGS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  administrator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action           TEXT NOT NULL,
  entity_type      TEXT,
  entity_id        UUID,
  details          JSONB,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON profiles(slug);
CREATE INDEX IF NOT EXISTS idx_profiles_membership_status ON profiles(membership_status);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_album ON gallery_images(album_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_status ON gallery_images(moderation_status);
CREATE INDEX IF NOT EXISTS idx_gallery_images_uploaded_by ON gallery_images(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_leadership_roles_profile ON leadership_roles(profile_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON membership_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON audit_logs(administrator_id);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: public can read approved public profiles
CREATE POLICY "Public can read public profiles"
  ON profiles FOR SELECT
  USING (public_visibility = TRUE AND membership_status != 'archived');

-- Profiles: members can read all non-archived profiles
CREATE POLICY "Members can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (membership_status != 'archived');

-- Profiles: users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Gallery albums: public can see public albums
CREATE POLICY "Public can view public albums"
  ON gallery_albums FOR SELECT
  USING (visibility = 'public');

-- Gallery albums: members can see member albums
CREATE POLICY "Members can view member albums"
  ON gallery_albums FOR SELECT
  TO authenticated
  USING (TRUE);

-- Gallery images: public can see approved public images
CREATE POLICY "Public can view approved public images"
  ON gallery_images FOR SELECT
  USING (moderation_status = 'approved' AND visibility = 'public');

-- Gallery images: members can see approved images
CREATE POLICY "Members can view approved images"
  ON gallery_images FOR SELECT
  TO authenticated
  USING (moderation_status = 'approved');

-- Gallery images: uploaders can see their own uploads
CREATE POLICY "Uploaders can view their uploads"
  ON gallery_images FOR SELECT
  TO authenticated
  USING (uploaded_by IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Gallery images: members can insert
CREATE POLICY "Members can upload images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- Gallery images: uploaders can update own pending images
CREATE POLICY "Uploaders can edit own pending images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (
    moderation_status IN ('pending', 'rejected') AND
    uploaded_by IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Events: public can see public events
CREATE POLICY "Public can view public events"
  ON events FOR SELECT
  USING (visibility = 'public');

-- Announcements: public can see public announcements
CREATE POLICY "Public can view public announcements"
  ON announcements FOR SELECT
  USING (visibility = 'public');

-- Announcements: members can see member announcements
CREATE POLICY "Members can view member announcements"
  ON announcements FOR SELECT
  TO authenticated
  USING (TRUE);

-- Applications: applicants can insert (anonymous OK)
CREATE POLICY "Anyone can submit application"
  ON membership_applications FOR INSERT
  WITH CHECK (TRUE);

-- Contact: anyone can insert
CREATE POLICY "Anyone can submit contact"
  ON contact_messages FOR INSERT
  WITH CHECK (TRUE);

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED DATA — Named individuals from documented club records only
-- ═══════════════════════════════════════════════════════════════════════════

-- Seed pioneer gallery album
INSERT INTO gallery_albums (id, title, slug, description, visibility, is_featured)
VALUES
  (uuid_generate_v4(), 'First International Convention 2026', 'international-convention-2026', 'A historic milestone — the club''s first International Convention.', 'public', TRUE),
  (uuid_generate_v4(), 'Brotherhood Meetings', 'brotherhood-meetings', 'Regular gatherings that keep the Moving Train connected.', 'members', FALSE),
  (uuid_generate_v4(), 'Member Celebrations', 'member-celebrations', 'Birthdays, weddings, and milestone celebrations.', 'members', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- Seed first international convention event
INSERT INTO events (title, slug, description, start_date, status, visibility, is_featured)
VALUES (
  'First International Convention',
  'first-international-convention-2026',
  'The landmark first International Convention of the Great Moving Train Social Club International, bringing members together from across the globe.',
  '2026-01-01',
  'completed',
  'public',
  TRUE
) ON CONFLICT (slug) DO NOTHING;
