'use client';

/**
 * FileUploadMock — area drag & drop "mock" (UI-only).
 *
 * Mantiene state locale dei file selezionati. Nessun upload reale.
 * Supporta drag&drop, click-to-pick, rimozione singolo file.
 *
 * Mostra placeholder file fittizi finché l'utente non aggiunge nulla.
 */

import { useCallback, useRef, useState } from 'react';
import { UploadCloud, X, FileText, FileCheck2 } from 'lucide-react';

export interface MockFile {
  id: string;
  name: string;
  size: number;
}

const SUGGESTED_TYPES = '.pdf, .doc, .docx, .jpg, .jpeg, .png';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadMock({
  files,
  onChange,
}: {
  files: MockFile[];
  onChange: (files: MockFile[]) => void;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const next: MockFile[] = [...files];
      Array.from(fileList).forEach((f) => {
        next.push({
          id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
          name: f.name,
          size: f.size,
        });
      });
      onChange(next.slice(0, 8));
    },
    [files, onChange],
  );

  const removeFile = useCallback(
    (id: string) => onChange(files.filter((f) => f.id !== id)),
    [files, onChange],
  );

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        className="group flex cursor-pointer flex-col items-center justify-center rounded-[4px] border-2 border-dashed px-6 py-10 text-center transition-colors duration-300"
        style={{
          borderColor: drag
            ? 'rgb(var(--color-gold))'
            : 'rgb(var(--color-rule) / 0.22)',
          background: drag
            ? 'rgb(var(--color-gold) / 0.06)'
            : 'rgb(var(--color-paper-warm) / 0.3)',
        }}
        aria-label="Area drag and drop per caricare documenti"
      >
        <span
          aria-hidden
          className="inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
          style={{
            color: 'rgb(var(--color-cobalt))',
            background: 'rgb(var(--color-vellum))',
            border: '1px solid rgb(var(--color-rule) / 0.18)',
          }}
        >
          <UploadCloud size={20} strokeWidth={1.5} />
        </span>
        <span
          className="mt-4 font-display"
          style={{ fontSize: '1.0625rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
        >
          Carica documenti
        </span>
        <span className="mt-1.5 max-w-md text-[0.8125rem] leading-[1.5] text-graphite">
          Trascina qui contratti, lettere, immagini o PDF rilevanti. Oppure clicca
          per selezionarli dal tuo dispositivo.
        </span>
        <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          Formati supportati · {SUGGESTED_TYPES}
        </span>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept={SUGGESTED_TYPES}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-[3px] border bg-vellum px-3.5 py-2.5"
              style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
            >
              <span
                aria-hidden
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px]"
                style={{
                  color: 'rgb(var(--color-cobalt))',
                  background: 'rgb(var(--color-paper-warm) / 0.5)',
                }}
              >
                <FileText size={14} strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-[0.875rem] text-ink">{f.name}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {formatSize(f.size)} · pronto per l’invio
                </span>
              </div>
              <span
                aria-hidden
                className="inline-flex items-center gap-1 rounded-[3px] border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.22em]"
                style={{
                  borderColor: 'rgb(var(--color-success) / 0.4)',
                  color: 'rgb(var(--color-success))',
                  background: 'rgb(var(--color-success) / 0.06)',
                }}
              >
                <FileCheck2 size={11} strokeWidth={1.6} />
                pronto
              </span>
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                aria-label={`Rimuovi ${f.name}`}
                className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-graphite transition-colors hover:text-ink"
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
