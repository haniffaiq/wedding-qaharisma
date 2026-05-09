import { Clock, MapPin } from 'lucide-react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

type Ev = {
  label: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
};

function EventCard({ ev, delay = 0 }: { ev: Ev; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-col items-center rounded-sm border border-ink/10 bg-white/60 px-6 py-10 text-center backdrop-blur md:px-8 md:py-12"
    >
      <span className="text-[11px] uppercase tracking-[0.4em] text-accent">{ev.label}</span>
      <h3 className="mt-4 font-display text-2xl md:text-4xl">{ev.venue}</h3>

      <div className="my-7 h-px w-12 bg-accent md:my-8" />

      <div className="flex flex-col items-center gap-3.5 text-sm text-ink/85 md:gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Clock size={16} className="text-accent" />
          <span>
            {ev.day}, {ev.date} • {ev.time}
          </span>
        </div>
        <div className="flex items-start gap-2 text-muted">
          <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
          <span className="text-left">{ev.address}</span>
        </div>
      </div>

      <a
        href={ev.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white md:mt-8"
      >
        View on Maps
      </a>
    </Reveal>
  );
}

export default function EventDetails() {
  return (
    <section id="event-details" className="section-glass px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="The Big Day"
            title="Event Details"
            subtitle="We invite you to share in the joy of our union."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          <EventCard ev={wedding.events.reception} />
          <EventCard ev={wedding.events.matrimony} delay={150} />
        </div>
      </div>
    </section>
  );
}
