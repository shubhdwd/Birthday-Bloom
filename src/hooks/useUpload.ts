import { useCallback, useState } from "react";
import { createSurprise } from "@/lib/surprise-api";
import type { SurpriseFormState } from "@/lib/types";

interface UploadState {
  isUploading: boolean;
  stage: string; // "packing" | "uploading_photos" | "preparing_music" | "wrapping" | "done"
  progress: number; // 0–100
  error: string | null;
  resultId: string | null;
}

/**
 * Hook for creating a surprise with upload progress tracking.
 */
export function useUpload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    stage: "",
    progress: 0,
    error: null,
    resultId: null,
  });

  const upload = useCallback(async (form: SurpriseFormState) => {
    setState({ isUploading: true, stage: "packing", progress: 0, error: null, resultId: null });

    try {
      const totalPhotos = form.photos.length;
      const hasSong = form.songType === "upload" && form.songFile;
      // Total steps = photos + (song? 1 : 0) + 1 (DB insert)
      const totalSteps = totalPhotos + (hasSong ? 1 : 0) + 1;
      let completedSteps = 0;

      const id = await createSurprise(form, (stage, done) => {
        let currentStage = "packing";
        if (stage === "photos") {
          completedSteps = done;
          currentStage = "uploading_photos";
        }
        if (stage === "song") {
          completedSteps = totalPhotos + 1;
          currentStage = "preparing_music";
        }
        const pct = Math.round((completedSteps / totalSteps) * 100);
        setState((s) => ({ ...s, stage: currentStage, progress: Math.min(pct, 95) }));
      });
      
      setState((s) => ({ ...s, stage: "wrapping", progress: 99 }));
      // Give UI a tiny moment to show the wrapping stage before resolving
      await new Promise(resolve => setTimeout(resolve, 600));

      setState({ isUploading: false, stage: "done", progress: 100, error: null, resultId: id });
      return id;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setState((s) => ({ ...s, isUploading: false, error: msg }));
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isUploading: false, stage: "", progress: 0, error: null, resultId: null });
  }, []);

  return { ...state, upload, reset };
}
