import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import noticeReducer from "./slices/noticeSlice";
import languageReducer from "./slices/languageSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notice: noticeReducer,
    language: languageReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
