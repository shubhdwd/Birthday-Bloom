import React from "react";
import { motion } from "framer-motion";
import type { CatStyle } from "@/lib/types";
import { Sparkles, Heart, Moon, Star, Crown, Gift, Feather, Wand2 } from "lucide-react";

interface QRDecorationsProps {
  themeId: CatStyle;
}

interface DecorationPack {
  ears?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
  floating?: React.ReactNode;
}

const DECORATION_PACKS: Record<CatStyle, DecorationPack> = {
  default: {
    ears: (
      <>
        {/* Left Ear */}
        <svg className="absolute -top-6 -left-3 w-8 h-8 text-orange-400 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2L4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12L20 2L12 6L4 2Z" />
        </svg>
        {/* Right Ear */}
        <svg className="absolute -top-6 -right-3 w-8 h-8 text-orange-400 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2L20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12L4 2L12 6L20 2Z" />
        </svg>
      </>
    ),
    bottomLeft: <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center shadow-sm"><span className="text-[10px]">🐾</span></div>,
    bottomRight: <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center shadow-sm"><span className="text-[10px]">🐾</span></div>,
    floating: (
      <>
        <Heart className="absolute -top-2 -right-6 w-4 h-4 text-pink-400 fill-pink-400 opacity-60 animate-pulse" />
        <Heart className="absolute top-1/2 -left-6 w-3 h-3 text-pink-300 fill-pink-300 opacity-50 animate-pulse" style={{ animationDelay: "1s" }} />
      </>
    )
  },
  princess: {
    ears: (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <Crown className="w-10 h-10 text-yellow-400 drop-shadow-md" fill="#facc15" />
      </div>
    ),
    bottomLeft: <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-pink-400" fill="#f472b6" />,
    bottomRight: <Heart className="absolute -bottom-4 -right-4 w-6 h-6 text-pink-500" fill="#ec4899" />,
    floating: (
      <>
        <Sparkles className="absolute top-4 -right-6 w-4 h-4 text-yellow-300 animate-pulse" />
        <Sparkles className="absolute top-1/2 -left-6 w-3 h-3 text-yellow-300 animate-pulse" style={{ animationDelay: "1s" }} />
      </>
    )
  },
  sleepy: {
    ears: (
      <>
        {/* Droopy Left Ear */}
        <svg className="absolute -top-4 -left-3 w-8 h-8 text-slate-400 drop-shadow-md rotate-[-20deg]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2L4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12L20 2L12 6L4 2Z" />
        </svg>
        {/* Droopy Right Ear */}
        <svg className="absolute -top-4 -right-3 w-8 h-8 text-slate-400 drop-shadow-md rotate-[20deg]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2L20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12L4 2L12 6L20 2Z" />
        </svg>
      </>
    ),
    bottomLeft: <Moon className="absolute -bottom-4 -left-4 w-6 h-6 text-indigo-300" fill="#a5b4fc" />,
    bottomRight: <Star className="absolute -bottom-4 -right-4 w-5 h-5 text-indigo-200" fill="#c7d2fe" />,
    floating: (
      <>
        <div className="absolute -top-6 -right-6 text-indigo-400 font-bold text-sm opacity-60 animate-bounce">Z</div>
        <div className="absolute -top-2 -right-8 text-indigo-400 font-bold text-xs opacity-50 animate-bounce" style={{ animationDelay: "0.5s" }}>z</div>
      </>
    )
  },
  playful: {
    ears: (
      <>
        {/* Alert Left Ear */}
        <svg className="absolute -top-6 -left-2 w-7 h-7 text-amber-500 drop-shadow-md rotate-[10deg]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2L4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12L20 2L12 6L4 2Z" />
        </svg>
        {/* Alert Right Ear */}
        <svg className="absolute -top-6 -right-2 w-7 h-7 text-amber-500 drop-shadow-md rotate-[-10deg]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2L20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12L4 2L12 6L20 2Z" />
        </svg>
      </>
    ),
    bottomLeft: <Gift className="absolute -bottom-4 -left-4 w-6 h-6 text-red-400" fill="#f87171" />,
    bottomRight: <div className="absolute -bottom-4 -right-6 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center shadow-md"><span className="text-[12px]">🧶</span></div>,
    floating: (
      <>
        <Star className="absolute top-1/2 -right-6 w-4 h-4 text-amber-400 animate-spin-slow" />
      </>
    )
  },
  galaxy: {
    ears: (
      <>
        {/* Cosmic Left Ear */}
        <svg className="absolute -top-6 -left-3 w-8 h-8 text-purple-600 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2L4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12L20 2L12 6L4 2Z" />
        </svg>
        {/* Cosmic Right Ear */}
        <svg className="absolute -top-6 -right-3 w-8 h-8 text-purple-600 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2L20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12L4 2L12 6L20 2Z" />
        </svg>
      </>
    ),
    bottomLeft: <Star className="absolute -bottom-4 -left-4 w-6 h-6 text-indigo-400" fill="#818cf8" />,
    bottomRight: <Star className="absolute -bottom-4 -right-4 w-6 h-6 text-fuchsia-400" fill="#e879f9" />,
    floating: (
      <>
        <Moon className="absolute -top-4 -right-6 w-5 h-5 text-indigo-300 opacity-80" fill="#a5b4fc" />
        <div className="absolute top-1/3 -left-6 w-2 h-2 bg-purple-300 rounded-full animate-pulse shadow-[0_0_8px_#c084fc]" />
        <div className="absolute bottom-1/3 -right-5 w-1.5 h-1.5 bg-fuchsia-300 rounded-full animate-pulse shadow-[0_0_8px_#e879f9]" style={{ animationDelay: "1s" }} />
      </>
    )
  },
  angel: {
    ears: (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <div className="w-10 h-4 border-2 border-yellow-200 rounded-[100%] shadow-[0_0_10px_#fef08a]" />
      </div>
    ),
    bottomLeft: <Feather className="absolute -bottom-4 -left-4 w-6 h-6 text-slate-300 rotate-[-45deg]" />,
    bottomRight: <Feather className="absolute -bottom-4 -right-4 w-6 h-6 text-slate-300 rotate-[45deg]" />,
    floating: (
      <>
        <Sparkles className="absolute -top-2 -right-6 w-4 h-4 text-slate-200 animate-pulse" />
        <Sparkles className="absolute top-1/2 -left-6 w-3 h-3 text-slate-200 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </>
    )
  },
  witch: {
    ears: (
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <svg className="w-12 h-12 text-slate-800 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 20H22L12 2Z" />
          <rect x="4" y="18" width="16" height="4" rx="2" fill="#475569" />
        </svg>
      </div>
    ),
    bottomLeft: <Wand2 className="absolute -bottom-4 -left-4 w-6 h-6 text-purple-400 rotate-45" />,
    bottomRight: <Star className="absolute -bottom-4 -right-4 w-5 h-5 text-yellow-400" fill="#facc15" />,
    floating: (
      <>
        <Sparkles className="absolute -top-2 -right-6 w-4 h-4 text-purple-300 animate-pulse" />
        <Sparkles className="absolute top-1/2 -left-6 w-4 h-4 text-emerald-300 animate-pulse" style={{ animationDelay: "1s" }} />
      </>
    )
  }
};

export function QRDecorations({ themeId }: QRDecorationsProps) {
  const pack = DECORATION_PACKS[themeId] || DECORATION_PACKS.default;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="w-full h-full relative"
      >
        {pack.ears}
        {pack.bottomLeft}
        {pack.bottomRight}
        {pack.floating}
      </motion.div>
    </div>
  );
}
