import React from "react";
import type { MemoryCard } from "@/lib/types";

// Basic markdown-like parser to support bold, italic
function RichText({ text }: { text: string }) {
  if (!text) return null;

  // extremely basic parser: **bold**, *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i} className="whitespace-pre-wrap">{part}</span>;
      })}
    </>
  );
}

export function MemoryCardView({ card }: { card: MemoryCard }) {
  const { style, url, title, message, date, location, moodTag, emoji } = card;

  return (
    <div className={`card-${style} relative group break-inside-avoid w-full h-full`}>
      <div className={style === "minimal" ? "image-wrapper" : ""}>
        {url && (
          <img
            src={url}
            alt={title || "Memory"}
            loading="lazy"
            className="w-full h-auto rounded-sm block"
          />
        )}
      </div>

      <div className={`mt-3 ${style === 'minimal' ? 'px-2' : ''}`}>
        {(title || emoji) && (
          <div className="flex items-center justify-between mb-1 gap-2">
            {title && (
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight text-foreground/90">
                {title}
              </h3>
            )}
            {emoji && <span className="text-2xl emoji shrink-0">{emoji}</span>}
          </div>
        )}

        {(date || location) && (
          <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2 font-medium tracking-wide">
            {date && <span>📅 {date}</span>}
            {date && location && <span>•</span>}
            {location && <span>📍 {location}</span>}
          </div>
        )}

        {message && (
          <div className="text-foreground/80 text-sm md:text-base font-body leading-relaxed mt-2">
            <RichText text={message} />
          </div>
        )}

        {moodTag && (
          <div className="mt-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              #{moodTag}
            </span>
          </div>
        )}
      </div>
      
      {/* Sticker decorations could go here based on stickerPack */}
    </div>
  );
}
