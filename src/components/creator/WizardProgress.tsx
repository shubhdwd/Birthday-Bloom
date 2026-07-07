import { motion } from "framer-motion";

interface WizardProgressProps {
  current: number;
  labels: string[];
}

export function WizardProgress({ current, labels }: WizardProgressProps) {
  return (
    <div className="relative">
      {/* Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-primary/10" />
      <div
        className="absolute top-5 left-0 h-0.5 bg-primary/60 transition-all duration-500"
        style={{ width: `${(current / (labels.length - 1)) * 100}%` }}
      />

      {/* Dots + labels */}
      <div className="relative flex justify-between">
        {labels.map((label, i) => {
          const isDone = i < current;
          const isActive = i === current;

          return (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor:
                    isDone || isActive ? "oklch(0.72 0.15 350)" : "oklch(0.92 0.03 340)",
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold z-10"
                style={{
                  color: isDone || isActive ? "white" : "oklch(0.62 0.08 340)",
                  boxShadow: isActive ? "0 0 20px oklch(0.72 0.15 350 / 0.4)" : "none",
                }}
              >
                {isDone ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  isActive ? "text-primary" : "text-foreground/40"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
