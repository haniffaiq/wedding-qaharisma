import { Camera, Shirt } from 'lucide-react';
import { wedding } from '../data/content';
import { useAccentColor } from '../context/AccentColorContext';
import Reveal from '../components/Reveal';

function lighten(hex: string, amt: number) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const mix = (v: number) => Math.round(v + (255 - v) * amt);
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

export default function DressCode() {
  const { color } = useAccentColor();
  const palette = [color, lighten(color, 0.2), lighten(color, 0.45), lighten(color, 0.7)];

  return (
    <section className="section-glass px-6 py-20 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-10">
        <Reveal className="rounded-sm border border-ink/10 bg-white/60 p-7 backdrop-blur md:p-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-accent">
            <Shirt size={14} />
            Dress Code
          </span>
          <h3 className="mt-4 font-display text-2xl md:text-4xl">Wear Our Palette</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{wedding.dressCode.note}</p>
          <div className="mt-7 flex gap-3 md:mt-8">
            {palette.map((c, i) => (
              <div
                key={i}
                className="h-12 w-12 rounded-full border border-ink/10 shadow-sm transition-transform hover:scale-110 md:h-14 md:w-14"
                style={{ background: c }}
                aria-label={`Palette swatch ${c}`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={150}
          className="rounded-sm border border-ink/10 bg-white/60 p-7 backdrop-blur md:p-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-accent">
            <Camera size={14} />
            {wedding.dressCode.frame.label}
          </span>
          <h3 className="mt-4 font-display text-2xl md:text-4xl">Capture The Moment</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{wedding.dressCode.frame.desc}</p>
          <a
            href={wedding.dressCode.frame.url}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white md:mt-8"
          >
            Open Filter
          </a>
        </Reveal>
      </div>
    </section>
  );
}
