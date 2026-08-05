import { useEffect, useRef, useState } from 'react'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Navbar } from './components/Navbar'
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { SiApplepay, SiAmericanexpress, SiDiscover, SiGooglepay, SiJcb, SiMastercard, SiVisa } from 'react-icons/si'
import walletImage from './assets/images/wallet.jpg'
import smartwatchImage from './assets/images/smartwatch.jpg'
import phoneImage from './assets/images/phone.jpg'
import chairImage from './assets/images/chair.jpg'
import lampImage from './assets/images/lamp.jpg'
import toolkitImage from './assets/images/toolkit.jpg'
import shoesImage from './assets/images/shoes.jpg'
import hairclipperImage from './assets/images/hairclipper.jpg'
import stickerImage from './assets/images/sticker.jpg'

const products = [
  {
    id: 1,
    title: 'Compact Travel Wallet',
    price: 'Rs. 531',
    oldPrice: 'Rs. 899',
    sold: '3.4K+ sold',
    badge: 'Last day',
    palette: 'sunset',
    image: walletImage,
  },
  {
    id: 2,
    title: 'Floral Smart Watch',
    price: 'Rs. 1,566',
    oldPrice: 'Rs. 2,884',
    sold: '1 sold',
    badge: 'Only 14 left',
    palette: 'night',
    image: smartwatchImage,
  },
  {
    id: 3,
    title: 'Minimal Phone Case',
    price: 'Rs. 898',
    oldPrice: 'Rs. 1,575',
    sold: '3.4K+ sold',
    badge: 'SAVINGS',
    palette: 'amber',
    image: phoneImage,
  },
  {
    id: 4,
    title: 'Chair Tai Chi Guide',
    price: 'Rs. 1,924',
    oldPrice: 'Rs. 3,904',
    sold: '1 sold',
    badge: 'Only 16 left',
    palette: 'mint',
    image: chairImage,
  },
  {
    id: 5,
    title: 'Wireless Focus Lamp',
    price: 'Rs. 1,177',
    oldPrice: 'Rs. 2,240',
    sold: '1.9K+ sold',
    badge: 'Best-selling',
    palette: 'ocean',
    image: lampImage,
  },
  {
    id: 6,
    title: 'Precision Tool Kit',
    price: 'Rs. 1,078',
    oldPrice: 'Rs. 1,887',
    sold: '166 sold',
    badge: 'Quick look',
    palette: 'graphite',
    image: toolkitImage,
  },
  {
    id: 7,
    title: 'Elegant Women Shoes',
    price: 'Rs. 4,408',
    oldPrice: 'Rs. 5,260',
    sold: '1.2K+ sold',
    badge: 'Last 3 days',
    palette: 'amber',
    image: shoesImage,
  },
  {
    id: 8,
    title: 'Men Hair Clipper Set',
    price: 'Rs. 1,929',
    oldPrice: 'Rs. 3,330',
    sold: '1.4K+ sold',
    badge: 'SAVINGS',
    palette: 'graphite',
    image: hairclipperImage,
  },
  {
    id: 9,
    title: '1pc Custom Sticker Pack',
    price: 'Rs. 1,106',
    oldPrice: 'Rs. 2,325',
    sold: '2.3K+ sold',
    badge: 'Only 3 left',
    palette: 'sunset',
    image: stickerImage,
  },
]

const navLinks = ['Best-Selling Items', '5-Star Rated', 'New In', 'Categories']

const interestChips = [
  'Recommended',
  'Beauty & Personal Care',
  'Women\'s Clothing',
  'Home & Kitchen',
  'Men\'s Clothing',
  'Women\'s Shoes',
  'Men\'s Underwear & Sleepwear',
  'Sports & Outdoors',
]

const footerGroups = [
  {
    title: 'Company info',
    links: ['About Temu', 'Affiliate & Influencer Program: Join to Earn', 'Contact us', 'Careers', 'Press', "Temu's Tree Planting Program"],
  },
  {
    title: 'Customer service',
    links: ['Return and refund policy', 'Intellectual property policy', 'Shipping info', 'Report suspicious activity'],
  },
  {
    title: 'Help',
    links: ['Support center & FAQ', 'Safety center', 'Temu purchase protection', 'Sitemap', 'Partner with Temu'],
  },
]

const socialIcons = [
  { id: 'instagram', icon: FaInstagram },
  { id: 'facebook', icon: FaFacebookF },
  { id: 'x', icon: FaXTwitter },
  { id: 'tiktok', icon: FaTiktok },
  { id: 'youtube', icon: FaYoutube },
  { id: 'pinterest', icon: FaPinterestP },
]

const paymentIcons = [
  { id: 'jcb', icon: SiJcb },
  { id: 'visa', icon: SiVisa },
  { id: 'mastercard', icon: SiMastercard },
  { id: 'amex', icon: SiAmericanexpress },
  { id: 'discover', icon: SiDiscover },
  { id: 'apple-pay', icon: SiApplepay },
  { id: 'google-pay', icon: SiGooglepay },
]

