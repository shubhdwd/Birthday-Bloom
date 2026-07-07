import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="w-full relative border-t border-purple-200/40 bg-white/40 backdrop-blur-sm mt-12 py-6 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-purple-300/20 rounded-full blur-2xl" />
        <Sparkles className="absolute top-3 right-[20%] text-purple-300/40 w-3 h-3 animate-pulse" />
        <Sparkles className="absolute bottom-3 left-[20%] text-pink-300/40 w-2 h-2 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        {/* Brand */}
        <motion.a 
          href="/"
          whileHover={{ scale: 1.02 }}
          className="group cursor-pointer font-display text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]"
        >
          Birthday Bloom ✨
        </motion.a>

        {/* Developer Credit */}
        <div className="text-[13px] font-medium text-foreground/70 flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" /> by
          <a 
            href="#" 
            className="ml-1 text-purple-600/90 hover:text-purple-500 transition-colors"
          >
            Shubh Dwivedi
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-foreground/60 font-medium">
          © 2026 Birthday Bloom
        </div>
      </div>
    </footer>
  );
}
