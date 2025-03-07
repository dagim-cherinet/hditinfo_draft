// components/ui/highlight-text.jsx
export default function HighlightText({ text, highlight }) {
  // Step 1: Handle empty cases
  if (!highlight?.trim() || !text) {
    return <span>{text}</span>;
  }

  // Step 2: Escape special regex characters to prevent errors
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Step 3: Create a case-insensitive regex to match the highlight term
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");

  // Step 4: Split the text into matching and non-matching parts
  const parts = text.split(regex);

  // Step 5: Render with highlighted sections
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="bg-yellow-200 dark:bg-yellow-800 rounded-sm px-0.5 font-medium"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
