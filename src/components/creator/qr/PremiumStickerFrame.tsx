import React from "react";

interface PremiumStickerFrameProps {
  children: React.ReactNode;
}

export function PremiumStickerFrame({ children }: PremiumStickerFrameProps) {
  return (
    <div 
      className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-3xl border-2 border-white shadow-xl shadow-pink-500/10 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ width: "320px", height: "400px" }}
    >
      {/* Soft Glow Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Glassmorphic Inner Container for QR */}
      <div className="relative z-10 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm mb-6 flex justify-center items-center">
        {children}
      </div>

      <div className="relative z-10 text-center px-4 w-full">
        <h3 className="text-xl font-display text-gradient mb-1">Birthday Bloom</h3>
        <p className="text-sm text-foreground/60 font-medium">
          🐾 Scan to Open Your Surprise 🎂
        </p>
      </div>
    </div>
  );
}
