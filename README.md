# Great Moving Train Social Club International — Website

Premium production-ready website for the **Great Moving Train Social Club International** (GMTSCI).

Built with: Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase · Framer Motion

---

## Quick Start — Demo Mode

The site runs without Supabase credentials, using local mock data.

```bash
cd gmtsc-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Production Setup

### 1. Add the Logo

Place the official club logo at `public/images/logo.png`.

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL Editor.
3. Create storage buckets: `gallery` (public), `avatars` (private).

### 3. Environment Variables

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4. Deploy

```bash
npm run build
npx vercel --prod
```

---

## Global Configuration

All site-wide settings are in **`lib/config.ts`** — club name, motto, contacts, colours, social links. Change once, updates everywhere.

---

## Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/about` | About the Club |
| `/history` | Club History |
| `/leadership` | Leadership |
| `/members` | Member Directory |
| `/members/[slug]` | Member Profile |
| `/achievements` | Achievements |
| `/gallery` | Gallery |
| `/gallery/[slug]` | Album |
| `/why-join` | Why Join |
| `/membership` | Application Form |
| `/contact` | Contact |
| `/login` | Member Login |
| `/dashboard` | Member Dashboard |
| `/dashboard/photos` | Photo Upload |
| `/admin` | Admin Dashboard |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |

---

## Design

**Fonts:** Cinzel · Manrope · Space Grotesk  
**Palette:** Navy `#050A18` · Gold `#D5A53B` · Champagne `#F2D28C` · Cyan `#00C8FF`

---

## Data Policy

Only facts explicitly documented in club records appear in mock data. No biographies, occupations, or financial figures have been invented. All incomplete profiles display "Profile details will be added soon."

---

*"The Moving Train Never Stops Moving Forward."*
