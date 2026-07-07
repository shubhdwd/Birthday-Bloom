<div align="center">
  <img src="public/logotn.png" alt="Birthday Bloom Logo" width="120" />
  <h1>🎂✨ Birthday Bloom</h1>
  <p><strong>A magical, frictionless platform for creating personalized digital birthday surprises.</strong></p>
</div>

<br />

Birthday Bloom allows you to craft premium, handcrafted digital birthday experiences for your loved ones in minutes. There are no logins, no PINs, and no barriers—just an immersive, animated surprise that works flawlessly on any device.

## ✨ Features

### 🪄 For Creators (The Wizard)
- **Seamless Wizard:** A beautiful multi-step flow to customize every detail.
- **Personalized Setup:** Choose relationships and themes (e.g., Midnight Purple, Pastel Pink & Lavender).
- **Memory Scrapbook:** Upload up to 20 photos with custom captions, arranged in a stunning masonry layout.
- **Custom Soundtrack:** Upload an MP3, or embed a Spotify/YouTube link for background music.
- **Privacy First:** Surprises automatically self-destruct and delete all media after a selected time (7, 30, or 90 days).
- **Live Preview:** See exactly what the recipient will experience before generating the shareable link.

### 🎁 For Recipients (The Experience)
- **Dynamic Previews:** Sharing the link on iMessage or WhatsApp generates a personalized "A Birthday Surprise for [Name]! 🎂✨" preview.
- **Magical Mini-Game:** Try to "catch" a bouncing gift box while a responsive Cat Mascot teases and cheers you on.
- **Immersive Reveal:** Physics-based confetti transitions into a heartfelt birthday letter.
- **Interactive Gallery:** Full-screen expanding photos with a gorgeous, soft aesthetic.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TanStack Start (SSR & Routing)
- **Styling:** Custom CSS + Tailwind CSS v4 (Oklch Colors, Glassmorphism)
- **Animations:** Framer Motion + `canvas-confetti`
- **Backend & Storage:** Supabase (PostgreSQL, Storage, Edge Functions)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shubhdwd/Birthday-Bloom.git
cd Birthday-Bloom
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Setup (Supabase)
Create a new project on [Supabase](https://supabase.com/).
1. Go to the **SQL Editor** and paste/run the contents of `supabase-schema.sql`.
2. Go to **Storage** and create two public buckets: `photos` and `songs`.

### 4. Environment Variables
Create a `.env` file in the root of the project:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run locally
```bash
npm run dev
```
Visit `http://localhost:3000` to see the app!

---

## ☁️ Deployment

Birthday Bloom is built with TanStack Start, making it incredibly easy to deploy to platforms like **Vercel** or **Netlify**. 
Simply connect your GitHub repository to your hosting provider, set your environment variables, and deploy!

<br />

<div align="center">
  <sub>Built with ❤️ to make birthdays a little more magical.</sub>
</div>
