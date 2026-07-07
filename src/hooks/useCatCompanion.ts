import { useState, useCallback } from "react";
import type { CatStyle } from "@/lib/types";
import { CAT_PERSONALITIES, type CatEvent } from "@/lib/cat-personalities";
import type { CatMood } from "@/components/birthday/CatMascot";

export function useCatCompanion(catStyle: CatStyle = "default") {
  const personality = CAT_PERSONALITIES[catStyle] || CAT_PERSONALITIES.default;
  
  // Initialize with a hero message
  const initialDialogues = personality.dialogues.hero;
  const initialDialogue = initialDialogues[Math.floor(Math.random() * initialDialogues.length)];
  
  const [mood, setMood] = useState<CatMood>(initialDialogue.mood);
  const [message, setMessage] = useState<string>(initialDialogue.message);

  const triggerEvent = useCallback((event: CatEvent) => {
    const currentPersonality = CAT_PERSONALITIES[catStyle] || CAT_PERSONALITIES.default;
    const pool = currentPersonality.dialogues[event];
    
    if (pool && pool.length > 0) {
      const selected = pool[Math.floor(Math.random() * pool.length)];
      setMood(selected.mood);
      setMessage(selected.message);
    }
  }, [catStyle]);

  const setCustomMessage = useCallback((customMood: CatMood, customMessage: string) => {
    setMood(customMood);
    setMessage(customMessage);
  }, []);

  return {
    mood,
    message,
    triggerEvent,
    setCustomMessage,
    idleBehavior: personality.idleBehavior
  };
}
