import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa6';

const socials = [
  { href: 'https://www.linkedin.com/in/ivn-brylle/', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://github.com/Ivnbrylle', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.instagram.com/ivn_brylle/', label: 'Instagram', Icon: FaInstagram },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex flex-col-reverse items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted">&copy; 2026 Ivan Rempis. All rights reserved.</p>
          <div className="flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
