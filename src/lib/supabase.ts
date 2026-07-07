import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Birthday Bloom] Supabase credentials not set. " +
      "Copy .env.example → .env and fill in your project URL and anon key.",
  );
}

// Pass dummy values if missing so the UI doesn't crash on load
export const supabase = createClient(
  supabaseUrl || "https://dummy.supabase.co",
  supabaseAnonKey || "dummy-key",
);
