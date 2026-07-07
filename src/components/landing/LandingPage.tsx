import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { FloatingHearts, Sparkles } from "@/components/birthday/FloatingHearts";
import {
  SparkleIcon,
  CakeIcon,
  GiftIcon,
  HeartIcon,
  CameraIcon,
} from "@/components/birthday/EmojiIcons";

const FEATURES = [
  {
    icon: <SparkleIcon size={36} />,
    title: "Personalized Messages",
    desc: "Write heartfelt birthday wishes that truly matter",
  },
  {
    icon: <CameraIcon size={36} />,
    title: "Custom Memories",
    desc: "Upload and arrange cherished photos as a scrapbook",
  },
  {
    icon: <MusicNote />,
    title: "Favorite Songs",
    desc: "Add their favorite music to the experience",
  },
  {
    icon: <GiftIcon size={36} />,
    title: "Interactive Gift",
    desc: "A playful gift-chase mini game before the surprise",
  },
  {
    icon: <CatFace />,
    title: "Cute Companion",
    desc: "An adorable cat mascot guides the entire journey",
  },
  {
    icon: <HeartIcon size={36} />,
    title: "Memory Scrapbook",
    desc: "Photos displayed as a beautiful keepsake scrapbook",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Create",
    desc: "Fill in the details — name, message, photos, music, and style",
  },
  {
    num: "2",
    title: "Share",
    desc: "Get a unique link and send it to someone special",
  },
  {
    num: "3",
    title: "Surprise!",
    desc: "They open the link and experience the magic",
  },
];

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.94 0.06 340), oklch(0.9 0.08 300), oklch(0.95 0.05 45), oklch(0.92 0.07 20))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
        <FloatingHearts count={12} />
        <Sparkles count={20} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 mb-6"
          >
            <img src="/logotn.png" alt="Birthday Bloom Logo" className="w-32 md:w-40 drop-shadow-md" />
            <div className="flex items-center justify-center gap-2">
              <span className="font-display text-xl md:text-2xl text-primary/80 tracking-wide">Birthday Bloom</span>
            </div>
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-gradient mb-6">
            Create unforgettable digital birthday surprises
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto"
          >
            Turn memories, photos, music and heartfelt messages into magical experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/create"
              className="btn-gift rounded-full px-8 sm:px-10 py-4 text-lg font-semibold tracking-wide animate-soft-glow flex items-center justify-center gap-2"
            >
              <SparkleIcon size={20} /> Create Surprise
            </Link>
            <Link
              to="/demo"
              className="glass-card rounded-full px-8 sm:px-10 py-4 text-lg font-semibold tracking-wide text-primary hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <GiftIcon size={20} /> View Demo
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 animate-gentle-bounce"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="relative px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-display text-3xl md:text-5xl text-gradient mb-16"
        >
          Everything you need to create magic
        </motion.h2>

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass-card rounded-3xl p-8 text-center"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="font-display text-xl text-foreground/90 mb-2">{f.title}</h3>
              <p className="text-sm text-foreground/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative px-6 py-24 overflow-hidden">
        <FloatingHearts count={6} />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-display text-3xl md:text-5xl text-gradient mb-16"
        >
          How it works
        </motion.h2>

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-display text-3xl text-primary">
                {s.num}
              </div>
              <h3 className="font-display text-2xl text-foreground/90 mb-2">{s.title}</h3>
              <p className="text-foreground/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <Sparkles count={15} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-5xl text-gradient mb-6">
            Ready to create something magical?
          </h2>
          <p className="text-foreground/60 mb-10 text-lg">
            It only takes a few minutes to craft a surprise they'll never forget.
          </p>
          <Link
            to="/create"
            className="btn-gift inline-flex items-center justify-center gap-2 rounded-full px-8 sm:px-12 py-4 text-lg font-semibold tracking-wide animate-soft-glow"
          >
            <SparkleIcon size={20} /> Get Started
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-10 text-center text-sm text-foreground/40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CakeIcon size={18} />
          <span className="font-display text-base">Birthday Bloom</span>
        </div>
        <p>Made with love, sparkles, and a tiny cat 🐱</p>
      </footer>
    </div>
  );
}

/* ── Inline icons not in EmojiIcons ── */

function MusicNote() {
  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" className="inline-icon">
      <path
        d="M24 48V18l28-6v28"
        stroke="oklch(0.72 0.15 300)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="18" cy="48" r="8" fill="oklch(0.82 0.12 320)" />
      <circle cx="46" cy="40" r="8" fill="oklch(0.78 0.14 340)" />
    </svg>
  );
}

function CatFace() {
  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" className="inline-icon">
      <ellipse cx="32" cy="38" rx="22" ry="20" fill="oklch(0.93 0.05 340)" />
      <path d="M12 30 L8 12 L24 24Z" fill="oklch(0.90 0.07 340)" />
      <path d="M52 30 L56 12 L40 24Z" fill="oklch(0.90 0.07 340)" />
      <circle cx="24" cy="36" r="3" fill="oklch(0.3 0.05 340)" />
      <circle cx="40" cy="36" r="3" fill="oklch(0.3 0.05 340)" />
      <ellipse cx="32" cy="42" rx="3" ry="2" fill="oklch(0.82 0.13 350)" />
      <path d="M29 44 Q32 48 35 44" stroke="oklch(0.5 0.05 340)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
