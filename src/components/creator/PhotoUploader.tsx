import { useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoEntry } from "@/lib/types";
import { CameraIcon } from "@/components/birthday/EmojiIcons";

const MAX_PHOTOS = 20;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

interface PhotoUploaderProps {
  photos: PhotoEntry[];
  onChange: (photos: PhotoEntry[]) => void;
}

export function PhotoUploader({ photos, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const newPhotos: PhotoEntry[] = [];
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        if (!ACCEPTED_TYPES.includes(file.type)) continue;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;
        if (photos.length + newPhotos.length >= MAX_PHOTOS) break;

        newPhotos.push({
          file,
          preview: URL.createObjectURL(file),
          caption: "",
        });
      }

      onChange([...photos, ...newPhotos]);
    },
    [photos, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const removePhoto = (index: number) => {
    const updated = [...photos];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    onChange(updated);
  };

  const updateCaption = (index: number, caption: string) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], caption };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
        <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload photos"
        className="glass-card rounded-2xl border-2 border-dashed border-primary/20 p-10 text-center cursor-pointer hover:border-primary/40 transition-colors"
      >
        <CameraIcon size={40} />
        <p className="mt-3 text-foreground/60 font-medium">
          Drop photos here or <span className="text-primary underline">browse</span>
        </p>
        <p className="text-xs text-foreground/40 mt-1">
          JPG, PNG, WebP • Max {MAX_SIZE_MB}MB each • {photos.length}/{MAX_PHOTOS} photos
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <AnimatePresence>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.preview}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative"
            >
              <img
                src={photo.preview}
                alt={`Upload ${i + 1}`}
                className="w-full aspect-square object-cover rounded-xl"
              />
              {/* Remove button */}
              <button
                onClick={() => removePhoto(i)}
                aria-label={`Remove photo ${i + 1}`}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-400/90 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              {/* Caption input */}
              <input
                type="text"
                value={photo.caption}
                onChange={(e) => updateCaption(i, e.target.value)}
                placeholder="Add a memory..."
                aria-label={`Caption for photo ${i + 1}`}
                className="w-full mt-1 text-xs px-2 py-1 rounded-lg bg-white/50 outline-none placeholder:text-foreground/30 text-foreground/70 focus:ring-1 focus:ring-primary/20"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Example captions */}
      {photos.length > 0 && (
        <p className="text-xs text-foreground/40">
          Caption ideas: "That was our best day 💕" • "One unforgettable memory ✨" • "Still smiling
          because of this 🥺"
        </p>
      )}


    </div>
  );
}
