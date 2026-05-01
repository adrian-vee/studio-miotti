'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  hidden: boolean;
  onClick: () => void;
}

export function LexFloatingButton({ hidden, onClick }: Props) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: hidden ? 0 : 1,
        scale: hidden ? 0.9 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: hidden ? 0.9 : 1.04 }}
      whileTap={{ scale: hidden ? 0.9 : 0.96 }}
      onClick={onClick}
      aria-label="Apri Lex, assistente dello Studio"
      className={cn(
        'fixed bottom-6 right-6 z-[var(--z-lex)]',
        'group inline-flex items-center gap-2.5',
        'h-[52px] md:h-14 pl-3.5 md:pl-4 pr-3.5 md:pr-5',
        'bg-gradient-to-br from-cobalt to-cobalt-deep text-paper',
        'shadow-[0_10px_28px_rgba(15,34,64,0.28)] hover:shadow-[0_14px_36px_rgba(15,34,64,0.36)]',
        'transition-shadow duration-300',
      )}
    >
      <span
        className="relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center bg-paper/12 ring-1 ring-paper/10"
        aria-hidden
      >
        <Sparkles size={18} className="text-paper md:hidden" />
        <Sparkles size={22} className="text-paper hidden md:block" />
        <motion.span
          className="absolute inset-0 bg-paper/0"
          animate={{ boxShadow: ['0 0 0 0 rgba(250,250,247,0.0)', '0 0 0 6px rgba(250,250,247,0.0)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
      </span>
      <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.16em]">
        Parla con Lex
      </span>
    </motion.button>
  );
}
