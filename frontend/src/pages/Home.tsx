import { Link } from "react-router-dom";
import { Products } from "./Products";
export function Home() {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Everything you love, for less</p>
          <h1>Discover fresh deals every day.</h1>
          <p className="hero-text">
            Shop our wide selection of products and enjoy exclusive discounts on
            your favorite items. Don't miss out on the best deals!
          </p>
          <Link className="action-button action-button-primary" to="/products">
            Shop products
          </Link>
        </div>
        <div className="hero-visual">
          <div className="floating-card floating-card-large">
            <span>Live shopping</span>
            <strong>New deals are waiting</strong>
          </div>
        </div>
      </section>
      <Products />
    </>
  );
}
