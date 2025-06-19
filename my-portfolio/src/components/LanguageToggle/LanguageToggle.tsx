"use client";
import { useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import en from "../../locales/en.json";
import ar from "../../locales/ar.json";

const LANG_KEY = "language";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) : null;
    if (stored && (stored === "en" || stored === "ar")) setLang(stored);
  }, [setLang]);

  const handleChange = (lng: "en" | "ar") => {
    setLang(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_KEY, lng);
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    }
  };

  return (
    <div className="language-toggle flex items-center bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
      <button
        className={`px-3 py-1 rounded-full font-medium text-sm transition duration-200 ${lang === "en" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="EN"
        onClick={() => handleChange("en")}
      >
        {en.common.english}
      </button>
      <button
        className={`px-3 py-1 rounded-full font-medium text-sm transition duration-200 ${lang === "ar" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="AR"
        onClick={() => handleChange("ar")}
      >
        {ar.common.arabic}
      </button>
    </div>
  );
}
