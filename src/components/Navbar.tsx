import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { wedding } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useIntro } from '../context/IntroContext';

export default function Navbar() {
  const { opened } = useIntro();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ids = wedding.nav.map((n) => n.id);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!opened) return null;

  const onDarkHero = !scrolled && !open;
  const linkColor = onDarkHero ? 'text-white/85 hover:text-accent' : 'text-ink hover:text-accent';
  const logoColor = onDarkHero ? 'text-white' : 'text-ink';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-bg/95 shadow-sm backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-6 md:py-4">
        <a href="#home" className={`font-display text-lg tracking-wider md:text-xl ${logoColor}`}>
          Q <span className="text-accent">&</span> R
        </a>
        <nav className="hidden lg:block">
          <ul className="flex gap-7 text-[11px] uppercase tracking-[0.25em] xl:gap-8">
            {wedding.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative py-1 transition-colors ${
                    active === item.id ? 'text-accent' : linkColor
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          aria-label="Toggle menu"
          className={`lg:hidden ${onDarkHero ? 'text-white' : 'text-ink'}`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-ink/10 bg-bg/95 backdrop-blur lg:hidden">
          <ul className="flex flex-col px-5 py-2 text-sm uppercase tracking-widest">
            {wedding.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-3 ${active === item.id ? 'text-accent' : 'text-ink'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
