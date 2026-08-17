import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "../../hooks/useTranslation";

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
    <footer className="mt-[28px] p-[42px_28px_28px] bg-[#1f1d1d] text-[#f1f5f9] flex flex-col gap-[18px]">
      <div className="grid grid-cols-[1.05fr_0.95fr_0.95fr_1.4fr] gap-[28px] max-[1100px]:grid-cols-1">
        {groups.map((group) => (
          <section className="flex flex-col gap-2.5" key={group.title}>
            <h3 className="m-[0_0_18px] text-base text-white font-bold">{t(getGroupTitleKey(group.title))}</h3>
            {group.links.map((link) => (
              <button className="border-0 p-0 bg-transparent text-[#d1d5db] cursor-pointer font-inherit text-left transition-colors duration-180 hover:text-white rtl:text-right" type="button" key={link}>
                {t(getLinkKey(link))}
              </button>
            ))}
          </section>
        ))}
        <section className="flex flex-col gap-2.5">
          <h3 className="m-[0_0_18px] text-base text-white font-bold">{t("footerDownloadApp")}</h3>
          <div className="grid grid-cols-2 gap-2.5 text-white">
            <span className="text-sm text-[#d1d5db]">{t("footerPriceDrop")}</span>
            <span className="text-sm text-[#d1d5db]">{t("footerTrackOrders")}</span>
            <span className="text-sm text-[#d1d5db]">{t("footerExclusiveOffers")}</span>
            <span className="text-sm text-[#d1d5db]">{t("footerCouponsAlerts")}</span>
          </div>
          <div className="flex gap-3 flex-wrap mt-2">
            <span className="p-[10px_14px] border border-white/30 rounded-full bg-transparent text-white text-xs font-semibold">&nbsp; App Store</span>
            <span className="p-[10px_14px] border border-white/30 rounded-full bg-transparent text-white text-xs font-semibold">▶ Google Play</span>
          </div>
          <h3 className="m-[0_0_18px] text-base text-white font-bold">{t("footerConnect")}</h3>
          <div className="flex gap-4 text-[1.45rem] text-white max-[900px]:gap-3.5 max-[900px]:text-[1.3rem]">
            <FaInstagram className="text-[#f43f5e]" />
            <FaFacebookF className="text-[#60a5fa]" />
            <FaXTwitter className="text-white" />
            <FaTiktok className="text-[#f472b6]" />
            <FaYoutube className="text-[#ef4444]" />
            <FaPinterestP className="text-[#fb7185]" />
          </div>
        </section>
      </div>
      <div className="mt-[30px] grid grid-cols-2 gap-[28px] items-start max-[1100px]:grid-cols-1">
        <section className="flex flex-col gap-2.5">
          <h3 className="m-[0_0_18px] text-base text-white font-bold">{t("footerSecurityCert")}</h3>
          <div className="flex flex-wrap gap-2.5">
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">PCI DSS</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">VISA Secure</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">Mastercard ID</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">SafeKey</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">JCB</span>
          </div>
        </section>
        <section className="flex flex-col gap-2.5">
          <h3 className="m-[0_0_18px] text-base text-white font-bold">{t("footerWeAccept")}</h3>
          <div className="flex flex-wrap gap-2.5">
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">JazzCash</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">easypaisa</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">VISA</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">Mastercard</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">AMEX</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">Pay</span>
            <span className="p-[7px_10px] rounded-[3px] bg-white text-[#111827] text-[0.75rem] font-extrabold">G Pay</span>
          </div>
        </section>
      </div>
      <div className="mt-[34px] pt-4 border-t border-white/10 flex flex-wrap gap-[18px] justify-center text-sm text-[#d1d5db]">
        <span>© 2022–2026 Whaleco Inc.</span>
        <button className="border-0 p-0 bg-transparent text-[#d1d5db] cursor-pointer font-inherit text-left hover:text-white transition-colors duration-180" type="button">
          {t("footerTerms")}
        </button>
        <button className="border-0 p-0 bg-transparent text-[#d1d5db] cursor-pointer font-inherit text-left hover:text-white transition-colors duration-180" type="button">
          {t("footerPrivacy")}
        </button>
      </div>
    </footer>
  );
}
