import { createFileRoute } from "@tanstack/react-router";
import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";
import type { SurpriseData } from "@/lib/types";

/** Hardcoded demo data — showcases the full recipient experience. */
const DEMO_SURPRISE: SurpriseData = {
  id: "demo",
  recipient_name: "Someone Special",
  message:
    "Happy Birthday!\n\nWishing you endless happiness, beautiful moments, unforgettable memories and all the success in the world.\n\nMay your smile always stay bright, your heart remain full of joy, and your days be surrounded by people who truly care about you.\n\nThank you for being such a wonderful person.\n\nMay this year bring countless reasons to smile, dream bigger, laugh louder and create even more amazing memories.\n\nStay happy. Stay blessed. And never stop being the incredible person you are.",
  relationship: "best-friend",
  recipient_gender: "neutral",
  theme: "pink-lavender",
  gift_style: "classic",
  cat_style: "default",
  song_url: null,
  song_name: null,
  song_type: null,
  photos: [
    {
      id: "demo1",
      url: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&auto=format&fit=crop&q=70",
      title: "Our first trip!",
      style: "polaroid",
      rotation: -2,
    },
    {
      id: "demo2",
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=70",
      title: "Movie night",
      style: "scrapbook",
      rotation: 1,
    },
    {
      id: "demo3",
      url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=70",
      title: "Coffee date",
      emoji: "☕️",
      style: "glassmorphism",
      rotation: -1,
    },
    {
      id: "demo4",
      url: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&auto=format&fit=crop&q=70",
      title: "Park walk",
      style: "cute-pastel",
      rotation: 2,
    },
    {
      id: "demo5",
      url: "https://images.unsplash.com/photo-1522008693277-086ad6075b23?w=800&auto=format&fit=crop&q=70",
      title: "Silly faces",
      style: "vintage-journal",
      rotation: -3,
    },
    {
      id: "demo6",
      url: "https://images.unsplash.com/photo-1464347744102-11db6282f854?w=800&auto=format&fit=crop&q=70",
      style: "birthday-theme",
      rotation: 0,
    }
  ],
  created_at: new Date().toISOString(),
  expires_at: null,
  auto_delete_enabled: false,
  deletion_period: null,
};

export const Route = createFileRoute("/demo")({
  component: DemoPage,
});

function DemoPage() {
  return <BirthdayExperience data={DEMO_SURPRISE} />;
}
