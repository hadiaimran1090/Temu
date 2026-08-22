import { FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa6";
import { useTranslation } from "../hooks/useTranslation";
import { SUPPORT_WHATSAPP_NUMBER, SUPPORT_EMAIL } from "../config";

export function Support() {
  const { t } = useTranslation();

  const handleWhatsappChat = () => {
    // Official click-to-chat format: https://wa.me/<number>
    const url = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="max-w-[800px] mx-auto p-4 flex flex-col gap-6 md:gap-8 min-h-[60vh] justify-center">
      {/* Page Header */}
      <div className="text-center py-6 border-b border-[#e2e8f0]">
        <h1 className="text-[2.15rem] md:text-[2.6rem] text-[#10233b] font-black tracking-tight mb-2 m-0">
          {t("supportPageTitle" as any)}
        </h1>
        <p className="text-sm md:text-base text-[#5b687a] max-w-[500px] mx-auto font-medium">
          {t("supportPageDesc" as any)}
        </p>
      </div>

      {/* Support Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {/* WhatsApp Card */}
        <article className="border border-slate-200 rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] p-6 md:p-8 flex flex-col justify-between items-center text-center transition-all duration-180 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-[60px] h-[60px] rounded-full bg-[#e8f5e9] text-[#2e7d32] grid place-items-center text-3xl shadow-sm">
              <FaWhatsapp />
            </div>
            <h2 className="text-[1.25rem] text-[#10233b] font-bold m-0">
              WhatsApp Chat
            </h2>
            <p className="text-[0.88rem] text-[#5b687a] font-medium leading-relaxed max-w-[280px]">
              {t("whatsappDesc" as any)}
            </p>
          </div>
          <button
            onClick={handleWhatsappChat}
            className="w-full mt-6 border-0 rounded-full py-3 px-6 font-bold cursor-pointer transition-all text-white bg-gradient-to-br from-[#25d366] to-[#128c7e] shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:-translate-y-[1px] flex items-center justify-center gap-2 text-base"
          >
            <FaWhatsapp className="text-xl" />
            {t("whatsappButton" as any)}
          </button>
        </article>

        {/* Email Card */}
        <article className="border border-slate-200 rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] p-6 md:p-8 flex flex-col justify-between items-center text-center transition-all duration-180 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-[60px] h-[60px] rounded-full bg-[#e0f2fe] text-[#0284c7] grid place-items-center text-2xl shadow-sm">
              <FaEnvelope />
            </div>
            <h2 className="text-[1.25rem] text-[#10233b] font-bold m-0">
              {t("emailButton" as any)}
            </h2>
            <p className="text-[0.88rem] text-[#5b687a] font-medium leading-relaxed max-w-[280px] mb-1">
              {t("emailDesc" as any)}
            </p>
            <b className="text-[0.9rem] text-[#0284c7] break-all block font-bold">{SUPPORT_EMAIL}</b>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="w-full mt-6 border border-slate-200 rounded-full py-3 px-6 font-bold cursor-pointer transition-all text-[#10233b] bg-white shadow-sm hover:bg-slate-50 hover:-translate-y-[1px] flex items-center justify-center gap-2 text-base no-underline"
          >
            <FaEnvelope className="text-[1.1rem]" />
            {t("emailButton" as any)}
          </a>
        </article>
      </div>

      {/* Business Hours Card */}
      <article className="border border-slate-200 rounded-2xl bg-[#f8fafc] p-5 flex items-center gap-4 max-w-[500px] mx-auto w-full shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 grid place-items-center text-xl shrink-0">
          <FaClock />
        </div>
        <div className="flex flex-col text-left rtl:text-right">
          <h3 className="text-sm font-bold text-[#10233b] m-0">
            {t("hoursTitle" as any)}
          </h3>
          <span className="text-[0.82rem] text-[#5b687a] font-semibold mt-0.5">
            {t("hoursDesc" as any)}
          </span>
        </div>
      </article>
    </section>
  );
}
