export function getWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\\n/g, ' ');
  const words = text.trim().split(/\s+/).filter((w: string) => w.length > 0);
  return words.length;
}