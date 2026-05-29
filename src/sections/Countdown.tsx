import { CalendarPlus } from 'lucide-react';
import { wedding } from '../data/content';
import { useCountdown } from '../hooks/useCountdown';
import Reveal from '../components/Reveal';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function gcalUrl() {
  // 27 Jun 2026, 09:00–10:00 WIB (UTC+7) → 02:00–03:00 UTC
  const start = '20260627T020000Z';
  const end = '20260627T030000Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'The Wedding of Qahhar & Risma',
    dates: `${start}/${end}`,
    details: 'Akad Nikah — Bale Sawala Gunungguruh, Sukabumi',
    location: 'Bale Sawala Gunungguruh, Kabupaten Sukabumi, Jawa Barat',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function Countdown() {
  const t = useCountdown(wedding.date);
  const items = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ];

  return (
    <section className="section-glass relative overflow-hidden px-6 py-20 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.4em] text-accent">
            Save the Date
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">
            Counting the Days Until "I Do"
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 grid w-full max-w-2xl grid-cols-4 gap-2 md:gap-6">
            {items.map((it, i) => (
              <div
                key={it.label}
                className="flex flex-col items-center rounded-sm border border-ink/10 bg-white/55 px-1.5 py-5 backdrop-blur md:py-8"
                style={{ animation: `fade-in-up 0.9s ${i * 90}ms backwards` }}
              >
                <span className="font-display text-2xl text-ink md:text-5xl">
                  {pad(it.value)}
                </span>
                <span className="mt-1.5 text-[9px] uppercase tracking-[0.25em] text-muted md:text-xs md:tracking-[0.3em]">
                  {it.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <a
            href={gcalUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <CalendarPlus size={14} />
            Add to Google Calendar
          </a>
        </Reveal>
      </div>
    </section>
  );
}
