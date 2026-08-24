import DOMPurify from "dompurify";

/**
 * XSS purification utility to sanitize user inputs using DOMPurify.
 */
export function purify(input: string): string {
  if (!input) return "";
  return DOMPurify.sanitize(input).trim();
}

export default purify;

