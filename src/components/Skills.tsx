import { skillCategories } from '../data/skills';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>SKILLS</SectionTitle>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, catIdx) => (
            <Reveal key={cat.category} delay={catIdx * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card hover:border-accent/45 transition-all duration-300">
                <h3 className="mb-6 font-display text-lg font-bold tracking-wide text-text uppercase border-b border-border/40 pb-2">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {cat.items.map((skill) => (
                    <div
                      key={skill.label}
                      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-bg/50 px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent-strong/10"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.label}
                        className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="text-sm font-semibold text-muted group-hover:text-text transition-colors">
                        {skill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
