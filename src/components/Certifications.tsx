import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { certifications, badges } from '../data/certs';

export function Certifications() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const count = certifications.length;

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const nextSlide = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!visible) return;
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') nextSlide();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [prev, nextSlide]);

  const cert = certifications[index];

  return (
    <section id="certifications" ref={sectionRef} className="scroll-mt-20 py-20 border-t border-border/25 bg-surface/10">
      <div className="mx-auto max-w-[1200px] px-5">
        <h3 className="mb-2 text-center text-3xl font-semibold text-text">Certifications</h3>
        <p className="mx-auto mb-8 max-w-[600px] text-center text-muted/80">
          Professional certifications validating my cloud expertise and technical skills.
        </p>

      <div className="mx-auto flex max-w-[700px] items-center justify-center gap-4 sm:gap-6">
        <CarouselButton label="Previous certification" onClick={prev}>
          <FaChevronLeft />
        </CarouselButton>

        <div className="relative h-[360px] w-[320px] overflow-hidden sm:w-[500px]">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col items-center pt-4"
            >
              <div className="group relative mb-4 aspect-[16/11] w-full max-w-[480px] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 shadow-card hover:shadow-card-hover">
                <img
                  src={cert.certificate}
                  alt={cert.name}
                  className="relative z-[2] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="cert-glow absolute left-1/2 top-1/2 z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,159,67,0.25)_0%,transparent_70%)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <h4 className="px-4 text-center text-lg font-semibold text-text">{cert.name}</h4>
            </motion.div>
          </AnimatePresence>
        </div>

        <CarouselButton label="Next certification" onClick={nextSlide}>
          <FaChevronRight />
        </CarouselButton>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {certifications.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to certification ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-5 bg-gradient-to-r from-accent to-accent-strong' : 'w-2 bg-muted/30 hover:bg-muted/60'
            }`}
          />
        ))}
      </div>

        <div className="mt-10 border-t border-border pt-8">
          <h4 className="mb-6 text-center text-xl font-semibold text-text">Badges</h4>
          <div className="mx-auto flex max-w-[600px] flex-wrap justify-center gap-4">
            {badges.map((badge) => (
              <div key={badge.name} className="h-20 w-20 overflow-hidden rounded-xl" title={badge.name}>
                <img src={badge.image} alt={badge.name} className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-muted/5 text-muted transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:text-text hover:bg-muted/10 active:scale-95"
    >
      {children}
    </button>
  );
}
