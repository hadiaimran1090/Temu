import { useState } from "react";
import { FaWhatsapp, FaChevronDown, FaChevronUp, FaCircleQuestion } from "react-icons/fa6";
import { useTranslation } from "../hooks/useTranslation";
import { SUPPORT_WHATSAPP_NUMBER } from "../config";

export function Support() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWhatsappChat = () => {
    const defaultMsg = "Hello Temu Support, I need help with my order.";
    const whatsappUrl = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;
    window.location.href = whatsappUrl;
  };

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // FAQs retrieved dynamically from the translation dictionary
  const faqs = [
    {
      id: 1,
      q: t("faq1Q" as any),
      a: t("faq1A" as any),
    },
    {
      id: 2,
      q: t("faq2Q" as any),
      a: t("faq2A" as any),
    },
    {
      id: 3,
      q: t("faq3Q" as any),
      a: t("faq3A" as any),
    },
    {
      id: 4,
      q: t("faq4Q" as any),
      a: t("faq4A" as any),
    },
  ];

  return (
    <section className="max-w-[720px] mx-auto p-4 flex flex-col gap-8 min-h-[70vh] justify-start py-8">
      {/* Page Header */}
      <div className="text-center py-6 border-b border-[#e2e8f0]">
        <h1 className="text-[2.15rem] md:text-[2.6rem] text-[#10233b] font-black tracking-tight mb-2 m-0">
          {t("supportPageTitle" as any)}
        </h1>
        <p className="text-sm md:text-base text-[#5b687a] max-w-[500px] mx-auto font-medium">
          {t("supportPageDesc" as any)}
        </p>
      </div>

      {/* WhatsApp Hero Card */}
      <article className="border border-slate-200 rounded-3xl bg-white shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-8 flex flex-col items-center text-center transition-all duration-180 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <div className="w-[72px] h-[72px] rounded-full bg-[#e8f5e9] text-[#2e7d32] grid place-items-center text-4xl shadow-sm mb-4">
          <FaWhatsapp />
        </div>
        <h2 className="text-[1.4rem] text-[#10233b] font-extrabold m-0 mb-2">
          {t("supportPageTitle" as any)}
        </h2>
        <p className="text-sm text-[#5b687a] font-medium leading-relaxed max-w-[340px] m-0 mb-6">
          {t("whatsappDesc" as any)}
        </p>
        <button
          onClick={handleWhatsappChat}
          className="w-full sm:w-auto min-w-[240px] border-0 rounded-full py-3.5 px-8 font-bold cursor-pointer transition-all text-white bg-gradient-to-br from-[#25d366] to-[#128c7e] shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:-translate-y-[1px] flex items-center justify-center gap-2.5 text-base"
        >
          <FaWhatsapp className="text-2xl" />
          {t("whatsappButton" as any)}
        </button>
      </article>

      {/* FAQ Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[1.35rem] text-[#10233b] font-black m-0 flex items-center gap-2 pb-2 border-b border-[#f1f5f9] text-left rtl:text-right">
          <FaCircleQuestion className="text-[#4ea5e6]" />
          {t("faqTitle" as any)}
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left rtl:text-right border-0 bg-transparent p-4 md:p-5 flex justify-between items-center cursor-pointer font-bold text-sm md:text-base text-[#10233b] hover:bg-slate-50 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? <FaChevronUp className="text-slate-400 shrink-0" /> : <FaChevronDown className="text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-[0_20px_20px_20px] md:p-[0_24px_24px_24px] text-[0.88rem] md:text-sm text-[#475569] leading-relaxed text-left rtl:text-right font-medium bg-white border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