function App() {
  const interestScrollerRef = useRef(null)
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const atTop = currentScrollY < 12
      const scrollingUp = currentScrollY < lastScrollY

      setShowHeader(atTop || scrollingUp)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollInterests = (direction) => {
    interestScrollerRef.current?.scrollBy({
      left: direction * 280,
      behavior: 'smooth',
    })
  }

  return (
    <div className="landing-page">
      <header className={`site-header ${showHeader ? 'site-header-visible' : 'site-header-hidden'}`}>
        <div className="top-bar top-bar-main">
          <div>
            <strong>Free shipping on all orders</strong>
            <span>Limited-time offer</span>
          </div>
          <div>
            <strong>Price adjustment</strong>
            <span>Within 30 days</span>
          </div>
          <div>
            <strong>Get the Temu App</strong>
            <span>Track orders any time</span>
          </div>
        </div>

        <Navbar navLinks={navLinks} />
      </header>

      <main className="page-content">
        <section className="trust-card">
          <div className="trust-card-head">
            <div className="trust-card-title">Why choose Temu?</div>
            <div className="trust-card-items">
              <span>Secure privacy</span>
              <span>Safe payments</span>
              <span>Delivery guarantee</span>
            </div>
          </div>

          <div className="trust-card-reminder">
            <strong>Security reminder:</strong>
            <span>
              Please be wary of scam messages and links. Temu won\'t ask for extra fees via SMS or email.
            </span>
            <a href="#footer">View</a>
          </div>
        </section>

        <section className="hero-panel">
          <div className="hero-copy">
            <h1>Explore your interests with fast deals and clean shopping.</h1>
            <p className="hero-text">
              Same-page Temu-style layout with a blue navbar, green trust strip, product cards, and
              footer sections.
            </p>
            <div className="hero-actions">
              <Button label="Shop deals" variant="primary" />
              <Button label="Explore interest" variant="secondary" />
            </div>
            <div className="hero-stats">
              <div>
                <strong>1.2M+</strong>
                <span>items featured</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>fresh discounts</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>buyer rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card floating-card-large">
              <span>Lightning deals</span>
              <strong>Limited-time offers</strong>
            </div>
            <div className="floating-card floating-card-small">New arrivals</div>
            <div className="floating-card floating-card-accent">Secure payments</div>
          </div>
        </section>

        <section className="tax-strip">
          <div className="tax-badge">Tax & Customs Policy</div>
          <div className="tax-copy">Hassle-free tax service</div>
        </section>

        <section className="interest-section" aria-label="Interest categories">
          <div className="interest-carousel">
            <button
              type="button"
              className="interest-arrow"
              aria-label="Scroll interests left"
              onClick={() => scrollInterests(-1)}
            >
              ‹
            </button>

            <div className="interest-chips" ref={interestScrollerRef}>
            {interestChips.map((chip) => (
              <button key={chip} type="button" className="interest-chip">
                {chip}
              </button>
            ))}
            </div>

            <button
              type="button"
              className="interest-arrow"
              aria-label="Scroll interests right"
              onClick={() => scrollInterests(1)}
            >
              ›
            </button>
          </div>
        </section>

        <section className="section-block" id="products">
          <div className="section-heading">
            <div>
              <h2>Lightning deals and clearance deals</h2>
            </div>
          </div>

          <div className="card-grid">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                sold={product.sold}
                badge={product.badge}
                palette={product.palette}
                image={product.image}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-columns">
          {footerGroups.map((group) => (
            <section key={group.title} className="footer-column">
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <a key={link} href="#app">
                  {link}
                </a>
              ))}
            </section>
          ))}

          <section className="footer-column footer-downloads">
            <h3>Download the Temu App</h3>
            <ul>
              <li>Price-drop alerts</li>
              <li>Faster & more secure checkout</li>
              <li>Exclusive offers</li>
              <li>Track orders any time</li>
              <li>Low stock items alerts</li>
              <li>Coupons & offers alerts</li>
            </ul>
            <div className="app-badges">
              <span>App Store</span>
              <span>Google Play</span>
            </div>
          </section>

        </div>

        <div className="footer-certifications-row">
          <section className="footer-certifications-group">
            <h3>Security certification</h3>
            <div className="logo-row">
              {socialIcons.map(({ id, icon: Icon }) => (
                <span key={id} className={`logo-pill logo-pill-social logo-pill-${id}`} aria-label={id}>
                  <Icon aria-hidden="true" />
                </span>
              ))}
            </div>
          </section>

          <section className="footer-certifications-group">
            <h3>We accept</h3>
            <div className="logo-row logo-row-payments">
              {paymentIcons.map(({ id, icon: Icon }) => (
                <span key={id} className={`logo-pill logo-pill-payment logo-pill-${id}`} aria-label={id}>
                  <Icon aria-hidden="true" />
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© 2022 - 2026 Whaleco Inc.</span>
          <a href="#app">Terms of use</a>
          <a href="#app">Privacy policy</a>
          <a href="#app">Your privacy choices</a>
          <a href="#app">Ad Choices</a>
        </div>
      </footer>
    </div>
  )
}

export default App