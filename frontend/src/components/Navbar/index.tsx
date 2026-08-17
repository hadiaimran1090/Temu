import {
  FaCartShopping,
  FaChevronDown,
  FaGlobe,
  FaMagnifyingGlass,
  FaMoon,
  FaRegUser,
  FaSun,
  FaTruck,
  FaWhatsapp,
} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { clearAuth } from "../../store/slices/authSlice";
import { syncCart } from "../../store/slices/cartSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import { setLanguage } from "../../store/slices/languageSlice";
import { useTranslation } from "../../hooks/useTranslation";

const menu = [
  { name: "Featured", image: "/products/wallet.jpg" },
  { name: "Home & Kitchen", image: "/products/organizer.jpg" },
  { name: "Women's Clothing", image: "/products/Women’s dress.jpg" },
  { name: "Women's Shoes", image: "/products/shoes.jpg" },
  { name: "Men's Clothing", image: "/products/menshirt.jpg" },
  { name: "Men's Underwear & Sleepwear", image: "/products/hairclipper.jpg" },
  { name: "Sports & Outdoors", image: "/products/Sports water bottle.jpg" },
  { name: "Women's Jewelry", image: "/products/wallet.jpg" },
  { name: "Beauty & Personal Care", image: "/products/Skincare serum.jpg" },
  { name: "Toys & Games", image: "/products/Kids’ toy.jpg" },
  { name: "Accessories", image: "/products/earbuds.jpg" },
  { name: "Cases, Holsters & Sleeves", image: "/products/phone.jpg" },
];

const getCategoryKey = (category: string) => {
  const map: Record<string, string> = {
    "Featured": "cat_Featured",
    "Home & Kitchen": "cat_HomeKitchen",
    "Women's Clothing": "cat_WomensClothing",
    "Women's Shoes": "cat_WomensShoes",
    "Men's Clothing": "cat_MensClothing",
    "Men's Underwear & Sleepwear": "cat_MensUnderwearSleepwear",
    "Sports & Outdoors": "cat_SportsOutdoors",
    "Women's Jewelry": "cat_WomensJewelry",
    "Beauty & Personal Care": "cat_BeautyPersonalCare",
    "Toys & Games": "cat_ToysGames",
    "Accessories": "cat_Accessories",
    "Cases, Holsters & Sleeves": "cat_CasesHolstersSleeves",
    "Office & School Supplies": "cat_OfficeSchoolSupplies",
    "All": "cat_All",
  };
  return (map[category] || "cat_All") as any;
};

