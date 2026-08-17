import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppSelector } from "../../store";

export function Layout() {
  const notice = useAppSelector((state) => state.notice.message);
  const { isRtl } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="landing-page" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
      {notice && <div className="toast">✓ {notice}</div>}
    </div>
  );
}
