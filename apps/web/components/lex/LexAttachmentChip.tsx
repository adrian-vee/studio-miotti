'use client';

import { Paperclip, X, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LexAttachment } from './types';

interface Props {
  attachment: LexAttachment;
  onRemove?: (id: string) => void;
  variant?: 'pending' | 'sent';
}

export function LexAttachmentChip({
  attachment,
  onRemove,
  variant = 'pending',
}: Props) {
  const isImage = attachment.type.startsWith('image/');
  const sizeKB = Math.max(1, Math.round(attachment.size / 1024));

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 max-w-[280px]',
        variant === 'pending'
          ? 'bg-paper-warm border border-rule'
          : 'bg-paper border border-rule/50',
      )}
    >
      {attachment.status === 'uploading' && (
        <Loader2 className="w-4 h-4 text-cobalt animate-spin shrink-0" aria-hidden />
      )}
      {attachment.status === 'ready' && (
        <Paperclip className="w-4 h-4 text-cobalt shrink-0" aria-hidden />
      )}
      {attachment.status === 'error' && (
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden />
      )}

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[13px] font-medium text-ink truncate">
          {attachment.name}
        </span>
        <span className="text-[11px] text-graphite">
          {attachment.status === 'error'
            ? attachment.error || 'Errore upload'
            : `${isImage ? 'Immagine' : 'PDF'} · ${sizeKB} KB`}
        </span>
      </div>

      {variant === 'pending' && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(attachment.id)}
          className="text-graphite hover:text-ink shrink-0 transition-colors"
          aria-label="Rimuovi allegato"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
