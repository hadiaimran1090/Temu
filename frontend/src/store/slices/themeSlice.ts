import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}

const getInitialTheme = (): "light" | "dark" => {
  try {
    const saved = window.localStorage.getItem("temu-theme");
    const parsed = saved ? JSON.parse(saved) : "light";
    return parsed === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      state.theme = nextTheme;
      window.localStorage.setItem("temu-theme", JSON.stringify(nextTheme));
      document.documentElement.dataset.theme = nextTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
