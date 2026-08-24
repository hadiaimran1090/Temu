import DOMPurify from "dompurify";

/**
 * Sanitizes HTML only when the result will be rendered as HTML.
 
 * React renders those values as text already, and sanitizing them as HTML can
 * turn characters such as `<` and `&` into entity strings.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  return DOMPurify.sanitize(input);
}

export default sanitizeHtml;
