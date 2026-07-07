/**
 * Pastel-themed inline SVG icon components.
 * Replace native emojis that can render inconsistently across browsers.
 * Palette: pastel pink (#f9a8d4), lavender (#c4b5fd), peach, cream, gold.
 */

import type { CSSProperties } from "react";

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/* ─── 🎂 Birthday Cake ─── */
export function CakeIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Candle flame */}
      <ellipse cx="32" cy="10" rx="4" ry="6" fill="oklch(0.88 0.14 85)" />
      <ellipse cx="32" cy="9" rx="2" ry="3.5" fill="oklch(0.95 0.10 70)" />
      {/* Candle */}
      <rect x="30" y="14" width="4" height="12" rx="1" fill="oklch(0.82 0.12 350)" />
      {/* Frosting top */}
      <path
        d="M12 30 Q18 22 24 30 Q30 22 36 30 Q42 22 48 30 Q54 22 52 30"
        fill="oklch(0.92 0.08 320)"
      />
      {/* Cake top layer */}
      <rect x="12" y="28" width="40" height="14" rx="4" fill="oklch(0.88 0.10 350)" />
      {/* Cake bottom layer */}
      <rect x="8" y="40" width="48" height="16" rx="5" fill="oklch(0.82 0.13 350)" />
      {/* Frosting drips */}
      <circle cx="18" cy="42" r="3" fill="oklch(0.92 0.08 320)" />
      <circle cx="32" cy="43" r="3.5" fill="oklch(0.92 0.08 320)" />
      <circle cx="46" cy="42" r="3" fill="oklch(0.92 0.08 320)" />
      {/* Plate */}
      <ellipse cx="32" cy="56" rx="28" ry="4" fill="oklch(0.96 0.03 340)" />
    </svg>
  );
}

/* ─── 🎁 Gift Box ─── */
export function GiftIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Box body */}
      <rect x="10" y="30" width="44" height="28" rx="4" fill="oklch(0.82 0.14 350)" />
      {/* Lid */}
      <rect x="6" y="22" width="52" height="12" rx="4" fill="oklch(0.86 0.12 345)" />
      {/* Vertical ribbon */}
      <rect x="29" y="22" width="6" height="36" fill="oklch(0.90 0.12 85)" />
      {/* Horizontal ribbon */}
      <rect x="6" y="26" width="52" height="5" fill="oklch(0.90 0.12 85)" />
      {/* Bow left */}
      <ellipse cx="26" cy="18" rx="8" ry="6" fill="oklch(0.90 0.14 70)" />
      {/* Bow right */}
      <ellipse cx="38" cy="18" rx="8" ry="6" fill="oklch(0.90 0.14 70)" />
      {/* Bow center */}
      <circle cx="32" cy="20" r="4" fill="oklch(0.85 0.15 60)" />
    </svg>
  );
}

/* ─── ✨ Sparkle ─── */
export function SparkleIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Main four-point star */}
      <path
        d="M32 4 L36 26 L58 32 L36 38 L32 60 L28 38 L6 32 L28 26 Z"
        fill="oklch(0.90 0.12 85)"
      />
      {/* Inner glow */}
      <path
        d="M32 14 L34 28 L48 32 L34 36 L32 50 L30 36 L16 32 L30 28 Z"
        fill="oklch(0.95 0.08 70)"
      />
      {/* Small sparkle top-right */}
      <path
        d="M48 8 L49.5 13 L55 14 L49.5 15.5 L48 20 L46.5 15.5 L41 14 L46.5 13 Z"
        fill="oklch(0.88 0.10 320)"
      />
      {/* Small sparkle bottom-left */}
      <path
        d="M14 44 L15.5 48 L20 49 L15.5 50.5 L14 54 L12.5 50.5 L8 49 L12.5 48 Z"
        fill="oklch(0.88 0.10 320)"
      />
    </svg>
  );
}

/* ─── 💖 Heart ─── */
export function HeartIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      <path
        d="M32 56 C16 44 4 34 4 22 C4 12 12 4 22 4 C26 4 30 6 32 10 C34 6 38 4 42 4 C52 4 60 12 60 22 C60 34 48 44 32 56Z"
        fill="oklch(0.78 0.16 350)"
      />
      {/* Shine */}
      <ellipse cx="22" cy="20" rx="6" ry="5" fill="oklch(0.88 0.10 350)" opacity="0.6" />
    </svg>
  );
}

/* ─── 💕 Double Hearts ─── */
export function HeartsIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Back heart */}
      <path
        d="M24 52 C12 42 2 34 2 24 C2 16 8 10 16 10 C19 10 22 11.5 24 14 C26 11.5 29 10 32 10 C40 10 46 16 46 24 C46 34 36 42 24 52Z"
        fill="oklch(0.82 0.14 350)"
      />
      {/* Front heart */}
      <path
        d="M40 48 C28 38 18 30 18 20 C18 12 24 6 32 6 C35 6 38 7.5 40 10 C42 7.5 45 6 48 6 C56 6 62 12 62 20 C62 30 52 38 40 48Z"
        fill="oklch(0.78 0.16 340)"
      />
      {/* Shine on front */}
      <ellipse cx="34" cy="16" rx="4" ry="3.5" fill="oklch(0.90 0.08 340)" opacity="0.5" />
    </svg>
  );
}

