import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SongType } from "@/lib/types";

interface MusicPlayerProps {
  songUrl: string | null;
  songName: string | null;
  songType: SongType;
  shouldStart: boolean;
}

/** Default fallback track when no song is uploaded */
const DEFAULT_TRACK =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1a29c05c67.mp3?filename=relaxing-birthday-music-box-lullaby-118465.mp3";

export function MusicPlayer({ songUrl, songName, songType, shouldStart }: MusicPlayerProps) {
  const isUploadOrDefault = !songType || songType === "upload";
  const trackUrl = songUrl || DEFAULT_TRACK;
  const displayName = songName || "Birthday Music Box";

  // For Spotify/YouTube, we only show the embed after gift unlocks
  if (songType === "spotify" && songUrl) {
    return shouldStart ? <SpotifyEmbed url={songUrl} /> : null;
  }
  if (songType === "youtube" && songUrl) {
    return shouldStart ? <YouTubeEmbed url={songUrl} /> : null;
  }

  // Default: HTML5 audio player
  return <AudioPlayer url={trackUrl} name={displayName} shouldStart={shouldStart} />;
}

/* ── HTML5 Audio Player (floating "Now Playing" widget) ── */

function AudioPlayer({
  url,
  name,
  shouldStart,
}: {
  url: string;
  name: string;
  shouldStart: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const a = new Audio(url);
    a.loop = true;
    a.volume = volume;
    a.preload = "auto";
    audioRef.current = a;
    setReady(true);

    const handleTime = () => {
      if (a.duration) setProgress((a.currentTime / a.duration) * 100);
    };
    a.addEventListener("timeupdate", handleTime);

    return () => {
      a.removeEventListener("timeupdate", handleTime);
      a.pause();
      audioRef.current = null;
    };
  }, [url]);

  // Auto-play when shouldStart becomes true
  useEffect(() => {
    if (!shouldStart || !audioRef.current || playing) return;
    audioRef.current
      .play()
      .then(() => {
        setPlaying(true);
        setExpanded(true);
        // Auto-collapse after 4s
        setTimeout(() => setExpanded(false), 4000);
      })
      .catch(() => {});
  }, [shouldStart, playing]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  if (!ready || !shouldStart) {
    // Before gift opens: show compact muted toggle
    if (!ready) return null;
    return (
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="glass-card fixed top-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-primary"
        aria-label={playing ? "Mute music" : "Play music"}
      >
        <MusicIcon muted={!playing} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-20 right-5 z-40"
    >
      <motion.div
        layout
        className="glass-card rounded-2xl overflow-hidden shadow-lg"
        style={{ width: expanded ? 280 : 52 }}
      >
        {expanded ? (
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={toggle}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-primary/60 font-medium">Now Playing</p>
                <p className="text-sm font-medium text-foreground/80 truncate">{name}</p>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="text-foreground/40 hover:text-foreground/60"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            {/* Progress bar */}
            <div className="h-1 bg-primary/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-primary/60 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Volume */}
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/50"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 accent-primary"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="w-[52px] h-[52px] flex items-center justify-center text-primary"
          >
            <MusicIcon muted={!playing} />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Spotify Embed ── */
function SpotifyEmbed({ url }: { url: string }) {
  // Convert spotify.com/track/xxx to embed URL
  const embedUrl = url.replace("open.spotify.com", "open.spotify.com/embed");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-5 z-40 glass-card rounded-2xl overflow-hidden shadow-lg"
    >
      <iframe
        src={embedUrl}
        width="280"
        height="80"
        allow="encrypted-media"
        className="border-0"
        title="Spotify player"
      />
    </motion.div>
  );
}

/* ── YouTube Embed ── */
function YouTubeEmbed({ url }: { url: string }) {
  // Extract video ID
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]+)/);
  const videoId = match?.[1];
  if (!videoId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-5 z-40 glass-card rounded-2xl overflow-hidden shadow-lg"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1`}
        width="280"
        height="60"
        allow="autoplay; encrypted-media"
        className="border-0"
        title="YouTube player"
      />
    </motion.div>
  );
}

/* ── Icons ── */
function MusicIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      {muted && <line x1="2" y1="2" x2="22" y2="22" />}
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}
