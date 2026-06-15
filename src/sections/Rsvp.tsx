import { useState, type FormEvent } from 'react';
import { Heart } from 'lucide-react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { useToast } from '../components/Toast';
import Reveal from '../components/Reveal';
import { guestFromPath } from '../lib/guest';
import { sendRsvp, RsvpNotConfiguredError } from '../lib/telegram';

export default function Rsvp() {
  const { show } = useToast();
  const guestSlug = guestFromPath();
  const [name, setName] = useState(guestSlug === 'Guest' ? '' : guestSlug);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [session, setSession] = useState<string>(wedding.rsvp.sessions[0].id);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      show('Mohon isi nama Anda');
      return;
    }
    setSubmitting(true);
    try {
      const picked = wedding.rsvp.sessions.find((s) => s.id === session);
      await sendRsvp({
        guest: guestSlug,
        name: name.trim(),
        attending,
        session: attending === 'yes' && picked ? `${picked.label} (${picked.time})` : '',
        guests,
        message,
      });
      setName('');
      setMessage('');
      setGuests(1);
      setSession(wedding.rsvp.sessions[0].id);
      setAttending('yes');
      show('Terima kasih, RSVP terkirim');
    } catch (err) {
      if (err instanceof RsvpNotConfiguredError) {
        show('RSVP belum dikonfigurasi');
      } else {
        show('Gagal mengirim, coba lagi');
      }
    } finally {
      setSubmitting(false);
    }
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
                    aria-pressed={attending === opt}
                    onClick={() => {
                      setAttending(opt);
                      if (opt === 'no') setGuests(1);
                    }}
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

            {attending === 'yes' && (
              <fieldset className="grid gap-2">
                <legend className="text-xs uppercase tracking-widest text-muted">
                  Pilih Sesi
                </legend>
                <p className="text-xs normal-case tracking-normal text-muted/80">
                  {wedding.rsvp.quotaNote}
                </p>
                <div className="mt-1 grid grid-cols-2 gap-3">
                  {wedding.rsvp.sessions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={session === s.id}
                      onClick={() => setSession(s.id)}
                      className={`flex flex-col gap-1 rounded-sm border px-3 py-3 text-left transition-colors ${
                        session === s.id
                          ? 'border-accent bg-accent text-white'
                          : 'border-ink/15 text-ink hover:border-accent'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-widest md:text-sm">{s.label}</span>
                      <span className="text-[11px] normal-case tracking-normal opacity-80">
                        {s.time}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

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
      </div>
    </section>
  );
}