export function Navbar() {
  const cart = useAppSelector((state) => state.cart.items);
  const theme = useAppSelector((state) => state.theme.theme);
  const token = useAppSelector((state) => state.auth.token);
  const userEmail = useAppSelector((state) => state.auth.userEmail);
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const selectCategory = (category: string) => {
    setCategoryOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(syncCart());
    setProfileOpen(false);
  };

  const handleLanguageToggle = () => {
    dispatch(setLanguage(language === "en" ? "ur" : "en"));
  };

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-40 transition-all duration-180 ease-in-out opacity-100 pointer-events-auto">
      <div className="grid grid-cols-3 gap-[1px] bg-[#111] text-[#d1d5db] text-center font-semibold">
        <div className="bg-[#101010] p-[10px_14px] flex items-center justify-center gap-1.5 text-[0.88rem] max-[720px]:p-[7px_4px] max-[720px]:text-[0.68rem]">
          <FaTruck />
          <strong className="font-bold text-[0.88rem] max-[720px]:text-[0.7rem]">{t("freeShippingOrders")}</strong>
          <span className="text-[#f5e6b8] block text-[0.8rem] max-[900px]:hidden">{t("limitedTimeOffer")}</span>
        </div>
        <div className="bg-[#101010] p-[10px_14px] flex items-center justify-center gap-1.5 text-[0.88rem] max-[720px]:p-[7px_4px] max-[720px]:text-[0.68rem]">
          <strong className="font-bold text-[0.88rem] max-[720px]:text-[0.7rem]">{t("freeReturns")}</strong>
          <span className="text-[#f5e6b8] block text-[0.8rem] max-[900px]:hidden">{t("upTo90Days")}</span>
        </div>
        <div className="bg-[#101010] p-[10px_14px] flex items-center justify-center gap-1.5 text-[0.88rem] max-[720px]:p-[7px_4px] max-[720px]:text-[0.68rem]">
          <strong className="font-bold text-[0.88rem] max-[720px]:text-[0.7rem]">{t("getTemuApp")}</strong>
          <span className="text-[#f5e6b8] block text-[0.8rem] max-[900px]:hidden">{t("trackOrdersTime")}</span>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_minmax(280px,1fr)_auto] gap-[18px] items-center p-[6px_28px] bg-gradient-to-r from-[#4ea5e6] to-[#62b4f0] text-white max-[1100px]:grid-cols-1 max-[720px]:grid-cols-[auto_1fr] max-[720px]:gap-2.5 max-[720px]:p-[7px_12px]">
        <NavLink className="w-[50px] h-[50px] rounded-[14px] bg-gradient-to-br from-[#ff8c1a] to-[#ff5f28] grid place-items-center font-black tracking-[0.08em] shadow-[0_12px_24px_rgba(255,111,31,0.35)] text-white no-underline max-[720px]:w-[46px] max-[720px]:h-[46px] max-[720px]:text-[0.7rem]" to="/">
          {t("brand")}
        </NavLink>
        <nav className="flex flex-wrap gap-3 font-semibold max-[1100px]:justify-center max-[720px]:order-3 max-[720px]:col-span-full max-[720px]:justify-start max-[720px]:gap-3 max-[720px]:overflow-x-auto max-[720px]:flex-nowrap max-[720px]:pb-[2px]">
          <NavLink className="text-white no-underline text-[0.86rem] whitespace-nowrap active:underline active:text-[#fff3c4] [&.active]:text-[#fff3c4] [&.active]:underline [&.active]:underline-offset-[5px] max-[720px]:text-[0.72rem]" to="/products">{t("bestSelling")}</NavLink>
          <NavLink className="text-white no-underline text-[0.86rem] whitespace-nowrap active:underline active:text-[#fff3c4] [&.active]:text-[#fff3c4] [&.active]:underline [&.active]:underline-offset-[5px] max-[720px]:text-[0.72rem]" to="/about">{t("about")}</NavLink>
          <NavLink className="text-white no-underline text-[0.86rem] whitespace-nowrap active:underline active:text-[#fff3c4] [&.active]:text-[#fff3c4] [&.active]:underline [&.active]:underline-offset-[5px] max-[720px]:text-[0.72rem]" to="/products">{t("newIn")}</NavLink>
          <button
            className="border border-transparent rounded-full bg-transparent text-inherit p-[9px_12px] cursor-pointer inline-flex gap-[5px] items-center hover:border-white transition-colors"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            {t("categories")} <FaChevronDown />
          </button>
        </nav>
        <form className="relative max-w-[620px] flex items-center rounded-full bg-white shadow-[0_4px_18px_rgba(15,23,42,0.08)] overflow-hidden max-[720px]:order-4 max-[720px]:col-span-full max-[720px]:min-h-[36px]" onSubmit={submitSearch}>
          <input
            className="flex-1 border-0 p-[12px_24px] text-[0.94rem] text-[#1e293b] bg-transparent focus:outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
          />
          <button className="grid place-items-center w-11 h-11 mr-1 rtl:mr-0 rtl:ml-1 border-0 rounded-full bg-[#10233b] text-white cursor-pointer" aria-label="Search">
            <FaMagnifyingGlass />
          </button>
        </form>
        <div className="flex items-center gap-[18px] max-[720px]:justify-end max-[720px]:gap-2.5">
          <div className="relative inline-block max-[720px]:hidden">
            {token ? (
              <button
                className="border-0 bg-transparent text-white cursor-pointer text-[0.88rem] font-semibold flex items-center gap-1.5"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaRegUser /> {userEmail?.split("@")[0]}
              </button>
            ) : (
              <NavLink className="border-0 bg-transparent text-white cursor-pointer text-[0.88rem] font-semibold flex items-center gap-1.5 no-underline" to="/login">
                <FaRegUser />
                {t("ordersAccount")}
              </NavLink>
            )}
            {profileOpen && (
              <div className="absolute top-[calc(100%+12px)] right-0 z-50 w-[220px] rounded-xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_16px_36px_rgba(15,23,42,0.12)] p-[14px_16px] flex flex-col gap-2">
                <b className="text-[0.88rem] text-[#0f172a] break-all block mb-1 font-bold">{userEmail}</b>
                <NavLink className="border-0 p-[8px_12px] rounded-lg no-underline text-[#334155] text-[0.86rem] font-semibold cursor-pointer transition-colors duration-180 text-left bg-transparent hover:bg-[#f1f5f9] hover:text-[#0f172a] rtl:text-right" to="/cart">{t("myCart")}</NavLink>
                <NavLink className="border-0 p-[8px_12px] rounded-lg no-underline text-[#334155] text-[0.86rem] font-semibold cursor-pointer transition-colors duration-180 text-left bg-transparent hover:bg-[#f1f5f9] hover:text-[#0f172a] rtl:text-right" to="/orders">{t("myOrders")}</NavLink>
                <button className="border-0 p-[8px_12px] rounded-lg no-underline text-[#334155] text-[0.86rem] font-semibold cursor-pointer transition-colors duration-180 text-left bg-transparent hover:bg-[#f1f5f9] hover:text-[#0f172a] rtl:text-right" onClick={handleLogout}>
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
          <button className="inline-flex items-center gap-1.5 text-white bg-transparent border-0 p-0 cursor-pointer text-left font-inherit max-[720px]:p-[5px_8px] max-[720px]:text-[0.72rem] max-[720px]:gap-1 max-[720px]:rounded-md max-[720px]:border max-[720px]:border-white/30 max-[720px]:bg-white/10" type="button">
            <FaWhatsapp />
            {t("support")}
          </button>
          <button className="border-0 bg-transparent text-white cursor-pointer text-base max-[720px]:inline-flex max-[720px]:p-[5px_8px] max-[720px]:text-[0.72rem] max-[720px]:gap-1 max-[720px]:rounded-md max-[720px]:border max-[720px]:border-white/30 max-[720px]:bg-white/10" onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button className="inline-flex items-center gap-1.5 text-white bg-transparent border-0 p-0 cursor-pointer text-left font-inherit max-[720px]:p-[5px_8px] max-[720px]:text-[0.72rem] max-[720px]:gap-1 max-[720px]:rounded-md max-[720px]:border max-[720px]:border-white/30 max-[720px]:bg-white/10" type="button" onClick={handleLanguageToggle}>
            <FaGlobe /> {language === "en" ? "English" : "اردو"}
          </button>
          <NavLink className="inline-flex items-center gap-2 text-[1.15rem] text-white no-underline relative" to="/cart">
            <FaCartShopping /> <b className="grid place-items-center min-w-[20px] h-[20px] px-1 rounded-full bg-[#ff5b2e] text-white text-[0.72rem] font-bold">{count}</b>
          </NavLink>
        </div>
      </div>
      {categoryOpen && (
        <div className="absolute top-full left-0 right-0 z-[80] grid grid-cols-[290px_1fr] min-h-[510px] bg-white text-[#343434] border border-[#d9d9d9] shadow-[0_20px_35px_rgba(0,0,0,0.17)] max-[900px]:grid-cols-[170px_1fr] max-[900px]:min-h-[400px] max-[600px]:grid-cols-[130px_1fr]">
          <aside className="py-2.5 border-r border-[#e5e7eb] bg-[#fafafa] overflow-y-auto rtl:border-r-0 rtl:border-l">
            {[
              "Featured",
              "Home & Kitchen",
              "Women's Clothing",
              "Women's Shoes",
              "Men's Clothing",
              "Men's Underwear & Sleepwear",
              "Sports & Outdoors",
              "Women's Jewelry",
              "Beauty & Personal Care",
              "Toys & Games",
            ].map((category) => (
              <button className="w-full border-0 bg-transparent py-3 px-[30px] text-[#3b3b3b] text-left text-base font-semibold cursor-pointer hover:bg-[#f0f0f0] max-[900px]:p-[10px_14px] max-[900px]:text-[0.82rem] max-[600px]:text-[0.7rem] rtl:text-right" key={category} onClick={() => selectCategory(category)}>
                {t(getCategoryKey(category))} ›
              </button>
            ))}
          </aside>
          <div className="grid grid-cols-[repeat(6,minmax(105px,1fr))] gap-x-[18px] gap-y-6 p-[30px] align-content-start max-[900px]:grid-cols-3 max-[900px]:p-[18px] max-[900px]:gap-[14px] max-[600px]:grid-cols-2">
            {menu.map((item) => (
              <button className="border-0 bg-transparent text-[#484848] cursor-pointer font-inherit text-[0.95rem] leading-[1.35] max-[900px]:text-[0.76rem]" key={item.name} onClick={() => selectCategory(item.name)}>
                <img className="w-[104px] h-[104px] rounded-full object-cover block mx-auto mb-2.5 max-[900px]:w-[72px] max-[900px]:h-[72px] max-[600px]:w-[56px] max-[600px]:h-[56px]" src={item.image} alt="" />
                <span className="block">{t(getCategoryKey(item.name))}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
