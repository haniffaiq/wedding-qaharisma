/// <reference types="vite/client" />

export type RsvpPayload = {
  guest: string; // from URL slug (guestFromPath)
  name: string;
  attending: 'yes' | 'no';
  locations: string; // chosen event locations, e.g. "Sukabumi, Jakarta"
  session: string; // chosen Jakarta session label + time; '' if Jakarta not chosen
  guests: number;
  message: string;
};

export class RsvpNotConfiguredError extends Error {
  constructor() {
    super('RSVP Telegram env vars are not configured');
    this.name = 'RsvpNotConfiguredError';
  }
}

// Escape the 3 chars that break Telegram parse_mode: 'HTML'.
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildRsvpMessage(p: RsvpPayload): string {
  const lines = [
    '\u{1F514} <b>RSVP Baru</b>',
    `Tamu (link): ${escapeHtml(p.guest)}`,
    `Nama isi: ${escapeHtml(p.name)}`,
    `Kehadiran: ${p.attending === 'yes' ? '✅ Hadir' : '❌ Tidak hadir'}`,
  ];
  if (p.attending === 'yes') {
    if (p.locations) lines.push(`Lokasi: ${escapeHtml(p.locations)}`);
    if (p.session) lines.push(`Sesi (Jakarta): ${escapeHtml(p.session)}`);
    lines.push(`Jumlah: ${p.guests} orang`);
  }
  if (p.message.trim()) {
    lines.push(`Ucapan: ${escapeHtml(p.message.trim())}`);
  }
  return lines.join('\n');
}

async function sendToChat(token: string, chatId: string, text: string): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  let res: Response;
  try {
    res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new Error(`Telegram HTTP ${res.status}`);
  const data = (await res.json()) as { ok?: boolean; description?: string };
  if (!data.ok) throw new Error(data.description ?? 'Telegram rejected the message');
}

export async function sendRsvp(p: RsvpPayload): Promise<void> {
  const token = import.meta.env.VITE_TG_BOT_TOKEN as string | undefined;
  const rawChatIds = import.meta.env.VITE_TG_CHAT_ID as string | undefined;
  const chatIds = (rawChatIds ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) throw new RsvpNotConfiguredError();

  const text = buildRsvpMessage(p);
  // Send to every configured chat; if any fails, surface the error so the user can retry.
  await Promise.all(chatIds.map((id) => sendToChat(token, id, text)));
}
