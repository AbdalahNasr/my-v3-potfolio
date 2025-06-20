"use client";
import React, { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import { useLanguage } from '../LanguageToggle/LanguageContext';

export default function Navbar() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.95);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowLogo(v => !v), 2000);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'ar' ? ar : en;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur' : 'bg-transparent'} ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0.5rem', flexWrap: 'wrap' }}
    >
      <div className="logo text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 mb-0 md:mb-0 transition-opacity duration-700"
        style={{ minWidth: 120, opacity: showLogo ? 1 : 0, transition: 'opacity 0.7s' }}>
        Dev.Portfolio
      </div>
      {/* Hamburger menu button for mobile */}
      <button
        className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={() => setMenuOpen(m => !m)}
        aria-label="Toggle navigation menu"
      >
        <span className="block w-6 h-0.5 bg-purple-600 mb-1"></span>
        <span className="block w-6 h-0.5 bg-purple-600 mb-1"></span>
        <span className="block w-6 h-0.5 bg-purple-600"></span>
      </button>
      {/* Desktop nav links */}
      <div
        className={`hidden md:flex items-center gap-2 md:gap-8 ${lang === 'ar' ? 'flex-row-reverse' : ''} overflow-x-auto max-w-full`}
        style={{ flex: 1, justifyContent: 'flex-end', minWidth: 0 }}
      >
        <a href="#about" className="text-base md:text-lg font-medium px-2 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap">{lang === 'ar' ? 'عنّي' : 'About'}</a>
        <a href="#projects" className="text-base md:text-lg font-medium px-2 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap">{lang === 'ar' ? 'المشاريع' : 'Projects'}</a>
        <a href="#cv" className="text-base md:text-lg font-medium px-2 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap">CV</a>
        <a href="#contact" className="text-base md:text-lg font-medium px-2 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap">{lang === 'ar' ? 'تواصل' : 'Contact'}</a>
        <div className="flex items-center gap-2 md:gap-6 ml-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      {/* Mobile nav links dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center py-4 md:hidden z-50">
          <a href="#about" className="text-base font-medium px-4 py-2 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap w-full text-center">{lang === 'ar' ? 'عنّي' : 'About'}</a>
          <a href="#projects" className="text-base font-medium px-4 py-2 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap w-full text-center">{lang === 'ar' ? 'المشاريع' : 'Projects'}</a>
          <a href="#cv" className="text-base font-medium px-4 py-2 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap w-full text-center">CV</a>
          <a href="#contact" className="text-base font-medium px-4 py-2 hover:text-purple-600 dark:hover:text-purple-400 transition whitespace-nowrap w-full text-center">{lang === 'ar' ? 'تواصل' : 'Contact'}</a>
          <div className="flex items-center gap-4 mt-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
