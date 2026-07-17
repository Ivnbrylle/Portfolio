import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { SkillsMarquee } from './components/SkillsMarquee';
import { Projects } from './components/Projects';
import { AwsProjects } from './components/AwsProjects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen text-muted">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <AwsProjects />
        <Certifications />
        <SkillsMarquee />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
