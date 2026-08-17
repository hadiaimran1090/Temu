import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "ur";

interface LanguageState {
  language: Language;
}

const getInitialLanguage = (): Language => {
  try {
    const saved = window.localStorage.getItem("temu-language");
    const parsed = saved ? (JSON.parse(saved) as Language) : "en";
    return parsed === "ur" ? "ur" : "en";
  } catch {
    return "en";
  }
};

const initialState: LanguageState = {
  language: getInitialLanguage(),
};

// Initialize direction on document element
const initialLang = getInitialLanguage();
if (typeof document !== "undefined") {
  document.documentElement.dir = initialLang === "ur" ? "rtl" : "ltr";
}

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      window.localStorage.setItem("temu-language", JSON.stringify(action.payload));
      if (typeof document !== "undefined") {
        document.documentElement.dir = action.payload === "ur" ? "rtl" : "ltr";
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
