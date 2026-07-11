import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { SparkleIcon, GiftIcon } from "@/components/birthday/EmojiIcons";
import { CatMascot } from "@/components/birthday/CatMascot";
import type { CatStyle } from "@/lib/types";
import { getSurpriseUrl } from "@/lib/url";
import { QRCodeShare } from "./QRCodeShare";

interface SuccessModalProps {
  surpriseId: string;
  deletionPeriod: number | null;
  catStyle: CatStyle;
  onClose: () => void;
  onCreateAnother: () => void;
}

export function SuccessModal({ surpriseId, deletionPeriod, catStyle, onClose, onCreateAnother }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const link = getSurpriseUrl(surpriseId);

  // Fire confetti on mount
  useEffect(() => {
    const colors = ["#f9a8d4", "#c4b5fd", "#fde68a", "#fbcfe8", "#ffffff"];
    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors,
      scalar: 1.1,
    });
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "A Birthday Surprise for You! 🎂",
        text: "Someone made a special birthday surprise just for you!",
        url: link,
      });
    } else {
      copyLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-6"
    >
      <CatMascot mood="celebrating" message="I hope they absolutely love it 🥺" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card relative mx-auto max-w-md w-full rounded-3xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-5xl mb-4"
        >
          🎉
        </motion.div>

        <h2 className="font-display text-3xl text-gradient mb-2">Surprise Created Successfully</h2>
        <p className="text-foreground/60 mb-6">Share this magical link with someone special</p>

        {/* Privacy Indicator */}
        <div className="flex justify-center mb-6">
          <span className="chip bg-primary/5 border-primary/20 text-primary flex items-center gap-2">
            🔒 {deletionPeriod === null ? "Private Surprise (Kept Forever)" : `Auto Deletes in ${deletionPeriod} Days`}
          </span>
        </div>

        {/* Link display */}
        <div className="glass-card rounded-2xl px-4 py-3 mb-6 text-sm font-mono text-foreground/70 break-all">
          {link}
        </div>

        {/* QR Code Share Component */}
        <QRCodeShare url={link} catStyle={catStyle} />
        
        <div className="mt-6" />

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={copyLink}
            className="btn-gift rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] shadow-md shadow-lavender/20"
          >
            {copied ? "✓ Copied!" : "Copy Link"}
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-full py-3 text-sm font-semibold text-foreground/80 hover:bg-white/40 hover:scale-[1.02] transition-all text-center shadow-sm flex items-center justify-center"
          >
            Preview
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={share}
            className="glass-card rounded-full py-3 text-sm font-medium text-foreground/70 hover:text-foreground/90 hover:bg-white/40 transition-all shadow-sm"
          >
            Share
          </button>
          <button
            onClick={onCreateAnother}
            className="glass-card rounded-full py-3 text-sm font-medium text-foreground/70 hover:text-foreground/90 hover:bg-white/40 transition-all shadow-sm"
          >
            Create Another
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/30 hover:text-foreground/60 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
