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

  // Listener per evento esterno `lex:open` (es. dalle FAQ "Chiedere a Lex")
  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ prompt: string }>).detail;
      const prompt = detail?.prompt;
      if (!prompt) return;
      setOpen(true);
      void chat.send(prompt);
    }
    window.addEventListener('lex:open', handler);
    return () => window.removeEventListener('lex:open', handler);
  }, [chat]);

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
            pendingAttachments={chat.pendingAttachments}
            onClose={() => setOpen(false)}
            onSubmit={chat.send}
            onReset={chat.reset}
            onDismissToast={chat.dismissToast}
            onUpload={chat.uploadFile}
            onRemoveAttachment={chat.removeAttachment}
          />
        )}
      </AnimatePresence>
    </>
  );
}
