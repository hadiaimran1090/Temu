import { Link } from "react-router-dom";
import { Products } from "./Products";
import { useTranslation } from "../hooks/useTranslation";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="grid grid-cols-[1.2fr_0.8fr] gap-12 p-12 rounded-[40px] border border-orange-500/10 bg-gradient-to-tr from-[#fffbf5] via-[#f7f9fc] to-[#e8f5ff] shadow-[0_20px_50px_rgba(255,91,46,0.06)] relative overflow-hidden max-[1100px]:grid-cols-1 max-[1100px]:p-8 max-[1100px]:gap-8 mb-10">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col justify-center relative z-10">
          <p className="inline-block self-start px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-extrabold uppercase tracking-widest text-[0.72rem] mb-4 shadow-sm">{t("heroEyebrow")}</p>
          <h1 className="m-0 text-[clamp(2.2rem,4.5vw,4.8rem)] leading-[1.05] font-black text-slate-900 tracking-tight max-w-[15ch]">{t("heroHeading")}</h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-[50ch] mt-5">
            {t("heroText")}
          </p>
          <Link className="inline-flex items-center justify-center gap-2 no-underline border-0 rounded-full py-4 px-8 font-extrabold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(255,91,46,0.4)] text-white bg-gradient-to-r from-[#ff8c1a] via-[#ff6b2f] to-[#ff4f18] shadow-[0_12px_24px_rgba(255,111,31,0.25)] mt-8 self-start text-center text-base" to="/products">
            {t("heroButton")}
          </Link>
        </div>
        <div className="relative rounded-[28px] bg-gradient-to-br from-[#ffe7db]/60 to-[#dbf0ff]/60 border border-white/60 min-h-[420px] flex items-center justify-center p-6 overflow-visible max-[1100px]:min-h-[300px] max-[720px]:hidden">
          <div className="w-[260px] bg-white rounded-3xl p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)] border border-slate-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative z-20">
            <div className="w-full h-[180px] rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center mb-4 overflow-hidden relative group">
              <div className="absolute top-3 left-3 bg-[#ff5b2e] text-white text-[0.7rem] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {t("offPercent")}
              </div>
              <span className="text-5xl select-none">🎁</span>
            </div>
            <span className="text-[0.68rem] text-orange-600 font-bold tracking-wider uppercase">{t("trendingNow")}</span>
            <strong className="block text-slate-800 text-base font-extrabold mt-1 truncate">{t("earbudsTitle")}</strong>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[#10233b] font-black text-lg">{t("earbudsPrice")}</span>
              <span className="text-slate-400 text-xs line-through">{t("earbudsOldPrice")}</span>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] border border-white/80 flex items-center gap-3 z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <div className="flex flex-col">
              <span className="text-[0.65rem] text-[#ff6538] font-bold uppercase tracking-wider">{t("taxStripBadge")}</span>
              <strong className="text-slate-800 text-xs font-black">{t("taxStripCopy")}</strong>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#10233b] text-white rounded-2xl p-4 shadow-[0_16px_32px_rgba(16,35,59,0.15)] flex flex-col gap-1 z-30 transform hover:scale-105 transition-transform duration-300">
            <span className="text-[0.65rem] text-[#f5e6b8] font-extrabold tracking-widest uppercase">{t("trustedShopping")}</span>
            <strong className="text-base font-extrabold flex items-center gap-1.5">
              4.9 ★★★★★
            </strong>
            <span className="text-[0.72rem] text-slate-300">{t("reviewsCount")}</span>
          </div>
        </div>
      </section>
      <Products />
    </>
  );
}
