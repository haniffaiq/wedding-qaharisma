import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { wedding } from '../data/content';
import { useIntro } from '../context/IntroContext';
import { guestFromPath } from '../lib/guest';

export default function CoverScreen() {
  const { opened, open } = useIntro();
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const guest = guestFromPath();

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';
  }, [opened]);

  useEffect(() => {
    if (!opening) return;
    const t = window.setTimeout(() => setHidden(true), 1600);
    return () => window.clearTimeout(t);
  }, [opening]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }
    window.setTimeout(() => open(), 900);
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] pointer-events-${opened ? 'none' : 'auto'}`}
      aria-hidden={opened}
    >
      {/* top panel */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 origin-top overflow-hidden bg-bg shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
        style={{
          animation: opening ? 'envelope-open-top 1.4s cubic-bezier(0.7, 0, 0.3, 1) forwards' : undefined,
        }}
      >
        <div className="relative flex h-full items-end justify-center px-6 pb-2">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-full opacity-30"
            style={{
              background:
                'radial-gradient(80% 70% at 50% 100%, var(--accent) 0%, transparent 70%)',
            }}
          />
          <div className="relative flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.5em] text-muted md:text-xs">
              {wedding.title}
            </span>
            <h1 className="mt-6 font-display text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl">
              <span className="block sm:inline">Qahhar</span>
              <span className="mx-2 text-accent">&</span>
              <span className="block sm:inline">Risma</span>
            </h1>
            <p className="mt-3 font-display text-sm italic text-accent sm:text-lg md:text-xl">
              {wedding.tagline}
            </p>
            <span className="mt-6 text-[10px] uppercase tracking-[0.4em] text-ink/70 md:text-xs">
              {wedding.dateLabel}
            </span>
          </div>
        </div>
      </div>

      {/* bottom panel */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom overflow-hidden bg-bg shadow-[0_-30px_60px_rgba(0,0,0,0.15)]"
        style={{
          animation: opening ? 'envelope-open-bottom 1.4s cubic-bezier(0.7, 0, 0.3, 1) forwards' : undefined,
        }}
      >
        <div className="flex h-full flex-col items-center justify-start px-6 pt-8 text-center">
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted/80">
              To Our Beloved
            </span>
            <br />
            <span className="mt-3 inline-block font-display text-2xl text-ink md:text-3xl">
              {guest}
            </span>
            <br />
            <span className="mt-3 inline-block">
              You are cordially invited to celebrate the union of our love.
            </span>
          </p>

          <button
            type="button"
            onClick={handleOpen}
            disabled={opening}
            className={`group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-xs uppercase tracking-[0.35em] text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl disabled:opacity-70 ${
              opening ? 'animate-pulse' : 'animate-float-soft'
            }`}
          >
            <Mail size={16} className="transition-transform group-hover:-translate-y-0.5" />
            {opening ? 'Opening…' : 'Open Invitation'}
          </button>

          <span className="mt-8 text-[10px] uppercase tracking-[0.4em] text-muted/70">
            Tap to open
          </span>
        </div>
      </div>

      {/* center seal */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: opening ? 'seal-break 0.9s ease-in forwards' : undefined }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/60 bg-bg shadow-md">
          <span className="font-display text-2xl text-accent">Q&R</span>
        </div>
      </div>

      <audio ref={audioRef} src={wedding.bgm} preload="auto" loop />
    </div>
  );
}
