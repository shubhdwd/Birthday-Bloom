import React, { useCallback, useRef } from "react";
import { Reorder, motion, AnimatePresence, useDragControls } from "framer-motion";
import { nanoid } from "nanoid";
import { GripVertical, Plus } from "lucide-react";
import type { MemoryCardEntry } from "@/lib/types";
import { MemoryCardEditor } from "./MemoryCardEditor";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;
const MAX_CARDS = 20;

interface MemoryCardsManagerProps {
  cards: MemoryCardEntry[];
  onChange: (cards: MemoryCardEntry[]) => void;
}

export function MemoryCardsManager({ cards, onChange }: MemoryCardsManagerProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const newCards: MemoryCardEntry[] = [];
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      if (!ACCEPTED_TYPES.includes(file.type)) continue;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;
      if (cards.length + newCards.length >= MAX_CARDS) break;

      newCards.push({
        id: nanoid(8),
        file,
        preview: URL.createObjectURL(file),
        style: "polaroid",
        rotation: Math.floor(Math.random() * 6) - 3, // random rotation between -3 and 3
        title: "",
        message: "",
      });
    }

    if (newCards.length > 0) {
      onChange([...cards, ...newCards]);
      setExpandedId(newCards[newCards.length - 1].id); // expand the last added one
    }
  }, [cards, onChange]);

  const handleAddCard = () => {
    fileInputRef.current?.click();
  };

  const updateCard = (updated: MemoryCardEntry) => {
    onChange(cards.map(c => c.id === updated.id ? updated : c));
  };

  const deleteCard = (id: string) => {
    const cardToDelete = cards.find(c => c.id === id);
    if (cardToDelete?.preview) {
      URL.revokeObjectURL(cardToDelete.preview);
    }
    onChange(cards.filter(c => c.id !== id));
  };

  const duplicateCard = (card: MemoryCardEntry) => {
    if (cards.length >= MAX_CARDS) return;
    const duplicated: MemoryCardEntry = {
      ...card,
      id: nanoid(8),
      title: card.title ? `${card.title} (Copy)` : "",
      rotation: Math.floor(Math.random() * 6) - 3,
    };
    onChange([...cards, duplicated]);
    setExpandedId(duplicated.id);
  };

  return (
    <div className="space-y-4">
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/jpeg,image/png,image/webp" 
        multiple 
        className="hidden" 
        onChange={(e) => e.target.files && handleFiles(e.target.files)} 
      />

      <Reorder.Group axis="y" values={cards} onReorder={onChange} className="space-y-3">
        <AnimatePresence>
          {cards.map((card, index) => (
            <DraggableCardItem 
              key={card.id} 
              card={card} 
              index={index} 
              expandedId={expandedId} 
              setExpandedId={setExpandedId} 
              updateCard={updateCard} 
              deleteCard={deleteCard} 
              duplicateCard={duplicateCard} 
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Add New Button */}
      {cards.length < MAX_CARDS ? (
        <button
          onClick={handleAddCard}
          className="w-full glass-card border-2 border-dashed border-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/60 hover:bg-white/40 transition-all text-primary font-medium"
        >
          <div className="p-3 bg-primary/10 rounded-full">
            <Plus size={24} />
          </div>
          Add Memory Card
          <p className="text-xs text-foreground/50 font-normal">
            {MAX_CARDS - cards.length} remaining
          </p>
        </button>
      ) : (
        <p className="text-center text-sm text-foreground/50">Maximum of {MAX_CARDS} cards reached.</p>
      )}
    </div>
  );
}

function DraggableCardItem({ 
  card, 
  index, 
  expandedId, 
  setExpandedId, 
  updateCard, 
  deleteCard, 
  duplicateCard 
}: { 
  card: MemoryCardEntry, 
  index: number, 
  expandedId: string | null, 
  setExpandedId: (id: string | null) => void,
  updateCard: (card: MemoryCardEntry) => void,
  deleteCard: (id: string) => void,
  duplicateCard: (card: MemoryCardEntry) => void
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item 
      value={card} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      dragListener={false}
      dragControls={controls}
      className="glass-card rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header (Always visible) */}
      <div 
        className="flex items-center gap-3 p-3 bg-white/40 cursor-pointer hover:bg-white/60 transition-colors"
        onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
      >
        <div 
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-black/5 rounded-md text-foreground/50 touch-none"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical size={16} />
        </div>
        
        {card.preview ? (
          <img src={card.preview} alt="Thumb" className="w-10 h-10 rounded-md object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-md bg-black/5 flex items-center justify-center">
            📸
          </div>
        )}
        
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground/90">
            {card.title || `Memory Card ${index + 1}`}
          </h4>
          <p className="text-xs text-foreground/50 line-clamp-1">
            {card.message || "No message written yet."}
          </p>
        </div>
        
        <div className="px-3 hidden sm:block">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
            {card.style}
          </span>
        </div>
      </div>

      {/* Editor (Expanded) */}
      <AnimatePresence>
        {expandedId === card.id && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-primary/10"
          >
            <MemoryCardEditor 
              card={card} 
              onChange={updateCard}
              onDelete={() => deleteCard(card.id)}
              onDuplicate={() => duplicateCard(card)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Reorder.Item>
  );
}
