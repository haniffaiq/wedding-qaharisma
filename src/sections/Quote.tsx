import { wedding } from '../data/content';
import Reveal from '../components/Reveal';

export default function Quote() {
  return (
    <section className="section-glass-soft px-6 py-20 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <span className="font-display text-5xl text-accent">"</span>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-4 font-display text-lg italic leading-relaxed text-ink md:text-2xl">
            {wedding.quote.text.replace(/^"|"$/g, '')}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-muted">
            — {wedding.quote.ref}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
