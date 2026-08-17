import { useTranslation } from "../hooks/useTranslation";

export function About() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-10">
      <div className="text-center max-w-[720px] mx-auto mt-7 flex flex-col gap-3">
        <p className="m-0 text-[#ff5b2e] font-extrabold uppercase tracking-[0.12em] text-[0.86rem]">{t("aboutHeroText")}</p>
        <h1 className="m-0 text-[clamp(2rem,3.5vw,3.4rem)] text-[#10233b] leading-tight font-bold">{t("aboutHeroTitle")}</h1>
        <span className="text-[1.05rem] text-[#5b687a] leading-normal">{t("aboutHeroDesc")}</span>
      </div>
      <div className="grid grid-cols-3 gap-6 max-[720px]:grid-cols-1">
        <article className="p-6 rounded-2xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.09)]">
          <b className="text-[1.2rem] font-bold text-[#10233b]">{t("aboutMillionsTitle")}</b>
          <p className="m-0 mt-2 text-[0.88rem] text-[#475569] leading-relaxed">{t("aboutMillionsDesc")}</p>
        </article>
        <article className="p-6 rounded-2xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.09)]">
          <b className="text-[1.2rem] font-bold text-[#10233b]">{t("aboutSecureTitle")}</b>
          <p className="m-0 mt-2 text-[0.88rem] text-[#475569] leading-relaxed">{t("aboutSecureDesc")}</p>
        </article>
        <article className="p-6 rounded-2xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.09)]">
          <b className="text-[1.2rem] font-bold text-[#10233b]">{t("aboutDeliveredTitle")}</b>
          <p className="m-0 mt-2 text-[0.88rem] text-[#475569] leading-relaxed">{t("aboutDeliveredDesc")}</p>
        </article>
      </div>
    </section>
  );
}
