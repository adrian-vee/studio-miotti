import type { Context, Next } from 'hono';
import type { Env } from './types';

const WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_REQUESTS_PER_DAY = 60;

/**
 * Rate limiting basato su IP+sessione tramite Cloudflare KV.
 * Limiti: 10 req/min e 60 req/giorno per origine.
 *
 * Per finestre estremamente rapide (>1000 RPS) si dovrebbe passare a
 * Durable Objects per coerenza. Per il caso d'uso (chatbot studio legale)
 * il KV è sufficiente.
 */
export async function rateLimitMiddleware(c: Context<{ Bindings: Env }>, next: Next) {
  const ip = c.req.header('cf-connecting-ip') ?? 'unknown';
  const minuteKey = `rl:m:${ip}:${Math.floor(Date.now() / 1000 / WINDOW_SECONDS)}`;
  const dayKey = `rl:d:${ip}:${new Date().toISOString().slice(0, 10)}`;

  const [minuteCount, dayCount] = await Promise.all([
    c.env.RATE_LIMIT.get(minuteKey).then((v) => Number(v ?? 0)),
    c.env.RATE_LIMIT.get(dayKey).then((v) => Number(v ?? 0)),
  ]);

  if (minuteCount >= MAX_REQUESTS_PER_WINDOW) {
    return c.json(
      { error: 'rate_limit_minute', retry_after: WINDOW_SECONDS },
      429,
      { 'Retry-After': String(WINDOW_SECONDS) },
    );
  }
  if (dayCount >= MAX_REQUESTS_PER_DAY) {
    return c.json({ error: 'rate_limit_day' }, 429);
  }

  // Increment counters (fire and forget)
  c.executionCtx.waitUntil(
    Promise.all([
      c.env.RATE_LIMIT.put(minuteKey, String(minuteCount + 1), {
        expirationTtl: WINDOW_SECONDS * 2,
      }),
      c.env.RATE_LIMIT.put(dayKey, String(dayCount + 1), {
        expirationTtl: 86400 + 3600,
      }),
    ]),
  );

  await next();
}
