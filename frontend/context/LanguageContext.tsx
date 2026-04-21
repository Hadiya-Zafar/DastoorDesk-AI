"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, TranslationKey } from "@/lib/translations";

export type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const applyLanguage = useCallback((lang: Language) => {
    const html = document.documentElement;
    if (lang === "ur") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ur");
      html.classList.add("lang-ur");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      html.classList.remove("lang-ur");
    }
    localStorage.setItem("dd-language", lang);
  }, []);

  // On mount, restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dd-language") as Language | null;
    if (saved && (saved === "en" || saved === "ur")) {
      setLanguageState(saved);
      applyLanguage(saved);
    }
  }, [applyLanguage]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      applyLanguage(lang);
    },
    [applyLanguage]
  );

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] ?? translations["en"][key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL: language === "ur" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
