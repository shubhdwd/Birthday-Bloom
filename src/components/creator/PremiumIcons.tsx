import type { CSSProperties } from "react";
import { motion } from "framer-motion";

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

// ────────────────────────────────────────────────────────────────────────
// GIFT BOX STYLES
// ────────────────────────────────────────────────────────────────────────

export function ClassicGiftIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="classic-bg" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.9 0.1 350)" />
          <stop offset="100%" stopColor="oklch(0.8 0.15 340)" />
        </linearGradient>
        <linearGradient id="classic-ribbon" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 100)" />
          <stop offset="100%" stopColor="oklch(0.85 0.1 90)" />
        </linearGradient>
      </defs>
      {/* Box Shadow */}
      <ellipse cx="50" cy="85" rx="35" ry="10" fill="black" opacity="0.1" />
      
      {/* Box Body */}
      <rect x="20" y="40" width="60" height="40" rx="4" fill="url(#classic-bg)" />
      
      {/* Vertical Ribbon */}
      <rect x="42" y="40" width="16" height="40" fill="url(#classic-ribbon)" />
      
      {/* Lid Shadow */}
      <rect x="15" y="40" width="70" height="4" fill="black" opacity="0.05" />
      
      {/* Lid */}
      <rect x="15" y="32" width="70" height="12" rx="3" fill="url(#classic-bg)" />
      <rect x="15" y="32" width="70" height="4" rx="3" fill="white" opacity="0.4" />
      
      {/* Lid Ribbon */}
      <rect x="42" y="32" width="16" height="12" fill="url(#classic-ribbon)" />
      
      {/* Bow */}
      <path d="M50 34 C30 15, 10 30, 48 35 Z" fill="url(#classic-ribbon)" />
      <path d="M50 34 C70 15, 90 30, 52 35 Z" fill="url(#classic-ribbon)" />
      <circle cx="50" cy="34" r="5" fill="oklch(0.98 0.05 95)" />
    </svg>
  );
}

export function RibbonGiftIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="ribbon-bg" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 200)" />
          <stop offset="100%" stopColor="oklch(0.85 0.1 220)" />
        </linearGradient>
        <linearGradient id="ribbon-accent" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.85 0.2 340)" />
          <stop offset="100%" stopColor="oklch(0.7 0.2 330)" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="40" ry="8" fill="black" opacity="0.1" />
      
      {/* Luxury round box */}
      <rect x="15" y="45" width="70" height="40" rx="8" fill="url(#ribbon-bg)" />
      
      {/* Thick Ribbon */}
      <rect x="35" y="45" width="30" height="40" fill="url(#ribbon-accent)" />
      
      {/* Lid */}
      <rect x="10" y="35" width="80" height="15" rx="6" fill="url(#ribbon-bg)" />
      <rect x="10" y="35" width="80" height="5" rx="6" fill="white" opacity="0.4" />
      <rect x="35" y="35" width="30" height="15" fill="url(#ribbon-accent)" />
      
      {/* Oversized Luxury Bow */}
      <path d="M50 38 C15 15, -5 45, 45 42 Z" fill="url(#ribbon-accent)" />
      <path d="M50 38 C85 15, 105 45, 55 42 Z" fill="url(#ribbon-accent)" />
      <path d="M50 38 C25 25, 15 50, 48 40 Z" fill="white" opacity="0.2" />
      <path d="M50 38 C75 25, 85 50, 52 40 Z" fill="white" opacity="0.2" />
      
      {/* Ribbon tails */}
      <path d="M45 42 L25 75 L35 78 L48 45 Z" fill="url(#ribbon-accent)" />
      <path d="M55 42 L75 75 L65 78 L52 45 Z" fill="url(#ribbon-accent)" />
      
      <circle cx="50" cy="38" r="8" fill="oklch(0.95 0.1 340)" />
    </svg>
  );
}

