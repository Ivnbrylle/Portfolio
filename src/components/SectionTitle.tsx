import { Reveal } from './Reveal';

export function SectionTitle({ children }: { children: string }) {
  return (
    <Reveal>
      <h2 className="mx-auto mb-8 text-center font-display text-4xl font-medium tracking-[2px] text-text">
        {children}
      </h2>
    </Reveal>
  );
}
