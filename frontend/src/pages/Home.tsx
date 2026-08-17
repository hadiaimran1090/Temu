import { Link } from "react-router-dom";
import { Products } from "./Products";
import { useTranslation } from "../hooks/useTranslation";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="grid grid-cols-[1.1fr_0.9fr] gap-6 p-7 rounded-[30px] border border-[rgba(82,143,191,0.15)] bg-[radial-gradient(circle_at_top_left,rgba(255,174,58,0.3),transparent_40%),linear-gradient(145deg,#fffdf7_0%,#f7fbff_60%,#eef8ff_100%)] max-[1100px]:grid-cols-1">
        <div className="flex flex-col justify-center">
          <p className="m-0 mb-3.5 text-[#ff7a00] font-extrabold uppercase tracking-[0.12em] text-[0.82rem]">{t("heroEyebrow")}</p>
          <h1 className="m-0 text-[clamp(2.2rem,3.8vw,4.2rem)] leading-none text-[#10233b] font-black max-w-[13ch]">{t("heroHeading")}</h1>
          <p className="text-[#5b687a] max-w-[58ch] mt-[18px] text-[1.04rem]">
            {t("heroText")}
          </p>
          <Link className="inline-block no-underline border-0 rounded-full py-[13px] px-[20px] font-bold cursor-pointer transition-all duration-180 hover:-translate-y-[1px] text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff6b2f] shadow-[0_12px_24px_rgba(255,111,31,0.3)] mt-6 self-start text-center" to="/products">
            {t("heroButton")}
          </Link>
        </div>
        <div className="relative rounded-2xl bg-[url('/hero.jpg')] bg-cover bg-center min-h-[380px] flex items-end p-5 overflow-hidden max-[1100px]:min-h-[280px] max-[720px]:hidden">
          <div className="w-[280px] mb-2 rounded-xl p-[14px_20px] bg-white/82 backdrop-blur-md border border-white/60 shadow-[0_12px_28px_rgba(15,23,42,0.08)] flex flex-col gap-1">
            <span className="text-[0.78rem] uppercase font-black tracking-[0.08em] text-[#ff6538]">{t("taxStripCopy")}</span>
            <strong className="text-[1.15rem] text-[#10233b] font-black">{t("lightningDeals")}</strong>
          </div>
        </div>
      </section>
      <Products />
    </>
  );
}
