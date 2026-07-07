import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CatMessage } from "./CatMessage";
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
            <GiftBox opened={false} bouncing={catchable} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export function GiftBox({ opened, bouncing }: { opened: boolean; bouncing?: boolean }) {
  return (
    <motion.div
      animate={bouncing ? { y: [0, -8, 0] } : {}}
      transition={bouncing ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : {}}
      className="relative"
      style={{ width: 140, height: 140 }}
    >
      {/* box body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-2xl shadow-xl"
        style={{
          width: 130,
          height: 90,
          background: "linear-gradient(180deg, oklch(0.82 0.14 350), oklch(0.72 0.16 340))",
        }}
      />
      {/* vertical ribbon */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md"
        style={{
          width: 20,
          height: 90,
          background: "linear-gradient(180deg, oklch(0.95 0.1 85), oklch(0.85 0.14 60))",
        }}
      />
      {/* lid */}
      <motion.div
        initial={{ x: "-50%" }}
        animate={opened ? { y: -60, rotate: -12, opacity: 0.9, x: "-50%" } : { y: 0, x: "-50%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute rounded-xl shadow-lg"
        style={{
          width: 150,
          height: 32,
          bottom: 82,
          left: "50%",
          background: "linear-gradient(180deg, oklch(0.86 0.14 345), oklch(0.78 0.16 340))",
        }}
      >
        {/* horizontal ribbon */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full rounded-sm"
          style={{
            width: 20,
            background: "linear-gradient(180deg, oklch(0.95 0.1 85), oklch(0.85 0.14 60))",
          }}
        />
        {/* bow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-6 h-6 w-14 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, oklch(0.9 0.14 70), transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.9 0.14 70), transparent 60%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
