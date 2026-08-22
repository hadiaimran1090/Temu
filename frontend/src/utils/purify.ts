/**
 * Simple XSS purification utility to sanitize user inputs.
 * Strips HTML tags and escapes potentially harmful script characters.
 */
export function purify(input: string): string {
  if (!input) return "";
  
  // Strip all HTML/XML tags
  let sanitized = input.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Escape HTML entities to prevent script injection
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
    
  return sanitized.trim();
}
