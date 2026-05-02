'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from 'react';
import { Send, Loader2, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LexAttachmentChip } from './LexAttachmentChip';
import type { LexAttachment } from './types';

interface Props {
  busy: boolean;
  onSubmit: (text: string) => void;
  inputRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
  pendingAttachments: LexAttachment[];
  onUpload: (file: File) => Promise<void>;
  onRemoveAttachment: (id: string) => void;
}

export function LexInput({
  busy,
  onSubmit,
  inputRef,
  pendingAttachments,
  onUpload,
  onRemoveAttachment,
}: Props) {
  const [value, setValue] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ref = inputRef ?? internalRef;

  // Autoresize: 1-4 righe, poi scroll interno
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 22;
    const max = lineHeight * 4 + 24;
    el.style.height = Math.min(el.scrollHeight, max) + 'px';
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  }, [value, ref]);

  const hasReadyAttachment = pendingAttachments.some((a) => a.status === 'ready');
  const anyUploading = pendingAttachments.some((a) => a.status === 'uploading');

  function submit() {
    if (busy || anyUploading) return;
    const text = value.trim();
    if (!text && !hasReadyAttachment) return;
    onSubmit(text);
    setValue('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((f) => {
      void onUpload(f);
    });
    e.target.value = '';
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((f) => {
      void onUpload(f);
    });
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!dragActive) setDragActive(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }

  const disabled =
    busy || anyUploading || (!value.trim() && !hasReadyAttachment);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'bg-paper border-t border-rule transition-colors',
        dragActive && 'bg-paper-warm',
      )}
    >
      {pendingAttachments.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pt-3">
          {pendingAttachments.map((a) => (
            <LexAttachmentChip
              key={a.id}
              attachment={a}
              onRemove={onRemoveAttachment}
            />
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-end gap-2 px-6 py-4"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          className={cn(
            'h-12 w-12 shrink-0 flex items-center justify-center',
            'text-graphite hover:text-cobalt transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          aria-label="Allega documento (PDF o immagine)"
        >
          <Paperclip size={18} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder={
            dragActive
              ? 'Rilascia per allegare…'
              : hasReadyAttachment
              ? 'Aggiunga una nota o invii direttamente…'
              : 'Scriva qui la sua domanda…'
          }
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
          {busy || anyUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </form>
    </div>
  );
}
