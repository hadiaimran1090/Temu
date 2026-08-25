import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";
import {
  fetchCart,
  addToCartApi,
  removeFromCartApi,
  updateCartItemApi,
  clearCartApi,
  mergeCartApi,
} from "../../services/api";
import { showNotice } from "./noticeSlice";

interface CartState {
  items: CartItem[];
  guestItems: CartItem[];
  loading: boolean;
}

const getInitialGuestCart = (): CartItem[] => {
  try {
    const saved = window.localStorage.getItem("temu-cart-guest");
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: [],
  guestItems: getInitialGuestCart(),
  loading: false,
};

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: { token: string | null }; cart: CartState };
    if (state.auth.token) {
      try {
        const dbCart = await fetchCart();
        return dbCart;
      } catch (err) {
        console.error("Failed to fetch cart from database:", err);
        return state.cart.items; // retain current items
      }
    } else {
      return state.cart.guestItems;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity = 1 }: { product: Product; quantity?: number }, { getState, dispatch }) => {
    const qty = Math.max(1, Math.floor(quantity));
    const state = getState() as { auth: { token: string | null }; cart: CartState };

    const alreadyInCart = state.cart.items.some((item) => item.id === product.id);
    if (alreadyInCart) {
      dispatch(showNotice(`${product.title} is already in cart`));
      return { items: state.cart.items, isDb: Boolean(state.auth.token) };
    }
    
    if (state.auth.token) {
      try {
        const updatedCart = await addToCartApi(product.id, qty);
        dispatch(showNotice(`${qty} × ${product.title} added to cart`));
        return { items: updatedCart, isDb: true };
      } catch (err) {
        console.error("Failed to add to database cart:", err);
        dispatch(showNotice(`Failed to add ${product.title} to cart`));
        throw err;
      }
    } else {
      const currentGuest = state.cart.guestItems;
      const updated = [...currentGuest, { ...product, quantity: qty }];
      window.localStorage.setItem("temu-cart-guest", JSON.stringify(updated));
      dispatch(showNotice(`${qty} × ${product.title} added to cart`));
      return { items: updated, isDb: false };
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: number, { getState }) => {
    const state = getState() as { auth: { token: string | null }; cart: CartState };
    if (state.auth.token) {
      try {
        const updatedCart = await removeFromCartApi(id);
        return { items: updatedCart, isDb: true };
      } catch (err) {
        console.error("Failed to remove from database cart:", err);
        throw err;
      }
    } else {
      const updated = state.cart.guestItems.filter((item) => item.id !== id);
      window.localStorage.setItem("temu-cart-guest", JSON.stringify(updated));
      return { items: updated, isDb: false };
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }: { productId: number; quantity: number }, { getState }) => {
    const qty = Math.max(1, Math.floor(quantity));
    const state = getState() as { auth: { token: string | null }; cart: CartState };
    
    if (state.auth.token) {
      try {
        const updatedCart = await updateCartItemApi(productId, qty);
        return { items: updatedCart, isDb: true };
      } catch (err) {
        console.error("Failed to update database cart item quantity:", err);
        throw err;
      }
    } else {
      const currentGuest = state.cart.guestItems;
      const updated = currentGuest.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      );
      window.localStorage.setItem("temu-cart-guest", JSON.stringify(updated));
      return { items: updated, isDb: false };
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string | null }; cart: CartState };
    if (state.auth.token) {
      try {
        await clearCartApi();
        return { items: [], isDb: true };
      } catch (err) {
        console.error("Failed to clear database cart:", err);
        throw err;
      }
    } else {
      window.localStorage.setItem("temu-cart-guest", JSON.stringify([]));
      return { items: [], isDb: false };
    }
  }
);

export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string | null }; cart: CartState };
    if (state.auth.token && state.cart.guestItems.length > 0) {
      try {
        const merged = await mergeCartApi(
          state.cart.guestItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          }))
        );
        window.localStorage.removeItem("temu-cart-guest");
        return { items: merged, guestItems: [] };
      } catch (err) {
        console.error("Failed to merge guest cart on login:", err);
        throw err;
      }
    }
    return { items: state.cart.items, guestItems: state.cart.guestItems };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearGuestCartState: (state) => {
      state.guestItems = [];
      window.localStorage.removeItem("temu-cart-guest");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        if (!action.payload.isDb) {
          state.guestItems = action.payload.items;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        if (!action.payload.isDb) {
          state.guestItems = action.payload.items;
        }
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        if (!action.payload.isDb) {
          state.guestItems = action.payload.items;
        }
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        if (!action.payload.isDb) {
          state.guestItems = action.payload.items;
        }
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.guestItems = action.payload.guestItems;
      });
  },
});

export const { clearGuestCartState } = cartSlice.actions;
export default cartSlice.reducer;
