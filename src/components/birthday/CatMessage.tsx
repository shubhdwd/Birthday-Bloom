/**
 * Splits trailing emoji characters from text and wraps them in a span
 * with the `.emoji` class so they render in native color and never
 * inherit gradient/theme text colors.
 */
export function CatMessage({ text }: { text: string }) {
  const match = text.match(/^(.+?)\s*([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)$/u);
  if (!match) return <>{text}</>;
  return (
    <>
      {match[1]} <span className="emoji">{match[2]}</span>
    </>
  );
}
