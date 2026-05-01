import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classi Tailwind risolvendo conflitti.
 * Usage: cn('p-4', isActive && 'bg-cobalt', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Slug-ifica una stringa per URL SEO-friendly.
 * "Diritto di Famiglia" → "diritto-di-famiglia"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Formatta un numero di telefono italiano per display.
 * "+390459586116" → "045 95 86 116"
 */
export function formatPhoneIT(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^39/, '');
  if (digits.length < 9) return phone;
  return digits.replace(/(\d{3})(\d{2})(\d{2})(\d{3})/, '$1 $2 $3 $4');
}

/**
 * Formatta una data in italiano.
 */
export function formatDateIT(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Hash semplice per anti-spam IP (no library crypto — basta).
 * NB: non per crittografia, solo deterministic anonymization GDPR.
 */
export function hashSimple(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
