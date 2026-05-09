import { wedding } from '../data/content';
import Reveal from '../components/Reveal';

export default function Closing() {
  return (
    <section className="section-glass relative overflow-hidden px-6 py-20 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <span className="font-display text-5xl text-accent">&</span>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-7 text-base leading-loose text-ink/85 md:mt-8 md:text-lg">
            {wedding.closing.text}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 whitespace-pre-line font-display text-2xl text-accent md:mt-12 md:text-3xl">
            {wedding.closing.sign}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
