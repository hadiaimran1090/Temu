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
  FaBars,
  FaXmark,
  FaArrowRightFromBracket,
  FaClockRotateLeft,
} from "react-icons/fa6";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { syncCart } from "../../store/slices/cartSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import { setLanguage } from "../../store/slices/languageSlice";
import { useTranslation } from "../../hooks/useTranslation";
import { useAuth } from "../../context/AuthContext";
import { purify } from "../../utils/purify";

interface Subcategory {
  name: string;
  key: string;
  image: string;
  category: string;
}

interface CategoryWithSub {
  name: string;
  key: string;
  subcategories: Subcategory[];
}

const categoriesWithSubs: CategoryWithSub[] = [
  {
    name: "All",
    key: "cat_All",
    subcategories: [
      { name: "Casual Shirts", key: "sub_CasualShirts", image: "/products/menshirt.jpg", category: "Men's Clothing" },
      { name: "Digital Air Fryer 5L", key: "sub_DigitalAirFryer", image: "/products/Digital Air Fryer 5L.jpg", category: "Home & Kitchen" },
      { name: "Summer Dresses", key: "sub_SummerDresses", image: "/products/Women’s dress.jpg", category: "Women's Clothing" },
      { name: "Running Sneakers", key: "sub_RunningSneakers", image: "/products/Running Sneakers.jpg", category: "Women's Shoes" },
      { name: "Active Noise Cancelling Headphones", key: "sub_WirelessEarbuds", image: "/products/Active Noise Cancelling Headphones.jpg", category: "Accessories" },
      { name: "1000 Piece Wooden Landscape Puzzle", key: "sub_WoodenPuzzle", image: "/products/1000 Piece Wooden Landscape Puzzle.jpg", category: "Toys & Games" },
      { name: "Smart Watches", key: "sub_SmartWatches", image: "/products/smartwatch.jpg", category: "Accessories" },
      { name: "Portable Blender", key: "sub_PortableBlender", image: "/products/Portable Blender.jpg", category: "Home & Kitchen" },
      { name: "Fashion Handbags", key: "sub_FashionHandbags", image: "/products/handbag.jpg", category: "Women's Clothing" },
      { name: "Leather Ankle Chelsea Boots", key: "sub_ChelseaBoots", image: "/products/Leather Ankle Chelsea Boots.jpg", category: "Women's Shoes" },
      { name: "Adjustable Neoprene Dumbbell Set", key: "sub_Dumbbells", image: "/products/Adjustable Neoprene Dumbbell Set.jpg", category: "Sports & Outdoors" },
      { name: "Hyaluronic Acid Face Cream", key: "sub_FaceCream", image: "/products/Hyaluronic Acid Face Cream.jpg", category: "Beauty & Personal Care" },
    ],
  },
  {
    name: "Featured",
    key: "cat_Featured",
    subcategories: [
      { name: "Smart Watches", key: "sub_SmartWatches", image: "/products/smartwatch.jpg", category: "Accessories" },
      { name: "Travel Wallets", key: "sub_TravelWallets", image: "/products/wallet.jpg", category: "Accessories" },
      { name: "Wireless Earbuds", key: "sub_WirelessEarbuds", image: "/products/earbuds.jpg", category: "Accessories" },
      { name: "Luxury Perfume Spray", key: "sub_LuxuryPerfumeSpray", image: "/products/Luxuryperfume.jpg", category: "Accessories" },
      { name: "Vintage Leather Backpack", key: "sub_VintageLeatherBackpack", image: "/products/Vintageleatherbag.jpg", category: "Accessories" },
      { name: "Polarized Classic Sunglasses", key: "sub_PolarizedSunglasses", image: "/products/Polarized Classic Sunglasses.jpg", category: "Accessories" },
      { name: "Active Noise Cancelling Headphones", key: "sub_WirelessEarbuds", image: "/products/Active Noise Cancelling Headphones.jpg", category: "Accessories" },
      { name: "Self-Stirring Smart Mug", key: "sub_SelfStirringMug", image: "/products/Self-Stirring Smart Mug.jpg", category: "Accessories" },
    ],
  },
  {
    name: "Home & Kitchen",
    key: "cat_HomeKitchen",
    subcategories: [
      { name: "Kitchen Organizers", key: "sub_KitchenOrganizers", image: "/products/organizer.jpg", category: "Home & Kitchen" },
      { name: "Tai Chi Guides", key: "sub_TaiChiGuides", image: "/products/chair.jpg", category: "Home & Kitchen" },
      { name: "Focus Lamps", key: "sub_FocusLamps", image: "/products/lamp.jpg", category: "Home & Kitchen" },
      { name: "Digital Air Fryer 5L", key: "sub_DigitalAirFryer", image: "/products/Digital Air Fryer 5L.jpg", category: "Home & Kitchen" },
      { name: "Portable Blender", key: "sub_PortableBlender", image: "/products/Portable Blender.jpg", category: "Home & Kitchen" },
      { name: "Soft Velvet Cushion Cover Pack", key: "sub_VelvetCushions", image: "/products/Soft Velvet Cushion Cover Pack.jpg", category: "Home & Kitchen" },
      { name: "Silicone Spatula Set", key: "sub_SiliconeSpatulas", image: "/products/Silicone Spatula Set.jpg", category: "Home & Kitchen" },
      { name: "3-Tier Floating Wall Shelf", key: "sub_FloatingShelf", image: "/products/Tier Floating Wall Shelf.jpg", category: "Home & Kitchen" },
    ],
  },
  {
    name: "Women's Clothing",
    key: "cat_WomensClothing",
    subcategories: [
      { name: "Summer Dresses", key: "sub_SummerDresses", image: "/products/Women’s dress.jpg", category: "Women's Clothing" },
      { name: "Fashion Handbags", key: "sub_FashionHandbags", image: "/products/handbag.jpg", category: "Women's Clothing" },
      { name: "Winter Woolen Trench Coat", key: "sub_WinterCoat", image: "/products/Winter Woolen Trench Coat.jpg", category: "Women's Clothing" },
      { name: "Premium Silk Pyjama Set", key: "sub_SilkPajamas", image: "/products/Premium Silk Pyjama Set.jpg", category: "Women's Clothing" },
      { name: "High Waisted Wide Leg Jeans", key: "sub_WideLegJeans", image: "/products/High Waisted Wide Leg Jeans.jpg", category: "Women's Clothing" },
      { name: "Pleated Floral A-Line Skirt", key: "sub_AlineSkirt", image: "/products/Pleated Floral A-Line Skirt.jpg", category: "Women's Clothing" },
      { name: "Oversized Fleece Hoodie", key: "sub_FleeceHoodie", image: "/products/Oversized Fleece Hoodie.jpg", category: "Women's Clothing" },
    ],
  },
  {
    name: "Women's Shoes",
    key: "cat_WomensShoes",
    subcategories: [
      { name: "Elegant Shoes", key: "sub_ElegantShoes", image: "/products/shoes.jpg", category: "Women's Shoes" },
      { name: "Running Sneakers", key: "sub_RunningSneakers", image: "/products/Running Sneakers.jpg", category: "Women's Shoes" },
      { name: "Pointed Toe Classic Flats", key: "sub_PointedFlats", image: "/products/Pointed Toe Classic Flats.jpg", category: "Women's Shoes" },
      { name: "Leather Ankle Chelsea Boots", key: "sub_ChelseaBoots", image: "/products/Leather Ankle Chelsea Boots.jpg", category: "Women's Shoes" },
      { name: "Strappy Stiletto Party Heels", key: "sub_StilettoHeels", image: "/products/Strappy Stiletto Party Heels.jpg", category: "Women's Shoes" },
      { name: "Fluffy Warm Indoor Slippers", key: "sub_IndoorSlippers", image: "/products/Fluffy Warm Indoor Slippers.jpg", category: "Women's Shoes" },
    ],
  },
  {
    name: "Men's Clothing",
    key: "cat_MensClothing",
    subcategories: [
      { name: "Casual Shirts", key: "sub_CasualShirts", image: "/products/menshirt.jpg", category: "Men's Clothing" },
      { name: "Casual Cotton Polo Shirt", key: "sub_CasualPolo", image: "/products/Casual Cotton Polo Shirt.jpg", category: "Men's Clothing" },
      { name: "Classic Stretch Slim Denim Jeans", key: "sub_SlimDenimJeans", image: "/products/Classic Stretch Slim Denim Jeans.jpg", category: "Men's Clothing" },
      { name: "Knitted Crewneck Winter Sweater", key: "sub_KnittedSweater", image: "/products/Knitted Crewneck Winter Sweater.jpg", category: "Men's Clothing" },
      { name: "Slim Fit Men Blazer Jacket", key: "sub_BlazerJacket", image: "/products/Slim Fit Men Blazer Jacket.jpg", category: "Men's Clothing" },
      { name: "Windproof Outdoor Bomber Jacket", key: "sub_BomberJacket", image: "/products/Windproof Outdoor Bomber Jacket.jpg", category: "Men's Clothing" },
      { name: "Hair Clipper Sets", key: "sub_HairClipperSets", image: "/products/hairclipper.jpg", category: "Accessories" },
      { name: "Flannel Plaid Sleepwear", key: "sub_FlannelSleepwear", image: "/products/Flannel Plaid Sleepwear.jpg", category: "Men's Clothing" },
      { name: "Luxury Plush Bathrobe", key: "sub_PlushBathrobe", image: "/products/Luxury Plush Bathrobe.jpg", category: "Men's Clothing" },
      { name: "Athletic Cushioned Socks", key: "sub_AthleticSocks", image: "/products/Athletic Cushioned Crew Socks 5-Pack.jpg", category: "Men's Clothing" },
      { name: "Dry-Fit Undershirt", key: "sub_DryFitUndershirt", image: "/products/Dry-Fit Compression Undershirt.jpg", category: "Men's Clothing" },
    ],
  },
  {
    name: "Sports & Outdoors",
    key: "cat_SportsOutdoors",
    subcategories: [
      { name: "Sports Water Bottles", key: "sub_SportsWaterBottles", image: "/products/Sports water bottle.jpg", category: "Sports & Outdoors" },
      { name: "Sports Gear", key: "sub_SportsGear", image: "/products/sports.jpg", category: "Sports & Outdoors" },
      { name: "Eco-Friendly TPE Yoga Mat", key: "sub_YogaMat", image: "/products/Eco-Friendly TPE Yoga Mat.jpg", category: "Sports & Outdoors" },
      { name: "Adjustable Neoprene Dumbbell Set", key: "sub_Dumbbells", image: "/products/Adjustable Neoprene Dumbbell Set.jpg", category: "Sports & Outdoors" },
      { name: "Resistance Bands Set", key: "sub_ResistanceBands", image: "/products/Resistance Bands Set.jpg", category: "Sports & Outdoors" },
      { name: "Waterproof 2-Person Camping Tent", key: "sub_CampingTent", image: "/products/Waterproof 2-Person Camping Tent.jpg", category: "Sports & Outdoors" },
      { name: "Waterproof Hiking Backpack 40L", key: "sub_HikingBackpack", image: "/products/Waterproof Hiking Backpack 40L.jpg", category: "Sports & Outdoors" },
    ],
  },

  {
    name: "Beauty & Personal Care",
    key: "cat_BeautyPersonalCare",
    subcategories: [
      { name: "Skincare Serums", key: "sub_SkincareSerums", image: "/products/Skincare serum.jpg", category: "Beauty & Personal Care" },
      { name: "Hyaluronic Acid Face Cream", key: "sub_FaceCream", image: "/products/Hyaluronic Acid Face Cream.jpg", category: "Beauty & Personal Care" },
      { name: "Matte Long-Lasting Liquid Lipstick", key: "sub_Lipstick", image: "/products/Matte Long-Lasting Liquid Lipstick.jpg", category: "Beauty & Personal Care" },
      { name: "Ionic Blow Dryer", key: "sub_HairDryer", image: "/products/Ionic Blow Dryer.jpg", category: "Beauty & Personal Care" },
      { name: "12pcs Professional Makeup Brush Set", key: "sub_BrushSet", image: "/products/12pcs Professional Makeup Brush Set.jpg", category: "Beauty & Personal Care" },
      { name: "SPF 50+ Daily Sunscreen Gel", key: "sub_Sunscreen", image: "/products/Gel.jpg", category: "Beauty & Personal Care" },
    ],
  },
  {
    name: "Toys & Games",
    key: "cat_ToysGames",
    subcategories: [
      { name: "Building Toys", key: "sub_BuildingToys", image: "/products/Kids’ toy.jpg", category: "Toys & Games" },
      { name: "1000 Piece Wooden Landscape Puzzle", key: "sub_WoodenPuzzle", image: "/products/1000 Piece Wooden Landscape Puzzle.jpg", category: "Toys & Games" },
      { name: "Remote Control High-Speed Racing Car", key: "sub_RacingCar", image: "/products/Remote Control High-Speed Racing Car.jpg", category: "Toys & Games" },
      { name: "Cute Soft Animal Pillow Plush Toy", key: "sub_PlushToy", image: "/products/Cute Soft Animal Pillow Plush Toy.jpg", category: "Toys & Games" },
      { name: "Classic Strategy Board Game", key: "sub_BoardGame", image: "/products/Classic Strategy Board Game.jpg", category: "Toys & Games" },
      { name: "LCD Writing Tablet for Kids", key: "sub_WritingTablet", image: "/products/LCD Writing Tablet for Kids.jpg", category: "Toys & Games" },
    ],
  },
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
  const { token, userEmail, logout } = useAuth();
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";

  const navigate = useNavigate();
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const categoryBtnRef = useRef<HTMLButtonElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Sync local search input with URL search param changes
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // Debounced URL updates when typing
  useEffect(() => {
    if (search === urlSearch) return;

    const sanitized = purify(search);

    if (sanitized === "") {
      const newParams = new URLSearchParams(window.location.search);
      newParams.delete("search");
      navigate(`/products?${newParams.toString()}`, { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(window.location.search);
      newParams.set("search", sanitized);
      navigate(`/products?${newParams.toString()}`, { replace: true });
    }, 450);

    return () => clearTimeout(timer);
  }, [search, urlSearch, navigate]);

  // Handle outside clicks and Escape key down to close overlays
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (
        categoryOpen &&
        categoryRef.current &&
        !categoryRef.current.contains(target) &&
        categoryBtnRef.current &&
        !categoryBtnRef.current.contains(target)
      ) {
        setCategoryOpen(false);
      }
      
      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileMenuBtnRef.current &&
        !mobileMenuBtnRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCategoryOpen(false);
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [categoryOpen, profileOpen, mobileMenuOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const sanitized = purify(search);
    const newParams = new URLSearchParams(window.location.search);
    if (sanitized) {
      newParams.set("search", sanitized);
    } else {
      newParams.delete("search");
    }
    navigate(`/products?${newParams.toString()}`);
  };

  const selectCategory = (category: string) => {
    setCategoryOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const selectSubcategory = (category: string, searchVal: string) => {
    setCategoryOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchVal)}`);
  };

  const handleLogout = () => {
    logout();
    dispatch(syncCart());
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    dispatch(setLanguage(language === "en" ? "ur" : "en"));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 transition-all duration-180 ease-in-out opacity-100 pointer-events-auto">
      {/* Top Banner Row (Hidden on mobile) */}
      <div className="grid grid-cols-3 gap-[1px] bg-[#111] text-[#d1d5db] text-center font-semibold max-[600px]:hidden">
        <div className="bg-[#101010] p-[10px_14px] flex items-center justify-center gap-1.5 text-[0.88rem] max-[600px]:p-[7px_4px] max-[600px]:text-[0.68rem]">
          <FaTruck />
          <strong className="font-bold text-[0.88rem] max-[600px]:text-[0.7rem]">{t("freeShippingOrders")}</strong>
          <span className="text-[#f5e6b8] block text-[0.8rem] max-[900px]:hidden">{t("limitedTimeOffer")}</span>
        </div>
        <div className="bg-[#101010] p-[10px_14px] flex items-center justify-center gap-1.5 text-[0.88rem] max-[600px]:p-[7px_4px] max-[600px]:text-[0.68rem]">
          <strong className="font-bold text-[0.88rem] max-[600px]:text-[0.7rem]">{t("freeReturns")}</strong>
          <span className="text-[#f5e6b8] block text-[0.8rem] max-[900px]:hidden">{t("upTo90Days")}</span>
        </div>
        <div className="bg-[#101010] p-[10px_14px] flex items-center justify-center gap-1.5 text-[0.88rem] max-[600px]:p-[7px_4px] max-[600px]:text-[0.68rem]">
          <strong className="font-bold text-[0.88rem] max-[600px]:text-[0.7rem]">{t("getTemuApp")}</strong>
          <span className="text-[#f5e6b8] block text-[0.8rem] max-[900px]:hidden">{t("trackOrdersTime")}</span>
        </div>
      </div>

      {/* Desktop/Tablet Header Layout */}
      <div className="hidden min-[601px]:grid grid-cols-[auto_auto_1fr_auto] max-[990px]:grid-cols-[auto_auto_1fr] gap-[10px_18px] max-[900px]:gap-[10px_10px] items-center p-[6px_28px] max-[900px]:p-[6px_14px] bg-gradient-to-r from-[#4ea5e6] to-[#62b4f0] text-white">
        <NavLink className="w-[50px] h-[50px] rounded-[14px] bg-gradient-to-br from-[#ff8c1a] to-[#ff5f28] grid place-items-center font-black tracking-[0.08em] shadow-[0_12px_24px_rgba(255,111,31,0.35)] text-white no-underline max-[990px]:w-[46px] max-[990px]:h-[46px] max-[990px]:text-[0.7rem]" to="/">
          {t("brand")}
        </NavLink>
        <nav className="flex items-center flex-wrap gap-3 font-semibold max-[1100px]:justify-center">
          <NavLink className="text-white no-underline text-[0.86rem] whitespace-nowrap active:underline active:text-[#fff3c4] [&.active]:text-[#fff3c4] [&.active]:underline [&.active]:underline-offset-[5px] max-[900px]:hidden" to="/products">{t("bestSelling")}</NavLink>
          <NavLink className="text-white no-underline text-[0.86rem] whitespace-nowrap active:underline active:text-[#fff3c4] [&.active]:text-[#fff3c4] [&.active]:underline [&.active]:underline-offset-[5px] max-[900px]:hidden" to="/about">{t("about")}</NavLink>
          <NavLink className="text-white no-underline text-[0.86rem] whitespace-nowrap active:underline active:text-[#fff3c4] [&.active]:text-[#fff3c4] [&.active]:underline [&.active]:underline-offset-[5px] max-[900px]:hidden" to="/products">{t("newIn")}</NavLink>
          <button
            ref={categoryBtnRef}
            className="border border-transparent rounded-full bg-transparent text-inherit p-[9px_12px] cursor-pointer inline-flex gap-[5px] items-center hover:border-white transition-colors"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            {t("categories")} <FaChevronDown />
          </button>
        </nav>
        <form className="relative max-w-[620px] max-[990px]:max-w-none flex items-center rounded-full bg-white shadow-[0_4px_18px_rgba(15,23,42,0.08)] overflow-hidden max-[990px]:row-start-2 max-[990px]:col-span-full" onSubmit={submitSearch}>
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
        <div className="flex items-center gap-[18px] max-[900px]:gap-[12px] max-[990px]:col-start-3 max-[990px]:justify-self-end">
          <div className="relative inline-block">
            {token ? (
              <button
                ref={profileBtnRef}
                className="border-0 bg-transparent text-white cursor-pointer text-[0.88rem] font-semibold flex items-center gap-1.5"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaRegUser /> <span className="max-[900px]:hidden">{userEmail?.split("@")[0]}</span>
              </button>
            ) : (
              <NavLink className="border-0 bg-transparent text-white cursor-pointer text-[0.88rem] font-semibold flex items-center gap-1.5 no-underline" to="/login">
                <FaRegUser />
                <span className="max-[900px]:hidden">{t("ordersAccount")}</span>
              </NavLink>
            )}
            {profileOpen && (
              <div 
                ref={profileRef} 
                className="profile-dropdown absolute top-[calc(100%+12px)] right-0 z-50 w-[240px] rounded-2xl border border-[rgba(82,143,191,0.18)] bg-white shadow-[0_16px_48px_rgba(15,23,42,0.12)] p-4 flex flex-col gap-1.5 transition-all duration-180 animate-fade-in text-[#1e293b]"
              >
                {/* User Info Header Card */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4ea5e6] to-[#62b4f0] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                    {userEmail ? userEmail[0].toUpperCase() : "U"}
                  </div>
                  <div className="flex flex-col min-w-0 text-left rtl:text-right">
                    <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">{t("ordersAccount")}</span>
                    <span className="text-[0.84rem] text-[#0f172a] font-bold truncate max-w-[150px]">{userEmail}</span>
                  </div>
                </div>

                {/* Dropdown Items */}
                <NavLink 
                  className="group flex items-center justify-between border-0 p-[10px_12px] rounded-xl no-underline text-[#475569] text-[0.88rem] font-bold cursor-pointer transition-all duration-150 bg-transparent hover:bg-[#f1f5f9] hover:text-[#ff5b2e] text-left rtl:text-right" 
                  to="/cart"
                >
                  <div className="flex items-center gap-2.5">
                    <FaCartShopping className="text-[1.05rem] text-slate-400 group-hover:text-[#ff5b2e] transition-colors" />
                    <span>{t("myCart")}</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-[#ff5b2e] group-hover:translate-x-0.5 transition-all duration-150 text-[0.8rem]">&rsaquo;</span>
                </NavLink>

                <NavLink 
                  className="group flex items-center justify-between border-0 p-[10px_12px] rounded-xl no-underline text-[#475569] text-[0.88rem] font-bold cursor-pointer transition-all duration-150 bg-transparent hover:bg-[#f1f5f9] hover:text-[#ff5b2e] text-left rtl:text-right" 
                  to="/orders"
                >
                  <div className="flex items-center gap-2.5">
                    <FaClockRotateLeft className="text-[1.05rem] text-slate-400 group-hover:text-[#ff5b2e] transition-colors" />
                    <span>{t("myOrders")}</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-[#ff5b2e] group-hover:translate-x-0.5 transition-all duration-150 text-[0.8rem]">&rsaquo;</span>
                </NavLink>

                <div className="h-[1px] bg-slate-100 my-1"></div>

                <button 
                  className="group flex items-center gap-2.5 border-0 p-[10px_12px] rounded-xl no-underline text-[#475569] text-[0.88rem] font-bold cursor-pointer transition-all duration-150 bg-transparent hover:bg-red-50 hover:text-red-600 text-left rtl:text-right w-full" 
                  onClick={handleLogout}
                >
                  <FaArrowRightFromBracket className="text-[1.05rem] text-slate-400 group-hover:text-red-600 transition-colors" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            )}
          </div>
          <NavLink className="inline-flex items-center gap-1.5 text-white no-underline text-[0.88rem] font-semibold" to="/support">
            <FaWhatsapp />
            <span className="max-[900px]:hidden">{t("support")}</span>
          </NavLink>
          <button className="border-0 bg-transparent text-white cursor-pointer text-base" onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button className="inline-flex items-center gap-1.5 text-white bg-transparent border-0 p-0 cursor-pointer text-left font-inherit" type="button" onClick={handleLanguageToggle}>
            <FaGlobe /> <span className="max-[900px]:hidden">{language === "en" ? "English" : "اردو"}</span>
          </button>
          <NavLink className="inline-flex items-center gap-2 text-[1.15rem] text-white no-underline relative" to="/cart">
            <FaCartShopping /> <b className="grid place-items-center min-w-[20px] h-[20px] px-1 rounded-full bg-[#ff5b2e] text-white text-[0.72rem] font-bold">{count}</b>
          </NavLink>
        </div>
      </div>

      {/* Mobile Header Layout (Screen <= 600px) */}
      <div className="min-[601px]:hidden flex flex-col gap-2 p-[8px_14px] bg-gradient-to-r from-[#4ea5e6] to-[#62b4f0] text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              ref={mobileMenuBtnRef}
              className="text-white text-xl bg-transparent border-0 cursor-pointer flex items-center justify-center p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
            <NavLink className="w-[42px] h-[42px] rounded-[12px] bg-gradient-to-br from-[#ff8c1a] to-[#ff5f28] grid place-items-center font-black tracking-[0.08em] shadow-[0_8px_16px_rgba(255,111,31,0.3)] text-white no-underline text-[0.8rem]" to="/">
              {t("brand")}
            </NavLink>
          </div>
          <div className="flex items-center gap-3.5">
            <button className="border-0 bg-transparent text-white cursor-pointer text-lg flex items-center justify-center" onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <NavLink className="inline-flex items-center gap-1 text-[1.1rem] text-white no-underline relative" to="/cart">
              <FaCartShopping /> <b className="grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#ff5b2e] text-white text-[0.65rem] font-bold">{count}</b>
            </NavLink>
          </div>
        </div>
        
        {/* Mobile Search Input */}
        <form className="relative flex items-center rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden min-h-[38px] w-full" onSubmit={submitSearch}>
          <input
            className="flex-1 border-0 p-[8px_16px] text-[0.88rem] text-[#1e293b] bg-transparent focus:outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
          />
          <button className="grid place-items-center w-8 h-8 mr-1 rtl:mr-0 rtl:ml-1 border-0 rounded-full bg-[#10233b] text-white cursor-pointer" aria-label="Search">
            <FaMagnifyingGlass />
          </button>
        </form>
      </div>

      {/* Mobile Drawer Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 min-[601px]:hidden flex">
          {/* Backdrop overlay */}
          <div className="fixed inset-0 bg-black/45 backdrop-blur-[2px]" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Drawer container */}
          <div ref={mobileMenuRef} className={`relative flex flex-col w-[280px] max-w-[80vw] h-full bg-white text-[#334155] shadow-2xl p-5 overflow-y-auto ltr:mr-auto rtl:ml-auto transition-all ${language === "ur" ? "drawer-slide-right" : "drawer-slide-left"}`}>
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e7eb] mb-4">
              <span className="font-bold text-[1.1rem] text-[#10233b]">{t("brand")} Menu</span>
              <button className="border-0 bg-transparent text-xl text-slate-500 cursor-pointer flex items-center justify-center p-1" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <FaXmark />
              </button>
            </div>
            
            {/* Account Info Profile Area */}
            <div className="p-3.5 bg-[#fafafa] rounded-xl mb-4 flex flex-col gap-1 border border-[#e5e7eb]">
              {token ? (
                <>
                  <span className="text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold">Logged In As</span>
                  <b className="text-[0.86rem] text-slate-800 break-all block mb-2">{userEmail}</b>
                  <div className="flex flex-col gap-1.5">
                    <NavLink className="p-2 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-semibold text-sm no-underline text-left rtl:text-right" to="/cart" onClick={() => setMobileMenuOpen(false)}>{t("myCart")}</NavLink>
                    <NavLink className="p-2 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-semibold text-sm no-underline text-left rtl:text-right" to="/orders" onClick={() => setMobileMenuOpen(false)}>{t("myOrders")}</NavLink>
                    <button className="p-2 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-semibold text-sm border-0 bg-transparent text-left cursor-pointer rtl:text-right w-full" onClick={handleLogout}>{t("logout")}</button>
                  </div>
                </>
              ) : (
                <NavLink className="flex items-center gap-2 p-2.5 bg-[#10233b] text-white rounded-xl no-underline text-center justify-center font-bold text-sm" to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <FaRegUser /> {t("ordersAccount")}
                </NavLink>
              )}
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-1 border-b border-[#e5e7eb] pb-4 mb-4">
              <span className="text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold mb-1.5 px-2">Navigation</span>
              <NavLink className="p-2.5 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-bold text-sm no-underline text-left rtl:text-right" to="/products" onClick={() => setMobileMenuOpen(false)}>{t("bestSelling")}</NavLink>
              <NavLink className="p-2.5 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-bold text-sm no-underline text-left rtl:text-right" to="/about" onClick={() => setMobileMenuOpen(false)}>{t("about")}</NavLink>
              <NavLink className="p-2.5 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-bold text-sm no-underline text-left rtl:text-right" to="/products" onClick={() => setMobileMenuOpen(false)}>{t("newIn")}</NavLink>
            </nav>

            {/* Categories list in mobile menu */}
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold mb-1.5 px-2">Categories</span>
              <div className="flex flex-col gap-0.5 max-h-[220px] overflow-y-auto pr-1">
                {categoriesWithSubs.map((category) => (
                  <button 
                    key={category.name} 
                    className="w-full text-left border-0 bg-transparent p-2 hover:bg-[#f0f0f0] rounded-lg text-slate-700 text-sm font-semibold cursor-pointer flex justify-between items-center rtl:text-right"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      selectCategory(category.name);
                    }}
                  >
                    <span>{t(category.key as any)}</span>
                    <span className="text-slate-300">›</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language & Support */}
            <div className="mt-auto border-t border-[#e5e7eb] pt-4 flex flex-col gap-2">
              <button className="flex items-center gap-2.5 p-2.5 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-bold text-sm border-0 bg-transparent text-left cursor-pointer rtl:text-right w-full" onClick={() => { setMobileMenuOpen(false); handleLanguageToggle(); }}>
                <FaGlobe /> {language === "en" ? "English" : "اردو"}
              </button>
              <NavLink className="flex items-center gap-2.5 p-2.5 hover:bg-[#f0f0f0] rounded-lg text-slate-700 font-bold text-sm no-underline text-left rtl:text-right w-full" to="/support" onClick={() => setMobileMenuOpen(false)}>
                <FaWhatsapp /> {t("support")}
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Categories Mega-Menu Overlay */}
      {categoryOpen && (
        <div ref={categoryRef} className="mega-menu absolute top-full left-0 right-0 z-[80] grid grid-cols-[290px_1fr] min-h-[510px] bg-white text-[#343434] border border-[#d9d9d9] shadow-[0_20px_35px_rgba(0,0,0,0.17)] max-[900px]:grid-cols-[170px_1fr] max-[900px]:min-h-[400px] max-[600px]:grid-cols-[130px_1fr]">
          {/* Left Main Categories List */}
          <aside className="py-2.5 border-r border-[#e5e7eb] bg-[#fafafa] overflow-y-auto rtl:border-r-0 rtl:border-l">
            {categoriesWithSubs.map((category) => (
              <button 
                className={`w-full border-0 py-3 px-[30px] text-left text-base font-semibold cursor-pointer hover:bg-[#f0f0f0] max-[900px]:p-[10px_14px] max-[900px]:text-[0.82rem] max-[600px]:text-[0.7rem] rtl:text-right transition-colors duration-150 ${
                  activeCategory === category.name ? "bg-[#f0f0f0]! text-[#ff5b2e]!" : "bg-transparent text-[#3b3b3b]"
                }`} 
                key={category.name} 
                onMouseEnter={() => setActiveCategory(category.name)}
                onClick={() => selectCategory(category.name)}
              >
                {t(category.key as any)} ›
              </button>
            ))}
          </aside>
          
          {/* Right Subcategories Items Grid */}
          <div className="grid grid-cols-[repeat(6,minmax(105px,1fr))] gap-x-[18px] gap-y-6 p-[30px] align-content-start max-[900px]:grid-cols-3 max-[900px]:p-[18px] max-[900px]:gap-[14px] max-[600px]:grid-cols-2 mega-items max-h-[510px] overflow-y-auto">
            {categoriesWithSubs.find((cat) => cat.name === activeCategory)?.subcategories.map((sub) => (
              <button 
                className="border-0 bg-transparent text-[#484848] cursor-pointer font-inherit text-[0.95rem] leading-[1.35] max-[900px]:text-[0.76rem] hover:text-[#ff5b2e]! hover:scale-105 transition-all duration-150" 
                key={sub.name} 
                onClick={() => selectSubcategory(sub.category, sub.name)}
              >
                <img className="w-[104px] h-[104px] rounded-full object-cover block mx-auto mb-2.5 max-[900px]:w-[72px] max-[900px]:h-[72px] max-[600px]:w-[56px] max-[600px]:h-[56px] shadow-sm border border-slate-100" src={sub.image} alt="" />
                <span className="block">
                  {t(sub.key as any) === sub.key ? sub.name : t(sub.key as any)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
