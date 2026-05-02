'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Phone, MapPin, Clock, Mail } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

/**
 * CTA FINALE — "Parla con un avvocato"
 *
 * Sezione finale forte: invito al primo confronto + telefono diretto.
 * Sfondo cobalt scuro con mesh aurora calda. CTA primaria magnetica
 * (segue cursore), CTA secondaria col numero diretto.
 *
 * Colonna laterale: indirizzo, telefono, orari, email (quando disponibile).
 */
export function ContactCTA() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [openStatus, setOpenStatus] = useState<'open' | 'closed'>('open');

  useEffect(() => {
    function compute() {
      const now = new Date();
      const day = now.getDay();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const isWeekday = day >= 1 && day <= 5;
      const morningOpen = minutes >= 9 * 60 && minutes < 13 * 60;
      const afternoonOpen = minutes >= 15 * 60 && minutes < 19 * 60;
      setOpenStatus(isWeekday && (morningOpen || afternoonOpen) ? 'open' : 'closed');
    }
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  function handleMagnetic(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  }
  function resetMagnetic() {
    if (ctaRef.current) ctaRef.current.style.transform = '';
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-aurora-dark text-paper py-24 md:py-32"
      aria-labelledby="contatti-heading"
    >
      {/* Pattern grid sottile */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--color-paper)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-paper)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Hairline gold top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgb(var(--color-gold)/0.6) 50%, transparent)',
        }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-16">
          <div className="col-span-12 lg:col-span-7">
            <span className="eyebrow text-paper/60 mb-7">07 — Contatti</span>

            <motion.h2
              id="contatti-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display mt-2 mb-6 text-balance text-paper"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.05,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              Parla con un avvocato.
              <br />
              <span className="italic text-gold">Oggi, non fra una settimana.</span>
            </motion.h2>

            <p className="text-paper/75 text-lg leading-relaxed max-w-xl mb-10">
              Quindici minuti, in studio o al telefono, per capire se possiamo
              esserle utili. Senza impegno, senza costo. Anche solo per
              indicarle se la sua è davvero una questione legale o se può
              risolversi diversamente.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                ref={ctaRef}
                href="/prenota"
                onMouseMove={handleMagnetic}
                onMouseLeave={resetMagnetic}
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink px-7 py-4 text-sm font-medium hover:bg-gold transition-colors duration-300 group"
                style={{ borderRadius: 'var(--radius-xs)' }}
              >
                Richiedi consulenza
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a href="tel:+390459586116" className="btn-ghost">
                <Phone size={16} />
                045 95 86 116
              </a>
            </div>

            <span className="eyebrow-live text-paper/70" data-status={openStatus}>
              {openStatus === 'open'
                ? 'Studio aperto adesso · Risposta entro la giornata'
                : 'Studio chiuso · Risposta entro 24 h lavorative'}
            </span>
          </div>

          {/* Info studio */}
          <div className="col-span-12 lg:col-span-5 lg:pl-10">
            <div className="border border-paper/15 p-7 md:p-8" style={{ borderRadius: 'var(--radius-md)' }}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mb-6">
                Studio Legale Miotti
              </h3>

              <div className="space-y-7">
                <ContactRow
                  icon={<MapPin size={18} />}
                  label="Sede"
                  value={
                    <span className="block leading-relaxed">
                      <span className="block">Via S. Giovanni Bosco, 29/E</span>
                      <span className="block">37047 San Bonifacio (VR)</span>
                    </span>
                  }
                />
                <ContactRow
                  icon={<Phone size={18} />}
                  label="Telefono"
                  value={
                    <a
                      href="tel:+390459586116"
                      className="hover:text-gold transition-colors"
                    >
                      045 95 86 116
                    </a>
                  }
                />
                {SITE_DATA.email && (
                  <ContactRow
                    icon={<Mail size={18} />}
                    label="Email"
                    value={
                      <a
                        href={`mailto:${SITE_DATA.email}`}
                        className="hover:text-gold transition-colors break-all"
                      >
                        {SITE_DATA.email}
                      </a>
                    }
                  />
                )}
                <ContactRow
                  icon={<Clock size={18} />}
                  label="Orari"
                  value={SITE_DATA.hours.long}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="text-gold mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.18em] text-paper/40 mb-1">
          {label}
        </p>
        <p className="text-paper leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
