import { Hono } from 'hono';
import type { Env } from './types';

const upload = new Hono<{ Bindings: Env }>();

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

// Workers FormData.get is typed as `string | null` upstream, but multipart
// binary fields return a File-like Blob at runtime. We duck-type to the
// minimal surface we need.
interface UploadedFileLike {
  name: string;
  type: string;
  size: number;
  arrayBuffer(): Promise<ArrayBuffer>;
}

function isFileLike(value: unknown): value is UploadedFileLike {
  if (!value || typeof value === 'string') return false;
  const candidate = value as Partial<UploadedFileLike>;
  return (
    typeof candidate.arrayBuffer === 'function' &&
    typeof candidate.size === 'number' &&
    typeof candidate.type === 'string' &&
    typeof candidate.name === 'string'
  );
}

upload.post('/upload', async (c) => {
  const contentType = c.req.header('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return c.json({ error: 'Expected multipart/form-data' }, 400);
  }

  const formData = await c.req.formData();
  const entry: unknown = formData.get('file');

  if (!isFileLike(entry)) {
    return c.json({ error: 'File mancante' }, 400);
  }

  if (entry.size > MAX_SIZE) {
    return c.json(
      {
        error: 'File troppo grande (max 10MB)',
        code: 'FILE_TOO_LARGE',
      },
      413,
    );
  }

  if (!ALLOWED_TYPES.includes(entry.type)) {
    return c.json(
      {
        error: 'Formato non supportato. Carica PDF, JPG, PNG, WebP o GIF',
        code: 'INVALID_TYPE',
      },
      415,
    );
  }

  const buffer = await entry.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  // chunk-wise per evitare stack overflow su file grandi
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);

  return c.json({
    success: true,
    file: {
      name: entry.name,
      type: entry.type,
      size: entry.size,
      base64,
    },
  });
});

export { upload };
