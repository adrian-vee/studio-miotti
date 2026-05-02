'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { LexMsg } from './types';
import { LexTypingDots } from './LexTypingDots';
import { LexAttachmentChip } from './LexAttachmentChip';

interface Props {
  msg: LexMsg;
}

export function LexBubble({ msg }: Props) {
  const isUser = msg.role === 'user';
  const hasAttachments = !!msg.attachments && msg.attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[85%] px-5 py-4 leading-[1.55]',
          isUser
            ? 'bg-cobalt text-paper text-[14px]'
            : 'bg-paper-warm text-ink border-l-2 border-cobalt text-[15px]',
        )}
      >
        {hasAttachments && (
          <div className="flex flex-wrap gap-2 mb-2">
            {msg.attachments!.map((a) => (
              <LexAttachmentChip key={a.id} attachment={a} variant="sent" />
            ))}
          </div>
        )}

        {msg.pending ? (
          <LexTypingDots />
        ) : msg.content ? (
          <span className="whitespace-pre-wrap">
            {msg.content}
            {msg.streaming && !isUser && <BlinkingCursor />}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="ml-0.5 inline-block w-[2px] h-[1.05em] -mb-[2px] align-middle bg-cobalt"
    />
  );
}
