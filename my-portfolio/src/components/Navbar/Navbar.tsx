"use client";
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import { useLanguage } from '../LanguageToggle/LanguageContext';

export default function Navbar() {
  const { lang } = useLanguage();
  const t = lang === 'ar' ? ar : en;

  return (
    <nav className="w-full bg-transparent sticky top-0 z-50 transition-colors duration-300 nav-container">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center py-3">
        <div className="logo text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400">
          {t.nav.logo}
        </div>
        <ul className="flex space-x-6 md:space-x-10">
          <li><a href="#about" className="nav-item text-lg font-medium hover:text-primary-light dark:hover:text-primary-dark transition duration-300">{t.nav.about}</a></li>
          <li><a href="#projects" className="nav-item text-lg font-medium hover:text-primary-light dark:hover:text-primary-dark transition duration-300">{t.nav.projects}</a></li>
          <li><a href="#contact" className="nav-item text-lg font-medium hover:text-primary-light dark:hover:text-primary-dark transition duration-300">{t.nav.contact}</a></li>
          <li><a href="#cv" className="nav-item text-lg font-medium hover:text-primary-light dark:hover:text-primary-dark transition duration-300">{t.nav.cv}</a></li>
        </ul>
        <div className="flex items-center space-x-6 md:space-x-8">
          <span className="mr-2 text-base font-medium text-gray-700 dark:text-gray-200 hidden md:inline">{t.common.language}</span>
          <LanguageToggle />
          {/* <span className="mx-2 text-base font-medium text-gray-700 dark:text-gray-200 hidden md:inline">{t.common.theme}</span> */}
          <ThemeToggle />
        </div>
      </div>
      <style>{`
        .nav-container {
          background: transparent;
        }
        .nav-container.sticky, .nav-container.solid {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        .dark .nav-container.sticky, .dark .nav-container.solid {
          background: rgba(30,30,30,0.9);
        }
      `}</style>
    </nav>
  );
}
