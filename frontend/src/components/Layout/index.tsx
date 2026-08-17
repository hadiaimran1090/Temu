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
    <div 
      className="min-h-screen bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] pt-[102px] max-[1100px]:pt-[136px] max-[900px]:pt-[182px] max-[720px]:pt-[215px]" 
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Navbar />
      <main className="p-[20px_28px_28px] max-[1100px]:p-4 max-[720px]:p-3">
        <Outlet />
      </main>
      <Footer />
      {notice && (
        <div className="fixed right-5 bottom-5 z-[100] p-[14px_18px] bg-[#166534] text-white rounded-lg shadow-[0_8px_22px_rgba(0,0,0,0.2)]">
          ✓ {notice}
        </div>
      )}
    </div>
  );
}
