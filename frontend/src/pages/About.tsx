import { useTranslation } from "../hooks/useTranslation";
import { FaUsers, FaLock, FaTruckFast } from "react-icons/fa6";

export function About() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-12 max-w-[1200px] mx-auto py-6">
      <div className="text-center max-w-[800px] mx-auto p-12 rounded-[32px] bg-gradient-to-tr from-[#ffe7db]/45 via-[#f8fafc]/90 to-[#dbf0ff]/45 border border-white flex flex-col gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl" />
        <p className="m-0 text-orange-600 font-extrabold uppercase tracking-[0.16em] text-[0.78rem] relative z-10">{t("aboutHeroText")}</p>
        <h1 className="m-0 text-[clamp(2.2rem,3.8vw,3.6rem)] text-slate-900 leading-tight font-black tracking-tight relative z-10">{t("aboutHeroTitle")}</h1>
        <span className="text-slate-500 text-lg leading-relaxed relative z-10">{t("aboutHeroDesc")}</span>
      </div>

      <div className="grid grid-cols-3 gap-8 max-[900px]:grid-cols-1">
        <article className="p-8 rounded-[24px] border border-slate-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] flex flex-col gap-5 hover:border-orange-500/20 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#ff5b2e] flex items-center justify-center text-2xl shadow-sm">
            <FaUsers />
          </div>
          <div>
            <b className="text-xl font-bold text-slate-900 block mb-2">{t("aboutMillionsTitle")}</b>
            <p className="m-0 text-slate-500 text-sm leading-relaxed">{t("aboutMillionsDesc")}</p>
          </div>
        </article>

        <article className="p-8 rounded-[24px] border border-slate-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] flex flex-col gap-5 hover:border-orange-500/20 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#4ea5e6] flex items-center justify-center text-2xl shadow-sm">
            <FaLock />
          </div>
          <div>
            <b className="text-xl font-bold text-slate-900 block mb-2">{t("aboutSecureTitle")}</b>
            <p className="m-0 text-slate-500 text-sm leading-relaxed">{t("aboutSecureDesc")}</p>
          </div>
        </article>

        <article className="p-8 rounded-[24px] border border-slate-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] flex flex-col gap-5 hover:border-orange-500/20 hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl shadow-sm">
            <FaTruckFast />
          </div>
          <div>
            <b className="text-xl font-bold text-slate-900 block mb-2">{t("aboutDeliveredTitle")}</b>
            <p className="m-0 text-slate-500 text-sm leading-relaxed">{t("aboutDeliveredDesc")}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
