import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "../../hooks/useTranslation";
import "./Footer.css";

const groups = [
  {
    title: "Company info",
    links: [
      "About Temu",
      "Affiliate & Influencer Program",
      "Contact us",
      "Careers",
      "Press",
      "Temu's Tree Planting Program",
    ],
  },
  {
    title: "Customer service",
    links: [
      "Return and refund policy",
      "Intellectual property policy",
      "Shipping info",
      "Report suspicious activity",
    ],
  },
  {
    title: "Help",
    links: [
      "Support center & FAQ",
      "Safety center",
      "Temu purchase protection",
      "Sitemap",
      "Partner with Temu",
    ],
  },
];

const getGroupTitleKey = (title: string) => {
  const map: Record<string, string> = {
    "Company info": "footerCompanyInfo",
    "Customer service": "footerCustomerService",
    "Help": "footerHelp",
  };
  return (map[title] || title) as any;
};

const getLinkKey = (link: string) => {
  const map: Record<string, string> = {
    "About Temu": "link_AboutTemu",
    "Affiliate & Influencer Program": "link_Affiliate",
    "Contact us": "link_Contact",
    "Careers": "link_Careers",
    "Press": "link_Press",
    "Temu's Tree Planting Program": "link_Tree",
    "Return and refund policy": "link_Return",
    "Intellectual property policy": "link_IP",
    "Shipping info": "link_Shipping",
    "Report suspicious activity": "link_Report",
    "Support center & FAQ": "link_Support",
    "Safety center": "link_Safety",
    "Temu purchase protection": "link_Protection",
    "Sitemap": "link_Sitemap",
    "Partner with Temu": "link_Partner",
  };
  return (map[link] || link) as any;
};

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-columns">
        {groups.map((group) => (
          <section className="footer-column" key={group.title}>
            <h3>{t(getGroupTitleKey(group.title))}</h3>
            {group.links.map((link) => (
              <button className="footer-link" type="button" key={link}>
                {t(getLinkKey(link))}
              </button>
            ))}
          </section>
        ))}
        <section className="footer-column footer-downloads">
          <h3>{t("footerDownloadApp")}</h3>
          <div className="download-perks">
            <span>{t("footerPriceDrop")}</span>
            <span>{t("footerTrackOrders")}</span>
            <span>{t("footerExclusiveOffers")}</span>
            <span>{t("footerCouponsAlerts")}</span>
          </div>
          <div className="app-badges">
            <span>&nbsp; App Store</span>
            <span>▶ Google Play</span>
          </div>
          <h3>{t("footerConnect")}</h3>
          <div className="social-row">
            <FaInstagram />
            <FaFacebookF />
            <FaXTwitter />
            <FaTiktok />
            <FaYoutube />
            <FaPinterestP />
          </div>
        </section>
      </div>
      <div className="footer-certifications-row">
        <section className="footer-certifications-group">
          <h3>{t("footerSecurityCert")}</h3>
          <div className="payment-pills">
            <span>PCI DSS</span>
            <span>VISA Secure</span>
            <span>Mastercard ID</span>
            <span>SafeKey</span>
            <span>JCB</span>
          </div>
        </section>
        <section className="footer-certifications-group">
          <h3>{t("footerWeAccept")}</h3>
          <div className="payment-pills">
            <span>JazzCash</span>
            <span>easypaisa</span>
            <span>VISA</span>
            <span>Mastercard</span>
            <span>AMEX</span>
            <span>Pay</span>
            <span>G Pay</span>
          </div>
        </section>
      </div>
      <div className="footer-bottom">
        <span>© 2022–2026 Whaleco Inc.</span>
        <button className="footer-link" type="button">
          {t("footerTerms")}
        </button>
        <button className="footer-link" type="button">
          {t("footerPrivacy")}
        </button>
      </div>
    </footer>
  );
}
