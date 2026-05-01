'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertTriangle, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LexToastData } from './types';

interface Props {
  toast: LexToastData | null;
  onDismiss: () => void;
}

export function LexToast({ toast, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          className={cn(
            'flex items-start gap-3 px-4 py-3',
            'border-l-2',
            toast.variant === 'success'
              ? 'bg-success/10 border-success'
              : 'bg-warn/10 border-warn',
          )}
        >
          <span
            className={cn(
              'mt-0.5 shrink-0',
              toast.variant === 'success' ? 'text-success' : 'text-warn',
            )}
            aria-hidden
          >
            {toast.variant === 'success' ? (
              <Check size={16} />
            ) : (
              <AlertTriangle size={16} />
            )}
          </span>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] leading-[1.5] text-ink">{toast.text}</p>
            {toast.cta && (
              <a
                href={toast.cta.href}
                className="inline-flex items-center gap-1.5 mt-2 text-[12px] font-medium text-cobalt hover:text-cobalt-deep underline-offset-2 hover:underline"
              >
                <Phone size={12} />
                {toast.cta.label}
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            aria-label="Chiudi notifica"
            className="shrink-0 -mt-1 -mr-1 p-1 text-graphite hover:text-ink transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
