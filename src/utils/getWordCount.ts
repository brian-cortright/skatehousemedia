function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getWordCount(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter((w: string) => w.length > 0);
  return words.length;
}

export function getExcerpt(html: string, maxLength: number = 155): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
}