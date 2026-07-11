import { skills } from '../data/skills';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>SKILLS</SectionTitle>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {skills.map((skill, i) => (
            <Reveal key={skill.label} delay={i * 0.04}>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-[70px] w-[70px] items-center justify-center rounded-xl border border-accent/35 bg-gradient-to-br from-accent/20 to-card transition-transform duration-300 hover:-translate-y-1.5">
                  <img src={skill.icon} alt={skill.label} className="h-10 w-10 object-contain" />
                </div>
                <span className="text-sm font-medium text-muted">{skill.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