export function CuteBoxIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="cute-bg" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.98 0.05 90)" />
          <stop offset="100%" stopColor="oklch(0.92 0.08 70)" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="35" ry="10" fill="black" opacity="0.08" />
      
      {/* Chibi chubby box */}
      <rect x="20" y="35" width="60" height="55" rx="16" fill="url(#cute-bg)" />
      
      {/* Blush */}
      <circle cx="32" cy="65" r="5" fill="oklch(0.8 0.15 350)" opacity="0.5" />
      <circle cx="68" cy="65" r="5" fill="oklch(0.8 0.15 350)" opacity="0.5" />
      
      {/* Kawaii Face */}
      <path d="M36 60 Q40 56 44 60" stroke="oklch(0.4 0.1 300)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M56 60 Q60 56 64 60" stroke="oklch(0.4 0.1 300)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M48 68 Q50 72 52 68" stroke="oklch(0.4 0.1 300)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      {/* Box Flaps/Ribbon */}
      <path d="M50 35 C30 10, 15 25, 45 40 Z" fill="oklch(0.85 0.12 340)" />
      <path d="M50 35 C70 10, 85 25, 55 40 Z" fill="oklch(0.85 0.12 340)" />
      <circle cx="50" cy="38" r="6" fill="white" opacity="0.9" />
      
      {/* Floating tiny stars */}
      <path d="M15 25 L18 15 L21 25 L30 28 L21 31 L18 40 L15 31 L5 28 Z" fill="oklch(0.9 0.1 90)" transform="scale(0.5) translate(20, -10)" />
      <path d="M85 45 L88 35 L91 45 L100 48 L91 51 L88 60 L85 51 L75 48 Z" fill="oklch(0.85 0.15 340)" transform="scale(0.4) translate(110, 20)" />
    </svg>
  );
}

export function SparkleBoxIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="sparkle-bg" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.9 0.1 280)" />
          <stop offset="100%" stopColor="oklch(0.7 0.15 290)" />
        </linearGradient>
        <radialGradient id="sparkle-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.95 0.15 280)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.95 0.15 280)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="50" cy="50" r="40" fill="url(#sparkle-glow)" />
      
      {/* Diamond/Hexagon Box */}
      <path d="M25 45 L50 30 L75 45 L75 75 L50 90 L25 75 Z" fill="url(#sparkle-bg)" />
      
      {/* Box highlights */}
      <path d="M25 45 L50 30 L50 90 L25 75 Z" fill="white" opacity="0.15" />
      <path d="M25 45 L50 30 L75 45 L50 55 Z" fill="white" opacity="0.3" />
      
      {/* Ribbon */}
      <path d="M37.5 37.5 L62.5 82.5 M62.5 37.5 L37.5 82.5" stroke="oklch(0.95 0.15 90)" strokeWidth="4" />
      
      {/* Sparkles */}
      <path d="M50 10 L52 22 L65 24 L52 26 L50 38 L48 26 L35 24 L48 22 Z" fill="oklch(0.98 0.1 90)" />
      <path d="M20 30 L21 36 L27 37 L21 38 L20 44 L19 38 L13 37 L19 36 Z" fill="white" />
      <path d="M80 60 L81 65 L86 66 L81 67 L80 72 L79 67 L74 66 L79 65 Z" fill="oklch(0.9 0.1 340)" />
    </svg>
  );
}

export function VintageBoxIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="vintage-bg" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 40)" />
          <stop offset="100%" stopColor="oklch(0.85 0.08 50)" />
        </linearGradient>
        <pattern id="lace" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2" fill="white" opacity="0.4" />
          <path d="M0 0 L10 10 M10 0 L0 10" stroke="white" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      
      <ellipse cx="50" cy="85" rx="35" ry="8" fill="black" opacity="0.15" />
      
      {/* Cylinder box */}
      <rect x="25" y="45" width="50" height="35" fill="url(#vintage-bg)" />
      <ellipse cx="50" cy="80" rx="25" ry="8" fill="oklch(0.8 0.08 50)" />
      <ellipse cx="50" cy="45" rx="25" ry="8" fill="url(#vintage-bg)" />
      
      {/* Lace pattern on body */}
      <rect x="25" y="50" width="50" height="25" fill="url(#lace)" />
      
      {/* Lid */}
      <ellipse cx="50" cy="38" rx="28" ry="10" fill="oklch(0.9 0.06 20)" />
      <rect x="22" y="38" width="56" height="8" fill="oklch(0.85 0.08 20)" />
      <ellipse cx="50" cy="46" rx="28" ry="10" fill="oklch(0.75 0.08 20)" />
      
      {/* Floral Ribbon */}
      <path d="M50 38 C40 25, 25 35, 45 42 C60 25, 75 35, 55 42" fill="oklch(0.7 0.15 340)" />
      <circle cx="50" cy="40" r="5" fill="oklch(0.95 0.1 70)" />
      <circle cx="46" cy="37" r="3" fill="white" />
      <circle cx="54" cy="37" r="3" fill="white" />
      
      {/* Scalloped edge */}
      <path d="M22 46 Q26 50 29 46 Q33 50 36 46 Q40 50 43 46 Q47 50 50 46 Q53 50 56 46 Q60 50 63 46 Q67 50 70 46 Q74 50 78 46" fill="oklch(0.85 0.08 20)" />
    </svg>
  );
}

