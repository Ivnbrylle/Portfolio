import { skills } from '../data/skills';

export function SkillsMarquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {skills.map((s) => (
        <img
          key={s.label}
          src={s.icon}
          alt={s.label}
          className="h-[60px] w-[60px] rounded-xl bg-surface p-3 opacity-50 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="pointer-events-none absolute left-0 top-0 z-[2] h-full w-[150px] bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-[2] h-full w-[150px] bg-gradient-to-l from-[var(--bg)] to-transparent" />
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
