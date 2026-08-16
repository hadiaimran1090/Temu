import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../../shared/types/product";
import type { CartItem } from "../../../shared/types/cart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  fetchCart,
  addToCartApi,
  removeFromCartApi,
  clearCartApi,
  mergeCartApi,
} from "../services/api";

interface ContextValue {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  showNotice: (message: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  token: string | null;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  notice: string | null;
}

const Context = createContext<ContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useLocalStorage<string | null>(
    "temu-user",
    null,
  );
  const [token, setToken] = useLocalStorage<string | null>("temu-token", null);
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "temu-theme",
    "light",
  );
  const [guestCart, setGuestCart] = useLocalStorage<CartItem[]>(
    "temu-cart-guest",
    [],
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (token) {
      fetchCart()
        .then((dbCart) => {
          setCart(dbCart);
        })
        .catch((err) => {
          console.error("Failed to fetch cart from database:", err);
        });
    } else {
      setCart(guestCart);
    }
  }, [token, guestCart]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2600);
  };

  const addToCart = async (product: Product, quantity = 1) => {
    const quantityToAdd = Math.max(1, Math.floor(quantity));
    if (token) {
      try {
        const updatedCart = await addToCartApi(product.id, quantityToAdd);
        setCart(updatedCart);
      } catch (err) {
        console.error("Failed to add to database cart:", err);
        showNotice(`Failed to add ${product.title} to cart`);
        return;
      }
    } else {
      setGuestCart((items) => {
        const item = items.find((entry) => entry.id === product.id);
        return item
          ? items.map((entry) =>
              entry.id === product.id
                ? { ...entry, quantity: entry.quantity + quantityToAdd }
                : entry,
            )
          : [...items, { ...product, quantity: quantityToAdd }];
      });
    }
    showNotice(`${quantityToAdd} × ${product.title} added to cart`);
  };

  const removeFromCart = async (id: number) => {
    if (token) {
      try {
        const updatedCart = await removeFromCartApi(id);
        setCart(updatedCart);
      } catch (err) {
        console.error("Failed to remove from database cart:", err);
      }
    } else {
      setGuestCart((items) => items.filter((item) => item.id !== id));
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        await clearCartApi();
        setCart([]);
      } catch (err) {
        console.error("Failed to clear database cart:", err);
      }
    } else {
      setGuestCart([]);
    }
  };

  const login = async (email: string, tokenVal: string) => {
    setUserEmail(email);
    setToken(tokenVal);

    if (guestCart.length > 0) {
      try {
        const merged = await mergeCartApi(
          guestCart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          }))
        );
        setCart(merged);
        setGuestCart([]);
      } catch (err) {
        console.error("Failed to merge guest cart on login:", err);
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setCart([]);
  };

  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        showNotice,
        theme,
        toggleTheme: () =>
          setTheme((value) => (value === "light" ? "dark" : "light")),
        token,
        userEmail,
        notice,
        login,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  const context = useContext(Context);
  if (!context) throw new Error("Context missing");
  return context;
}
