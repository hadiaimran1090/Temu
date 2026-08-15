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
import { useAppContext } from "../contexts/AppContext";
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
export function Navbar() {
  const { cart, theme, toggleTheme, token, userEmail, logout } =
    useAppContext();
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
  return (
    <header className="site-header site-header-visible">
      <div className="top-bar top-bar-main">
        <div>
          <FaTruck />
          <strong>Free shipping on all orders</strong>
          <span>Limited-time offer</span>
        </div>
        <div>
          <strong>Free returns</strong>
          <span>Up to 90 days*</span>
        </div>
        <div>
          <strong>Get the Temu App</strong>
          <span>Track orders any time</span>
        </div>
      </div>
      <div className="navbar">
        <NavLink className="brand-mark" to="/">
          TEMU
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/products">Best-Selling Items</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/products">New In</NavLink>
          <button
            className="category-trigger"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            Categories <FaChevronDown />
          </button>
        </nav>
        <form className="search-bar" onSubmit={submitSearch}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search our products"
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
                Orders & Account
              </NavLink>
            )}
            {profileOpen && (
              <div className="profile-dropdown">
                <b>{userEmail}</b>
                <NavLink to="/cart">My cart</NavLink>
                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <button className="nav-action-button" type="button">
            <FaWhatsapp />
            Support
          </button>
          <button className="icon-button" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button className="nav-action-button" type="button">
            <FaGlobe /> English
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
                {category} ›
              </button>
            ))}
          </aside>
          <div className="mega-items">
            {menu.map((item) => (
              <button key={item.name} onClick={() => selectCategory(item.name)}>
                <img src={item.image} alt="" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
