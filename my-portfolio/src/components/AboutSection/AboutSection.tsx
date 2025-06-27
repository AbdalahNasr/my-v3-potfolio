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
            {/* View My Work button with GitHub icon and link */}
            <a
              href="https://github.com/AbdalahNasr"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center bg-primary-light dark:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-lg tracking-wide"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              {about.cta || 'View My Work'}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
