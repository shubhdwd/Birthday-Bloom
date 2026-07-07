import { useState, useReducer, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WizardProgress } from "./WizardProgress";
import { MemoryCardsManager } from "./MemoryCardsManager";
import { SongUploader } from "./SongUploader";
import { SuccessModal } from "./SuccessModal";
import { CatMascot } from "@/components/birthday/CatMascot";
import { SparkleIcon, GiftIcon, HeartIcon, CakeIcon } from "@/components/birthday/EmojiIcons";
import {
  ClassicGiftIcon,
  RibbonGiftIcon,
  CuteBoxIcon,
  SparkleBoxIcon,
  VintageBoxIcon,
  GalaxyBoxIcon,
  DefaultCatIcon,
  SleepyCatIcon,
  PlayfulCatIcon,
  PrincessCatIcon,
  GalaxyCatIcon,
  AngelCatIcon,
  WitchCatIcon,
} from "./PremiumIcons";
import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";
import { useUpload } from "@/hooks/useUpload";
import type { SurpriseData } from "@/lib/types";
import type {
  SurpriseFormState,
  Relationship,
  RecipientGender,
  Theme,
  GiftStyle,
  CatStyle,
  MemoryCardEntry,
  SongType,
} from "@/lib/types";

/* ────────────────────────────────────────────────────────────── */
/*  Form reducer                                                */
/* ────────────────────────────────────────────────────────────── */

type Action =
  | { type: "SET_RELATIONSHIP"; value: Relationship }
  | { type: "SET_GENDER"; value: RecipientGender }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_MESSAGE"; value: string }
  | { type: "SET_PHOTOS"; value: MemoryCardEntry[] }
  | { type: "SET_SONG_FILE"; value: File | null }
  | { type: "SET_SONG_URL"; value: string }
  | { type: "SET_SONG_NAME"; value: string }
  | { type: "SET_SONG_TYPE"; value: SongType }
  | { type: "SET_THEME"; value: Theme }
  | { type: "SET_GIFT_STYLE"; value: GiftStyle }
  | { type: "SET_CAT_STYLE"; value: CatStyle }
  | { type: "SET_DELETION_PERIOD"; value: number | null };

const initialState: SurpriseFormState = {
  recipientName: "",
  message: "",
  relationship: "friend",
  recipientGender: "neutral",
  theme: "pink-lavender",
  giftStyle: "classic",
  catStyle: "default",
  songFile: null,
  songUrl: "",
  songName: "",
  songType: null,
  photos: [],
  deletionPeriod: 30,
};

function formReducer(state: SurpriseFormState, action: Action): SurpriseFormState {
  switch (action.type) {
    case "SET_RELATIONSHIP":
      return { ...state, relationship: action.value };
    case "SET_GENDER":
      return { ...state, recipientGender: action.value };
    case "SET_NAME":
      return { ...state, recipientName: action.value };
    case "SET_MESSAGE":
      return { ...state, message: action.value };
    case "SET_PHOTOS":
      return { ...state, photos: action.value };
    case "SET_SONG_FILE":
      return { ...state, songFile: action.value };
    case "SET_SONG_URL":
      return { ...state, songUrl: action.value };
    case "SET_SONG_NAME":
      return { ...state, songName: action.value };
    case "SET_SONG_TYPE":
      return { ...state, songType: action.value };
    case "SET_THEME":
      return { ...state, theme: action.value };
    case "SET_GIFT_STYLE":
      return { ...state, giftStyle: action.value };
    case "SET_CAT_STYLE":
      return { ...state, catStyle: action.value };
    case "SET_DELETION_PERIOD":
      return { ...state, deletionPeriod: action.value };
    default:
      return state;
  }
}

const STEP_LABELS = ["Relationship", "Message", "Photos", "Music", "Style", "Preview"];

const CAT_MESSAGES = [
  "Let's make something magical! ✨",
  "Every word counts 💕",
  "These memories are going to look amazing 📸",
  "Music makes everything more magical 🎵",
  "Almost there! Pick the perfect look ✨",
  "Ready to create some magic? 🌟",
];

/* ────────────────────────────────────────────────────────────── */
/*  Wizard orchestrator                                         */
/* ────────────────────────────────────────────────────────────── */

