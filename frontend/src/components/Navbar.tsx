import {
  FaCartShopping,
  FaChevronDown,
  FaGlobe,
  FaMagnifyingGlass,
  FaRegUser,
  FaWhatsapp,
} from 'react-icons/fa6'

interface NavbarProps {
  navLinks: readonly string[]
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Navbar({ navLinks, searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="brand-mark">TEMU</div>

      <nav className="nav-links" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link} href="#products">
            {link}
          </a>
        ))}
      </nav>

      <label className="search-bar" htmlFor="site-search">
        <input id="site-search" name="site-search" type="search" placeholder="cheap men stuff" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} />
        <span className="search-icon">
          <FaMagnifyingGlass aria-hidden="true" />
        </span>
      </label>

      <div className="nav-actions">
        <a href="#footer">
          <FaRegUser aria-hidden="true" />Orders & Account
        </a>
        <a href="#footer">
          <FaWhatsapp aria-hidden="true" />Support
        </a>
        <a href="#footer">
          <FaGlobe aria-hidden="true" />English <FaChevronDown aria-hidden="true" />
        </a>
        <a href="#footer" className="cart-icon">
          <FaCartShopping aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
