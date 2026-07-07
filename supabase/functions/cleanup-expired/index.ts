import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client with the Service Role key
// This is required to bypass RLS and delete records/storage files
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    // 1. Fetch expired surprises
    const { data: expiredSurprises, error: fetchError } = await supabase
      .from("surprises")
      .select("id, photo_urls, song_url")
      .eq("auto_delete_enabled", true)
      .lt("expires_at", new Date().toISOString());

    if (fetchError) {
      throw new Error(`Error fetching expired surprises: ${fetchError.message}`);
    }

    if (!expiredSurprises || expiredSurprises.length === 0) {
      return new Response(
        JSON.stringify({ message: "No expired surprises found.", deleted: { surprises: 0, photos: 0, songs: 0 } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    let deletedPhotosCount = 0;
    let deletedSongsCount = 0;
    const surpriseIdsToDelete: string[] = [];

    // 2. Loop through each expired surprise and delete associated storage files
    for (const surprise of expiredSurprises) {
      surpriseIdsToDelete.push(surprise.id);

      // Extract photo paths from public URLs
      if (surprise.photo_urls && surprise.photo_urls.length > 0) {
        const photoPaths = surprise.photo_urls.map((url: string) => {
          // Public URLs usually look like: https://[project].supabase.co/storage/v1/object/public/photos/[filename]
          const parts = url.split("/photos/");
          return parts.length > 1 ? parts[1] : null;
        }).filter(Boolean) as string[];

        if (photoPaths.length > 0) {
          const { data, error } = await supabase.storage.from("photos").remove(photoPaths);
          if (!error && data) {
            deletedPhotosCount += data.length;
          } else if (error) {
            console.error(`Failed to delete photos for surprise ${surprise.id}:`, error.message);
          }
        }
      }

      // Extract song path from public URL
      if (surprise.song_url) {
        const parts = surprise.song_url.split("/songs/");
        const songPath = parts.length > 1 ? parts[1] : null;
        
        if (songPath) {
          const { data, error } = await supabase.storage.from("songs").remove([songPath]);
          if (!error && data && data.length > 0) {
            deletedSongsCount++;
          } else if (error) {
            console.error(`Failed to delete song for surprise ${surprise.id}:`, error.message);
          }
        }
      }
    }

    // 3. Delete records from the surprises table
    const { error: deleteError } = await supabase
      .from("surprises")
      .delete()
      .in("id", surpriseIdsToDelete);

    if (deleteError) {
      throw new Error(`Error deleting surprise records: ${deleteError.message}`);
    }

    const summary = {
      message: "Cleanup successful",
      deleted: {
        surprises: surpriseIdsToDelete.length,
        photos: deletedPhotosCount,
        songs: deletedSongsCount,
      }
    };

    console.log(JSON.stringify(summary));

    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Cleanup function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
