import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

export default function LoveStory() {
  return (
    <section id="love-story" className="section-glass-soft px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="Our Journey"
            title="The Path Where Two Hearts Unite"
          />
        </Reveal>
        <div className="mt-14 flex flex-col gap-14 md:mt-16 md:gap-24">
          {wedding.loveStory.map((s, i) => (
            <div
              key={s.title}
              className={`grid items-center gap-7 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? 'md:[&>:first-child]:order-2' : ''
              }`}
            >
              <Reveal variant="zoom">
                <div className="aspect-[4/3] overflow-hidden rounded-sm bg-ink/5">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out hover:scale-105"
                  />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <span className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  {s.date}
                </span>
                <h3 className="mt-3 font-display text-2xl md:text-4xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{s.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
