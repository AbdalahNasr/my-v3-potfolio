import HeroSection from '../components/HeroSection/HeroSection';
import AboutSection from '../components/AboutSection/AboutSection';
import ITSkills from '@/components/ITSkills';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import CVSection from '../components/CVSection/CVSection';
import ContactSection from '../components/ContactSection/ContactSection';
import './globals.scss';

export default function Home() {
  return (
    <main>
      {/* <BackgroundCanvas />
      <CustomCursor />
      <ScrollbarIndicator /> */}
      <HeroSection />
      <AboutSection />
      <ITSkills />
      <ProjectsSection />
      <CVSection />
      <ContactSection />
      {/* Add more sections as needed */}
    </main>
  );
}