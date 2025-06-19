import BackgroundCanvas from '../components/BackgroundCanvas/BackgroundCanvas';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import ScrollbarIndicator from '../components/ScrollbarIndicator/ScrollbarIndicator';
import HeroSection from '../components/HeroSection/HeroSection';
import AboutSection from '../components/AboutSection/AboutSection';
import ContactSection from '../components/ContactSection/ContactSection';
import './globals.scss';

export default function Home() {
  return (
    <main>
      <BackgroundCanvas />
      <CustomCursor />
      <ScrollbarIndicator />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      {/* Add more sections as needed */}
    </main>
  );
}