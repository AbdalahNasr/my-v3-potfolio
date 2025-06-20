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
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <img src="/programming-illustration.svg" alt="About Illustration" className="max-w-xs md:max-w-sm rounded-lg shadow-xl parallax-element" data-depth="0.1" style={{boxShadow: '0 0 32px 8px #954ce9, 0 0 16px 4px #4cc9f0'}} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 parallax-element"
            data-depth="0.1"
          >
            {about.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center md:text-left parallax-element about-dark" data-depth="0.05">
            {about.subtitle}
          </h3>
          <p className="text-lg md:text-xl max-w-2xl mb-6 text-center md:text-left parallax-element about-dark" data-depth="0.03">
            {about.description}
          </p>
          <ul className="parallax-element mb-6" data-depth="0.02">
            {about.highlights?.map?.((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-col items-center md:items-start parallax-element" data-depth="0.04">
            <h4 className="font-bold text-xl mb-2">{about.technologies}</h4>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {/* Animated gradient border for each core skill */}
              <span className={styles["core-skill"] + " px-4 py-2 font-medium shadow-md relative"}>React</span>
              <span className={styles["core-skill"] + " px-4 py-2 font-medium shadow-md relative"}>Next.js</span>
              <span className={styles["core-skill"] + " px-4 py-2 font-medium shadow-md relative"}>TypeScript</span>
              <span className={styles["core-skill"] + " px-4 py-2 font-medium shadow-md relative"}>Node.js</span>
            </div>
            {/* View My Work button - simple style, no gradient */}
            <a
              href="#projects"
              className="mt-8 inline-block bg-primary-light dark:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-lg tracking-wide"
            >
              {about.cta || 'View My Work'}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
