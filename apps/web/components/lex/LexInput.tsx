'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  busy: boolean;
  onSubmit: (text: string) => void;
  inputRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
}

export function LexInput({ busy, onSubmit, inputRef }: Props) {
  const [value, setValue] = useState('');
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const ref = inputRef ?? internalRef;

  // Autoresize: 1-4 righe, poi scroll interno
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 22; // ~ font 14px lh 1.55
    const max = lineHeight * 4 + 24; // padding
    el.style.height = Math.min(el.scrollHeight, max) + 'px';
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  }, [value, ref]);

  function submit() {
    const text = value.trim();
    if (!text || busy) return;
    onSubmit(text);
    setValue('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  const disabled = !value.trim() || busy;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-2 px-6 py-4 bg-paper border-t border-rule"
    >
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Scriva qui la sua domanda…"
        aria-label="Messaggio per Lex"
        disabled={busy}
        className={cn(
          'flex-1 resize-none px-4 py-3 bg-paper-warm border border-rule',
          'text-[14px] leading-[1.55] text-ink placeholder:text-graphite/60',
          'outline-none focus:border-cobalt transition-colors',
          'disabled:opacity-60 disabled:cursor-not-allowed',
        )}
      />
      <button
        type="submit"
        disabled={disabled}
        aria-label="Invia messaggio"
        className={cn(
          'h-12 w-12 shrink-0 flex items-center justify-center',
          'bg-cobalt text-paper hover:bg-cobalt-deep',
          'transition-colors',
          'disabled:bg-rule disabled:text-graphite disabled:cursor-not-allowed',
        )}
      >
        {busy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
      </button>
    </form>
  );
}
