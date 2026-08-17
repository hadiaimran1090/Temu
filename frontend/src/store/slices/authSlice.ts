import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userEmail: string | null;
}

const getInitialValue = <T>(key: string, initialValue: T): T => {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : initialValue;
  } catch {
    return initialValue;
  }
};

const initialState: AuthState = {
  token: getInitialValue("temu-token", null),
  userEmail: getInitialValue("temu-user", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      window.localStorage.setItem("temu-token", JSON.stringify(action.payload.token));
      window.localStorage.setItem("temu-user", JSON.stringify(action.payload.email));
    },
    clearAuth: (state) => {
      state.token = null;
      state.userEmail = null;
      window.localStorage.removeItem("temu-token");
      window.localStorage.removeItem("temu-user");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
