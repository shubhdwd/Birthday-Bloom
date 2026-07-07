import { createFileRoute } from "@tanstack/react-router";
import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";
import { motion } from "framer-motion";
import { FloatingHearts, Sparkles } from "@/components/birthday/FloatingHearts";
import { CatMascot } from "@/components/birthday/CatMascot";
import { Link } from "@tanstack/react-router";
import { getSurprise } from "@/lib/surprise-api";

export const Route = createFileRoute("/s/$id")({
  loader: async ({ params }) => {
    try {
      const data = await getSurprise(params.id);
      return { data };
    } catch (e) {
      return { data: null };
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.data) {
      return {
        meta: [
          { title: "Surprise Not Found | Birthday Bloom" }
        ]
      };
    }
    const name = loaderData.data.recipient_name;
    return {
      meta: [
        { title: `A Birthday Surprise for ${name}! 🎂✨` },
        { property: "og:title", content: `A Birthday Surprise for ${name}! 🎂✨` },
        { property: "og:description", content: "Someone made a special digital birthday gift just for you." },
      ]
    };
  },
  component: SurprisePage,
});

function SurprisePage() {
  const { data } = Route.useLoaderData();

  if (!data) return <NotFoundScreen />;

  return <BirthdayExperience data={data} />;
}

/* ── Themed loading screen ── */
function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.06 340), oklch(0.9 0.08 300), oklch(0.95 0.05 45), oklch(0.92 0.07 20))",
        }}
      />
      <FloatingHearts count={10} />
      <Sparkles count={20} />
      <CatMascot mood="adorable" message="Loading your surprise~ ✨" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🎁
        </motion.div>
        <h1 className="font-display text-3xl md:text-4xl text-gradient mb-3">
          Unwrapping your surprise...
        </h1>
        <p className="font-script text-xl text-primary/70">Just a moment ✨</p>
        {/* Simple pulsing dots loader */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-primary/60"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Themed 404 screen ── */
function NotFoundScreen() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.06 340), oklch(0.9 0.08 300), oklch(0.95 0.05 45), oklch(0.92 0.07 20))",
        }}
      />
      <FloatingHearts count={6} />
      <CatMascot mood="emotional" message="I couldn't find this surprise 🥺" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative z-10 mx-auto max-w-md rounded-3xl p-10 text-center"
      >
        <div className="text-6xl mb-4">🥺</div>
        <h1 className="font-display text-3xl text-gradient mb-3">Surprise Not Found</h1>
        <p className="text-foreground/70 mb-6">
          This surprise doesn't exist or may have expired. Ask the person who sent it to create a
          new one!
        </p>
        <Link
          to="/"
          className="btn-gift inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
