import { Instagram } from 'lucide-react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

type Person = {
  name: string;
  short: string;
  parents: string;
  ig: string;
  photo: string;
};

function Card({ person, delay = 0 }: { person: Person; delay?: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ink/5">
        <img
          src={person.photo}
          alt={person.name}
          className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35))' }}
        />
      </div>
      <h3 className="mt-7 font-display text-2xl leading-tight md:text-4xl">{person.name}</h3>
      <p className="mt-3 max-w-xs whitespace-pre-line text-xs leading-relaxed text-muted md:text-sm">
        {person.parents}
      </p>
      <a
        href={`https://instagram.com/${person.ig}`}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-accent hover:underline"
      >
        <Instagram size={14} />
        @{person.ig}
      </a>
    </Reveal>
  );
}

export default function BrideGroom() {
  return (
    <section id="bride-groom" className="section-glass px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="The Couple"
            title="Groom & Bride"
            subtitle="Two stories, two journeys, brought together by grace."
          />
        </Reveal>
        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-12">
          <Card person={wedding.groom} />
          <div className="flex items-center justify-center md:hidden">
            <span className="font-display text-5xl text-accent animate-shimmer">&</span>
          </div>
          <Card person={wedding.bride} delay={150} />
        </div>
      </div>
    </section>
  );
}
