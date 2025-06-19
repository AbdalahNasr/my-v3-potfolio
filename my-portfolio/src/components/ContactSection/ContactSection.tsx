"use client";
import { useEffect, useRef } from 'react';
import styles from './ContactSection.module.scss';
import { useLanguage } from '../LanguageToggle/LanguageContext';

export default function ContactSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  // Fade-in on scroll
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
  // Parallax effect
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
  // Locale
  const locale = lang === 'ar' ? require('../../locales/ar.json') : require('../../locales/en.json');
  const contact = locale.contact || { title: 'Contact', subtitle: '', description: '', email: 'example@email.com' };
  const direction = lang === 'ar' ? 'rtl' : 'ltr';
  return (
    <section
      ref={sectionRef}
      className={
        styles.contact +
        ` section py-20 min-h-[40vh] flex flex-col items-center justify-center bg-transparent transition-colors duration-300${direction === 'rtl' ? ' rtl' : ''}`
      }
      id="contact"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 parallax-element" data-depth="0.1">
        {contact.title || 'Contact'}
      </h2>
      {contact.subtitle && (
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center parallax-element dark:text-white text-gray-900" data-depth="0.05">
          {contact.subtitle}
        </h3>
      )}
      {contact.description && (
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-center parallax-element dark:text-white text-gray-700" data-depth="0.03">
          {contact.description}
        </p>
      )}
      <div className="w-full max-w-2xl flex flex-col items-center">
        <form className="w-full bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-xl p-8 flex flex-col gap-6 parallax-element" data-depth="0.02" autoComplete="off">
          <input className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition" type="text" name="name" placeholder={lang === 'ar' ? 'الاسم' : 'Name'} />
          <input className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition" type="email" name="email" placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} />
          <input className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition" type="text" name="subject" placeholder={lang === 'ar' ? 'الموضوع' : 'Subject'} />
          <textarea className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition min-h-[120px]" name="message" placeholder={lang === 'ar' ? 'رسالتك' : 'Your message'} />
          <button type="submit" className="interactive bg-primary-light dark:bg-primary-dark text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-300">
            {lang === 'ar' ? 'إرسال' : 'Send'}
          </button>
        </form>
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 parallax-element" data-depth="0.01">
          <a href="mailto:example@email.com" className="flex items-center gap-2 text-lg dark:text-white text-gray-700 hover:text-primary-light dark:hover:text-primary-dark transition">
            <i className="fas fa-envelope"></i>
            <span>{contact.email || 'example@email.com'}</span>
          </a>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg dark:text-white text-gray-700 hover:text-primary-light dark:hover:text-primary-dark transition">
            <i className="fab fa-github"></i>
            <span>github.com/username</span>
          </a>
          <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg dark:text-white text-gray-700 hover:text-primary-light dark:hover:text-primary-dark transition">
            <i className="fab fa-linkedin"></i>
            <span>linkedin.com/in/username</span>
          </a>
        </div>
      </div>
    </section>
  );
}
