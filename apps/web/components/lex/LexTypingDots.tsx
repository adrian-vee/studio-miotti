'use client';

import { motion } from 'motion/react';

export function LexTypingDots() {
  return (
    <span
      role="status"
      aria-label="Lex sta scrivendo"
      className="inline-flex items-end gap-1.5 py-1"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
          className="block h-[6px] w-[6px] rounded-full bg-cobalt"
        />
      ))}
    </span>
  );
}
