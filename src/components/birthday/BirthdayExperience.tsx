import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { FloatingHearts, Sparkles } from "./FloatingHearts";
import { CursorSparkles } from "./CursorSparkles";
import { CatchGiftGame, GiftBox } from "./CatchGiftGame";
import { MemoriesGallery } from "./MemoriesGallery";
import { MusicPlayer } from "./MusicPlayer.tsx";
import { CatMascot } from "./CatMascot";
import { useCatCompanion } from "@/hooks/useCatCompanion";
import {
  CakeIcon,
  SparkleIcon,
  GiftIcon,
  HeartIcon,
  HeartsIcon,
  CameraIcon,
  LetterIcon,
  PawPrintIcon,
  FlowerIcon,
} from "./EmojiIcons";
import type { SurpriseData } from "@/lib/types";
import {
  getHeroSubtitle,
  getCatDialogues,
  getFloatingNotes,
} from "@/lib/personalization";

/* ────────────────────────────────────────────────────────────── */
/*  Types                                                       */
/* ────────────────────────────────────────────────────────────── */

type Stage = "hero" | "game" | "reveal" | "letter";

/* ────────────────────────────────────────────────────────────── */
/*  Main orchestrator                                           */
/* ────────────────────────────────────────────────────────────── */

export function BirthdayExperience({ data }: { data: SurpriseData }) {
  const name = data.recipient_name;
  const dialogues = getCatDialogues(data.relationship);
  const heroSubtitle = getHeroSubtitle(data.relationship);

  const [stage, setStage] = useState<Stage>("hero");
  const [interacted, setInteracted] = useState(false);
  const catCompanion = useCatCompanion(data.cat_style);
  const letterRef = useRef<HTMLDivElement>(null);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 1500;
    const colors = ["#f9a8d4", "#c4b5fd", "#fde68a", "#fbcfe8", "#ffffff"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors,
      scalar: 1.1,
    });
  }, []);

  /* ── Stage transitions ── */
  const handleOpenSurprise = () => {
    setInteracted(true);
    setStage("game");
    catCompanion.triggerEvent("game_start");
    setTimeout(() => {
      document.getElementById("game")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGiftCaught = () => {
    setStage("reveal");
    catCompanion.triggerEvent("gift_caught");
    fireConfetti();
    setTimeout(() => {
      setStage("letter");
      catCompanion.triggerEvent("letter_reveal");
      setTimeout(() => {
        document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }, 2200);
  };

  const handleLetterComplete = useCallback(() => {
    catCompanion.setCustomMessage("affectionate", "I kept this message safe for you 💖");
    // Additional small confetti pop for hearts
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f9a8d4", "#fbcfe8", "#ffffff"],
      shapes: ["circle"],
      scalar: 0.8,
    });
  }, []);

  const handleReplay = () => {
    setStage("hero");
    catCompanion.triggerEvent("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGameStep = (step: number, total: number) => {
    if (step <= 3) catCompanion.triggerEvent("game_chase");
    else if (step < total) catCompanion.setCustomMessage("excited", "So close!! Just a tiny bit more ✨");
    else catCompanion.setCustomMessage("affectionate", "Okay okay… I think you deserve the surprise now 💕");
  };

  // Section-based mascot messages once the letter/gallery are visible
  useEffect(() => {
    if (stage !== "letter") return;
    const gallery = document.getElementById("memories");
    const final = document.getElementById("final");
    if (!gallery || !final) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (e.target.id === "final") catCompanion.triggerEvent("final_page");
        }
      },
      { threshold: 0.35 },
    );
    io.observe(gallery);
    io.observe(final);
    return () => io.disconnect();
  }, [stage, catCompanion]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" data-theme={data.theme}>
      <CursorSparkles />
      <MusicPlayer
        songUrl={data.song_url}
        songName={data.song_name}
        songType={data.song_type}
        shouldStart={interacted}
        onPlay={() => catCompanion.triggerEvent("music_play")}
      />
      <Balloons />
      <CatMascot mood={catCompanion.mood} message={catCompanion.message} catStyle={data.cat_style} />

      <AnimatePresence>
        <motion.div
          key="hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero name={name} subtitle={heroSubtitle} onOpen={handleOpenSurprise} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {stage !== "hero" && (
          <motion.div
            id="game"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {stage === "game" ? (
              <CatchGiftGame
                name={name}
                giftStyle={data.gift_style}
                onCaught={handleGiftCaught}
                onStep={(step, total) => handleGameStep(step, total)}
              />
            ) : (
              <RevealSection />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === "reveal" || stage === "letter") && (
          <motion.div
            id="letter"
            ref={letterRef}
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.3 }}
          >
            <LetterSection name={name} message={data.message} onComplete={handleLetterComplete} />
            <ScrollPrompt />
            <div id="memories">
              <MemoriesGallery
                photos={data.photos}
                relationship={data.relationship}
                onPhotoView={() => catCompanion.triggerEvent("photo_reveal")}
              />
            </div>
            <div id="final">
              <FinalSection name={name} onReplay={handleReplay} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Hero                                                        */
/* ────────────────────────────────────────────────────────────── */

function Hero({ name, subtitle, onOpen }: { name: string; subtitle: string; onOpen: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.06 340), oklch(0.9 0.08 300), oklch(0.95 0.05 45), oklch(0.92 0.07 20))",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      <FloatingHearts count={16} />
      <Sparkles count={30} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-script text-xl md:text-2xl text-primary/70 mb-2"
        >
          For Someone Very Special
        </motion.p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight">
          <span className="text-gradient">Happy Birthday,</span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="italic inline-block text-gradient pb-2"
          >
            {name}
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="inline-block align-middle"
          >
            <CakeIcon size={48} className="md:hidden" />
            <CakeIcon size={72} className="hidden md:inline-block" />
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-base md:text-lg text-foreground/60 font-script"
        >
          {subtitle}
        </motion.p>

        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.06, boxShadow: "0 20px 60px -10px oklch(0.72 0.18 340 / 0.6)" }}
          whileTap={{ scale: 0.97 }}
          className="btn-gift mt-10 rounded-full px-10 py-4 text-lg font-semibold tracking-wide animate-soft-glow flex items-center justify-center gap-2 mx-auto"
        >
          <GiftIcon size={22} /> Open Surprise
        </motion.button>
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
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Reveal                                                      */
/* ────────────────────────────────────────────────────────────── */

function RevealSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <FloatingHearts count={22} />
      <Sparkles count={40} />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.2, 1], opacity: 1 }}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0.9, scale: 0.5 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.95 0.1 80 / 0.9), oklch(0.85 0.14 340 / 0.4) 40%, transparent 70%)",
            width: 200,
            height: 200,
            left: -30,
            top: -30,
          }}
        />
        <GiftBox opened bouncing />
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Letter                                                      */
/* ────────────────────────────────────────────────────────────── */

function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
        onComplete();
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div className="whitespace-pre-wrap font-body text-[18px] md:text-[20px] text-[#6F5B79] font-medium leading-[1.9] tracking-[0.015em] max-w-[680px] mx-auto text-center min-h-[120px] [text-shadow:0_1px_3px_rgba(0,0,0,0.05)]">
      {displayedText}
      {isTyping && (
        <span className="animate-blink inline-block w-1.5 h-5 ml-1 bg-primary/70 align-middle rounded-full"></span>
      )}
    </div>
  );
}

function LetterSection({
  name,
  message,
  onComplete,
}: {
  name: string;
  message: string;
  onComplete: () => void;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
      <FloatingHearts count={12} />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Floating decorations around the bubble */}
        <motion.div
          className="absolute -top-10 -left-6 text-primary/40 animate-sway"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: -10 }}
          transition={{ delay: 1 }}
        >
          <FlowerIcon size={48} />
        </motion.div>
        <motion.div
          className="absolute -bottom-8 -right-4 text-primary/30 animate-gentle-bounce"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <PawPrintIcon size={40} />
        </motion.div>
        <motion.div className="absolute top-1/4 -right-8 text-gold/60 animate-sparkle">
          <SparkleIcon size={32} />
        </motion.div>
        <motion.div className="absolute bottom-1/4 -left-10 text-lavender/50 animate-float-heart">
          <HeartIcon size={36} />
        </motion.div>

        {/* The Comic Bubble */}
        <div className="comic-bubble p-6 md:p-14">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border-2 border-border px-5 py-1.5 rounded-full text-sm text-primary font-medium flex items-center gap-1.5 shadow-sm">
            <LetterIcon size={18} /> Special Note
          </div>

          <h2 className="font-script text-3xl sm:text-4xl md:text-6xl text-center text-gradient mb-8 mt-2 flex items-center justify-center gap-3">
            To {name} <HeartsIcon size={32} className="text-primary/60" />
          </h2>

          <TypewriterText text={message} onComplete={onComplete} />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            <FlowerIcon size={24} className="text-primary/40" />
            <PawPrintIcon size={20} className="text-primary/40" />
            <SparkleIcon size={26} className="text-primary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Scroll Prompt                                               */
/* ────────────────────────────────────────────────────────────── */

function ScrollPrompt() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-primary/70">
      <p className="font-script text-xl mb-2 flex items-center gap-1.5">
        Scroll down to relive some beautiful memories <CameraIcon size={22} />
      </p>
      <div className="animate-gentle-bounce">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Final                                                       */
/* ────────────────────────────────────────────────────────────── */

function FinalSection({ name, onReplay }: { name: string; onReplay: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <FloatingHearts count={18} />
      <Sparkles count={30} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-6">
          Thank you for being part of so many beautiful memories.
          <br />
          Wishing you endless smiles, happiness and love.
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-gradient mb-10 flex items-center justify-center gap-2 flex-wrap">
          Happy Birthday, <span className="italic">{name}</span>
          <CakeIcon size={40} className="md:hidden" />
          <CakeIcon size={56} className="hidden md:inline-block" />
          <HeartIcon size={36} className="md:hidden" />
          <HeartIcon size={50} className="hidden md:inline-block" />
        </h2>
        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="btn-gift rounded-full px-10 py-4 text-lg font-semibold tracking-wide animate-soft-glow flex items-center justify-center gap-2 mx-auto"
        >
          <GiftIcon size={22} /> Replay Surprise
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Balloons (background decoration)                            */
/* ────────────────────────────────────────────────────────────── */

function Balloons() {
  const balloons = [
    { left: "8%", color: "oklch(0.82 0.13 350)", delay: 0 },
    { left: "24%", color: "oklch(0.82 0.11 300)", delay: 1.4 },
    { left: "72%", color: "oklch(0.86 0.1 45)", delay: 0.6 },
    { left: "88%", color: "oklch(0.82 0.13 320)", delay: 2.2 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh" }}
          animate={{ y: "-30vh" }}
          transition={{
            duration: 28,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{ left: b.left, opacity: 0.35 }}
        >
          <div
            className="rounded-full"
            style={{
              width: 42,
              height: 52,
              background: `radial-gradient(circle at 30% 30%, white, ${b.color})`,
              boxShadow: "inset -6px -8px 20px rgba(0,0,0,0.08)",
            }}
          />
          <div
            className="mx-auto"
            style={{ width: 1, height: 60, background: "oklch(0.7 0.05 340 / 0.4)" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
