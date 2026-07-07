/* ────────────────────────────────────────────────────────────── */
/*  Birthday Bloom — Relationship & gender personalization       */
/* ────────────────────────────────────────────────────────────── */

import type { Relationship, RecipientGender } from "./types";

/* ── Hero subtitles per relationship ── */

const HERO_SUBTITLES: Record<Relationship, string> = {
  friend: "Because good people deserve beautiful surprises 🎂",
  "best-friend": "Built with memories, laughter and endless moments ✨",
  girlfriend: "A little universe made just for you 💖",
  boyfriend: "A surprise made for someone truly special 🌌",
  crush: "Someone wanted you to know you're on their mind 🌸",
  sister: "For the one who makes everything brighter 🌷",
  brother: "Big birthday energy coming your way 🎉",
  partner: "A love letter wrapped in sparkles and memories ✨",
  "someone-special": "A tiny world crafted just for you 💕",
};

/* ── Cat dialogue sets per relationship ── */

interface CatDialogueSet {
  hero: string;
  gameStart: string;
  gameChase: string;
  giftCaught: string;
  letterReveal: string;
  memories: string;
  final: string;
}

const CAT_DIALOGUES: Record<Relationship, CatDialogueSet> = {
  friend: {
    hero: "Looks like your friend really cares about you 💕",
    gameStart: "This is going to be fun 🎉",
    gameChase: "Hehe~ almost caught it!",
    giftCaught: "I've been protecting this surprise for you 💖",
    letterReveal: "Tadaaa! Here's your surprise ✨",
    memories: "These memories are precious ✨",
    final: "I hope this made you smile 🌸",
  },
  "best-friend": {
    hero: "Best friends create the best memories 🥺",
    gameStart: "Your bestie made this with so much love!",
    gameChase: "Keep trying~ the surprise is worth it!",
    giftCaught: "This was made with all the inside jokes and love 💕",
    letterReveal: "Words from your best friend's heart ✨",
    memories: "Friendships like this deserve their own scrapbook 💕",
    final: "Best friends forever and ever 🌸",
  },
  girlfriend: {
    hero: "Someone really loves you 🥺",
    gameStart: "He put so much effort into this 💖",
    gameChase: "Almost there~ love is patient!",
    giftCaught: "Every word was written with love 💕",
    letterReveal: "A love letter just for you ✨",
    memories: "Every moment together is a treasure 💖",
    final: "You are so loved 🌸",
  },
  boyfriend: {
    hero: "I think somebody spent hours making this ✨",
    gameStart: "She made this with all her heart 💖",
    gameChase: "Keep chasing~ love is an adventure!",
    giftCaught: "This surprise was made with so much love 💕",
    letterReveal: "Words straight from the heart ✨",
    memories: "Every moment with you is worth keeping ✨",
    final: "You mean the world to someone 🌸",
  },
  crush: {
    hero: "Someone has been thinking about you 🌸",
    gameStart: "This is a very special surprise~",
    gameChase: "The surprise is worth the chase!",
    giftCaught: "Someone really wanted to make you smile 💕",
    letterReveal: "Read these words carefully ✨",
    memories: "Moments that made someone's heart flutter 🦋",
    final: "You made someone's world a little brighter 🌸",
  },
  sister: {
    hero: "Sisters make life magical 🌸",
    gameStart: "Your sibling made this with love!",
    gameChase: "Family surprises are the best~",
    giftCaught: "This was wrapped with sisterly love 💕",
    letterReveal: "A message from someone who knows you best ✨",
    memories: "Growing up together was the best gift 🌸",
    final: "Sisters forever 💕",
  },
  brother: {
    hero: "Big birthday energy incoming 🎉",
    gameStart: "Your sibling has a surprise!",
    gameChase: "Almost got it~ keep going!",
    giftCaught: "This was made just for you 💪",
    letterReveal: "A message from your biggest fan ✨",
    memories: "The best adventures are with family 🎉",
    final: "Happy birthday, champ 🌟",
  },
  partner: {
    hero: "Made with love, just for you 💖",
    gameStart: "Your partner created something magical!",
    gameChase: "Love is patient~ keep trying!",
    giftCaught: "Every detail was chosen with care 💕",
    letterReveal: "Words from the heart of someone who loves you ✨",
    memories: "Our story, one memory at a time 💖",
    final: "Forever and always 🌸",
  },
  "someone-special": {
    hero: "Someone wanted to make your day unforgettable ✨",
    gameStart: "A mystery surprise awaits!",
    gameChase: "The best things are worth waiting for~",
    giftCaught: "This was crafted with care and thought 💕",
    letterReveal: "A heartfelt message awaits ✨",
    memories: "Moments worth remembering forever ✨",
    final: "You are truly special 🌸",
  },
};

/* ── Default memory captions per relationship (used when creator doesn't set captions) ── */

