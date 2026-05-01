'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';
import { SectionMarker } from './SectionMarker';

export function ContactCTA() {
  return (
    <section
      data-rule-anchor="contatti"
      className="bg-cobalt-deep text-paper py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="contatti-heading"
    >
      <SectionMarker numeral="VI" label="Contatti" align="right" variant="dark" />

      {/* Pattern grid sottile sullo sfondo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--color-paper)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-paper)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-16">
          {/* Colonna principale: headline + CTA */}
          <div className="col-span-12 lg:col-span-7">
            <span className="eyebrow text-paper/60 mb-8">§ 07 · Contatti</span>
            <motion.h2
              id="contatti-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display mb-8 text-balance"
              style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}
            >
              Il primo passo
              <br />
              <span className="italic text-gold">è una conversazione.</span>
            </motion.h2>

            <p className="text-paper/70 text-lg leading-relaxed max-w-xl mb-10">
              Quindici minuti, in studio o al telefono, per capire se posso
              esserle utile. Senza impegno, senza costo. Anche solo per
              indicarle se la sua è davvero una questione legale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/prenota"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink px-7 py-4 text-sm font-medium hover:bg-gold transition-colors duration-300 group"
              >
                Primo confronto
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="tel:+390459586116"
                className="inline-flex items-center justify-center gap-2 border border-paper/30 text-paper px-7 py-4 text-sm font-medium hover:bg-paper/10 transition-colors duration-300"
              >
                <Phone size={16} />
                045 95 86 116
              </a>
            </div>

            <p className="text-xs text-paper/40 font-mono uppercase tracking-wider">
              Risposta garantita entro 24 ore lavorative
            </p>
          </div>

          {/* Colonna laterale: info studio */}
          <div className="col-span-12 lg:col-span-5 lg:pl-12">
            <div className="border-t border-paper/15 pt-8 space-y-8">
              <ContactRow
                icon={<MapPin size={18} />}
                label="Studio"
                value={
                  <span className="block leading-relaxed">
                    <span className="block">Via S. Giovanni Bosco, 29/E</span>
                    <span className="block">37047 San Bonifacio</span>
                    <span className="block">Provincia di Verona</span>
                  </span>
                }
              />
              <ContactRow
                icon={<Phone size={18} />}
                label="Telefono"
                value={<a href="tel:+390459586116" className="hover:text-gold">045 95 86 116</a>}
              />
              <ContactRow
                icon={<Clock size={18} />}
                label="Orari"
                value={SITE_DATA.hours.long}
              />
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
      <span className="text-gold mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-paper/40 mb-1">
          {label}
        </p>
        <p className="text-paper leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
