import { useAppSelector } from "../store";
import { translations, TranslationKey } from "../locales/translations";

export function useTranslation() {
  const language = useAppSelector((state) => state.language.language);

  const t = (key: TranslationKey): string => {
    const activeDict = translations[language] || translations.en;
    return activeDict[key] || translations.en[key] || String(key);
  };

  const isRtl = language === "ur";

  return { t, isRtl, language };
}
