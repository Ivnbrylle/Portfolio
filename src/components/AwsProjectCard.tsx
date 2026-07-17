import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  onDeepDive: (project: Project) => void;
  onOpenLightbox: (src: string, alt: string) => void;
}

export function AwsProjectCard({ project, onDeepDive, onOpenLightbox }: Props) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 shadow-card hover:shadow-card-hover">
      <button
        type="button"
        onClick={() => onOpenLightbox(project.cardImage, `${project.title} architecture diagram`)}
        className="relative block h-[200px] w-full overflow-hidden bg-surface"
      >
        <img
          src={project.cardImage}
          alt={`${project.title} architecture diagram`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/30 px-4 py-2 text-sm text-white">Click to expand</span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-text">{project.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted/80">{project.subtitle}</p>

        {/* Tech tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-semibold tracking-wider text-accent uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/40 pt-4">
          <button
            type="button"
            onClick={() => onDeepDive(project)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-strong cursor-pointer"
          >
            View Project →
          </button>
          <div className="flex items-center gap-4">
            {project.deepDiveType === 'linkedin' && (
              <a
                href={project.deepDiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
                title="View LinkedIn Deep-Dive"
                aria-label="LinkedIn Deep-Dive"
              >
                <FaLinkedinIn className="h-4 w-4 text-[#0a66c2]" />
                LinkedIn
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-2 text-xs text-muted">
          <span className="status-dot h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          <span>
            Infrastructure: <strong className="text-[#4ade80]">Healthy</strong>
          </span>
          <span className="text-border">|</span>
          <span className="text-muted/70">Region: {project.region}</span>
        </div>
      </div>
    </div>
  );
}
