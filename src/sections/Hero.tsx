import { ChevronDown } from 'lucide-react';
import { wedding } from '../data/content';
import ColorPicker from '../components/ColorPicker';
import { useIntro } from '../context/IntroContext';
import { guestFromPath } from '../lib/guest';

export default function Hero() {
  const { opened } = useIntro();
  const guest = guestFromPath();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* hero-only bottom fade so the next section transitions cleanly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40%]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))',
        }}
      />

      <div
        className={`relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center text-white ${
          opened ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/80 md:text-xs">
          {wedding.title}
        </p>
        <h1 className="mt-6 font-display text-[3.25rem] leading-[1.02] drop-shadow-lg sm:text-7xl md:text-8xl">
          <span className="block sm:inline">Qahhar</span>
          <span className="mx-3 text-accent drop-shadow">&</span>
          <span className="block sm:inline">Risma</span>
        </h1>
        <p className="mt-4 font-display text-base italic text-accent sm:text-xl md:text-2xl">
          {wedding.tagline}
        </p>
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px w-16 bg-white/40" />
          <span className="font-display text-2xl tracking-widest text-white drop-shadow md:text-3xl">
            {wedding.initials}
          </span>
          <span className="h-px w-16 bg-white/40" />
        </div>
        <div className="mt-10 flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.4em] text-white/85 md:text-xs">
          {wedding.dateLabels.map((d) => (
            <p key={d.place}>
              <span className="text-accent">{d.place}</span>
              <span className="mx-2 text-white/40">·</span>
              {d.date}
            </p>
          ))}
        </div>

        <div className="mt-10 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/25 bg-black/30 px-7 py-5 backdrop-blur-md md:px-10 md:py-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">
            Dear, Our Beloved
          </span>
          <span className="font-display text-2xl text-white md:text-3xl">{guest}</span>
        </div>

        <div className="mt-10">
          <ColorPicker />
        </div>

        <a
          href="#bride-groom"
          className="mt-14 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/85 hover:text-accent"
        >
          Scroll
          <ChevronDown size={18} className="animate-float-soft" />
        </a>
      </div>
    </section>
  );
}
