/* ────────────────────────────────────────────────────────────── */
/*  Birthday Bloom — Core types                                 */
/* ────────────────────────────────────────────────────────────── */

export type Relationship =
  | "friend"
  | "best-friend"
  | "girlfriend"
  | "boyfriend"
  | "crush"
  | "sister"
  | "brother"
  | "mother"
  | "father"
  | "partner"
  | "someone-special";

export type RecipientGender = "female" | "male" | "neutral";

export type Theme = "pink-lavender" | "pink-purple" | "midnight-purple";

export type GiftStyle = "classic" | "ribbon" | "cute-box" | "sparkle-box" | "vintage-box" | "galaxy-box";

export type CatStyle = "default" | "sleepy" | "playful" | "princess" | "galaxy" | "angel" | "witch";

export type SongType = "upload" | "spotify" | "youtube" | null;

export interface SurpriseData {
  id: string;
  recipient_name: string;
  message: string;
  relationship: Relationship;
  recipient_gender: RecipientGender;
  theme: Theme;
  gift_style: GiftStyle;
  cat_style: CatStyle;
  song_url: string | null;
  song_name: string | null;
  song_type: SongType;
  photos: {
    url: string;
    caption: string;
    rotation: number;
    layout: string;
  }[];
  created_at: string;
  expires_at: string | null;
  auto_delete_enabled: boolean;
  deletion_period: number | null;
}

/** Form state used by the creator wizard (before DB insertion). */
export interface SurpriseFormState {
  recipientName: string;
  message: string;
  relationship: Relationship;
  recipientGender: RecipientGender;
  theme: Theme;
  giftStyle: GiftStyle;
  catStyle: CatStyle;
  songFile: File | null;
  songUrl: string;
  songName: string;
  songType: SongType;
  photos: PhotoEntry[];
  deletionPeriod: number | null;
}

export interface PhotoEntry {
  file: File;
  preview: string; // object URL for preview
  caption: string;
}
