# Wedding Invite Telegram Bot

Lets the couple generate per-guest invite links from Telegram.

**Command:** `/undangan <nama tamu>` (also accepts `!undangan`)
**Reply:**
```
Link undangan untuk Hanif & Partner:
https://risma-qahhar.kukuh.online/hanif-%26-partner
```
The site's `guestFromPath()` decodes the slug back to a title-cased greeting
("Hanif & Partner"). Names with symbols (`&`, spaces, etc.) are percent-encoded
so the link is always valid.

## Files

- `lib.mjs` — pure helpers (`slugify`, `inviteUrl`, `parseCommand`, `buildReply`)
- `server.mjs` — Node http webhook server (no dependencies), listens on `127.0.0.1:PORT`
- `set-webhook.mjs` — registers/removes the Telegram webhook
- `wedding-bot.service` — systemd unit
- `nginx-snippet.conf` — reverse-proxy block for the webhook path
- `.env.example` — config template

## Deploy (VPS + nginx)

Requires Node 18+ on the server.

1. The bot lives in `frontend/bot/` (deployed at e.g. `/var/www/invite/frontend/bot`).
2. `cp .env.example .env` and fill `BOT_TOKEN`, `BASE_URL`, `WEBHOOK_URL`, `WEBHOOK_SECRET`.
3. Add the nginx block from `nginx-snippet.conf` into the site's HTTPS `server { }`,
   then `nginx -t && systemctl reload nginx`.
4. Install + start the service:
   ```bash
   cp wedding-bot.service /etc/systemd/system/
   # edit User / WorkingDirectory / paths inside the unit if needed
   systemctl daemon-reload
   systemctl enable --now wedding-bot
   systemctl status wedding-bot
   ```
5. Register the webhook (run from the bot dir, with .env loaded):
   ```bash
   set -a; . ./.env; set +a
   node set-webhook.mjs
   ```
   Expect `setWebhook: {"ok":true,...}`. Verify:
   ```bash
   curl -s "https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo"
   ```

## Test

In Telegram, send the bot: `/undangan Budi Santoso` → it replies with the link.

Local logic check (no network):
```bash
node -e "import('./lib.mjs').then(m=>console.log(m.buildReply('https://risma-qahhar.kukuh.online','Hanif & Partner')))"
```

## Notes

- Setting a webhook disables `getUpdates` polling for this bot. The RSVP form
  (frontend) only *sends* messages, so it is unaffected.
- `WEBHOOK_SECRET` is optional but recommended: only Telegram (which sends the
  matching header) can then reach the webhook through nginx.
