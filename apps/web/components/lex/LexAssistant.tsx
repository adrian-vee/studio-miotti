'use client';

/**
 * LexAssistant — wrapper di compatibilità.
 *
 * In questa fase del sito, LEX vive solo come floating button + modal
 * placeholder (vedi LexFloatingButton). Quando la chat sarà pronta,
 * questo wrapper ricaricherà il LexPanel completo.
 *
 * Mantiene padding-bottom sul body per non far coprire il footer dal FAB.
 */

import { useEffect } from 'react';
import { LexFloatingButton } from './LexFloatingButton';

export function LexAssistant() {
  useEffect(() => {
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = '6rem';
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, []);

  return <LexFloatingButton />;
}
