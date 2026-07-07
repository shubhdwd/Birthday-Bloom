# Birthday Bloom - AI Agent Rules & Guidelines

This document outlines the core technical guidelines, aesthetic principles, and rules you must follow when contributing to **Birthday Bloom**.

## 1. Tech Stack & Architecture
- **Frameworks**: React 19, TanStack Start (routing), and TypeScript.
- **Styling**: Tailwind CSS v4, alongside highly curated custom CSS variables for theme support (`data-theme` in `styles.css`).
- **Animations**: Framer Motion for layout transitions, micro-interactions, and complex state changes. `canvas-confetti` for celebratory effects.
- **Backend & Database**: Supabase (PostgreSQL, Storage, and Edge Functions).

## 2. Core Development Rules
- **Strict TypeScript**: Never use implicit `any`. Always properly type component props, function returns, and API responses. 
- **Functional Components**: Use modern React functional components and hooks. Avoid class components entirely.
- **Responsive by Default**: Assume that recipients will almost always open surprises on their mobile phones. Use Tailwind breakpoints (`sm:`, `md:`) intelligently and ensure masonry grids and animations scale elegantly.
- **Clean File Structure**: Keep components modular. Separate purely decorative or highly complex SVG animations (like `CatMascot.tsx`) into their own files.

## 3. Aesthetics & User Experience (CRITICAL)
- **Visual Excellence**: This project must feel *magical* and extremely premium. Never settle for generic or blocky UI designs. Use glassmorphism (`glass-card`), soft gradients, and delicate drop shadows.
- **Themes**: Respect the theming engine. Do not hardcode raw colors like `#FF0000`. Use Tailwind utilities paired with the `data-theme` variables (e.g. `bg-primary/10`, `text-gradient`).
- **Immersive recipient experience**: Do not clutter the `BirthdayExperience` page with technical UI. Keep it focused on the animations, the music, and the memories. No admin controls, no expiration warnings, and no creator configurations should be visible to the final recipient.

## 4. Privacy & Data Handling
- **Automated Lifecycle**: Supabase manages storage deletion and data cleanup via Edge Functions (`cleanup-expired`). Never implement manual deletion UI for the recipient or the creator. Let the system handle expiration.
- **Secure Handling**: File uploads (Photos & Songs) are sent securely to Supabase Storage. Ensure public URLs are fetched responsibly and tied strictly to the database records.
