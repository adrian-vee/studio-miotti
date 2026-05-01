'use client';

import { motion } from 'motion/react';

interface Props {
  onPick: (prompt: string) => void;
}

const QUICK_ACTIONS: { label: string; prompt: string }[] = [
  { label: 'Devo separarmi', prompt: 'Devo separarmi e vorrei capire da dove iniziare.' },
  { label: 'Recupero crediti', prompt: 'Devo recuperare un credito da un cliente che non paga.' },
  {
    label: 'Disdetta affitto / sfratto',
    prompt:
      'Ho un problema con un contratto di locazione (disdetta o sfratto) e cerco un parere.',
  },
  { label: 'Altra questione', prompt: 'Vorrei un parere su una questione legale diversa.' },
];

export function LexQuickActions({ onPick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="flex flex-wrap gap-2 pt-1"
      aria-label="Argomenti suggeriti"
    >
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={() => onPick(action.prompt)}
          className="px-4 py-2.5 bg-paper-warm border border-rule text-[13px] text-ink hover:border-cobalt hover:text-cobalt transition-colors duration-200"
        >
          {action.label}
        </button>
      ))}
    </motion.div>
  );
}
