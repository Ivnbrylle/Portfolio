import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '../lib/theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/45 bg-white/5 text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/75 hover:shadow-[0_8px_20px_rgba(var(--accent-rgb),0.25)]"
    >
      {isDark ? <FaSun className="h-[18px] w-[18px]" /> : <FaMoon className="h-[18px] w-[18px]" />}
    </button>
  );
}
