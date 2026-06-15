// Pure helpers for the wedding invite Telegram bot. No I/O — easy to test.

// "Hanif & Partner" -> "hanif-&-partner" (lowercase, spaces -> hyphens).
export function slugify(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

// Build the public invite URL. Symbols (& etc.) are percent-encoded so the
// link is always valid; the site's guestFromPath() decodes + title-cases it
// back to the original display name.
export function inviteUrl(base, name) {
  const slug = slugify(name);
  return `${base.replace(/\/+$/, '')}/${encodeURIComponent(slug)}`;
}

// Parse a Telegram message. Accepts /undangan or !undangan, with optional
// @botname suffix (group mentions). Returns { cmd, arg } or null.
export function parseCommand(text) {
  if (!text) return null;
  const t = text.trim();
  const withArg = t.match(/^[/!]undangan(?:@\w+)?\s+([\s\S]+)$/i);
  if (withArg) return { cmd: 'undangan', arg: withArg[1].trim() };
  if (/^[/!]undangan(?:@\w+)?\s*$/i.test(t)) return { cmd: 'undangan', arg: '' };
  return null;
}

// The bot's reply text (plain text — no HTML, so symbols never break parsing).
export function buildReply(base, arg) {
  if (!arg) {
    return 'Format: /undangan <nama tamu>\nContoh: /undangan Budi Santoso';
  }
  return `Link undangan untuk ${arg}:\n${inviteUrl(base, arg)}`;
}
