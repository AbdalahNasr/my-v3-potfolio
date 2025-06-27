"use client";
import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './ContactSection.module.scss';
import { useLanguage } from '../LanguageToggle/LanguageContext';

const formKey = process.env.NEXT_PUBLIC_FORMSPREE_FORM_KEY;

function ContactForm({ onResend }: { onResend?: () => void }) {
  const { lang } = useLanguage();
  const locale = lang === 'ar' ? require('../../locales/ar.json') : require('../../locales/en.json');
  const t = locale.contact.form;
  const [state, handleSubmit] = useForm(formKey || "");
  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-3xl md:text-5xl font-bold text-center text-green-400 drop-shadow-[0_0_16px_#39ff14] animate-pulse mb-8">
          {t.success}
        </p>
        <button
          className="mt-4 px-8 py-3 rounded-lg bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 text-white font-semibold shadow-lg hover:shadow-xl transition duration-300 text-lg tracking-wide"
          onClick={onResend}
        >
          {t.send}
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="w-full bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-xl p-8 flex flex-col gap-6 parallax-element" data-depth="0.02" autoComplete="off">
      <input className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition" type="text" name="name" placeholder={t.name} />
      <input className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition" type="email" name="email" placeholder={t.email} />
      <input className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition" type="text" name="subject" placeholder={t.subject} />
      <textarea className="form-input px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition min-h-[120px]" name="message" placeholder={t.message} />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" className="interactive bg-primary-light dark:bg-primary-dark text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-300" disabled={state.submitting}>
        {state.submitting ? t.sending : t.send}
      </button>
    </form>
  );
}

export default function ContactSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formKey, setFormKey] = React.useState(0);
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
        ` section py-20 min-h-[40vh] flex flex-col items-center justify-center bg-transparent transition-colors duration-300${direction === 'rtl' ? ' rtl' : ''} overflow-x-hidden w-full`
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
        <ContactForm key={formKey} onResend={() => setFormKey(k => k + 1)} />
        <div
          className={`mt-12 flex flex-col md:flex-row justify-center items-center parallax-element ${lang === 'ar' ? 'md:space-x-reverse md:space-x-8' : 'md:space-x-8'} space-y-4 md:space-y-0`}
          style={lang === 'ar' ? {direction: 'rtl'} : {}}
          data-depth="0.01"
        >
          {/* Email */}
          <a
            href={contact.email?.link || 'mailto:body16nasr16bn@gmail.com'}
            className={`flex items-center gap-2 text-lg dark:text-white text-gray-700 hover:text-primary-light dark:hover:text-primary-dark transition${lang === 'ar' ? ' flex-row-reverse' : ''}`}
            style={lang === 'ar' ? {direction: 'rtl'} : {}}
          >
            {lang === 'ar' ? <span>{contact.email?.text || 'body16nasr16bn@gmail.com'}</span> : null}
            <i className="fas fa-envelope"></i>
            {lang !== 'ar' ? <span>{contact.email?.text || 'body16nasr16bn@gmail.com'}</span> : null}
          </a>
          {/* GitHub */}
          <a
            href={contact.github?.link || 'https://github.com/AbdalahNasr'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-lg dark:text-white text-gray-700 hover:text-primary-light dark:hover:text-primary-dark transition${lang === 'ar' ? ' flex-row-reverse' : ''}`}
            style={lang === 'ar' ? {direction: 'rtl'} : {}}
          >
            {lang === 'ar' ? <span>{contact.github?.text || 'github.com/AbdalahNasr'}</span> : null}
            <i className="fab fa-github"></i>
            {lang !== 'ar' ? <span>{contact.github?.text || 'github.com/AbdalahNasr'}</span> : null}
          </a>
          {/* LinkedIn */}
          <a
            href={contact.linkedin?.link || 'https://www.linkedin.com/in/abdalah-nasr-63a9a5266/'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-lg dark:text-white text-gray-700 hover:text-primary-light dark:hover:text-primary-dark transition${lang === 'ar' ? ' flex-row-reverse' : ''}`}
            style={lang === 'ar' ? {direction: 'rtl'} : {}}
          >
            {lang === 'ar' ? <span>{contact.linkedin?.text || 'linkedin.com/in/AbdalahNasr'}</span> : null}
            <i className="fab fa-linkedin"></i>
            {lang !== 'ar' ? <span>{contact.linkedin?.text || 'linkedin.com/in/AbdalahNasr'}</span> : null}
          </a>
        </div>
      </div>
    </section>
  );
}
