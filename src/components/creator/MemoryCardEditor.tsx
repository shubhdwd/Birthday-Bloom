import React, { useRef } from "react";
import type { MemoryCardEntry, MemoryCardStyle } from "@/lib/types";
import { CameraIcon } from "@/components/birthday/EmojiIcons";
import { MemoryCardView } from "@/components/birthday/MemoryCardView";
import { Trash2, Copy, ImagePlus } from "lucide-react";

interface MemoryCardEditorProps {
  card: MemoryCardEntry;
  onChange: (updated: MemoryCardEntry) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const STYLES: { value: MemoryCardStyle; label: string }[] = [
  { value: "polaroid", label: "Polaroid" },
  { value: "scrapbook", label: "Scrapbook" },
  { value: "glassmorphism", label: "Glassmorphism" },
  { value: "cute-pastel", label: "Cute Pastel" },
  { value: "minimal", label: "Minimal" },
  { value: "vintage-journal", label: "Vintage Journal" },
  { value: "birthday-theme", label: "Birthday Theme" },
];

export function MemoryCardEditor({ card, onChange, onDelete, onDuplicate }: MemoryCardEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Revoke old preview if it exists
    if (card.preview) {
      URL.revokeObjectURL(card.preview);
    }
    
    const preview = URL.createObjectURL(file);
    onChange({ ...card, file, preview });
  };

  // Convert MemoryCardEntry to MemoryCard for the preview
  const previewCard = { ...card, url: card.preview };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Editor Form */}
      <div className="space-y-4">
        
        {/* Actions */}
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={onDuplicate} title="Duplicate Card" className="p-2 text-foreground/50 hover:text-primary transition-colors glass-card rounded-full">
            <Copy size={16} />
          </button>
          <button onClick={onDelete} title="Delete Card" className="p-2 text-foreground/50 hover:text-red-500 transition-colors glass-card rounded-full">
            <Trash2 size={16} />
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">Photo</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 glass-card rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors relative overflow-hidden"
          >
            {card.preview ? (
              <>
                <img src={card.preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="relative z-10 bg-white/80 p-2 rounded-full text-primary">
                  <ImagePlus size={20} />
                </div>
              </>
            ) : (
              <>
                <CameraIcon size={24} />
                <span className="text-sm text-foreground/60 mt-2">Click to upload photo</span>
              </>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>

        {/* Title & Emoji */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground/80 mb-1">Title</label>
            <input 
              type="text" 
              value={card.title || ""} 
              onChange={(e) => onChange({ ...card, title: e.target.value })}
              placeholder="e.g. Our First Trip"
              className="w-full glass-card rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="w-20">
            <label className="block text-sm font-medium text-foreground/80 mb-1">Emoji</label>
            <input 
              type="text" 
              value={card.emoji || ""} 
              onChange={(e) => onChange({ ...card, emoji: e.target.value })}
              placeholder="✈️"
              maxLength={2}
              className="w-full glass-card rounded-xl px-3 py-2 text-sm text-center outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Date & Location */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground/80 mb-1">Date</label>
            <input 
              type="text" 
              value={card.date || ""} 
              onChange={(e) => onChange({ ...card, date: e.target.value })}
              placeholder="e.g. Aug 2024"
              className="w-full glass-card rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground/80 mb-1">Location</label>
            <input 
              type="text" 
              value={card.location || ""} 
              onChange={(e) => onChange({ ...card, location: e.target.value })}
              placeholder="e.g. Paris"
              className="w-full glass-card rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            Message <span className="text-xs font-normal text-foreground/50 ml-2">(Use **bold** and *italic*)</span>
          </label>
          <textarea 
            value={card.message || ""} 
            onChange={(e) => onChange({ ...card, message: e.target.value })}
            placeholder="Write something special about this memory..."
            rows={4}
            className="w-full glass-card rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <div className="text-right text-xs text-foreground/40 mt-1">
            {(card.message || "").length} characters
          </div>
        </div>

        {/* Style & Tag */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground/80 mb-1">Card Style</label>
            <select
              value={card.style}
              onChange={(e) => onChange({ ...card, style: e.target.value as MemoryCardStyle })}
              className="w-full glass-card rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 appearance-none bg-transparent"
            >
              {STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground/80 mb-1">Mood Tag</label>
            <input 
              type="text" 
              value={card.moodTag || ""} 
              onChange={(e) => onChange({ ...card, moodTag: e.target.value.replace('#', '') })}
              placeholder="funny"
              className="w-full glass-card rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

      </div>

      {/* Live Preview */}
      <div className="flex flex-col items-center justify-center p-4 lg:p-8 bg-black/5 rounded-2xl">
        <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-4">Live Preview</h4>
        <div className="w-full max-w-sm pointer-events-none">
          <MemoryCardView card={previewCard as any} />
        </div>
      </div>
    </div>
  );
}
