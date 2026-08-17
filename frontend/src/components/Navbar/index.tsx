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
    <header className="site-header site-header-visible">
      <div className="top-bar top-bar-main">
        <div>
          <FaTruck />
          <strong>{t("freeShippingOrders")}</strong>
          <span>{t("limitedTimeOffer")}</span>
        </div>
        <div>
          <strong>{t("freeReturns")}</strong>
          <span>{t("upTo90Days")}</span>
        </div>
        <div>
          <strong>{t("getTemuApp")}</strong>
          <span>{t("trackOrdersTime")}</span>
        </div>
      </div>
      <div className="navbar">
        <NavLink className="brand-mark" to="/">
          {t("brand")}
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/products">{t("bestSelling")}</NavLink>
          <NavLink to="/about">{t("about")}</NavLink>
          <NavLink to="/products">{t("newIn")}</NavLink>
          <button
            className="category-trigger"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            {t("categories")} <FaChevronDown />
          </button>
        </nav>
        <form className="search-bar" onSubmit={submitSearch}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
          />
          <button className="search-icon" aria-label="Search">
            <FaMagnifyingGlass />
          </button>
        </form>
        <div className="nav-actions">
          <div className="profile-menu">
            {token ? (
              <button
                className="profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaRegUser /> {userEmail?.split("@")[0]}
              </button>
            ) : (
              <NavLink to="/login">
                <FaRegUser />
                {t("ordersAccount")}
              </NavLink>
            )}
            {profileOpen && (
              <div className="profile-dropdown">
                <b>{userEmail}</b>
                <NavLink to="/cart">{t("myCart")}</NavLink>
                <NavLink to="/orders">{t("myOrders")}</NavLink>
                <button onClick={handleLogout}>
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
          <button className="nav-action-button" type="button">
            <FaWhatsapp />
            {t("support")}
          </button>
          <button className="icon-button" onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button className="nav-action-button" type="button" onClick={handleLanguageToggle}>
            <FaGlobe /> {language === "en" ? "English" : "اردو"}
          </button>
          <NavLink className="cart-icon" to="/cart">
            <FaCartShopping /> <b>{count}</b>
          </NavLink>
        </div>
      </div>
      {categoryOpen && (
        <div className="mega-menu">
          <aside>
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
              <button key={category} onClick={() => selectCategory(category)}>
                {t(getCategoryKey(category))} ›
              </button>
            ))}
          </aside>
          <div className="mega-items">
            {menu.map((item) => (
              <button key={item.name} onClick={() => selectCategory(item.name)}>
                <img src={item.image} alt="" />
                <span>{t(getCategoryKey(item.name))}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
