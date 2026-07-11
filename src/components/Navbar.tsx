import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#home', label: 'About me', id: 'home' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#portfolio', label: 'Projects', id: 'portfolio' },
  { href: '#aws-projects', label: 'AWS Projects', id: 'aws-projects' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = [...links.map((l) => l.id), 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 z-[1000] w-full border-b border-border bg-bg/80 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5">
        <a href="#home" className="inline-block transition-transform duration-300 hover:scale-105">
          <img src="/Downloads/Logo.png" alt="Ivan Rempis logo" className="block h-10 w-auto" />
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`group relative text-sm font-medium transition-colors duration-300 ${
                  active === link.id ? 'text-text' : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    active === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-full border border-accent/55 px-5 py-2.5 text-sm font-medium text-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-accent hover:to-accent-strong hover:text-[#0b1017]"
            >
              Contact
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-muted"
          >
            {open ? <FaXmark className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-border bg-surface transition-[max-height] duration-300 md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-2 py-6">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-base font-medium transition-colors ${
                  active === link.id ? 'text-text' : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full border border-accent/55 px-5 py-2.5 text-sm font-medium text-text transition-all hover:bg-accent hover:text-[#0b1017]"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
