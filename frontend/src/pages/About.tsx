import { useTranslation } from "../hooks/useTranslation";

export function About() {
  const { t } = useTranslation();

  return (
    <section className="about-page">
      <div className="about-hero">
        <p>{t("aboutHeroText")}</p>
        <h1>{t("aboutHeroTitle")}</h1>
        <span>{t("aboutHeroDesc")}</span>
      </div>
      <div className="about-grid">
        <article>
          <b>{t("aboutMillionsTitle")}</b>
          <p>{t("aboutMillionsDesc")}</p>
        </article>
        <article>
          <b>{t("aboutSecureTitle")}</b>
          <p>{t("aboutSecureDesc")}</p>
        </article>
        <article>
          <b>{t("aboutDeliveredTitle")}</b>
          <p>{t("aboutDeliveredDesc")}</p>
        </article>
      </div>
    </section>
  );
}
