import { useRef, useState, useEffect } from "react";
import type { SongType } from "@/lib/types";

interface SongUploaderProps {
  songFile: File | null;
  songUrl: string;
  songName: string;
  songType: SongType;
  onFileChange: (file: File | null) => void;
  onUrlChange: (url: string) => void;
  onNameChange: (name: string) => void;
  onTypeChange: (type: SongType) => void;
}

type Tab = "upload" | "spotify" | "youtube";

export function SongUploader({
  songFile,
  songUrl,
  songName,
  songType,
  onFileChange,
  onUrlChange,
  onNameChange,
  onTypeChange,
}: SongUploaderProps) {
  const [activeTab, setActiveTab] = useState<Tab>(
    songType === "spotify" ? "spotify" : songType === "youtube" ? "youtube" : "upload",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  // Clean up audio preview URL
  useEffect(() => {
    return () => {
      if (audioPreview) URL.revokeObjectURL(audioPreview);
    };
  }, [audioPreview]);

  const handleFile = (file: File) => {
    onFileChange(file);
    onNameChange(file.name.replace(/\.[^.]+$/, ""));
    onTypeChange("upload");
    const url = URL.createObjectURL(file);
    setAudioPreview(url);
  };

  const clearSong = () => {
    onFileChange(null);
    onUrlChange("");
    onNameChange("");
    onTypeChange(null);
    if (audioPreview) URL.revokeObjectURL(audioPreview);
    setAudioPreview(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "upload", label: "Upload MP3" },
    { key: "spotify", label: "Spotify" },
    { key: "youtube", label: "YouTube" },
  ];

  return (
    <div className="space-y-4">
      {/* Tab selector */}
      <div className="flex gap-1 glass-card rounded-full p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              clearSong();
            }}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary text-white shadow"
                : "text-foreground/50 hover:text-foreground/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Upload MP3 */}
      {activeTab === "upload" && (
        <div>
          {songFile ? (
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                🎵
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground/80 truncate">{songFile.name}</p>
                <p className="text-xs text-foreground/40">
                  {(songFile.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
              <button
                onClick={clearSong}
                aria-label="Remove uploaded song"
                className="text-red-400 hover:text-red-500 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload MP3"
              className="glass-card rounded-2xl border-2 border-dashed border-primary/20 p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
            >
              <p className="text-3xl mb-2">🎵</p>
              <p className="text-foreground/60 font-medium">
                Drop an MP3 here or <span className="text-primary underline">browse</span>
              </p>
              <p className="text-xs text-foreground/40 mt-1">MP3 format • Max 10MB</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="audio/mpeg,audio/mp3"
            aria-label="Upload MP3 File"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          {/* Audio preview */}
          {audioPreview && (
            <audio
              controls
              src={audioPreview}
              aria-label="Audio preview"
              className="w-full mt-3 h-10 rounded-lg"
              style={{ filter: "hue-rotate(320deg)" }}
            />
          )}
        </div>
      )}

      {/* Spotify URL */}
      {activeTab === "spotify" && (
        <div>
          <input
            type="url"
            value={songType === "spotify" ? songUrl : ""}
            onChange={(e) => {
              onUrlChange(e.target.value);
              onTypeChange("spotify");
              onNameChange("Spotify Track");
            }}
            placeholder="Paste Spotify track URL..."
            aria-label="Spotify Track URL"
            className="w-full glass-card rounded-2xl px-5 py-3.5 text-foreground/90 placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <p className="text-xs text-foreground/40 mt-2">
            Example: https://open.spotify.com/track/...
          </p>
        </div>
      )}

      {/* YouTube URL */}
      {activeTab === "youtube" && (
        <div>
          <input
            type="url"
            value={songType === "youtube" ? songUrl : ""}
            onChange={(e) => {
              onUrlChange(e.target.value);
              onTypeChange("youtube");
              onNameChange("YouTube Video");
            }}
            placeholder="Paste YouTube video URL..."
            aria-label="YouTube Video URL"
            className="w-full glass-card rounded-2xl px-5 py-3.5 text-foreground/90 placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <p className="text-xs text-foreground/40 mt-2">
            Example: https://www.youtube.com/watch?v=... or https://youtu.be/...
          </p>
        </div>
      )}

      {/* Skip note */}
      <p className="text-xs text-foreground/40 text-center">
        This step is optional — skip if you don't want to add music
      </p>
    </div>
  );
}
