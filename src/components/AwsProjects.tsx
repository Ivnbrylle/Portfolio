import { useState } from 'react';
import { projects, type Project } from '../data/projects';
import { AwsProjectCard } from './AwsProjectCard';
import { ProjectModal } from './ProjectModal';
import { Lightbox } from './Lightbox';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

export function AwsProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });

  const awsProjectsList = projects.filter((p) => p.provider === 'aws');
  const gcpProjectsList = projects.filter((p) => p.provider === 'gcp');
  const azureProjectsList = projects.filter((p) => p.provider === 'azure');

  return (
    <>
      {/* AWS Section */}
      <section id="aws-projects" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <SectionTitle>AWS</SectionTitle>
          <Reveal>
            <p className="mx-auto mb-12 max-w-[700px] text-center text-lg text-muted">
              Cloud engineering projects showcasing infrastructure automation, high availability architectures,
              and DevOps practices on AWS.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2">
            {awsProjectsList.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08} className="h-full">
                <AwsProjectCard project={project} onDeepDive={setActiveProject} onOpenLightbox={openLightbox} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GCP Section */}
      <section id="gcp-projects" className="gcp-theme scroll-mt-20 border-t border-border/25 py-20 bg-surface/20">
        <div className="mx-auto max-w-[1200px] px-5">
          <SectionTitle>GCP</SectionTitle>
          <Reveal>
            <p className="mx-auto mb-12 max-w-[700px] text-center text-lg text-muted">
              Event-driven serverless architectures, containerized microservices, and Infrastructure as Code on Google Cloud Platform.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2">
            {gcpProjectsList.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08} className="h-full">
                <AwsProjectCard project={project} onDeepDive={setActiveProject} onOpenLightbox={openLightbox} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Azure Section */}
      <section id="azure-projects" className="azure-theme scroll-mt-20 border-t border-border/25 py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <SectionTitle>AZURE</SectionTitle>
          <Reveal>
            <p className="mx-auto mb-12 max-w-[700px] text-center text-lg text-muted">
              Enterprise integrations, secure architectures, and hybrid cloud deployments on Microsoft Azure.
            </p>
          </Reveal>

          {azureProjectsList.length > 0 ? (
            <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2">
              {azureProjectsList.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08} className="h-full">
                  <AwsProjectCard project={project} onDeepDive={setActiveProject} onOpenLightbox={openLightbox} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-[500px] rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center">
                <span className="mb-2 block text-3xl opacity-80">☁️</span>
                <h4 className="mb-2 text-lg font-semibold text-text">Azure Projects Coming Soon</h4>
                <p className="text-sm text-muted">
                  Currently designing enterprise-grade solutions and hybrid infrastructure deployments on Microsoft Azure.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenLightbox={openLightbox}
      />
      <Lightbox src={lightbox?.src ?? null} alt={lightbox?.alt ?? ''} onClose={() => setLightbox(null)} />
    </>
  );
}