export function CreateSurprise() {
  const [step, setStep] = useState(0);
  const [form, dispatch] = useReducer(formReducer, initialState);
  const { isUploading, progress, stage, error, resultId, upload, reset } = useUpload();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const canNext = useCallback(() => {
    switch (step) {
      case 0:
        return true; // relationship always has a default
      case 1:
        return form.recipientName.trim().length > 0 && form.message.trim().length > 0;
      case 2:
        return form.photos.length >= 1;
      case 3:
        return true; // music is optional
      case 4:
        return true; // style always has defaults
      case 5:
        return true;
      default:
        return false;
    }
  }, [step, form]);

  const handleGenerate = async () => {
    const id = await upload(form);
    if (id) setShowSuccess(true);
  };

  const next = () => step < 5 && canNext() && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  const getPreviewData = (): SurpriseData => ({
    id: "preview",
    recipient_name: form.recipientName,
    message: form.message,
    relationship: form.relationship,
    recipient_gender: form.recipientGender,
    theme: form.theme,
    gift_style: form.giftStyle,
    cat_style: form.catStyle,
    song_url: form.songType === "upload" && form.songFile ? URL.createObjectURL(form.songFile) : form.songUrl,
    song_name: form.songName,
    song_type: form.songType,
    photos: form.photos.map(p => ({
      id: p.id,
      url: p.preview,
      title: p.title,
      message: p.message,
      date: p.date,
      location: p.location,
      moodTag: p.moodTag,
      emoji: p.emoji,
      style: p.style,
      stickerPack: p.stickerPack,
      rotation: p.rotation
    })),
    created_at: new Date().toISOString(),
    expires_at: null,
    auto_delete_enabled: false,
    deletion_period: null,
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {isPreviewing && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto overflow-x-hidden">
          <button 
            onClick={() => setIsPreviewing(false)}
            className="fixed top-4 right-4 z-50 glass-card rounded-full px-6 py-3 font-semibold hover:bg-white/40 transition-all shadow-lg flex items-center gap-2"
          >
            Close Preview
          </button>
          <BirthdayExperience data={getPreviewData()} />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, oklch(0.96 0.03 340) 0%, oklch(0.985 0.012 20) 40%)",
        }}
      />
      <CatMascot mood="adorable" message={CAT_MESSAGES[step]} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-10 pb-32 md:pb-10">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/logotn.png"
            alt="Birthday Bloom"
            className="w-48 md:w-56 mx-auto mb-4 drop-shadow-sm hover:scale-105 transition-transform"
          />
          <h1 className="font-display text-3xl md:text-4xl text-gradient">
            Create a Birthday Surprise
          </h1>
        </div>

        {/* Progress */}
        <WizardProgress current={step} labels={STEP_LABELS} />

        {/* Step content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              {step === 0 && <StepRelationship form={form} dispatch={dispatch} />}
              {step === 1 && <StepMessage form={form} dispatch={dispatch} />}
              {step === 2 && <StepPhotos form={form} dispatch={dispatch} />}
              {step === 3 && <StepMusic form={form} dispatch={dispatch} />}
              {step === 4 && <StepStyle form={form} dispatch={dispatch} />}
              {step === 5 && (
                <StepPreview
                  form={form}
                  dispatch={dispatch}
                  onGenerate={handleGenerate}
                  onPreview={() => setIsPreviewing(true)}
                  isUploading={isUploading}
                  progress={progress}
                  uploadStage={stage}
                  uploadError={error}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={back}
              disabled={step === 0}
              className="glass-card rounded-full px-6 sm:px-8 py-3 font-semibold text-foreground/80 hover:bg-white/40 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-sm"
            >
              Back
            </button>
            <button
              onClick={next}
              disabled={!canNext()}
              className="btn-gift rounded-full px-6 sm:px-8 py-3 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-[1.03] shadow-md shadow-lavender/20"
            >
              Next <SparkleIcon size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Success modal */}
      {showSuccess && resultId && (
        <SuccessModal
          surpriseId={resultId}
          deletionPeriod={form.deletionPeriod}
          onClose={() => setShowSuccess(false)}
          onCreateAnother={() => {
            setShowSuccess(false);
            reset();
            setStep(0);
            // Reset form would need a RESET action, for now just reload
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Step 1: Relationship                                        */
/* ────────────────────────────────────────────────────────────── */

const RELATIONSHIPS: { value: Relationship; label: string; emoji: string }[] = [
  { value: "friend", label: "Friend", emoji: "🤝" },
  { value: "best-friend", label: "Best Friend", emoji: "💕" },
  { value: "girlfriend", label: "Girlfriend", emoji: "💖" },
  { value: "boyfriend", label: "Boyfriend", emoji: "💙" },
  { value: "crush", label: "Crush", emoji: "🦋" },
  { value: "sister", label: "Sister", emoji: "🌸" },
  { value: "brother", label: "Brother", emoji: "🌟" },
  { value: "partner", label: "Partner", emoji: "💕" },
  { value: "someone-special", label: "Someone Special", emoji: "✨" },
];

const GENDERS: { value: RecipientGender; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "neutral", label: "Prefer Not To Say" },
];

function StepRelationship({
  form,
  dispatch,
}: {
  form: SurpriseFormState;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-foreground/90 mb-2">Who is this surprise for?</h2>
        <p className="text-foreground/50 text-sm mb-4">
          Select the relationship with the recipient
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {RELATIONSHIPS.map((r) => (
            <button
              key={r.value}
              onClick={() => dispatch({ type: "SET_RELATIONSHIP", value: r.value })}
              className={`cursor-pointer glass-card rounded-2xl p-4 text-center transition-all hover:scale-105 ${
                form.relationship === r.value
                  ? "ring-2 ring-primary shadow-lg scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <span className="text-2xl block mb-1 emoji">{r.emoji}</span>
              <span className="text-sm font-medium text-foreground/80">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-foreground/90 mb-3">Recipient Gender</h3>
        <div className="flex gap-3 flex-wrap">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              onClick={() => dispatch({ type: "SET_GENDER", value: g.value })}
              className={`cursor-pointer glass-card rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:scale-105 ${
                form.recipientGender === g.value
                  ? "ring-2 ring-primary text-primary"
                  : "text-foreground/60"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Step 2: Message                                             */
/* ────────────────────────────────────────────────────────────── */

const EXAMPLE_MESSAGES = [
  "Happy birthday! You deserve all the happiness in the world. May this year bring you everything your heart desires. Thank you for being such an amazing person. Wishing you endless joy, love, and beautiful memories.",
  "To my favourite person, wishing you the most magical birthday! You make the world a better place just by being in it. Here's to another year of amazing adventures, late-night conversations, and unforgettable moments. I'm so grateful to have you in my life.",
];

function StepMessage({
  form,
  dispatch,
}: {
  form: SurpriseFormState;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="recipient-name"
          className="block font-display text-xl text-foreground/90 mb-2"
        >
          Recipient Name
        </label>
        <input
          id="recipient-name"
          type="text"
          value={form.recipientName}
          onChange={(e) => dispatch({ type: "SET_NAME", value: e.target.value })}
          placeholder="Who is this surprise for?"
          className="w-full glass-card rounded-2xl px-5 py-3.5 text-foreground/90 placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="birthday-message"
          className="block font-display text-xl text-foreground/90 mb-2"
        >
          Birthday Message
        </label>
        <textarea
          id="birthday-message"
          value={form.message}
          onChange={(e) => dispatch({ type: "SET_MESSAGE", value: e.target.value })}
          placeholder="Write your heartfelt birthday message..."
          rows={8}
          className="w-full glass-card rounded-2xl px-5 py-4 text-foreground/90 placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
        />
        <p className="text-right text-xs text-foreground/40 mt-1">
          {form.message.length} characters
        </p>
      </div>

      <div>
        <p className="text-sm text-foreground/50 mb-2">Need inspiration? Click to use:</p>
        <div className="space-y-2">
          {EXAMPLE_MESSAGES.map((msg, i) => (
            <button
              key={i}
              onClick={() => dispatch({ type: "SET_MESSAGE", value: msg })}
              className="glass-card rounded-xl px-4 py-3 text-left text-xs text-foreground/60 hover:text-foreground/80 transition-colors w-full line-clamp-2"
            >
              {msg.slice(0, 120)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Step 3: Photos                                              */
/* ────────────────────────────────────────────────────────────── */

function StepPhotos({
  form,
  dispatch,
}: {
  form: SurpriseFormState;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground/90 mb-2">Create Memory Cards</h2>
      <p className="text-foreground/50 text-sm mb-4">
        Design beautiful cards for your favourite memories together.
      </p>
      <MemoryCardsManager
        cards={form.photos}
        onChange={(cards: MemoryCardEntry[]) => dispatch({ type: "SET_PHOTOS", value: cards })}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Step 4: Music                                               */
/* ────────────────────────────────────────────────────────────── */

function StepMusic({
  form,
  dispatch,
}: {
  form: SurpriseFormState;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground/90 mb-2">Add Music</h2>
      <p className="text-foreground/50 text-sm mb-4">
        Optional — add their favourite song to make it extra special
      </p>
      <SongUploader
        songFile={form.songFile}
        songUrl={form.songUrl}
        songName={form.songName}
        songType={form.songType}
        onFileChange={(file: File | null) => dispatch({ type: "SET_SONG_FILE", value: file })}
        onUrlChange={(url: string) => dispatch({ type: "SET_SONG_URL", value: url })}
        onNameChange={(name: string) => dispatch({ type: "SET_SONG_NAME", value: name })}
        onTypeChange={(type: SongType) => dispatch({ type: "SET_SONG_TYPE", value: type })}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Step 5: Customization                                       */
/* ────────────────────────────────────────────────────────────── */

const THEMES: { value: Theme; label: string; colors: string[] }[] = [
  {
    value: "pink-lavender",
    label: "Pastel Pink + Lavender",
    colors: ["#f9a8d4", "#c4b5fd", "#fde68a"],
  },
  {
    value: "pink-purple",
    label: "Pastel Pink + Purple",
    colors: ["#f9a8d4", "#a78bfa", "#fbcfe8"],
  },
  {
    value: "midnight-purple",
    label: "Midnight Blue + Purple",
    colors: ["#312e81", "#7c3aed", "#6366f1"],
  },
];

const GIFT_STYLES: { value: GiftStyle; label: string; icon: React.FC<any> }[] = [
  { value: "classic", label: "Classic Gift", icon: ClassicGiftIcon },
  { value: "ribbon", label: "Ribbon Gift", icon: RibbonGiftIcon },
  { value: "cute-box", label: "Cute Box", icon: CuteBoxIcon },
  { value: "sparkle-box", label: "Sparkle Box", icon: SparkleBoxIcon },
  { value: "vintage-box", label: "Vintage Box", icon: VintageBoxIcon },
  { value: "galaxy-box", label: "Galaxy Box", icon: GalaxyBoxIcon },
];

const CAT_STYLES: { value: CatStyle; label: string; icon: React.FC<any> }[] = [
  { value: "default", label: "Default", icon: DefaultCatIcon },
  { value: "sleepy", label: "Sleepy", icon: SleepyCatIcon },
  { value: "playful", label: "Playful", icon: PlayfulCatIcon },
  { value: "princess", label: "Princess", icon: PrincessCatIcon },
  { value: "galaxy", label: "Galaxy", icon: GalaxyCatIcon },
  { value: "angel", label: "Angel", icon: AngelCatIcon },
  { value: "witch", label: "Witch", icon: WitchCatIcon },
];

function StepStyle({
  form,
  dispatch,
}: {
  form: SurpriseFormState;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="space-y-8">
      {/* Theme */}
      <div>
        <h2 className="font-display text-2xl text-foreground/90 mb-4">Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => dispatch({ type: "SET_THEME", value: t.value })}
              className={`cursor-pointer glass-card rounded-2xl p-4 text-center transition-all hover:scale-105 ${
                form.theme === t.value
                  ? "ring-2 ring-primary scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex justify-center gap-1 mb-2">
                {t.colors.map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground/80">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gift Style */}
      <div>
        <h2 className="font-display text-2xl text-foreground/90 mb-4">Gift Box Style</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GIFT_STYLES.map((g) => {
            const Icon = g.icon;
            const isSelected = form.giftStyle === g.value;
            return (
              <button
                key={g.value}
                onClick={() => dispatch({ type: "SET_GIFT_STYLE", value: g.value })}
                className={`group cursor-pointer glass-card rounded-[24px] p-5 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                  isSelected
                    ? "ring-2 ring-primary shadow-[0_0_15px_rgba(200,120,180,0.3)] scale-[1.02] bg-white/60"
                    : "opacity-70 hover:opacity-100 hover:scale-[1.02] hover:shadow-sm"
                }`}
              >
                <div className={`transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon size={72} />
                </div>
                <span className="block text-sm font-semibold text-foreground/80">{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cat Style */}
      <div>
        <h2 className="font-display text-2xl text-foreground/90 mb-4">Cat Companion Style</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CAT_STYLES.map((c) => {
            const Icon = c.icon;
            const isSelected = form.catStyle === c.value;
            return (
              <button
                key={c.value}
                onClick={() => dispatch({ type: "SET_CAT_STYLE", value: c.value })}
                className={`group cursor-pointer glass-card rounded-[24px] p-4 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? "ring-2 ring-primary shadow-[0_0_15px_rgba(200,120,180,0.3)] scale-[1.02] bg-white/60"
                    : "opacity-70 hover:opacity-100 hover:scale-[1.02] hover:shadow-sm"
                }`}
              >
                <div className={`transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon size={64} />
                </div>
                <span className="text-sm font-semibold text-foreground/80">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Step 6: Preview & Generate                                  */
/* ────────────────────────────────────────────────────────────── */

function StepPreview({
  form,
  dispatch,
  onGenerate,
  onPreview,
  isUploading,
  progress,
  uploadStage,
  uploadError,
}: {
  form: SurpriseFormState;
  dispatch: React.Dispatch<Action>;
  onGenerate: () => void;
  onPreview: () => void;
  isUploading: boolean;
  progress: number;
  uploadStage: string;
  uploadError: string | null;
}) {
  const EXPIRATION_OPTIONS = [
    { value: 7, label: "7 days" },
    { value: 30, label: "30 days" },
    { value: 90, label: "90 days" },
    { value: null, label: "Keep Forever" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-foreground/90 mb-2">Review Your Surprise</h2>

      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-foreground/40">Recipient</p>
            <p className="font-display text-xl text-foreground/90">{form.recipientName || "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-foreground/40">Relationship</p>
            <p className="text-sm text-foreground/70 capitalize">
              {form.relationship.replace("-", " ")}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-foreground/40 mb-1">Message</p>
          <p className="text-sm text-foreground/70 line-clamp-4">
            {form.message || "No message yet"}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <span className="chip">📸 {form.photos.length} photos</span>
          <span className="chip">🎵 {form.songName || "Default music"}</span>
          <span className="chip">🎨 {form.theme.replace(/-/g, " ")}</span>
          <span className="chip">🎁 {form.giftStyle.replace(/-/g, " ")}</span>
          <span className="chip">🐱 {form.catStyle}</span>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div>
          <h3 className="font-display text-xl text-foreground/90 flex items-center gap-2">
            🔒 Privacy Settings
          </h3>
          <p className="text-sm text-foreground/60 mt-1">
            Choose how long this surprise should remain available. Birthday Bloom can automatically remove uploaded memories after a selected period to protect privacy.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          {EXPIRATION_OPTIONS.map((opt) => (
            <button
              key={opt.value === null ? "forever" : opt.value}
              onClick={() => dispatch({ type: "SET_DELETION_PERIOD", value: opt.value })}
              className={`cursor-pointer glass-card rounded-xl px-4 py-3 text-sm font-medium transition-all hover:scale-105 ${
                form.deletionPeriod === opt.value
                  ? "ring-2 ring-primary bg-primary/5 text-primary"
                  : "text-foreground/70"
              }`}
            >
              {opt.value === null ? "Keep Forever" : `Delete after ${opt.label}`}
            </button>
          ))}
        </div>
      </div>

      {/* Upload progress */}
      {isUploading && (
        <div className="glass-card rounded-2xl p-6 text-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mb-3"
          >
            {uploadStage === "packing" && "🐱"}
            {uploadStage === "uploading_photos" && "📸"}
            {uploadStage === "preparing_music" && "🎵"}
            {uploadStage === "wrapping" && "🎁"}
          </motion.div>
          <p className="text-sm font-medium text-primary mb-3">
            {uploadStage === "packing" && "Packing memories..."}
            {uploadStage === "uploading_photos" && "Uploading photos..."}
            {uploadStage === "preparing_music" && "Preparing music..."}
            {uploadStage === "wrapping" && "Wrapping your surprise..."}
          </p>
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden max-w-[200px] mx-auto">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {uploadError && (
        <div className="glass-card rounded-2xl p-4 border-red-300 border">
          <p className="text-sm text-red-500">{uploadError}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="space-y-3">
        <button
          onClick={onPreview}
          disabled={isUploading}
          className="glass-card w-full rounded-full px-10 py-4 text-lg font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-white/40 disabled:opacity-50 hover:scale-[1.02] shadow-sm transition-all"
        >
          ✨ Preview Surprise ✨
        </button>
        <button
          onClick={onGenerate}
          disabled={isUploading}
          className="btn-gift w-full rounded-full px-10 py-4 text-lg font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.03] shadow-lg shadow-lavender/20"
        >
          Generate Surprise <SparkleIcon size={20} />
        </button>
      </div>
    </div>
  );
}
