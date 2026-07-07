import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CatMessage } from "./CatMessage";
import { SparkleIcon, HeartIcon, ConfettiIcon } from "./EmojiIcons";
import type { GiftStyle } from "@/lib/types";

const MESSAGES = [
  "Hehe... not so fast 😝",
  "You almost had it 💕",
  "Try again!",
  "Still chasing me? 🤭",
  "You're really determined 🥺",
  "One more attempt ✨",
  "Patience looks good on you 🎀",
  "Okay okay... maybe now.",
  "Oops.",
  "Alright...",
  "THIS IS THE FINAL ONE.",
  "Okay, now I promise 💖",
];

export function CatchGiftGame({
  name,
  giftStyle = "classic",
  onCaught,
  onStep,
}: {
  name: string;
  giftStyle?: GiftStyle;
  onCaught: () => void;
  onStep?: (step: number, total: number) => void;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const catchable = step >= MESSAGES.length;

  const moveAway = useCallback(() => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const pad = 90;
    const maxX = rect.width / 2 - pad;
    const maxY = rect.height / 2 - pad;
    const nx = (Math.random() * 2 - 1) * maxX;
    const ny = (Math.random() * 2 - 1) * maxY;
    setPos({ x: nx, y: ny });
    setStep((s) => {
      const next = Math.min(s + 1, MESSAGES.length);
      setMsg(MESSAGES[Math.min(s, MESSAGES.length - 1)]);
      onStep?.(next, MESSAGES.length);
      return next;
    });
  }, [onStep]);

  useEffect(() => {
    if (catchable) return;
    const handler = (e: MouseEvent) => {
      const area = areaRef.current;
      if (!area) return;
      const rect = area.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 + pos.x;
      const cy = rect.top + rect.height / 2 + pos.y;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.hypot(dx, dy) < 110) moveAway();
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [pos, moveAway, catchable]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-6 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl text-gradient">Before your surprise...</h2>
        <p className="mt-3 text-lg text-foreground/70">
          Try catching this gift <span className="emoji">🤭</span>
        </p>
        <p className="mt-1 text-sm text-foreground/50 italic">Just click the box if you can.</p>
      </motion.div>

      <div ref={areaRef} className="relative w-full max-w-3xl h-[420px] md:h-[480px]">
        <AnimatePresence mode="wait">
          {msg && (
            <motion.div
              key={msg}
              initial={{ opacity: 0, y: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-2 -translate-x-1/2 glass-card px-5 py-2 rounded-full text-sm md:text-base font-medium text-primary whitespace-nowrap"
            >
              {msg && <CatMessage text={msg} />}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute left-1/2 top-1/2 flex h-0 w-0 items-center justify-center">
          <motion.button
            onClick={() => (catchable ? onCaught() : moveAway())}
            onMouseEnter={() => !catchable && moveAway()}
            onFocus={() => !catchable && moveAway()}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.9 }}
            whileHover={catchable ? { scale: 1.1 } : {}}
            whileTap={catchable ? { scale: 0.92 } : {}}
            className={catchable ? "cursor-pointer animate-soft-glow" : "cursor-default"}
            aria-label="Gift box"
          >
            <GiftBox opened={false} bouncing={catchable} giftStyle={giftStyle} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export function GiftBox({
  opened,
  bouncing,
  giftStyle = "classic",
}: {
  opened: boolean;
  bouncing?: boolean;
  giftStyle?: GiftStyle;
}) {
  const isCute = giftStyle === "cute-box";
  const isSparkle = giftStyle === "sparkle-box";
  const isRibbon = giftStyle === "ribbon";

  // Box body styling
  const boxRadius = isCute ? "24px" : "16px";
  const boxBg = isCute
    ? "linear-gradient(180deg, oklch(0.92 0.04 330), oklch(0.85 0.06 330))"
    : isSparkle
    ? "linear-gradient(180deg, oklch(0.8 0.1 270), oklch(0.65 0.15 280))"
    : "linear-gradient(180deg, oklch(0.82 0.14 350), oklch(0.72 0.16 340))";
    
  // Lid styling
  const lidRadius = isCute ? "16px" : "12px";
  const lidBg = isCute
    ? "linear-gradient(180deg, oklch(0.95 0.03 330), oklch(0.88 0.05 330))"
    : isSparkle
    ? "linear-gradient(180deg, oklch(0.85 0.08 270), oklch(0.7 0.12 280))"
    : "linear-gradient(180deg, oklch(0.86 0.14 345), oklch(0.78 0.16 340))";

  // Ribbon styling
  const ribbonWidth = isRibbon ? 36 : 20;
  const ribbonBg = isCute
    ? "linear-gradient(180deg, oklch(0.95 0.02 100), oklch(0.9 0.04 100))"
    : isSparkle
    ? "linear-gradient(180deg, oklch(0.98 0.1 80), oklch(0.9 0.15 70))"
    : "linear-gradient(180deg, oklch(0.95 0.1 85), oklch(0.85 0.14 60))";

  // Opening animation variant
  const lidAnimation = isSparkle 
    ? { y: -100, rotate: 180, scale: 0.8, opacity: 0, x: "-50%" } 
    : isRibbon
    ? { y: -50, rotate: -25, x: "-70%", opacity: 0.9 }
    : { y: -60, rotate: -12, opacity: 0.9, x: "-50%" };

  return (
    <motion.div
      animate={bouncing ? { y: [0, -10, 0] } : {}}
      transition={bouncing ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : {}}
      className="relative"
      style={{ width: 140, height: 140 }}
    >
      {/* Background glow for Sparkle box */}
      {isSparkle && !opened && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-[140px] h-[100px] blur-2xl"
          style={{ background: "oklch(0.7 0.15 280)" }}
        />
      )}

      {/* Floating particles */}
      {isCute && bouncing && (
        <motion.div
          animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-4 right-2 text-pink-400"
        >
          <HeartIcon size={24} />
        </motion.div>
      )}

      {isSparkle && bouncing && (
        <motion.div
          animate={{ rotate: 180, scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute -top-6 left-0 text-yellow-300"
        >
          <SparkleIcon size={32} />
        </motion.div>
      )}

      {/* box body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 shadow-xl"
        style={{
          width: 130,
          height: 90,
          borderRadius: boxRadius,
          background: boxBg,
          boxShadow: isSparkle ? "0 10px 30px -10px rgba(120,80,250,0.6)" : undefined,
        }}
      />
      {/* vertical ribbon */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md z-10"
        style={{
          width: ribbonWidth,
          height: 90,
          background: ribbonBg,
        }}
      />
      {/* Cute decorations */}
      {isCute && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-12 z-20">
          <HeartIcon size={16} className="text-white/60" />
          <HeartIcon size={16} className="text-white/60" />
        </div>
      )}
      
      {/* Sparkle decorations */}
      {isSparkle && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-16 z-20">
          <SparkleIcon size={14} className="text-white/80" />
          <SparkleIcon size={18} className="text-white/80" />
        </div>
      )}

      {/* lid */}
      <motion.div
        initial={{ x: "-50%" }}
        animate={opened ? lidAnimation : { y: 0, x: "-50%" }}
        transition={{ duration: isSparkle ? 0.8 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute shadow-lg z-30"
        style={{
          width: 150,
          height: 32,
          bottom: 82,
          left: "50%",
          borderRadius: lidRadius,
          background: lidBg,
        }}
      >
        {/* horizontal ribbon */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full rounded-sm"
          style={{
            width: ribbonWidth,
            background: ribbonBg,
          }}
        />
        
        {/* ribbon bow (changes significantly based on style) */}
        {!isRibbon ? (
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-6 h-6 w-14 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${isCute ? "oklch(0.95 0.02 100)" : isSparkle ? "oklch(0.98 0.1 80)" : "oklch(0.9 0.14 70)"}, transparent 60%), radial-gradient(circle at 70% 50%, ${isCute ? "oklch(0.95 0.02 100)" : isSparkle ? "oklch(0.98 0.1 80)" : "oklch(0.9 0.14 70)"}, transparent 60%)`,
            }}
          />
        ) : (
          <motion.div 
            animate={opened ? { scaleY: 0, opacity: 0 } : {}}
            className="absolute left-1/2 -translate-x-1/2 -top-12 h-12 w-28"
          >
            {/* Oversized bow for Ribbon style */}
            <div className="absolute left-0 top-2 h-10 w-16 rounded-full border-[8px] border-solid" style={{ borderColor: "oklch(0.95 0.1 85)" }} />
            <div className="absolute right-0 top-2 h-10 w-16 rounded-full border-[8px] border-solid" style={{ borderColor: "oklch(0.95 0.1 85)" }} />
            <div className="absolute left-1/2 -translate-x-1/2 top-4 h-6 w-8 rounded-full bg-white shadow-sm" />
            <div className="absolute left-4 top-10 h-16 w-6 rounded-b-full rotate-[20deg]" style={{ background: "oklch(0.9 0.1 85)" }} />
            <div className="absolute right-4 top-10 h-16 w-6 rounded-b-full -rotate-[20deg]" style={{ background: "oklch(0.9 0.1 85)" }} />
          </motion.div>
        )}
      </motion.div>

      {/* Confetti burst on sparkle open */}
      {isSparkle && opened && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-40"
        >
          <ConfettiIcon size={64} className="text-yellow-300" />
        </motion.div>
      )}
    </motion.div>
  );
}
