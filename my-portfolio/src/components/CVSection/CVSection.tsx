"use client";
import React, { useEffect, useRef } from 'react';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import { useLanguage } from '../LanguageToggle/LanguageContext';
import styles from './CVSection.module.scss';

export default function CVSection() {
  const { lang } = useLanguage();
  const t = lang === 'ar' ? ar : en;
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax effect for elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const elements = sectionRef.current?.querySelectorAll<HTMLElement>('.parallax-element');
      if (!elements) return;
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      elements.forEach(el => {
        const depth = Number(el.dataset.depth) || 0.1;
        const moveX = mouseX * depth * 100;
        const moveY = mouseY * depth * 100;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        styles.cvSection +
        ' w-full max-w-screen overflow-x-hidden px-4 py-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300'
      }
      id="cv"
    >
      <div className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 drop-shadow-lg parallax-element" data-depth="0.1">
            {t.cv?.title || 'My Curriculum Vitae'}
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          <div className="relative flex justify-center parallax-element" data-depth="0.1">
            <div className={styles['cv-glow']} aria-hidden="true"></div>
            <div className={styles['cv-card']}>
              <img src="/QR_Code.png" alt="CV QR Code" className={styles['cv-qr']} />
            </div>
          </div>
          <div className="space-y-6 w-full">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white drop-shadow-md parallax-element" data-depth="0.05">{t.cv?.scanTitle || 'Scan to View My CV'}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 drop-shadow-sm parallax-element" data-depth="0.03">{t.cv?.scanDesc || 'Scan this QR code with your mobile device to instantly access my detailed curriculum vitae with complete professional experience, education, and skills.'}</p>
            <div className="pt-4">
              <a href="https://example.com/cv" target="_blank" rel="noopener noreferrer"
                className="interactive inline-block bg-primary-light dark:bg-primary-dark text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-300">
                {t.cv?.openBtn || 'Open CV Website'}
                <i className="fas fa-external-link-alt ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
