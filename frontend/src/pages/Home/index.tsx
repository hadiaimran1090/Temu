import { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import {
  SiAmericanexpress,
  SiApplepay,
  SiDiscover,
  SiGooglepay,
  SiJcb,
  SiMastercard,
  SiVisa,
} from 'react-icons/si'
import { Button } from '../../components/Button'
import { CategoryFilter } from '../../components/CategoryFilter'
import { Navbar } from '../../components/Navbar'
import { ProductSection } from '../../components/ProductSection'
import { getProducts, getProductsByCategory } from '../../services/productService'
import type { Product } from '../../../../shared/types/product'

const navLinks = ['Best-Selling Items', '5-Star Rated', 'New In', 'Categories']

const categories = [
  'All', "Women's Clothing", "Men's Clothing", 'Electronics', 'Home & Kitchen', 'Beauty', 'Jewelry', 'Shoes', 'Accessories',
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

export function Home() {
  const [showHeader, setShowHeader] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    async function loadProducts() {
      try {
        const requestOptions = { signal: abortController.signal, search: searchQuery }
        const data = selectedCategory === 'All' ? await getProducts(requestOptions) : await getProductsByCategory(selectedCategory, requestOptions)

        if (isMounted) {
          setProducts(data)
          setApiStatus('success')
        }
      } catch {
        if (isMounted && !abortController.signal.aborted) {
          setApiStatus('error')
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [selectedCategory, searchQuery])

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

        <Navbar navLinks={navLinks} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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
            <span>Please be wary of scam messages and links. Temu won\'t ask for extra fees via SMS or email.</span>
            <a href="#footer">View</a>
          </div>
        </section>

        <section className="hero-panel">
          <div className="hero-copy">
            <h1>Explore your interests with fast deals and clean shopping.</h1>
            <p className="hero-text">
              Frontend page Vite se run hoti hai aur Express backend se live product data sync karti hai.
            </p>

            <div className={`api-status api-status-${apiStatus}`} aria-live="polite">
              {apiStatus === 'loading' && 'Syncing with Express API...'}
              {apiStatus === 'success' && 'Express API connected'}
              {apiStatus === 'error' && 'Express API offline'}
            </div>

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

        <CategoryFilter categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <ProductSection products={products} status={apiStatus} />
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

export default Home
