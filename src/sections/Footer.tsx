import { Globe, Instagram, MessageCircle } from 'lucide-react';
import { wedding } from '../data/content';

export default function Footer() {
  const e = wedding.vendor;
  return (
    <footer className="section-glass-soft border-t glass-divider px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted">Invitation by</p>
          <p className="mt-2 font-display text-2xl italic text-ink">{e.brand}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted">
          <a
            href={e.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-accent"
          >
            <MessageCircle size={14} />
            {e.whatsapp}
          </a>
          <a
            href={e.igLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-accent"
          >
            <Instagram size={14} />
            {e.ig}
          </a>
          <a
            href={e.siteLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-accent"
          >
            <Globe size={14} />
            {e.site}
          </a>
        </div>

        <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
          © 2026 {e.brand}, all rights reserved
        </p>
      </div>
    </footer>
  );
}
