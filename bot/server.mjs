// Minimal Telegram webhook server for the wedding invite bot.
// No dependencies — Node built-in http/https only. Sits behind nginx, which
// terminates TLS and reverse-proxies the webhook path to this process.
//
// Env:
//   BOT_TOKEN       Telegram bot token (required)
//   BASE_URL        Public site base, e.g. https://risma-qahhar.kukuh.online (required)
//   PORT            Local port to listen on (default 8787)
//   WEBHOOK_SECRET  Optional. If set, requests must carry the matching
//                   X-Telegram-Bot-Api-Secret-Token header (set via set-webhook.mjs).

import http from 'node:http';
import https from 'node:https';
import { parseCommand, buildReply } from './lib.mjs';

const BOT_TOKEN = process.env.BOT_TOKEN;
const BASE_URL = process.env.BASE_URL;
const PORT = Number(process.env.PORT ?? 8787);
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? '';

if (!BOT_TOKEN || !BASE_URL) {
  console.error('Missing BOT_TOKEN or BASE_URL env. See .env.example.');
  process.exit(1);
}

function sendMessage(chatId, text) {
  const body = JSON.stringify({
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  });
  const req = https.request(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
    (res) => {
      res.resume(); // drain
      if (res.statusCode && res.statusCode >= 400) {
        console.error('sendMessage failed:', res.statusCode);
      }
    },
  );
  req.on('error', (e) => console.error('sendMessage error:', e.message));
  req.write(body);
  req.end();
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405).end('Method Not Allowed');
    return;
  }
  if (WEBHOOK_SECRET && req.headers['x-telegram-bot-api-secret-token'] !== WEBHOOK_SECRET) {
    res.writeHead(401).end('Unauthorized');
    return;
  }

  let raw = '';
  req.on('data', (c) => {
    raw += c;
    if (raw.length > 1_000_000) req.destroy(); // guard against huge bodies
  });
  req.on('end', () => {
    // Always 200 quickly so Telegram doesn't retry; do work after.
    res.writeHead(200).end('ok');
    try {
      const update = JSON.parse(raw);
      const msg = update.message ?? update.edited_message;
      const text = msg?.text;
      const chatId = msg?.chat?.id;
      if (!chatId || !text) return;
      const parsed = parseCommand(text);
      if (parsed?.cmd === 'undangan') {
        sendMessage(chatId, buildReply(BASE_URL, parsed.arg));
      }
    } catch (e) {
      console.error('update parse error:', e.message);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`wedding-bot listening on 127.0.0.1:${PORT}`);
});
