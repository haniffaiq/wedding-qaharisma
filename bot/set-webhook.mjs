// Register (or update) the Telegram webhook so updates are pushed to the VPS.
// Run once after deploy, and again whenever WEBHOOK_URL or the secret changes.
//
// Env:
//   BOT_TOKEN       Telegram bot token (required)
//   WEBHOOK_URL     Public HTTPS URL nginx proxies to this bot,
//                   e.g. https://risma-qahhar.kukuh.online/api/telegram (required)
//   WEBHOOK_SECRET  Optional shared secret; must match the server's env.
//
// Usage:  node set-webhook.mjs          (set)
//         node set-webhook.mjs delete   (remove webhook)

import https from 'node:https';

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? '';
const mode = process.argv[2] === 'delete' ? 'deleteWebhook' : 'setWebhook';

if (!BOT_TOKEN || (mode === 'setWebhook' && !WEBHOOK_URL)) {
  console.error('Missing BOT_TOKEN or WEBHOOK_URL env. See .env.example.');
  process.exit(1);
}

const payload =
  mode === 'setWebhook'
    ? {
        url: WEBHOOK_URL,
        allowed_updates: ['message'],
        ...(WEBHOOK_SECRET ? { secret_token: WEBHOOK_SECRET } : {}),
      }
    : { drop_pending_updates: true };

const body = JSON.stringify(payload);
const req = https.request(
  `https://api.telegram.org/bot${BOT_TOKEN}/${mode}`,
  { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
  (res) => {
    let out = '';
    res.on('data', (c) => (out += c));
    res.on('end', () => console.log(`${mode}:`, out));
  },
);
req.on('error', (e) => console.error('request error:', e.message));
req.write(body);
req.end();