export function GalaxyBoxIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <radialGradient id="galaxy-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="oklch(0.4 0.15 280)" />
          <stop offset="100%" stopColor="oklch(0.15 0.1 270)" />
        </radialGradient>
        <linearGradient id="galaxy-ribbon" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.9 0.1 220)" />
          <stop offset="100%" stopColor="oklch(0.7 0.15 250)" />
        </linearGradient>
      </defs>
      
      {/* Outer glow */}
      <ellipse cx="50" cy="85" rx="40" ry="12" fill="oklch(0.4 0.15 280)" opacity="0.3" />
      
      {/* Box */}
      <rect x="25" y="45" width="50" height="38" rx="2" fill="url(#galaxy-bg)" />
      
      {/* Stars in galaxy */}
      <circle cx="35" cy="55" r="1" fill="white" />
      <circle cx="65" cy="60" r="1.5" fill="oklch(0.9 0.1 80)" />
      <circle cx="30" cy="75" r="1" fill="white" opacity="0.6" />
      <circle cx="70" cy="70" r="1" fill="oklch(0.8 0.15 320)" />
      <path d="M45 55 L47 62 L54 64 L47 66 L45 73 L43 66 L36 64 L43 62 Z" fill="white" opacity="0.8" transform="scale(0.5) translate(40, 20)" />
      
      {/* Ribbon */}
      <rect x="42" y="45" width="16" height="38" fill="url(#galaxy-ribbon)" />
      
      {/* Lid */}
      <rect x="20" y="32" width="60" height="13" rx="2" fill="url(#galaxy-bg)" />
      <rect x="42" y="32" width="16" height="13" fill="url(#galaxy-ribbon)" />
      <path d="M20 32 L80 32 L80 35 L20 35 Z" fill="white" opacity="0.15" />
      
      {/* Stars on Lid */}
      <circle cx="30" cy="38" r="1" fill="white" />
      <circle cx="70" cy="36" r="1.2" fill="white" />
      
      {/* Bow */}
      <path d="M50 34 C35 15, 15 25, 45 34 Z" fill="url(#galaxy-ribbon)" />
      <path d="M50 34 C65 15, 85 25, 55 34 Z" fill="url(#galaxy-ribbon)" />
      
      {/* Planet / Moon ornament */}
      <circle cx="50" cy="34" r="6" fill="oklch(0.95 0.05 100)" />
      <path d="M42 34 Q50 40 58 34" stroke="oklch(0.7 0.1 280)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────
// CAT COMPANION STYLES
// ────────────────────────────────────────────────────────────────────────

