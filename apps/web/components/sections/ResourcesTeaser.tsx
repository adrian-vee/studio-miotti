'use client';

/**
 * ResourcesTeaser — 3 cards editoriali (guide / blog post).
 *
 * Layout: prima card più grande (12/12 → 7/12 desktop), altre due in stack.
 * Ogni card: tag categoria, titolo display, excerpt, tempo lettura.
 */

import Link from 'next/link';
import { ArrowUpRight, Clock4 } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { RESOURCE_CARDS, type ResourceCard } from '@/lib/site-data';

export function ResourcesTeaser() {
  const ref = useGsapReveal<HTMLElement>({ y: 30, stagger: 0.08 });

  const [feature, ...rest] = RESOURCE_CARDS;

  return (
    <section
      ref={ref}
      className="relative bg-paper py-24 md:py-32"
      aria-labelledby="resources-title"
    >
      <div className="container-page">
        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-6">
          <div className="col-span-12 md:col-span-7" data-reveal>
            <span className="eyebrow-num">
              <strong>06 ·</strong> Risorse
            </span>
            <h2
              id="resources-title"
              className="mt-6 font-display text-ink"
              style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Guide brevi, scritte per chi non è avvocato.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9" data-reveal>
            <Link href="/guide" className="link-arrow">
              Tutte le guide
            </Link>
          </div>
        </div>

        {/* Layout asimmetrico */}
        <div className="mt-14 grid grid-cols-12 gap-[var(--gutter)]">
          {feature && (
            <Link
              href={`/guide/${feature.slug}`}
              data-reveal
              className="col-span-12 md:col-span-7"
            >
              <article className="group relative h-full overflow-hidden border bg-vellum p-7 transition-all duration-500 hover:bg-paper md:p-9"
                style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}>
                <FeatureBackdrop />
                <ResourceMeta resource={feature} variant="feature" />
                <h3
                  className="mt-6 font-display text-ink transition-colors group-hover:text-cobalt"
                  style={{ fontSize: 'clamp(1.625rem, 2.4vw, 2.25rem)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
                >
                  {feature.title}
                </h3>
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.6] text-graphite">
                  {feature.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cobalt">
                  Leggi la guida
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </article>
            </Link>
          )}

          <div className="col-span-12 md:col-span-5 flex flex-col gap-[var(--gutter)]">
            {rest.map((r) => (
              <Link
                key={r.slug}
                href={`/guide/${r.slug}`}
                data-reveal
                className="group relative h-full overflow-hidden border bg-vellum p-7 transition-all duration-500 hover:bg-paper"
                style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
              >
                <ResourceMeta resource={r} variant="compact" />
                <h3
                  className="mt-5 font-display text-ink transition-colors group-hover:text-cobalt"
                  style={{ fontSize: '1.25rem', lineHeight: 1.25 }}
                >
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.55] text-graphite">
                  {r.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cobalt">
                  Approfondisci
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                  style={{ background: 'rgb(var(--color-gold))' }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceMeta({
  resource,
  variant,
}: {
  resource: ResourceCard;
  variant: 'feature' | 'compact';
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="pill" data-variant={variant === 'feature' ? 'gold' : undefined}>
        {resource.category}
      </span>
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
        <Clock4 size={11} strokeWidth={1.5} />
        {resource.readingTime}
      </span>
    </div>
  );
}

function FeatureBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {/* Glifo gigante decorativo */}
      <span
        className="absolute right-6 top-6 font-display italic"
        style={{
          fontSize: 'clamp(7rem, 14vw, 12rem)',
          lineHeight: 1,
          color: 'rgb(var(--color-cobalt) / 0.05)',
          letterSpacing: '-0.04em',
        }}
      >
        §
      </span>
    </div>
  );
}
