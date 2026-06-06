"use client";
import { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageToggle/LanguageContext';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = lang === 'ar' ? ar : en;

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      const elements = sectionRef.current.querySelectorAll<HTMLElement>('.parallax-element');
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth') || '0');
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/hero-bg.mp4"
      />
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(5,8,16,0.3), rgba(5,8,16,0.5))' }}
      />
      <div
        className="relative w-full max-w-5xl px-4 md:px-12 flex flex-col items-start justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="hero-content">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight md:leading-tight text-white">
            <span className="parallax-element block hero-anim" data-depth="0.1">{t.hero.greeting}</span>
            <span className="parallax-element block hero-anim" data-depth="0.2">{t.hero.name}</span>
            <span className="parallax-element block hero-anim" data-depth="0.2">{t.hero.title}</span>
            <span
              className="parallax-element block hero-anim hero-designer whitespace-pre-line"
              data-depth="0.3"
            >
              {t.hero.designer}
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-12 parallax-element hero-anim" data-depth="0.05">
            {t.hero.description}
          </p>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-300 group parallax-element hero-anim"
            data-depth="0.1"
          >
            {t.hero.viewWork}
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
