import { useScroll, useSpring, motion } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[3001] h-[3px] w-full origin-left bg-gradient-to-r from-accent to-accent-strong shadow-[0_0_14px_rgba(var(--accent-rgb),0.55)]"
    />
  );
}