/* ─── 📸 Camera ─── */
export function CameraIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Body */}
      <rect x="6" y="22" width="52" height="34" rx="6" fill="oklch(0.82 0.12 300)" />
      {/* Viewfinder bump */}
      <path d="M22 22 L26 12 L38 12 L42 22" fill="oklch(0.78 0.14 300)" />
      {/* Lens outer */}
      <circle cx="32" cy="40" r="12" fill="oklch(0.72 0.16 300)" />
      {/* Lens inner */}
      <circle cx="32" cy="40" r="8" fill="oklch(0.88 0.08 300)" />
      {/* Lens shine */}
      <circle cx="29" cy="37" r="3" fill="oklch(0.95 0.04 300)" opacity="0.7" />
      {/* Flash */}
      <circle cx="48" cy="28" r="3" fill="oklch(0.92 0.08 85)" />
    </svg>
  );
}

/* ─── 🎉 Confetti / Party ─── */
export function ConfettiIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Cone */}
      <path d="M20 58 L32 18 L44 58 Z" fill="oklch(0.82 0.14 350)" />
      <path d="M24 58 L32 24 L40 58 Z" fill="oklch(0.86 0.12 345)" />
      {/* Confetti pieces */}
      <rect
        x="14"
        y="8"
        width="6"
        height="4"
        rx="1"
        fill="oklch(0.88 0.14 85)"
        transform="rotate(-15 17 10)"
      />
      <rect
        x="36"
        y="6"
        width="5"
        height="4"
        rx="1"
        fill="oklch(0.82 0.14 300)"
        transform="rotate(20 38 8)"
      />
      <circle cx="28" cy="12" r="3" fill="oklch(0.90 0.12 350)" />
      <circle cx="44" cy="14" r="2.5" fill="oklch(0.88 0.10 85)" />
      <rect
        x="48"
        y="20"
        width="5"
        height="3"
        rx="1"
        fill="oklch(0.85 0.12 350)"
        transform="rotate(30 50 21)"
      />
      <circle cx="12" cy="18" r="2" fill="oklch(0.82 0.14 300)" />
      <rect
        x="8"
        y="28"
        width="4"
        height="3"
        rx="1"
        fill="oklch(0.90 0.10 70)"
        transform="rotate(-10 10 29)"
      />
      <circle cx="50" cy="30" r="2.5" fill="oklch(0.82 0.14 350)" />
    </svg>
  );
}

/* ─── 🌸 Flower / Cherry Blossom ─── */
export function FlowerIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Petals */}
      <ellipse cx="32" cy="16" rx="8" ry="12" fill="oklch(0.90 0.10 350)" />
      <ellipse
        cx="32"
        cy="16"
        rx="8"
        ry="12"
        fill="oklch(0.88 0.12 340)"
        transform="rotate(72 32 32)"
      />
      <ellipse
        cx="32"
        cy="16"
        rx="8"
        ry="12"
        fill="oklch(0.90 0.10 350)"
        transform="rotate(144 32 32)"
      />
      <ellipse
        cx="32"
        cy="16"
        rx="8"
        ry="12"
        fill="oklch(0.88 0.12 340)"
        transform="rotate(216 32 32)"
      />
      <ellipse
        cx="32"
        cy="16"
        rx="8"
        ry="12"
        fill="oklch(0.90 0.10 350)"
        transform="rotate(288 32 32)"
      />
      {/* Center */}
      <circle cx="32" cy="32" r="6" fill="oklch(0.90 0.14 85)" />
      <circle cx="32" cy="32" r="3.5" fill="oklch(0.85 0.16 60)" />
    </svg>
  );
}

/* ─── 💌 Love Letter ─── */
export function LetterIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      {/* Envelope body */}
      <rect x="6" y="18" width="52" height="36" rx="4" fill="oklch(0.92 0.06 350)" />
      {/* Envelope flap */}
      <path
        d="M6 18 L32 40 L58 18"
        stroke="oklch(0.82 0.12 340)"
        strokeWidth="2"
        fill="oklch(0.88 0.10 345)"
      />
      {/* Heart seal */}
      <path
        d="M32 32 C28 28 22 28 22 34 C22 38 32 44 32 44 C32 44 42 38 42 34 C42 28 36 28 32 32Z"
        fill="oklch(0.78 0.16 350)"
      />
    </svg>
  );
}

/* ─── 🐾 Paw Print ─── */
export function PawPrintIcon({ size = 24, className = "", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-icon ${className}`}
      style={style}
      aria-hidden
    >
      <circle cx="20" cy="20" r="6" fill="oklch(0.85 0.12 340)" />
      <circle cx="32" cy="14" r="6" fill="oklch(0.85 0.12 340)" />
      <circle cx="44" cy="20" r="6" fill="oklch(0.85 0.12 340)" />
      <path
        d="M20 36 C16 36 12 40 16 48 C20 56 28 58 32 58 C36 58 44 56 48 48 C52 40 48 36 44 36 C40 36 36 32 32 32 C28 32 24 36 20 36Z"
        fill="oklch(0.85 0.12 340)"
      />
    </svg>
  );
}
