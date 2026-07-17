import { motion, type Variants } from 'motion/react';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa6';

const socials = [
  { href: 'https://www.linkedin.com/in/ivn-brylle/', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://github.com/Ivnbrylle', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.instagram.com/ivn_brylle/', label: 'Instagram', Icon: FaInstagram },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pt-20"
    >
      <div className="hero-diagonal absolute right-0 top-0 z-[1] hidden h-full w-[55%] md:block" />

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-5">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div variants={container} initial="hidden" animate="show" className="text-center md:text-left">
            <motion.p variants={item} className="mb-2 text-lg text-muted">
              Hi, I am
            </motion.p>
            <motion.h1
              variants={item}
              className="mb-4 font-display text-5xl font-bold leading-tight tracking-tight text-text sm:text-6xl"
            >
              Ivan Rempis
            </motion.h1>
            <motion.p variants={item} className="mb-8 text-xl font-semibold text-accent md:text-2xl">
              Aspiring Cloud Engineer | BSCS Graduate
            </motion.p>
            <motion.div variants={item} className="flex justify-center gap-4 md:justify-start">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-gradient-to-r hover:from-accent hover:to-accent-strong hover:text-[#0b1017]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <img
              src="/Downloads/PFP.png"
              alt="Ivan Rempis"
              className="w-full max-w-[320px] rounded-[28px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2.5 sm:max-w-[400px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
