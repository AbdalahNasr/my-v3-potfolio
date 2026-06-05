import type { Metadata } from 'next';
import './globals.scss';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { LanguageProvider } from '../components/LanguageToggle/LanguageContext';
import { BackgroundCanvas, CustomCursor, ScrollbarIndicator } from '../components/DynamicComponents';

export const metadata: Metadata = {
  title: 'Abdallah Nasr — Full Stack Developer & IT Support | Cairo',
  description: 'Full Stack Developer based in Cairo. Building bilingual web apps with Next.js 15, React, TypeScript, MongoDB. Also a network engineer with Cisco CCNA certifications. Open to Frontend and IT Help Desk roles.',
  keywords: ['Abdallah Nasr', 'Full Stack Developer Cairo', 'Frontend Developer Egypt', 'Next.js developer', 'React developer Cairo', 'IT Support Cairo', 'Cisco CCNA', 'Answerly', 'مطور ويب', 'مطور فرونت إند'],
  authors: [{ name: 'Abdallah Nasr' }],
  creator: 'Abdallah Nasr',
  openGraph: {
    type: 'website',
    url: 'https://my-v3-potfolio.vercel.app',
    title: 'Abdallah Nasr — Full Stack Developer & IT Support | Cairo',
    description: 'Full Stack Developer & Network Engineer based in Cairo, Egypt. Next.js 15, React, TypeScript, Cisco CCNA.',
    siteName: 'Abdallah Nasr Portfolio',
    images: [{ url: 'https://my-v3-potfolio.vercel.app/og-image.png', width: 1200, height: 630, alt: 'Abdallah Nasr — Full Stack Developer Cairo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdallah Nasr — Full Stack Developer & IT Support | Cairo',
    description: 'Full Stack Developer & Network Engineer based in Cairo, Egypt.',
    images: ['https://my-v3-potfolio.vercel.app/og-image.png'],
  },
  alternates: { canonical: 'https://my-v3-potfolio.vercel.app' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    colors: {
                      primary: {
                        light: 'rgba(149, 76, 233, 0.85)',
                        dark: 'rgba(186, 104, 255, 0.9)'
                      },
                      background: {
                        light: '#f8f9fa',
                        dark: '#121212'
                      },
                      surface: {
                        light: '#ffffff',
                        dark: '#1e1e1e'
                      },
                      text: {
                        light: '#2d3748',
                        dark: '#e2e8f0'
                      }
                    },
                    fontFamily: {
                      sans: ['Poppins', 'sans-serif']
                    }
                  }
                }
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                '@id': 'https://my-v3-potfolio.vercel.app/#person',
                name: 'Abdallah Nasr',
                alternateName: 'عبدالله نصر',
                jobTitle: 'Full Stack Developer',
                description: 'Full Stack Developer and Network Engineer based in Cairo, Egypt. Specializes in Next.js, React, TypeScript, and holds Cisco CCNA certifications.',
                url: 'https://my-v3-potfolio.vercel.app',
                email: 'body16nasr16bn@gmail.com',
                address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
                sameAs: ['https://github.com/AbdalahNasr', 'https://linkedin.com/in/abdalah-nasr-63a9a5266'],
                knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Angular', 'Cisco CCNA', 'Network Support', 'IT Help Desk', 'Tailwind CSS'],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://my-v3-potfolio.vercel.app/#website',
                url: 'https://my-v3-potfolio.vercel.app',
                name: 'Abdallah Nasr Portfolio',
                description: 'Portfolio of Abdallah Nasr, Full Stack Developer in Cairo',
                author: { '@id': 'https://my-v3-potfolio.vercel.app/#person' },
              },
            ],
          }) }}
        />
      </head>
      <body className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark transition-colors duration-300" style={{overflow: 'visible', minHeight: '100vh'}}>
        {/* <div style={{background: 'orange', color: 'black', padding: '1rem', textAlign: 'center', fontWeight: 'bold', fontSize: '2rem', zIndex: 99999999, position: 'relative'}}>LAYOUT TEST: If you see this, layout is rendering</div> */}
        <LanguageProvider>
          <BackgroundCanvas />
          <CustomCursor />
          <ScrollbarIndicator />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}