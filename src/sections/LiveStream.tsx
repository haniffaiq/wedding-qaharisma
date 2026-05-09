import { Instagram, Radio } from 'lucide-react';
import { wedding } from '../data/content';
import Reveal from '../components/Reveal';

export default function LiveStream() {
  const ls = wedding.liveStream;
  return (
    <section className="section-glass-soft px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="flex flex-col items-center rounded-sm border border-ink/10 bg-white/60 px-6 py-12 text-center backdrop-blur md:px-8 md:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-accent">
              <Radio size={12} className="animate-shimmer" />
              {ls.label}
            </span>
            <h3 className="mt-6 font-display text-2xl md:text-4xl">
              Be With Us, Anywhere You Are
            </h3>
            <p className="mt-4 text-sm text-muted md:text-base">
              {ls.day}, {ls.date} • {ls.time}
            </p>
            <a
              href={ls.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              <Instagram size={14} />
              Watch on @{ls.handle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
