import { useState } from 'react';
import { projects, type Project } from '../data/projects';
import { AwsProjectCard } from './AwsProjectCard';
import { ProjectModal } from './ProjectModal';
import { Lightbox } from './Lightbox';
import { Certifications } from './Certifications';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

export function AwsProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });

  return (
    <section id="aws-projects" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>AWS PROJECTS</SectionTitle>
        <Reveal>
          <p className="mx-auto mb-12 max-w-[700px] text-center text-lg text-muted">
            Cloud engineering projects showcasing infrastructure automation, high availability architectures,
            and DevOps practices on AWS.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08} className="h-full">
              <AwsProjectCard project={project} onDeepDive={setActiveProject} onOpenLightbox={openLightbox} />
            </Reveal>
          ))}
        </div>

        <Certifications />
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenLightbox={openLightbox}
      />
      <Lightbox src={lightbox?.src ?? null} alt={lightbox?.alt ?? ''} onClose={() => setLightbox(null)} />
    </section>
  );
}
