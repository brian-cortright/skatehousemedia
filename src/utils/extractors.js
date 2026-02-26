/**
 * Extracts the first image src from an HTML string.
 * @param {string} htmlString - The HTML content to parse.
 * @returns {string|null} - The src URL or null if no image is found.
 */
export const extractFirstImageSrc = (htmlString) => {
  if (!htmlString) return null;
  const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/i;
  const match = htmlString.match(imgRegex);
  return match ? match[1] : null;
};

/**
 * Strips HTML tags from a string and truncates it to the specified length.
 * @param {string} htmlString - The HTML content to process.
 * @param {number} maxLength - Maximum length of the output string.
 * @returns {string} - The plain text string, truncated with an ellipsis if necessary.
 */
export const stripHtmlAndTruncate = (htmlString, maxLength = 120) => {
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
