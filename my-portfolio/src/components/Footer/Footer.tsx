"use client";
import './Footer.module.scss';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import { useLanguage } from '../LanguageToggle/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const t = lang === 'ar' ? ar : en;
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="logo text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 mb-4 md:mb-0">
            {t.footer?.logo || 'Dev.Portfolio'}
          </div>
          <div className={`flex items-center ${lang === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-6'}`} style={lang === 'ar' ? {direction: 'rtl'} : {}}>
            <a href="https://example.com/cv" target="_blank" rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition duration-300">
              <span className={lang === 'ar' ? 'ml-2' : 'mr-2'}>{t.footer?.cv || 'My CV'}</span>
              <i className="fas fa-file-alt"></i>
            </a>
            <div className="relative w-32 h-32 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md" style={{boxShadow: '0 0 32px 8px #954ce9, 0 0 16px 4px #4cc9f0'}}>
              <img src="/QR_Code.png" alt="CV QR Code" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
          {t.footer?.copyright || '© 2025 All Rights Reserved'}
        </div>
      </div>
    </footer>
  );
}
