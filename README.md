# VerseVibes 🎭

A cinematic, ultra-premium community platform for the [@vv_versevibes](https://youtube.com/@vv_versevibes) YouTube channel.

## Stack
- **Next.js 15** (App Router) + TypeScript
- **Supabase** — Auth, PostgreSQL, Realtime, RLS
- **Framer Motion** — buttery animations
- **Tailwind CSS v4** — design tokens
- **Deployed on Vercel**

## Features
- 🌍 **Global Chat Room** — real-time group chat for the whole community
- ✉️ **Letters** — send private chat requests to specific users or randomly
- 👥 **Members Directory** — browse the VerseVibes family
- 🔐 **Auth** — GitHub OAuth + Email/Password via Supabase
- ✨ **Cinematic UI** — particle starfield, glass morphism, gradient orbs, typing indicators

## Setup

### 1. Clone & Install
```bash
git clone https://github.com/ronimondal7304-oss/versevibes
cd versevibes
npm install
```

### 2. Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://eqfhyajifayjmexvkkld.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

### 3. Supabase
The database schema is already applied. Enable GitHub OAuth in:
`Supabase Dashboard → Authentication → Providers → GitHub`

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy to Vercel
```bash
npm i -g vercel
vercel
```
Then set the two env variables in Vercel dashboard.

## Live URL
Deploy to Vercel and your URL will be: `https://versevibes.vercel.app`