export function DefaultCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <path d="M25 45 L35 20 L50 35 L65 20 L75 45 Z" fill="oklch(0.85 0.15 45)" />
      <path d="M32 30 L37 25 L43 32 Z" fill="oklch(0.7 0.18 30)" />
      <path d="M68 30 L63 25 L57 32 Z" fill="oklch(0.7 0.18 30)" />
      
      <circle cx="50" cy="55" r="30" fill="oklch(0.9 0.12 50)" />
      <circle cx="50" cy="55" r="28" fill="oklch(0.92 0.1 50)" />
      
      {/* Eyes */}
      <circle cx="40" cy="52" r="4" fill="oklch(0.2 0.05 300)" />
      <circle cx="60" cy="52" r="4" fill="oklch(0.2 0.05 300)" />
      <circle cx="41" cy="50" r="1.5" fill="white" />
      <circle cx="61" cy="50" r="1.5" fill="white" />
      
      {/* Blush */}
      <circle cx="32" cy="62" r="5" fill="oklch(0.8 0.15 350)" opacity="0.4" />
      <circle cx="68" cy="62" r="5" fill="oklch(0.8 0.15 350)" opacity="0.4" />
      
      {/* Nose & Mouth */}
      <path d="M48 60 Q50 63 52 60" fill="oklch(0.6 0.15 350)" />
      <path d="M45 65 Q48 68 50 65 Q52 68 55 65" stroke="oklch(0.2 0.05 300)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function SleepyCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      {/* Pillow */}
      <rect x="15" y="60" width="70" height="25" rx="10" fill="oklch(0.95 0.05 330)" />
      <rect x="10" y="65" width="80" height="15" rx="5" fill="oklch(0.9 0.08 340)" opacity="0.5" />
      
      {/* Cat body sleeping */}
      <path d="M25 65 Q50 20 75 65 Z" fill="oklch(0.9 0.05 250)" />
      
      {/* Ears */}
      <path d="M30 45 L35 25 L45 35 Z" fill="oklch(0.85 0.08 260)" />
      <path d="M70 45 L65 25 L55 35 Z" fill="oklch(0.85 0.08 260)" />
      
      {/* Closed eyes */}
      <path d="M35 55 Q40 58 45 55" stroke="oklch(0.2 0.05 280)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M55 55 Q60 58 65 55" stroke="oklch(0.2 0.05 280)" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      <circle cx="50" cy="62" r="1.5" fill="oklch(0.6 0.15 350)" />
      
      {/* Zzz */}
      <path d="M70 25 L80 25 L70 35 L80 35" stroke="oklch(0.6 0.1 280)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M85 15 L92 15 L85 22 L92 22" stroke="oklch(0.6 0.1 280)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function PlayfulCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      {/* Yarn */}
      <circle cx="80" cy="75" r="12" fill="oklch(0.7 0.15 20)" />
      <path d="M72 70 C75 65 85 65 88 70 M70 75 C75 70 85 70 90 75 M72 80 C75 75 85 75 88 80" stroke="oklch(0.8 0.15 20)" strokeWidth="2" fill="none" />
      <path d="M68 75 Q50 85 35 75" stroke="oklch(0.7 0.15 20)" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Cat base */}
      <path d="M20 40 L28 15 L45 30 L60 15 L68 40 Z" fill="oklch(0.95 0.05 50)" />
      <circle cx="44" cy="50" r="28" fill="oklch(0.95 0.05 50)" />
      
      {/* Calico patches */}
      <path d="M28 15 L45 30 L20 40 Z" fill="oklch(0.3 0.05 300)" />
      <path d="M60 15 L68 40 L55 35 Z" fill="oklch(0.7 0.2 40)" />
      <circle cx="58" cy="42" r="12" fill="oklch(0.7 0.2 40)" />
      
      {/* Playful eyes (star + wide) */}
      <path d="M32 45 L35 40 L38 45 L43 48 L38 51 L35 56 L32 51 L27 48 Z" fill="oklch(0.2 0.05 300)" />
      <circle cx="55" cy="48" r="4" fill="oklch(0.2 0.05 300)" />
      <circle cx="56" cy="46" r="1.5" fill="white" />
      
      {/* Paw reaching */}
      <rect x="55" y="60" width="12" height="25" rx="6" fill="oklch(0.95 0.05 50)" transform="rotate(-30 55 60)" />
      
      {/* Mouth */}
      <path d="M42 58 Q45 65 48 58 Z" fill="oklch(0.6 0.15 350)" />
    </svg>
  );
}

export function PrincessCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      {/* Crown */}
      <path d="M35 25 L40 10 L50 20 L60 10 L65 25 Z" fill="oklch(0.9 0.15 80)" />
      <circle cx="40" cy="10" r="2" fill="oklch(0.8 0.15 340)" />
      <circle cx="50" cy="20" r="2" fill="oklch(0.98 0.05 90)" />
      <circle cx="60" cy="10" r="2" fill="oklch(0.8 0.15 340)" />
      
      {/* Cat */}
      <path d="M25 45 L35 20 L50 35 L65 20 L75 45 Z" fill="oklch(0.99 0.01 340)" />
      <circle cx="50" cy="55" r="30" fill="oklch(0.99 0.01 340)" />
      
      {/* Elegant Eyes */}
      <path d="M35 50 Q40 45 45 50" stroke="oklch(0.2 0.05 300)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M55 50 Q60 45 65 50" stroke="oklch(0.2 0.05 300)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M35 50 L32 48" stroke="oklch(0.2 0.05 300)" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 50 L68 48" stroke="oklch(0.2 0.05 300)" strokeWidth="2" strokeLinecap="round" />
      
      {/* Small mouth */}
      <path d="M48 62 Q50 64 52 62" stroke="oklch(0.6 0.15 350)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Pearl necklace */}
      <circle cx="30" cy="75" r="2.5" fill="oklch(0.95 0.02 200)" />
      <circle cx="38" cy="80" r="2.5" fill="oklch(0.95 0.02 200)" />
      <circle cx="46" cy="83" r="2.5" fill="oklch(0.95 0.02 200)" />
      <circle cx="54" cy="83" r="2.5" fill="oklch(0.95 0.02 200)" />
      <circle cx="62" cy="80" r="2.5" fill="oklch(0.95 0.02 200)" />
      <circle cx="70" cy="75" r="2.5" fill="oklch(0.95 0.02 200)" />
    </svg>
  );
}

