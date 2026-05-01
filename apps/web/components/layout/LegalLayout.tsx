import { ReactNode } from 'react';

export function LegalLayout({
  chapter,
  title,
  italicTitle,
  lastUpdate,
  children,
}: {
  chapter: string;
  title: string;
  italicTitle?: string;
  lastUpdate: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-paper pt-32 md:pt-40 pb-12">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-6xl md:text-7xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                {chapter}
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Note legali</span>
              <h1 className="font-display text-balance" style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}>
                {title}
                {italicTitle && <> <span className="italic text-cobalt">{italicTitle}</span></>}
              </h1>
              <p className="mt-6 text-xs font-mono uppercase tracking-wider text-graphite">
                Ultimo aggiornamento: {lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
            <article className="col-span-12 md:col-span-10 md:col-start-2 prose-legal text-graphite leading-relaxed">
              {children}
            </article>
          </div>
        </div>
      </section>

      <style>{`
        .prose-legal h2 {
          font-family: var(--font-display);
          font-size: 1.875rem;
          color: rgb(var(--color-ink));
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .prose-legal h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: rgb(var(--color-ink));
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .prose-legal p {
          margin-bottom: 1rem;
        }
        .prose-legal ul, .prose-legal ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose-legal li {
          margin-bottom: 0.5rem;
          list-style: disc;
        }
        .prose-legal a {
          color: rgb(var(--color-cobalt));
          text-decoration: underline;
        }
        .prose-legal strong {
          color: rgb(var(--color-ink));
        }
      `}</style>
    </>
  );
}