const MEMORY_CAPTIONS: Record<Relationship, string[]> = {
  friend: [
    "One unforgettable moment 🌸",
    "Laughing until we couldn't breathe 😂",
    "Golden memories ✨",
    "Adventures together 🎉",
    "This deserves to stay forever 💕",
  ],
  "best-friend": [
    "Our story in pictures 💕",
    "Nobody gets us like we do 🥺",
    "Through everything, always together ✨",
    "This moment lives in my heart 🌸",
    "Best friend privileges 💖",
  ],
  girlfriend: [
    "Every moment with you is magic 💖",
    "My favourite smile 🌸",
    "Still falling for you ✨",
    "You make everything beautiful 💕",
    "Our little universe 🥺",
  ],
  boyfriend: [
    "Every moment with you is worth keeping ✨",
    "Adventures with my favourite person 🌌",
    "This smile is everything 💕",
    "Making memories with you 🌸",
    "You make the ordinary extraordinary ✨",
  ],
  crush: [
    "A moment I keep replaying 🦋",
    "You probably don't know how special this is 🌸",
    "Quietly treasured ✨",
    "Moments like these 💕",
    "You make the world softer 🌷",
  ],
  sister: [
    "Growing up together 🌸",
    "Partners in everything 💕",
    "Nobody knows me like you do ✨",
    "Sister moments 🌷",
    "Forever grateful for you 💖",
  ],
  brother: [
    "Best teammate ever 🎉",
    "Adventures since day one 💪",
    "The best memories 🌟",
    "Unstoppable together ✨",
    "Proud of you always 💕",
  ],
  partner: [
    "Our story, chapter by chapter 💖",
    "Every day with you is a gift ✨",
    "Home is wherever you are 🌸",
    "Building a beautiful life together 💕",
    "My favourite person, always 🥺",
  ],
  "someone-special": [
    "One unforgettable moment 🌸",
    "So many beautiful memories 💕",
    "This deserves to stay forever ✨",
    "Moments worth treasuring 🌷",
    "Making it magical ✨",
  ],
};

/* ── Floating note text per relationship ── */

const FLOATING_NOTES: Record<Relationship, string[]> = {
  friend: [
    "Thanks for being amazing 💕",
    "You deserve the world 🌎",
    "Keep smiling always ✨",
    "More memories ahead 🌸",
    "Best times together 🎉",
  ],
  "best-friend": [
    "Through thick and thin 💕",
    "Nobody compares to you 🥺",
    "Our friendship is everything ✨",
    "Always and forever 🌸",
    "You know me best 💖",
  ],
  girlfriend: [
    "You're my everything 💖",
    "Forever yours 🌸",
    "My heart is always with you ✨",
    "You make life beautiful 💕",
    "Endlessly in love 🥺",
  ],
  boyfriend: [
    "You're my favourite adventure 🌌",
    "Every moment counts ✨",
    "My heart belongs to you 💕",
    "You make everything better 🌸",
    "Grateful for you always 💖",
  ],
  crush: [
    "You're always on my mind 🦋",
    "Quietly admiring you ✨",
    "You make my day brighter 🌸",
    "Wishing you endless joy 💕",
    "You're special 🌷",
  ],
  sister: [
    "Sisters forever 💕",
    "My built-in best friend ✨",
    "Growing up with you was the best 🌸",
    "You make everything fun 🌷",
    "Love you always 💖",
  ],
  brother: [
    "Best bro ever 💪",
    "Always got your back 🌟",
    "Proud of you 🎉",
    "Let's make more memories ✨",
    "Happy birthday, champ 💕",
  ],
  partner: [
    "My person, always 💖",
    "Together is my favourite place 🌸",
    "Building forever with you ✨",
    "You complete my world 💕",
    "Endlessly grateful 🥺",
  ],
  "someone-special": [
    "You're truly special 💕",
    "Keep shining ✨",
    "The world is better with you 🌸",
    "Wishing you the best 🌷",
    "You deserve happiness 💖",
  ],
};

/* ── Gender-based decoration preferences ── */

export interface DecorationSet {
  particleType: "hearts" | "stars" | "mixed";
  accentElements: string[]; // CSS class names for decoration overlays
  palette: "warm" | "cool" | "neutral";
}

const DECORATIONS: Record<RecipientGender, DecorationSet> = {
  female: {
    particleType: "hearts",
    accentElements: ["deco-flowers", "deco-butterflies", "deco-ribbons", "deco-sparkles"],
    palette: "warm",
  },
  male: {
    particleType: "stars",
    accentElements: ["deco-stars", "deco-constellations", "deco-polaroids", "deco-particles"],
    palette: "cool",
  },
  neutral: {
    particleType: "mixed",
    accentElements: ["deco-sparkles", "deco-flowers", "deco-stars"],
    palette: "neutral",
  },
};

/* ── Public API ── */

export function getHeroSubtitle(relationship: Relationship): string {
  return HERO_SUBTITLES[relationship];
}

export function getCatDialogues(relationship: Relationship): CatDialogueSet {
  return CAT_DIALOGUES[relationship];
}

export function getMemoryCaptions(relationship: Relationship): string[] {
  return MEMORY_CAPTIONS[relationship];
}

export function getFloatingNotes(relationship: Relationship): string[] {
  return FLOATING_NOTES[relationship];
}

export function getDecorations(gender: RecipientGender): DecorationSet {
  return DECORATIONS[gender];
}

/**
 * Returns a caption for the given photo index.
 * Prefers the creator's custom caption; falls back to relationship-based default.
 */
export function getPhotoCaption(
  index: number,
  customCaptions: string[],
  relationship: Relationship,
): string {
  if (customCaptions[index]?.trim()) return customCaptions[index];
  const defaults = MEMORY_CAPTIONS[relationship];
  return defaults[index % defaults.length];
}
