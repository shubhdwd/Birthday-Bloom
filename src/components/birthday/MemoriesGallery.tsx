import { motion } from "framer-motion";
import { SparkleIcon } from "./EmojiIcons";
import { CatMessage } from "./CatMessage";
import type { Relationship, SurpriseData } from "@/lib/types";
import { getPhotoCaption, getFloatingNotes } from "@/lib/personalization";

interface MemoriesGalleryProps {
  photos: SurpriseData["photos"];
  relationship: Relationship;
}

export function MemoriesGallery({ photos, relationship }: MemoriesGalleryProps) {
  const notes = getFloatingNotes(relationship);

  return (
    <section className="relative px-6 py-24">
      {/* Floating notes */}
      {notes.map((text, i) => {
        const positions = [
          { top: "8%", left: "3%" },
          { top: "40%", right: "4%" },
          { top: "72%", left: "5%" },
          { top: "22%", right: "8%" },
          { top: "88%", right: "6%" },
        ];
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="pointer-events-none absolute animate-sway hidden md:block"
            style={{
              ...pos,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <div
              className="glass-card px-4 py-2 rounded-2xl text-sm md:text-base font-script text-primary"
              style={{ transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)` }}
            >
              <CatMessage text={text} />
            </div>
          </motion.div>
        );
      })}

      {/* Section heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-display text-4xl md:text-6xl text-gradient mb-16"
      >
        <SparkleIcon size={32} /> Beautiful Memories <SparkleIcon size={32} />
      </motion.h2>

      {/* Scrapbook masonry grid */}
      <div className="mx-auto max-w-6xl columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 [column-fill:_balance]">
        {photos?.map((photo, i) => {
          // If Math.random() is used inside getPhotoCaption, we can just let it run.
          // But to avoid flickers on re-render, we can just pass the index to seed the fallback.
          const fallbackIndex = i % 3;
          const fallbacks = [
            "A beautiful memory ✨",
            "A special moment 💜",
            "One more reason to smile 🌸",
          ];
          const displayCaption = photo.caption?.trim() ? photo.caption : fallbacks[fallbackIndex];

          return (
            <motion.figure
              key={photo.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              className="polaroid break-inside-avoid mb-6"
            >
              {/* Tape decoration on top */}
              <div className="scrapbook-tape" />
              <img
                src={photo.url}
                alt={displayCaption}
                loading="lazy"
                className="w-full h-auto rounded-sm block"
              />
              <figcaption className="mt-3 text-center font-script text-lg text-primary/90">
                <CatMessage text={displayCaption} />
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
