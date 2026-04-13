/**
 * Extracts plain text from Portable Text blocks.
 */
export function portableTextToPlainText(blocks?: any[]): string {
  if (!blocks) return "";
  return blocks
    .filter((block: any) => block._type === "block")
    .map((block: any) =>
      (block.children || [])
        .map((child: any) => child.text || "")
        .join("")
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Gets the word count from Portable Text blocks.
 */
export function getWordCount(blocks?: any[]): number {
  const text = portableTextToPlainText(blocks);
  if (!text) return 0;
  return text.split(/\s+/).filter((w: string) => w.length > 0).length;
}

/**
 * Gets an excerpt from Portable Text blocks.
 */
export function getExcerpt(blocks?: any[], maxLength: number = 155): string {
  const text = portableTextToPlainText(blocks);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "…";
}