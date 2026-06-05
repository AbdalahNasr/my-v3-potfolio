"use client";

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageToggle/LanguageContext';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const networkingSkills = [
  { label: 'Network Troubleshooting', percent: 85 },
  { label: 'TCP/IP & Subnetting', percent: 80 },
  { label: 'Network Security Basics', percent: 75 },
  { label: 'Cisco IOS CLI', percent: 70 },
  { label: 'LAN/WAN Configuration', percent: 72 },
  { label: 'Firewalls & Access Control', percent: 68 },
];

const itSupportSkills = [
  'IT Help Desk',
  'Hardware Troubleshooting',
  'Windows OS Support',
  'Active Directory Basics',
  'VPN & Remote Access',
  'Ticketing Systems',
  'User Onboarding',
  'Network Cable & Patch Panels',
];

const certifications = [
  { name: 'Networking Basics', issuer: 'Cisco NetAcad', year: '2024', status: 'completed' as const },
  { name: 'Network Addressing & Basic Troubleshooting', issuer: 'Cisco NetAcad', year: '2024', status: 'completed' as const },
  { name: 'Network Support and Security', issuer: 'Cisco NetAcad', year: '2024', status: 'completed' as const },
  { name: 'CCNA 200-301', issuer: 'Cisco', year: 'In Progress', status: 'in-progress' as const },
];

function SkillBar({ label, percent, animate }: { label: string; percent: number; animate: boolean }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: animate ? `${percent}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function ITSkills() {
  const { lang } = useLanguage();
  const t = lang === 'ar' ? ar : en;
  const sectionRef = useRef<HTMLElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBarsVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="it-skills"
      className="section py-20 min-h-[60vh] flex flex-col items-center justify-center bg-transparent transition-colors duration-300"
    >
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
          {t.itSkills.title}
        </h2>
        <p className="text-lg md:text-xl text-center mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t.itSkills.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[15px] p-6 md:p-8 bg-white dark:bg-[#1e1e1e] shadow-lg border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">{t.itSkills.networking}</h3>
            {networkingSkills.map((skill) => (
              <SkillBar key={skill.label} label={skill.label} percent={skill.percent} animate={barsVisible} />
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-[15px] p-6 md:p-8 bg-white dark:bg-[#1e1e1e] shadow-lg border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-5 text-gray-800 dark:text-gray-100">{t.itSkills.itSupport}</h3>
              <div className="flex flex-wrap gap-3">
                {itSupportSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-medium rounded-[15px] border border-violet-600/40 bg-violet-600/10 text-violet-700 dark:text-violet-300 dark:bg-violet-600/20 dark:border-violet-500/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[15px] p-6 md:p-8 bg-white dark:bg-[#1e1e1e] shadow-lg border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-5 text-gray-800 dark:text-gray-100">{t.itSkills.certifications}</h3>
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        cert.status === 'completed' ? 'bg-green-500' : 'bg-violet-600'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-gray-800 dark:text-gray-100">{cert.name}</span>
                        {cert.status === 'in-progress' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-violet-600/15 text-violet-600 dark:text-violet-400 border border-violet-600/30">
                            In Progress
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {cert.issuer} — {cert.year}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
