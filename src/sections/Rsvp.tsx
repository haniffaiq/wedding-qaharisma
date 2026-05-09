import { useState, type FormEvent } from 'react';
import { Heart } from 'lucide-react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { useToast } from '../components/Toast';
import Reveal from '../components/Reveal';
import { guestFromPath } from '../lib/guest';

type Wish = {
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  message: string;
  at: number;
};

export default function Rsvp() {
  const { show } = useToast();
  const initialGuest = guestFromPath();
  const [name, setName] = useState(initialGuest === 'Guest' ? '' : initialGuest);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      show('Please fill in your name and wishes');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setWishes((w) => [
      { name: name.trim(), attending, guests, message: message.trim(), at: Date.now() },
      ...w,
    ]);
    setName('');
    setMessage('');
    setGuests(1);
    setAttending('yes');
    setSubmitting(false);
    show('Thank you, your wishes have been sent');
  };

  return (
    <section id="rsvp" className="section-glass px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Your Presence"
            title="RSVP & Wishes"
            subtitle={wedding.rsvp.intro}
          />
        </Reveal>

        <Reveal delay={150}>
          <form
            onSubmit={onSubmit}
            className="mt-10 grid gap-5 rounded-sm border border-ink/10 bg-white/65 p-6 backdrop-blur md:mt-12 md:p-8"
          >
            <label className="grid gap-2 text-xs uppercase tracking-widest text-muted">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="border-b border-ink/15 bg-transparent px-0 py-2 text-base normal-case tracking-normal text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
            </label>

            <fieldset className="grid gap-2">
              <legend className="text-xs uppercase tracking-widest text-muted">Attendance</legend>
              <div className="grid grid-cols-2 gap-3">
                {(['yes', 'no'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAttending(opt)}
                    className={`rounded-sm border px-3 py-3 text-xs uppercase tracking-widest transition-colors md:text-sm ${
                      attending === opt
                        ? 'border-accent bg-accent text-white'
                        : 'border-ink/15 text-ink hover:border-accent'
                    }`}
                  >
                    {opt === 'yes' ? 'Will Attend' : 'Cannot Attend'}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2 text-xs uppercase tracking-widest text-muted">
              Number of Guests
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                disabled={attending === 'no'}
                className="border-b border-ink/15 bg-transparent px-0 py-2 text-base normal-case tracking-normal text-ink focus:border-accent focus:outline-none disabled:opacity-40"
              >
                {Array.from({ length: wedding.rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-xs uppercase tracking-widest text-muted">
              Wishes
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Share a kind word for the couple"
                className="border-b border-ink/15 bg-transparent px-0 py-2 text-base normal-case tracking-normal text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Heart size={14} className={submitting ? 'animate-ping' : ''} />
              {submitting ? 'Sending…' : 'Send Wishes'}
            </button>
          </form>
        </Reveal>

        {wishes.length > 0 && (
          <div className="mt-12 grid gap-4">
            <h3 className="text-center text-[11px] uppercase tracking-[0.3em] text-accent">
              Recent Wishes
            </h3>
            <ul className="grid gap-3">
              {wishes.map((w) => (
                <li
                  key={w.at}
                  className="animate-fade-in-up rounded-sm border border-ink/10 bg-white/60 px-5 py-4 backdrop-blur"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium uppercase tracking-widest text-ink">
                      {w.name}
                    </span>
                    <span className="text-muted">
                      {w.attending === 'yes' ? `Attending • ${w.guests}` : 'Cannot attend'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
