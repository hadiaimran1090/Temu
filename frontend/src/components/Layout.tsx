import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useAppContext } from "../contexts/AppContext";
export function Layout() {
  const { notice } = useAppContext();
  return (
    <div className="landing-page">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
      {notice && <div className="toast">✓ {notice}</div>}
    </div>
  );
}
