import { Building2, MapPin, Phone } from 'lucide-react';
import { wedding } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import CopyButton from '../components/CopyButton';
import Reveal from '../components/Reveal';

export default function Gift() {
  return (
    <section id="gift" className="section-glass-soft px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="Wedding Gift"
            title="A Token of Love"
            subtitle={wedding.gifts.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {wedding.gifts.accounts.map((acc, i) => (
            <Reveal
              key={acc.bank + acc.number}
              delay={i * 120}
              className="rounded-sm border border-ink/10 bg-white/60 p-7 backdrop-blur md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-accent">
                  <Building2 size={14} />
                  Bank Transfer
                </span>
                <img src={acc.logo} alt={acc.bank} className="h-7 w-auto opacity-90" />
              </div>
              <h3 className="mt-4 font-display text-2xl">{acc.bank}</h3>
              <p className="mt-1 text-xs text-muted md:text-sm">a/n {acc.name}</p>
              <p className="mt-5 break-all font-mono text-base tracking-[0.2em] text-ink md:text-lg md:tracking-widest">
                {acc.number}
              </p>
              <div className="mt-5">
                <CopyButton value={acc.number} label="Copy Number" />
              </div>
              {'qris' in acc && acc.qris && (
                <div className="mt-6 flex flex-col items-center gap-2">
                  <img
                    src={acc.qris}
                    alt={`QRIS ${acc.name}`}
                    className="h-44 w-44 rounded-sm bg-white p-2 shadow-sm"
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                    Scan QRIS
                  </span>
                </div>
              )}
            </Reveal>
          ))}

          <Reveal
            delay={240}
            className="rounded-sm border border-ink/10 bg-white/60 p-7 backdrop-blur md:p-8"
          >
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-accent">
              <MapPin size={14} />
              Send a Gift
            </span>
            <h3 className="mt-4 font-display text-2xl">{wedding.gifts.address.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {wedding.gifts.address.text}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
              <Phone size={14} className="text-accent" />
              {wedding.gifts.address.phone}
            </p>
            <div className="mt-5">
              <CopyButton value={wedding.gifts.address.text} label="Copy Address" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
