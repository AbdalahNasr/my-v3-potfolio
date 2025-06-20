"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageToggle/LanguageContext';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = lang === 'ar' ? ar : en;

  // Staggered fade-in animation
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const children = sectionRef.current.querySelectorAll('.hero-anim');
    children.forEach((el, i) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(32px)';
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 200 + i * 180);
    });
  }, [lang]);

  // Parallax effect for .parallax-element
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
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-4 md:px-12 relative z-10"
    >
      {/* Image left */}
      <div className="w-full md:w-2/5 flex justify-center items-center mb-8 md:mb-0 parallax-element" data-depth="0.1">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 rounded-lg blur-md opacity-50" />
          <div className="relative rounded-lg shadow-xl overflow-hidden" style={{boxShadow: '0 0 32px 8px #954ce9, 0 0 16px 4px #4cc9f0'}}>
            <Image
              src="/Programming.gif"
              alt={t.hero.imageAlt}
              width={320}
              height={320}
              className="rounded-lg hero-anim"
              priority
            />
          </div>
        </div>
      </div>
      {/* Text right */}
      <div className="md:w-3/5 flex flex-col items-start justify-center">
        <div className="hero-content">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight md:leading-tight">
            <span className="parallax-element block hero-anim" data-depth="0.1">{t.hero.greeting}</span>
            <span className="parallax-element block hero-anim" data-depth="0.2">{t.hero.name}</span>
            <span className="parallax-element block hero-anim " data-depth="0.2">{t.hero.title}</span>
            <span
              className="parallax-element block hero-anim bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 text-transparent bg-clip-text whitespace-pre-line"
              data-depth="0.3"
              style={{display: 'inline', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}
            >
              {t.hero.designer}
            </span>
          </h1>
          <p className="text-xl md:text-2xl  max-w-2xl mb-12 text-gray-600 dark:text-gray-300 parallax-element hero-anim" data-depth="0.05">
            {t.hero.description}
          </p>
          <a
            href="#projects"
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
          </a>
        </div>
      </div>
    </section>
  );
}
