import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

export function Projects() {
  return (
    <section id="portfolio" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>PROJECTS</SectionTitle>

        <div className="mx-auto grid max-w-[1100px] items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="flex justify-center">
            <div className="max-w-[400px] overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <img src="/Downloads/aqprime.png" alt="AQ Prime" className="block w-full" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-center md:text-left">
              <h3 className="mb-6 text-4xl font-bold tracking-tight text-text">AQ Prime</h3>
              <p className="text-lg leading-relaxed text-muted">
                A web-based streaming platform for watching movies, concerts, and other pay-per-view content
                online. I contributed to this project as an OJT trainee, developing responsive frontend
                components and implementing full-stack integration by connecting them with backend services and
                APIs.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