export function GalaxyCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="galaxy-cat-bg" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="oklch(0.35 0.15 280)" />
          <stop offset="100%" stopColor="oklch(0.2 0.1 270)" />
        </linearGradient>
      </defs>
      
      <path d="M25 45 L35 20 L50 35 L65 20 L75 45 Z" fill="url(#galaxy-cat-bg)" />
      <circle cx="50" cy="55" r="30" fill="url(#galaxy-cat-bg)" />
      
      {/* Crescent moon on forehead */}
      <path d="M50 30 C55 30, 58 35, 58 40 C52 35, 45 35, 42 40 C42 35, 45 30, 50 30 Z" fill="oklch(0.9 0.1 90)" />
      
      {/* Glowing Eyes */}
      <circle cx="40" cy="55" r="4.5" fill="oklch(0.9 0.15 280)" />
      <circle cx="60" cy="55" r="4.5" fill="oklch(0.9 0.15 280)" />
      <circle cx="40" cy="55" r="2" fill="white" />
      <circle cx="60" cy="55" r="2" fill="white" />
      
      {/* Stars on cheeks */}
      <circle cx="28" cy="65" r="1.5" fill="white" opacity="0.6" />
      <circle cx="32" cy="70" r="1" fill="oklch(0.8 0.15 320)" opacity="0.8" />
      <circle cx="72" cy="65" r="1.5" fill="white" opacity="0.6" />
      <circle cx="68" cy="70" r="1" fill="oklch(0.8 0.15 320)" opacity="0.8" />
      
      {/* Nose */}
      <path d="M48 65 Q50 67 52 65" fill="oklch(0.6 0.15 350)" />
    </svg>
  );
}

export function AngelCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      {/* Halo */}
      <ellipse cx="50" cy="15" rx="15" ry="5" stroke="oklch(0.9 0.15 80)" strokeWidth="3" fill="none" />
      
      {/* Angel Wings */}
      <path d="M30 45 C15 40, 5 55, 20 70 C15 60, 25 50, 30 55 Z" fill="oklch(0.95 0.02 200)" />
      <path d="M70 45 C85 40, 95 55, 80 70 C85 60, 75 50, 70 55 Z" fill="oklch(0.95 0.02 200)" />
      
      {/* Cat body */}
      <path d="M25 45 L35 25 L50 35 L65 25 L75 45 Z" fill="oklch(0.99 0.01 340)" />
      <circle cx="50" cy="55" r="28" fill="oklch(0.99 0.01 340)" />
      <circle cx="50" cy="55" r="26" fill="white" />
      
      {/* Pure Eyes */}
      <circle cx="40" cy="52" r="4.5" fill="oklch(0.4 0.1 260)" />
      <circle cx="60" cy="52" r="4.5" fill="oklch(0.4 0.1 260)" />
      <circle cx="41.5" cy="50.5" r="1.5" fill="white" />
      <circle cx="61.5" cy="50.5" r="1.5" fill="white" />
      <circle cx="38.5" cy="53.5" r="0.8" fill="white" />
      <circle cx="58.5" cy="53.5" r="0.8" fill="white" />
      
      {/* Happy mouth */}
      <path d="M46 62 Q50 65 54 62" stroke="oklch(0.7 0.15 350)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function WitchCatIcon({ size = 64, className = "", style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-icon ${className}`} style={style} aria-hidden>
      {/* Cat body (Black) */}
      <path d="M25 45 L35 25 L50 35 L65 25 L75 45 Z" fill="oklch(0.2 0.05 300)" />
      <circle cx="50" cy="55" r="30" fill="oklch(0.2 0.05 300)" />
      
      {/* Eyes (Glowing Green/Yellow) */}
      <circle cx="40" cy="55" r="5" fill="oklch(0.85 0.15 130)" />
      <circle cx="60" cy="55" r="5" fill="oklch(0.85 0.15 130)" />
      <ellipse cx="40" cy="55" rx="1" ry="3" fill="oklch(0.1 0.05 300)" />
      <ellipse cx="60" cy="55" rx="1" ry="3" fill="oklch(0.1 0.05 300)" />
      
      {/* Witch Hat */}
      <path d="M25 35 C35 35, 65 35, 75 35 L70 30 C60 10, 55 5, 45 5 C40 15, 30 25, 25 35 Z" fill="oklch(0.3 0.1 280)" />
      <ellipse cx="50" cy="35" rx="30" ry="6" fill="oklch(0.25 0.1 280)" />
      <path d="M35 32 L65 32 L60 22 L40 22 Z" fill="oklch(0.4 0.15 280)" />
      {/* Hat Buckle */}
      <rect x="46" y="25" width="8" height="6" rx="1" fill="none" stroke="oklch(0.9 0.15 80)" strokeWidth="2" />
      
      {/* Mouth */}
      <path d="M48 65 Q50 67 52 65" fill="oklch(0.6 0.15 350)" />
    </svg>
  );
}
