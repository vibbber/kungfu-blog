/**
 * Converts a topic name to a URL-safe slug.
 * Examples:
 *   "Self-Control" -> "self-control"
 *   "Emotional Regulation" -> "emotional-regulation"
 *   "Focus" -> "focus"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')   // Remove non-word characters except hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single
    .replace(/^-+/, '')        // Trim hyphens from start
    .replace(/-+$/, '');       // Trim hyphens from end
}
