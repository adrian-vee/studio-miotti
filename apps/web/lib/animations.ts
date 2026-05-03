/**
 * lib/animations.ts — GSAP infrastructure.
 *
 * - Registrazione plugin idempotente (solo client).
 * - Helper per gsap.context, prefers-reduced-motion, magnetic hover.
 * - SplitText fallback per ambienti senza il plugin Club: divide il testo
 *   in parole/righe via DOM nodes preservando la baseline.
 *
 * Il plugin SplitText originale è Club GreenSock; qui usiamo un fallback
 * minimale per word/line, sufficiente al reveal editoriale dei titoli hero.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function ensureGsap() {
  if (typeof window === 'undefined') return null;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 0.9 });
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return gsap;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * splitToChars — fallback per char reveal cinematico.
 * Wrappa ogni carattere (preservando spazi) in <span class="char"><span class="char-inner">…</span></span>.
 */
export function splitToChars(el: HTMLElement): HTMLElement[] {
  if (!el || el.dataset.splitChars === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>('.char-inner'));
  }
  const text = el.textContent ?? '';
  el.innerHTML = '';
  const out: HTMLElement[] = [];
  for (const ch of text) {
    if (ch === ' ') {
      el.appendChild(document.createTextNode(' '));
      continue;
    }
    const wrap = document.createElement('span');
    wrap.className = 'char';
    wrap.style.display = 'inline-block';
    wrap.style.overflow = 'hidden';
    wrap.style.lineHeight = 'inherit';
    wrap.style.verticalAlign = 'baseline';

    const inner = document.createElement('span');
    inner.className = 'char-inner';
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform, opacity';
    inner.textContent = ch;

    wrap.appendChild(inner);
    el.appendChild(wrap);
    out.push(inner);
  }
  el.dataset.splitChars = 'true';
  return out;
}

/**
 * drawPath — anima un SVG path con stroke-dasharray (fallback DrawSVG).
 * Setta dasharray = pathLength, dashoffset 0 → pathLength, e anima offset → 0.
 */
export function drawPath(
  path: SVGPathElement | SVGLineElement | SVGPolylineElement,
  opts: { duration?: number; delay?: number; ease?: string; trigger?: Element | null } = {},
): void {
  const g = ensureGsap();
  if (!g) return;
  const len =
    'getTotalLength' in path
      ? (path as SVGPathElement).getTotalLength()
      : 1000;
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);

  if (prefersReducedMotion()) {
    path.style.strokeDashoffset = '0';
    return;
  }

  const { duration = 1.6, delay = 0, ease = 'power2.out', trigger } = opts;
  g.to(path, {
    strokeDashoffset: 0,
    duration,
    delay,
    ease,
    scrollTrigger: trigger ? { trigger, start: 'top 80%', once: true } : undefined,
  });
}

/**
 * splitToWords — fallback per word reveal.
 * Wrappa ogni parola in <span class="word"><span class="word-inner">…</span></span>
 * preservando spazi e ritorni a capo. Idempotente.
 */
export function splitToWords(el: HTMLElement): HTMLElement[] {
  if (!el || el.dataset.split === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>('.word-inner'));
  }
  const text = el.textContent ?? '';
  el.innerHTML = '';
  const out: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((chunk) => {
    if (chunk.trim() === '') {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const word = document.createElement('span');
    word.className = 'word';
    word.style.display = 'inline-block';
    word.style.overflow = 'hidden';
    word.style.lineHeight = 'inherit';
    word.style.verticalAlign = 'baseline';

    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform, opacity';
    inner.textContent = chunk;

    word.appendChild(inner);
    el.appendChild(word);
    out.push(inner);
  });
  el.dataset.split = 'true';
  return out;
}

/**
 * magnetic — hover magnetico leggero per CTA.
 * Cleanup function da chiamare on unmount.
 */
export function magnetic(el: HTMLElement, strength = 18): () => void {
  if (prefersReducedMotion()) return () => {};
  const move = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: (x / rect.width) * strength,
      y: (y / rect.height) * strength,
      duration: 0.45,
      ease: 'power3.out',
    });
  };
  const leave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };
  el.addEventListener('mousemove', move);
  el.addEventListener('mouseleave', leave);
  return () => {
    el.removeEventListener('mousemove', move);
    el.removeEventListener('mouseleave', leave);
    gsap.set(el, { clearProps: 'transform' });
  };
}

/**
 * drawLine — anima un divider/path da scaleX 0→1 con ScrollTrigger.
 */
export function drawLine(el: Element, opts: ScrollTrigger.StaticVars = {}) {
  const g = ensureGsap();
  if (!g) return;
  if (prefersReducedMotion()) {
    g.set(el, { scaleX: 1, transformOrigin: 'left center' });
    return;
  }
  g.fromTo(
    el,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true, ...opts },
    },
  );
}

/**
 * staggerReveal — stack reveal con stagger su una collezione di nodi.
 */
export function staggerReveal(
  els: ArrayLike<Element>,
  opts: { y?: number; stagger?: number; trigger?: Element | null } = {},
) {
  const g = ensureGsap();
  if (!g) return;
  const { y = 28, stagger = 0.08, trigger } = opts;
  if (prefersReducedMotion()) {
    g.set(els, { opacity: 1, y: 0 });
    return;
  }
  g.fromTo(
    els,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? { trigger, start: 'top 80%', once: true }
        : undefined,
    },
  );
}
