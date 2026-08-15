import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useAppContext } from "../contexts/AppContext";
export function Layout() {
  const { notice } = useAppContext();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
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
