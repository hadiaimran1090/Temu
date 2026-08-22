import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";
import { About } from "./pages/About";
import { Auth } from "./pages/Auth";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProductDetail } from "./pages/ProductDetail";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Support } from "./pages/Support";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="support" element={<Support />} />
            <Route path="checkout" element={<ProtectedRoute />}>
              <Route index element={<Checkout />} />
            </Route>
            <Route path="orders" element={<ProtectedRoute />}>
              <Route index element={<Orders />} />
            </Route>
            <Route path="login" element={<Auth />} />
            <Route path="register" element={<Auth register />} />
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}
