import type { APIRoute } from 'astro';

export const prerender = false;

const DISCORD_WEBHOOK_URL = import.meta.env.DISCORD_WEBHOOK_URL;
const TURNSTILE_SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const { email, token } = await request.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email' }, 400);
    }
    if (!token || typeof token !== 'string') {
      return json({ error: 'Missing captcha token' }, 400);
    }

    // Verify Turnstile token
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: clientAddress ?? '',
      }),
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      console.error('Turnstile verify failed:', verifyData);
      return json({ error: 'Captcha failed', details: verifyData['error-codes'] }, 403);
    }

    // Forward to Discord
    const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📧 New subscriber: **${email}**`,
      }),
    });
    if (!discordRes.ok) {
      return json({ error: 'Failed to deliver' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: 'Bad request' }, 400);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
