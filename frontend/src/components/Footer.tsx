import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
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
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {groups.map((group) => (
          <section className="footer-column" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <a href="#footer" key={link}>
                {link}
              </a>
            ))}
          </section>
        ))}
        <section className="footer-column footer-downloads">
          <h3>Download the Temu App</h3>
          <div className="download-perks">
            <span>◉ Price-drop alerts</span>
            <span>▣ Track orders any time</span>
            <span>◆ Exclusive offers</span>
            <span>◇ Coupons & offers alerts</span>
          </div>
          <div className="app-badges">
            <span>&nbsp; App Store</span>
            <span>▶ Google Play</span>
          </div>
          <h3>Connect with Temu</h3>
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
          <h3>Security certification</h3>
          <div className="payment-pills">
            <span>PCI DSS</span>
            <span>VISA Secure</span>
            <span>Mastercard ID</span>
            <span>SafeKey</span>
            <span>JCB</span>
          </div>
        </section>
        <section className="footer-certifications-group">
          <h3>We accept</h3>
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
        <a href="#footer">Terms of use</a>
        <a href="#footer">Privacy policy</a>
      </div>
    </footer>
  );
}
