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
    <nav className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md sticky top-0 z-50 transition-colors duration-300">
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
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
