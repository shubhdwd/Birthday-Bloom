import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SparkleIcon, ConfettiIcon } from "./EmojiIcons";
import { CatMessage } from "./CatMessage";
import type { CatStyle } from "@/lib/types";

export type CatMood =
  | "happy"
  | "playful"
  | "adorable"
  | "surprised"
  | "excited"
  | "sleepy"
  | "emotional"
  | "celebrating"
  | "affectionate"
  | "waving";

export function CatMascot({
  mood = "happy",
  message,
  catStyle = "default",
}: {
  mood?: CatMood;
  message?: string;
  catStyle?: CatStyle;
}) {
  // blink loop
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      setTimeout(tick, 2400 + Math.random() * 2600);
    };
    const t = setTimeout(tick, 1200);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 flex items-end gap-2 md:bottom-6 md:left-6">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <CatSVG mood={mood} blink={blink} />
      </motion.div>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative mb-4 max-w-[240px] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm font-medium text-primary shadow-[0_10px_30px_-10px_rgba(200,120,180,0.45)] md:max-w-xs md:text-base"
          >
            <span
              className="absolute -bottom-1.5 left-2 h-3 w-3 rotate-45 border-b border-l"
              style={{
                background: "color-mix(in oklab, white 55%, transparent)",
                borderColor: "color-mix(in oklab, white 60%, transparent)",
                backdropFilter: "blur(24px)",
              }}
            />
            <CatMessage text={message} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CatSVG({ mood, blink }: { mood: CatMood; blink: boolean }) {
  const celebrating = mood === "celebrating" || mood === "excited";
  const waving = mood === "waving";
  const isHeart = mood === "affectionate";
  const isEmotional = mood === "emotional";

  return (
    <div className="relative" style={{ width: 96, height: 96 }}>
      {/* celebratory sparkles */}
      {celebrating && (
        <>
          <motion.span
            className="absolute -top-2 -left-1"
            animate={{ scale: [0.6, 1.2, 0.6], rotate: [0, 15, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <SparkleIcon size={20} />
          </motion.span>
          <motion.span
            className="absolute -top-1 right-0"
            animate={{ scale: [0.6, 1.2, 0.6], rotate: [0, -15, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
          >
            <ConfettiIcon size={20} />
          </motion.span>
        </>
      )}

      <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden>
        <defs>
          <radialGradient id="catBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.98 0.02 340)" />
            <stop offset="70%" stopColor="oklch(0.93 0.05 340)" />
            <stop offset="100%" stopColor="oklch(0.86 0.08 340)" />
          </radialGradient>
          <radialGradient id="catCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.13 20 / 0.9)" />
            <stop offset="100%" stopColor="oklch(0.85 0.13 20 / 0)" />
          </radialGradient>
        </defs>

        {/* Tail — wags */}
        <motion.g
          style={{ originX: "20px", originY: "80px" }}
          animate={{ rotate: [-8, 14, -8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M28 82 Q10 78 6 62 Q4 52 14 48"
            stroke="oklch(0.86 0.08 340)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* Body */}
        <ellipse cx="60" cy="82" rx="34" ry="26" fill="url(#catBody)" />

        {/* Waving paw */}
        {waving ? (
          <motion.g
            style={{ originX: "94px", originY: "72px" }}
            animate={{ rotate: [-8, 22, -8] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <ellipse cx="96" cy="60" rx="10" ry="8" fill="oklch(0.94 0.04 340)" />
          </motion.g>
        ) : (
          <ellipse cx="42" cy="102" rx="8" ry="5" fill="oklch(0.88 0.07 340)" />
        )}
        <ellipse cx="78" cy="102" rx="8" ry="5" fill="oklch(0.88 0.07 340)" />

        {/* Head */}
        <g>
          {/* Ears */}
          <path d="M28 44 L34 22 L48 38 Z" fill="oklch(0.9 0.06 340)" />
          <path d="M92 44 L86 22 L72 38 Z" fill="oklch(0.9 0.06 340)" />
          <path d="M34 32 L38 26 L44 34 Z" fill="oklch(0.85 0.11 15)" />
          <path d="M86 32 L82 26 L76 34 Z" fill="oklch(0.85 0.11 15)" />

          {/* Face */}
          <circle cx="60" cy="52" r="30" fill="url(#catBody)" />

          {/* Cheeks */}
          <circle cx="42" cy="60" r="7" fill="url(#catCheek)" />
          <circle cx="78" cy="60" r="7" fill="url(#catCheek)" />

          {/* Eyes */}
          <Eyes mood={mood} blink={blink} />

          {/* Nose */}
          <path d="M58 58 Q60 60 62 58 Q60 62 58 58 Z" fill="oklch(0.7 0.16 15)" />

          {/* Mouth */}
          <Mouth mood={mood} />

          {/* Whiskers */}
          <g stroke="oklch(0.7 0.05 340 / 0.55)" strokeWidth="1" strokeLinecap="round">
            <line x1="30" y1="58" x2="42" y2="60" />
            <line x1="30" y1="62" x2="42" y2="63" />
            <line x1="78" y1="60" x2="90" y2="58" />
            <line x1="78" y1="63" x2="90" y2="62" />
          </g>

          {/* Hearts around head when affectionate */}
          {isHeart && (
            <motion.g
              animate={{ y: [-2, -8, -2], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* SVG heart paths instead of emoji <text> */}
              <path
                d="M18 28 C16 26 13 26 13 29 C13 31 18 34 18 34 C18 34 23 31 23 29 C23 26 20 26 18 28Z"
                fill="oklch(0.78 0.16 350)"
              />
              <path
                d="M92 24 C90.5 22.5 88 22.5 88 25 C88 26.5 92 29 92 29 C92 29 96 26.5 96 25 C96 22.5 93.5 22.5 92 24Z"
                fill="oklch(0.72 0.18 340)"
              />
            </motion.g>
          )}
          {isEmotional && (
            <motion.g
              animate={{ y: [0, 18], opacity: [1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <circle cx="82" cy="70" r="2.5" fill="oklch(0.7 0.08 240)" />
              <circle cx="83" cy="69" r="1" fill="oklch(0.85 0.04 240)" opacity="0.6" />
            </motion.g>
          )}
        </g>
      </svg>
    </div>
  );
}

function Eyes({ mood, blink }: { mood: CatMood; blink: boolean }) {
  if (blink || mood === "sleepy") {
    return (
      <g stroke="oklch(0.25 0.05 340)" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M44 50 Q48 53 52 50" />
        <path d="M68 50 Q72 53 76 50" />
      </g>
    );
  }
  if (mood === "playful") {
    // ^^ eyes
    return (
      <g stroke="oklch(0.25 0.05 340)" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M44 52 Q48 47 52 52" />
        <path d="M68 52 Q72 47 76 52" />
      </g>
    );
  }
  if (mood === "adorable" || mood === "emotional") {
    // big shiny eyes
    return (
      <g>
        <ellipse cx="48" cy="51" rx="5" ry="6.5" fill="oklch(0.2 0.05 340)" />
        <ellipse cx="72" cy="51" rx="5" ry="6.5" fill="oklch(0.2 0.05 340)" />
        <circle cx="49.5" cy="49" r="1.7" fill="white" />
        <circle cx="73.5" cy="49" r="1.7" fill="white" />
        <circle cx="46.5" cy="53.5" r="1" fill="white" />
        <circle cx="70.5" cy="53.5" r="1" fill="white" />
      </g>
    );
  }
  if (mood === "surprised") {
    return (
      <g>
        <circle cx="48" cy="51" r="4.5" fill="oklch(0.2 0.05 340)" />
        <circle cx="72" cy="51" r="4.5" fill="oklch(0.2 0.05 340)" />
        <circle cx="49" cy="49.5" r="1.4" fill="white" />
        <circle cx="73" cy="49.5" r="1.4" fill="white" />
      </g>
    );
  }
  // default: happy / excited / celebrating / affectionate / waving
  return (
    <g>
      <ellipse cx="48" cy="51" rx="3.6" ry="4.6" fill="oklch(0.2 0.05 340)" />
      <ellipse cx="72" cy="51" rx="3.6" ry="4.6" fill="oklch(0.2 0.05 340)" />
      <circle cx="49" cy="49.5" r="1.3" fill="white" />
      <circle cx="73" cy="49.5" r="1.3" fill="white" />
    </g>
  );
}

function Mouth({ mood }: { mood: CatMood }) {
  const stroke = "oklch(0.25 0.05 340)";
  if (mood === "surprised") {
    return <ellipse cx="60" cy="66" rx="3" ry="3.5" fill={stroke} />;
  }
  if (mood === "sleepy") {
    return (
      <path
        d="M56 66 Q60 68 64 66"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  }
  if (mood === "emotional") {
    return (
      <path
        d="M55 66 Q60 62 65 66"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  }
  // smiling
  return (
    <path
      d="M54 63 Q57 68 60 65 Q63 68 66 63"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  );
}
