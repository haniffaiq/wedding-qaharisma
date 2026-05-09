const FALLBACK = 'Guest';

export function guestFromPath(pathname: string = window.location.pathname): string {
  const raw = pathname.replace(/^\/+|\/+$/g, '').split('/')[0] ?? '';
  if (!raw) return FALLBACK;

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  const cleaned = decoded.replace(/[-_+]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned) return FALLBACK;

  return cleaned
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
}
