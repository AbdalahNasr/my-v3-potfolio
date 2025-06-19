"use client";

import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.scss';
import { useLanguage } from '../LanguageToggle/LanguageContext';

export default function AboutSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fade-in on scroll (Intersection Observer)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

  // Import locale JSON dynamically
  const locale = lang === 'ar' ? require('../../locales/ar.json') : require('../../locales/en.json');
  const about = locale.about;
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <section
      ref={sectionRef}
      className={
        styles.about +
        ` section py-20 min-h-[60vh] flex flex-col items-center justify-center bg-transparent transition-colors duration-300${direction === 'rtl' ? ' rtl' : ''}`
      }
      id="about"
    >
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Example image, replace src later */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <img 
            src="/programming-illustration.svg" 
            alt="About Illustration" 
            className="max-w-xs md:max-w-sm rounded-lg shadow-2xl parallax-element" 
            data-depth="0.1" 
            style={{ boxShadow: '0 8px 32px 0 rgba(80, 0, 180, 0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 parallax-element"
            data-depth="0.1"
          >
            {about.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center md:text-left parallax-element dark:text-white text-gray-900" data-depth="0.05">
            {about.subtitle}
          </h3>
          <p className="text-lg md:text-xl max-w-2xl mb-6 text-center md:text-left parallax-element dark:text-white text-gray-700" data-depth="0.03">
            {about.description}
          </p>
          {/* Unstyled list */}
          <ul className="parallax-element mb-6 dark:text-white text-gray-700" data-depth="0.02">
            {about.highlights?.map?.((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-col items-center md:items-start parallax-element" data-depth="0.04">
            <h4 className="font-bold text-xl mb-2 dark:text-white text-gray-900">{about.technologies}</h4>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {/* Example core skills, replace with dynamic if needed */}
              <span className="core-skill px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md relative font-medium">React</span>
              <span className="core-skill px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md relative font-medium">Next.js</span>
              <span className="core-skill px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md relative font-medium">TypeScript</span>
              <span className="core-skill px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md relative font-medium">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
