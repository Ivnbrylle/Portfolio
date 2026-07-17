import { motion, type Variants } from 'motion/react';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa6';
import { projects } from '../data/projects';
import { certifications } from '../data/certs';

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
  const certificationsCount = certifications.length;
  // We add 1 to count the local AQ Prime project in Projects.tsx
  const projectsCount = projects.length + 1;

  const stats = [
    // Since you just graduated, we highlight "Recent Graduate" here.
    // Feel free to change value to "1+" and label to "Years Building" if desired!
    { value: 'Recent', label: 'Graduate' },
    { value: certificationsCount.toString(), label: 'Cloud Certs' },
    { value: `${projectsCount}+`, label: 'Projects Shipped' },
  ];

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
              className="mb-3 font-display text-5xl font-bold leading-tight tracking-tight text-text sm:text-6xl"
            >
              Ivan Rempis
            </motion.h1>
            <motion.h2
              variants={item}
              className="mb-4 font-display text-xl font-bold text-accent md:text-2xl"
            >
              Aspiring Cloud Engineer & DevOps Enthusiast
            </motion.h2>
            <motion.p
              variants={item}
              className="mb-8 max-w-[540px] text-base leading-relaxed text-muted mx-auto md:mx-0"
            >
              I build scalable cloud infrastructure and automate deployments using AWS, Terraform, and modern DevOps practices. Passionate about Infrastructure as Code, Kubernetes, and creating secure, reliable, and cost-efficient systems.
            </motion.p>

            <motion.div variants={item} className="mb-12 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="#aws-projects"
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white dark:text-[#0b1017] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/20 active:scale-95 cursor-pointer"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/45 px-5 py-2.5 text-sm font-semibold text-text transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card active:scale-95 cursor-pointer"
              >
                Contact Me
              </a>
              <div className="flex items-center gap-3 pl-2 border-l border-border/40">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-gradient-to-r hover:from-accent hover:to-accent-strong hover:text-[#0b1017]"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={item}
              className="grid grid-cols-3 gap-4 border-t border-border/40 pt-8 text-center md:text-left max-w-[480px] mx-auto md:mx-0"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 mt-0.5">
                    {stat.label}
                  </span>
                </div>
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
