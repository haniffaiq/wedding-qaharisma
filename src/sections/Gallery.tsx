import { useState } from 'react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-glass-soft px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow="Captured Moments" title="Moments in Time" />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-16 md:grid-cols-5 md:gap-3">
          {wedding.gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 60} variant="zoom">
              <button
                type="button"
                onClick={() => setActive(g.src)}
                className="group relative block aspect-square w-full overflow-hidden rounded-sm bg-ink/5"
              >
                <img
                  src={g.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <figure className="mx-auto mt-14 max-w-2xl text-center md:mt-16">
            <blockquote className="font-display text-xl italic text-ink md:text-3xl">
              {wedding.galleryQuote.text}
            </blockquote>
            <figcaption className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted">
              — {wedding.galleryQuote.author}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Lightbox src={active} onClose={() => setActive(null)} />
    </section>
  );
}
