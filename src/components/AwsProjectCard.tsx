import { FaGithub, FaLinkedinIn, FaCircleCheck } from 'react-icons/fa6';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  onDeepDive: (project: Project) => void;
  onOpenLightbox: (src: string, alt: string) => void;
}

export function AwsProjectCard({ project, onDeepDive, onOpenLightbox }: Props) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
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
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight text-text">{project.title}</h3>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            aria-label={`${project.title} on GitHub`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-text"
          >
            <FaGithub />
          </a>
        </div>
        <p className="mb-5 text-sm text-muted/80">{project.subtitle}</p>

        <ul className="mb-6 space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <FaCircleCheck className="mt-1 shrink-0 text-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onDeepDive(project)}
            className="w-full rounded-lg bg-gradient-to-r from-accent to-accent-strong px-5 py-3 text-sm font-semibold text-[#091017] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            View Deep-Dive
          </button>
          <a
            href={project.deepDiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-accent/65 px-5 py-3 text-[0.85rem] font-medium text-accent transition-all duration-300 hover:bg-accent/15 hover:text-text"
          >
            {project.deepDiveType === 'linkedin' ? <FaLinkedinIn /> : <FaGithub />}
            {project.deepDiveLabel}
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 py-2 text-xs text-muted">
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
