import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <section className="content-card">
      <h1>404 — Not found</h1>
      <Link to="/">Return home</Link>
    </section>
  );
}
