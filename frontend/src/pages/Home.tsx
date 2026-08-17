import { Link } from "react-router-dom";
import { Products } from "./Products";
import { useTranslation } from "../hooks/useTranslation";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">{t("heroEyebrow")}</p>
          <h1>{t("heroHeading")}</h1>
          <p className="hero-text">
            {t("heroText")}
          </p>
          <Link className="action-button action-button-primary" to="/products">
            {t("heroButton")}
          </Link>
        </div>
        <div className="hero-visual">
          <div className="floating-card floating-card-large">
            <span>{t("taxStripCopy")}</span>
            <strong>{t("lightningDeals")}</strong>
          </div>
        </div>
      </section>
      <Products />
    </>
  );
}
