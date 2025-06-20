import type { Metadata } from 'next';
import './globals.scss';
import BackgroundCanvas from '../components/BackgroundCanvas/BackgroundCanvas';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import ScrollbarIndicator from '../components/ScrollbarIndicator/ScrollbarIndicator';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { LanguageProvider } from '../components/LanguageToggle/LanguageContext';

export const metadata: Metadata = {
  title: 'Modern Portfolio | 2025',
  description: 'Building modern web applications with cutting-edge technologies',
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