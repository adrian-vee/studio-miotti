import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { handleChat } from './chat';
import { rateLimitMiddleware } from './rate-limit';
import { upload } from './upload';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

// Middleware globali
app.use('*', logger());
app.use('*', secureHeaders());

app.use('*', async (c, next) => {
  const allowed = (c.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim());
  const origin = c.req.header('origin') ?? '';

  return cors({
    origin: allowed.includes(origin) ? origin : allowed[0] ?? '*',
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Accept', 'Cache-Control'],
    exposeHeaders: ['Content-Type'],
    maxAge: 86400,
  })(c, next);
});

// Health check
app.get('/', (c) => c.json({ ok: true, service: 'miotti-lex', version: '0.1.0' }));
app.get('/health', (c) => c.json({ ok: true, ts: Date.now() }));

// Chat endpoint
app.post('/chat', rateLimitMiddleware, handleChat);

// Upload endpoint (rate-limited like chat)
app.use('/upload', rateLimitMiddleware);
app.route('/', upload);

// 404
app.notFound((c) => c.json({ error: 'not_found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('[lex-worker]', err);
  return c.json({ error: 'internal_error', message: err.message }, 500);
});

export default app;
