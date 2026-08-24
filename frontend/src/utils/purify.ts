import DOMPurify from "dompurify";

/**
 * Sanitizes HTML only when the result will be rendered as HTML.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  return DOMPurify.sanitize(input);
}

export default sanitizeHtml;
