/* ────────────────────────────────────────────────────────────── */
/*  Birthday Bloom — Supabase CRUD + uploads                    */
/* ────────────────────────────────────────────────────────────── */

import { nanoid } from "nanoid";
import { supabase } from "./supabase";
import type { SurpriseData, SurpriseFormState } from "./types";

/** Upload an array of photo files to the `photos` bucket. Returns public URLs. */
export async function uploadPhotos(
  files: File[],
  onProgress?: (done: number, total: number) => void,
): Promise<string[]> {
  const urls: string[] = [];
  const paths: string[] = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const ext = files[i].name.split(".").pop() ?? "jpg";
      const path = `${nanoid(12)}.${ext}`;
      const { error } = await supabase.storage.from("photos").upload(path, files[i], {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw new Error(`Photo upload failed: ${error.message}`);
      paths.push(path);
      const { data } = supabase.storage.from("photos").getPublicUrl(path);
      urls.push(data.publicUrl);
      onProgress?.(i + 1, files.length);
    }
    return urls;
  } catch (error) {
    if (paths.length > 0) {
      await supabase.storage.from("photos").remove(paths);
    }
    throw error;
  }
}

/** Upload a single song file to the `songs` bucket. Returns the public URL. */
export async function uploadSong(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "mp3";
  const path = `${nanoid(12)}.${ext}`;
  const { error } = await supabase.storage.from("songs").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(`Song upload failed: ${error.message}`);
  const { data } = supabase.storage.from("songs").getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Create a new surprise:
 *  1. Upload photos → get URLs
 *  2. Upload song (if mp3) → get URL
 *  3. Insert row into `surprises` table
 *  Returns the generated surprise ID.
 */
export async function createSurprise(
  form: SurpriseFormState,
  onProgress?: (stage: string, done: number, total: number) => void,
): Promise<string> {
  const id = nanoid(8);

  let photoUrls: string[] = [];
  let songUrl = form.songUrl || null;

  try {
    // 1. Upload photos
    const photoFiles = form.photos.map((p) => p.file);
    photoUrls = await uploadPhotos(photoFiles, (done, total) =>
      onProgress?.("photos", done, total),
    );

    // 2. Upload song (if file upload)
    if (form.songType === "upload" && form.songFile) {
      songUrl = await uploadSong(form.songFile);
      onProgress?.("song", 1, 1);
    }

    // Calculate expiration
    let expiresAt: string | null = null;
    let autoDeleteEnabled = false;
    if (form.deletionPeriod !== null) {
      const d = new Date();
      d.setDate(d.getDate() + form.deletionPeriod);
      expiresAt = d.toISOString();
      autoDeleteEnabled = true;
    }

    // 3. Insert surprise row
    const { error } = await supabase.from("surprises").insert({
      id,
      recipient_name: form.recipientName,
      message: form.message,
      relationship: form.relationship,
      recipient_gender: form.recipientGender,
      theme: form.theme,
      gift_style: form.giftStyle,
      cat_style: form.catStyle,
      song_url: songUrl,
      song_name: form.songName || null,
      song_type: form.songType,
      photos: photoUrls.map((url, i) => ({
        url,
        caption: form.photos[i].caption,
        rotation: [-3, 2, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3, 1, 2, -2, 3, -1, 2, -3][i % 20],
        layout: "polaroid"
      })),
      expires_at: expiresAt,
      auto_delete_enabled: autoDeleteEnabled,
      deletion_period: form.deletionPeriod,
    });

    if (error) throw new Error(`Failed to save surprise: ${error.message}`);

    return id;
  } catch (error) {
    // Cleanup if anything fails
    if (photoUrls.length > 0) {
      const photoPaths = photoUrls.map(url => url.split("/photos/")[1]).filter(Boolean);
      if (photoPaths.length > 0) await supabase.storage.from("photos").remove(photoPaths);
    }
    if (form.songType === "upload" && songUrl) {
      const songPath = songUrl.split("/songs/")[1];
      if (songPath) await supabase.storage.from("songs").remove([songPath]);
    }
    throw error;
  }
}

/** Fetch a surprise by ID. Returns null if not found or expired. */
export async function getSurprise(id: string): Promise<SurpriseData | null> {
  const { data, error } = await supabase.from("surprises").select("*").eq("id", id).single();

  if (error || !data) return null;

  // Check expiry
  if (data.expires_at && new Date(data.expires_at) < new Date()) return null;

  return data as SurpriseData;
}
