/**
 * Extracts the first image src from an HTML string.
 */
export const extractFirstImageSrc = (htmlString: string): string | null => {
  if (!htmlString) return null;
  const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/i;
  const match = htmlString.match(imgRegex);
  return match ? match[1] : null;
};

/**
 * Strips HTML tags from a string and truncates it to the specified length.
 */
export const stripHtmlAndTruncate = (htmlString: string, maxLength: number = 120): string => {
  if (!htmlString) return "";

  // Replace HTML tags with space, then replace multiple spaces with single space
  const stripped = htmlString
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (stripped.length <= maxLength) return stripped;

  // Truncate and add ellipsis
  return stripped.substring(0, maxLength).trimEnd() + "…";
};
