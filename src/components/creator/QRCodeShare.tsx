import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, QrCode, Sparkles, Image as ImageIcon } from "lucide-react";
import * as htmlToImage from "html-to-image";
import type { CatStyle } from "@/lib/types";
import { QRDecorations } from "./qr/QRDecorations";
import { PremiumStickerFrame } from "./qr/PremiumStickerFrame";

interface QRCodeShareProps {
  url: string;
  catStyle?: CatStyle;
}

type DownloadType = "classic" | "cute" | "sticker";

export function QRCodeShare({ url, catStyle = "default" }: QRCodeShareProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [downloadType, setDownloadType] = useState<DownloadType | null>(null);

  // Hidden refs for generation
  const classicRef = useRef<HTMLDivElement>(null);
  const cuteRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  // Premium Reveal Animation
  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 1200); // Slightly longer for the "Creating your Bloom QR..." feel
    return () => clearTimeout(timer);
  }, [url, catStyle]);

  const handleDownload = async (type: DownloadType) => {
    setDownloadType(type);
    setIsDownloading(true);

    try {
      let node: HTMLElement | null = null;
      let width = 1024;
      let height = 1024;

      if (type === "classic") {
        node = classicRef.current;
      } else if (type === "cute") {
        node = cuteRef.current;
      } else if (type === "sticker") {
        node = stickerRef.current;
        width = 1024;
        height = 1280; // slightly taller for sticker aspect ratio
      }

      if (!node) throw new Error("Could not find generation node");

      // We scale the generation to match 1024x1024 for high resolution
      const scale = 1024 / node.offsetWidth;
      
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: scale,
        skipFonts: false,
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `bloom-qr-${type}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Failed to generate QR image", error);
    } finally {
      setIsDownloading(false);
      setDownloadType(null);
    }
  };

  return (
    <div className="relative glass-card rounded-3xl p-6 flex flex-col items-center border border-primary/10 shadow-sm mt-6 overflow-hidden">
      
      {/* Hidden generation nodes (rendered but positioned off-screen) */}
      <div className="absolute -left-[9999px] top-0 pointer-events-none">
        {/* Classic */}
        <div ref={classicRef} className="bg-white p-4" style={{ width: "256px", height: "256px" }}>
          <QRCodeCanvas value={url} size={224} level="H" marginSize={0} />
        </div>

        {/* Cute */}
        <div ref={cuteRef} className="bg-transparent flex items-center justify-center relative p-8" style={{ width: "320px", height: "320px" }}>
          <div className="relative">
             <div className="bg-white p-2 rounded-xl shadow-sm">
               <QRCodeCanvas value={url} size={200} level="H" marginSize={0} />
             </div>
             <QRDecorations themeId={catStyle} />
          </div>
        </div>

        {/* Sticker */}
        <div ref={stickerRef} className="bg-transparent inline-block">
          <PremiumStickerFrame>
             <div className="relative">
               <div className="bg-white p-2 rounded-xl shadow-sm">
                 <QRCodeCanvas value={url} size={180} level="H" marginSize={0} />
               </div>
               <QRDecorations themeId={catStyle} />
             </div>
          </PremiumStickerFrame>
        </div>
      </div>

      <div className="relative mb-6 flex justify-center items-center rounded-2xl overflow-hidden p-2" style={{ minHeight: "180px", minWidth: "180px" }}>
        {isGenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-foreground/60 font-medium">Creating your Bloom QR...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-black/5 relative z-0">
               <QRCodeCanvas
                 value={url}
                 size={160}
                 level="H"
                 marginSize={0}
               />
            </div>
            <QRDecorations themeId={catStyle} />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {!isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full flex flex-col gap-2"
          >
            <p className="text-xs text-foreground/50 font-medium tracking-wide text-center uppercase mb-2">
              Download Options
            </p>
            
            <button
              onClick={() => handleDownload("cute")}
              disabled={isDownloading}
              className="w-full flex items-center justify-between bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 group"
            >
              <span className="flex items-center gap-2"><Sparkles size={16} /> Cute Companion QR</span>
              {isDownloading && downloadType === "cute" ? <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> : <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />}
            </button>

            <button
              onClick={() => handleDownload("sticker")}
              disabled={isDownloading}
              className="w-full flex items-center justify-between bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 group"
            >
              <span className="flex items-center gap-2"><ImageIcon size={16} /> Premium Sticker QR</span>
              {isDownloading && downloadType === "sticker" ? <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" /> : <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />}
            </button>

            <button
              onClick={() => handleDownload("classic")}
              disabled={isDownloading}
              className="w-full flex items-center justify-between bg-foreground/5 hover:bg-foreground/10 text-foreground/70 font-semibold py-2.5 px-4 rounded-xl transition-all disabled:opacity-50 group mt-1"
            >
              <span className="flex items-center gap-2"><QrCode size={14} /> Classic QR</span>
              {isDownloading && downloadType === "classic" ? <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground/70 rounded-full animate-spin" /> : <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-50"
          >
            <CheckCircle2 size={14} className="text-green-400" />
            High-Res QR Downloaded!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
