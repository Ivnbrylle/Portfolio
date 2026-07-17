import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaXmark } from 'react-icons/fa6';
import type { Project } from '../data/projects';

interface Props {
  project: Project | null;
  onClose: () => void;
  onOpenLightbox: (src: string, alt: string) => void;
}

export function ProjectModal({ project, onClose, onOpenLightbox }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[2000] overflow-y-auto bg-black/90 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} deep dive`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className={`relative mx-auto max-w-[900px] rounded-3xl border border-border bg-surface p-6 sm:p-10 ${
              project.provider === 'gcp' ? 'gcp-theme' : project.provider === 'azure' ? 'azure-theme' : ''
            }`}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-muted/10 text-xl text-text transition-transform duration-300 hover:rotate-90 hover:bg-muted/20"
            >
              <FaXmark />
            </button>

            <h2 className="mb-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">{project.title}</h2>
            <p className="mb-8 border-b border-border pb-6 text-lg text-muted/80">{project.subtitle}</p>

            <Section title="Overview">
              <p className="rounded-r-lg border-l-[3px] border-accent bg-accent/5 p-5 text-[1.05rem] leading-relaxed text-muted">
                {project.deepDive.problem}
              </p>
            </Section>

            <Section title="Key Features">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.highlights.map((h) => {
                  const parts = h.split(' - ');
                  const title = parts[0];
                  const desc = parts[1];
                  return (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/5 p-4 text-[0.95rem] leading-relaxed text-muted"
                    >
                      <span className="shrink-0 text-accent">✅</span>
                      <span>
                        {desc ? (
                          <>
                            <strong className="text-text">{title}</strong> — {desc}
                          </>
                        ) : (
                          h
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Section>

            <Section title="The Solution">
              <p className="text-muted">{project.deepDive.solutionIntro}</p>
              <ul className="mt-4 space-y-3">
                {project.deepDive.solution.map((s) => (
                  <li key={s} className="relative pl-6 leading-relaxed text-muted before:absolute before:left-0 before:text-[#4ade80] before:content-['→']">
                    {s}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Architecture Diagram">
              <div className="overflow-hidden rounded-xl border border-border bg-surface p-4">
                <img
                  src={project.deepDive.diagram}
                  alt={`${project.title} full architecture`}
                  onClick={() => onOpenLightbox(project.deepDive.diagram, `${project.title} full architecture`)}
                  className="w-full cursor-zoom-in rounded-lg transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </Section>

            {project.deepDive.codeBlocks && project.deepDive.codeBlocks.length > 0 && (
              <Section title="Infrastructure as Code">
                {project.deepDive.iacIntro && <p className="mb-4 text-muted/80">{project.deepDive.iacIntro}</p>}
                <div className="space-y-4">
                  {project.deepDive.codeBlocks.map((block, i) => (
                    <div key={i} className="code-block overflow-hidden rounded-xl border border-border bg-[#0d0d0d]">
                      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-5 py-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">{block.lang}</span>
                        <span className="font-mono text-xs text-muted/70">{block.file}</span>
                      </div>
                      <pre className="overflow-x-auto p-5">
                        <code className="text-[#e0e0e0]">{block.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <Section title="The Results">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {project.deepDive.results.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-xl border border-border bg-muted/5 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  >
                    <span className="block text-3xl font-bold text-accent">{r.value}</span>
                    <span className="mt-1 block text-sm font-semibold text-text">{r.label}</span>
                    <span className="mt-1 block text-xs text-muted/70">{r.detail}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Technologies Used">
              <ul className="list-disc space-y-2 rounded-lg bg-muted/5 py-5 pl-10 pr-6">
                {project.deepDive.tech.map((t) => (
                  <li key={t.label} className="text-[0.95rem] leading-relaxed text-muted">
                    <strong className="text-text">{t.label}:</strong> {t.value}
                  </li>
                ))}
              </ul>
            </Section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10 last:mb-0">
      <h3 className="mb-4 text-xl font-semibold text-text">{title}</h3>
      {children}
    </div>
  );
}
