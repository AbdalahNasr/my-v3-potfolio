"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      setTheme("system");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const handleTheme = (t: "light" | "dark" | "system") => {
    setTheme(t);
    if (t === "system") {
      localStorage.setItem("theme", "system");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      localStorage.setItem("theme", t);
      document.documentElement.classList.toggle("dark", t === "dark");
    }
  };

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
      <button
        className={`p-2 rounded-full transition duration-200 ${theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="Light mode"
        onClick={() => handleTheme("light")}
      >
        <i className="fas fa-sun text-yellow-500"></i>
      </button>
      <button
        className={`p-2 rounded-full transition duration-200 ${theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="Dark mode"
        onClick={() => handleTheme("dark")}
      >
        <i className="fas fa-moon text-blue-700"></i>
      </button>
      <button
        className={`p-2 rounded-full transition duration-200 ${theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="System mode"
        onClick={() => handleTheme("system")}
      >
        <i className="fas fa-desktop text-gray-600 dark:text-gray-300"></i>
      </button>
    </div>
  );
}
