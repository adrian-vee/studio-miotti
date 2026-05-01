'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LexFloatingButton } from './LexFloatingButton';
import { LexPanel } from './LexPanel';
import { useLexChat } from './useLexChat';

const WORKER_URL = process.env.NEXT_PUBLIC_LEX_WORKER_URL ?? '/api/lex';

export function LexAssistant() {
  const [open, setOpen] = useState(false);
  const chat = useLexChat({ workerUrl: WORKER_URL });

  // Aggiunge un padding-bottom al body così il FAB non copre il footer
  useEffect(() => {
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = '6rem';
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, []);

  return (
    <>
      <LexFloatingButton hidden={open} onClick={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <LexPanel
            key="lex-panel"
            open={open}
            messages={chat.messages}
            busy={chat.busy}
            toast={chat.toast}
            hasUserSpoken={chat.hasUserSpoken}
            onClose={() => setOpen(false)}
            onSubmit={chat.send}
            onReset={chat.reset}
            onDismissToast={chat.dismissToast}
          />
        )}
      </AnimatePresence>
    </>
  );
}
