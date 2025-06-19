"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "en" | "ar";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (stored === "en" || stored === "ar") setLangState(stored);
  }, []);

  const setLang = (lng: Language) => {
    setLangState(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lng);
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
