'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export interface PracticeAreaPageProps {
  chapter: string;
  number: string;
  title: string;
  italicTitle: string;
  intro: string;
  caseTypes: string[];
  process: Array<{ step: string; title: string; description: string }>;
  faqs: Array<{ q: string; a: string }>;
  relatedKeywords: string[];
}

function askLex(question: string) {
  if (typeof window === 'undefined') return;
  const prompt = `Mi può fare un esempio concreto su: ${question}`;
  window.dispatchEvent(
    new CustomEvent('lex:open', { detail: { prompt } }),
  );
}

export function PracticeAreaTemplate(props: PracticeAreaPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-32 md:pt-40 pb-16">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-6xl md:text-7xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. {props.chapter}<br />Area {props.number}
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <Link
                href="/aree-di-competenza"
                className="inline-block text-xs uppercase tracking-[0.18em] text-graphite hover:text-cobalt mb-8 transition-colors"
              >
                ← Tutte le aree
              </Link>
              <h1
                className="font-display text-balance"
                style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
              >
                {props.title} <span className="italic text-cobalt">{props.italicTitle}</span>
              </h1>
              <p className="mt-8 text-graphite text-lg leading-relaxed max-w-2xl">
                {props.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Casi tipici */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">Casi tipici</span>
              <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
                Quando rivolgersi allo Studio.
              </h2>
            </div>

            <ul className="col-span-12 md:col-span-8 grid sm:grid-cols-2 gap-4">
              {props.caseTypes.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex gap-3 bg-paper p-5 border border-rule"
                >
                  <Check size={18} className="text-cobalt shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{c}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 mb-12">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">Iter operativo</span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                Come <span className="italic text-cobalt">procediamo.</span>
              </h2>
            </div>
          </div>

          <ol className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            {props.process.map((p, i) => (
              <li key={i} className="col-span-12 md:col-span-3 border-t border-ink pt-6">
                <span className="font-display text-3xl text-cobalt block mb-3">{p.step}</span>
                <h3 className="font-display text-xl mb-3">{p.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">{p.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">Domande frequenti</span>
              <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
                Le <span className="italic text-cobalt">questioni ricorrenti.</span>
              </h2>
            </div>

            <dl className="col-span-12 md:col-span-8 space-y-1">
              {props.faqs.map((f, i) => (
                <details key={i} className="group bg-paper border border-rule">
                  <summary className="cursor-pointer p-6 flex items-start justify-between gap-4 list-none">
                    <dt className="font-display text-lg leading-snug">{f.q}</dt>
                    <span className="text-cobalt text-2xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <dd className="px-6 pb-6 text-graphite leading-relaxed">
                    {f.a}
                    <button
                      type="button"
                      onClick={() => askLex(f.q)}
                      className="mt-4 inline-block font-mono text-cobalt hover:underline hover:opacity-85 cursor-pointer"
                      style={{
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                      }}
                    >
                      Chiedere a Lex un esempio concreto →
                    </button>
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA inline */}
      <section className="bg-cobalt-deep text-paper py-20 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 items-center">
            <div className="col-span-12 md:col-span-8">
              <h2
                className="font-display text-balance"
                style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.1 }}
              >
                Ha una questione di {props.title.toLowerCase()}?
                <br />
                <span className="italic text-gold">Ne parli con noi.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link
                href="/prenota"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink px-7 py-4 text-sm font-medium hover:bg-gold transition-colors duration-300 group"
              >
                Prenota un confronto
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
