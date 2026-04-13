import { portableTextToPlainText } from "./getWordCount";

/**
 * Extracts a truncated plain-text excerpt from Portable Text blocks.
 */
export const extractExcerpt = (blocks?: any[], maxLength: number = 120): string => {
  const text = portableTextToPlainText(blocks);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + "…";
};
