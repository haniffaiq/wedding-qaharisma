import { Clock, MapPin } from 'lucide-react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

type Ev = {
  label: string;
  host: string;
  day: string;
  date: string;
  venue: string;
  address: string;
  mapsUrl: string;
  embed?: string;
  schedule: readonly { time: string; name: string }[];
};

function EventCard({ ev, delay = 0 }: { ev: Ev; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-col items-center rounded-sm border border-ink/10 bg-white/60 px-6 py-10 text-center backdrop-blur md:px-8 md:py-12"
    >
      <span className="text-[11px] uppercase tracking-[0.4em] text-accent">{ev.label}</span>
      <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted">{ev.host}</span>
      <h3 className="mt-4 font-display text-2xl md:text-4xl">{ev.venue}</h3>
      <p className="mt-2 text-sm text-ink/85">
        {ev.day}, {ev.date}
      </p>

      <div className="my-7 h-px w-12 bg-accent md:my-8" />

      <ul className="flex w-full max-w-xs flex-col gap-3 text-sm text-ink/85">
        {ev.schedule.map((s) => (
          <li key={s.name} className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="shrink-0 text-accent" />
              {s.name}
            </span>
            <span className="whitespace-nowrap text-muted">{s.time}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-start gap-2 text-sm text-muted md:mt-8">
        <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
        <span className="text-left">{ev.address}</span>
      </div>

      {ev.embed && (
        <div className="mt-7 w-full overflow-hidden rounded-sm border border-ink/10 md:mt-8">
          <iframe
            src={ev.embed}
            title={`Peta — ${ev.venue}`}
            className="h-56 w-full md:h-64"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

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
        <div className="mt-14 grid items-start gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          <EventCard ev={wedding.events.primary} />
          <EventCard ev={wedding.events.secondary} delay={150} />
        </div>
      </div>
    </section>
  );
}
