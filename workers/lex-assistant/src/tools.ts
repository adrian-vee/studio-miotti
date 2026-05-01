import type Anthropic from '@anthropic-ai/sdk';

/**
 * Tool definitions per Lex.
 * Claude userà questi quando il flusso conversazionale lo richiederà.
 */

export const LEX_TOOLS: Anthropic.Tool[] = [
  {
    name: 'capture_lead',
    description:
      "Salva i dati di contatto del visitatore quando ha esplicitamente acconsentito a essere richiamato dallo studio. Da usare SOLO dopo che il visitatore ha fornito nome, email o telefono e confermato di voler ricevere il contatto.",
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nome e cognome del visitatore' },
        email: { type: 'string', description: 'Indirizzo email (opzionale se è stato fornito il telefono)' },
        phone: { type: 'string', description: 'Numero di telefono (opzionale se è stata fornita la email)' },
        area_diritto: {
          type: 'string',
          enum: [
            'diritto-civile',
            'diritto-famiglia',
            'diritto-lavoro',
            'recupero-crediti',
            'diritto-immobiliare',
            'responsabilita-civile',
            'altro',
          ],
          description: "Area di diritto coinvolta nella richiesta",
        },
        message: {
          type: 'string',
          description: "Sintesi del caso esposto dal visitatore (max 500 caratteri)",
        },
        urgency: {
          type: 'string',
          enum: ['immediate', 'days', 'weeks', 'no_urgency'],
          description: 'Urgenza percepita del caso',
        },
        qualified_score: {
          type: 'number',
          description: "Punteggio 0-100 di qualificazione del lead. Valuta: chiarezza richiesta, area trattata dallo studio, urgenza, completezza dati di contatto.",
        },
      },
      required: ['name', 'area_diritto', 'qualified_score'],
    },
  },
  {
    name: 'propose_booking',
    description:
      "Propone uno slot di 15 minuti per il primo confronto con l'Avv. Miotti. Da usare quando il visitatore esprime interesse a fissare un appuntamento. Restituisce slot disponibili dei prossimi 5 giorni lavorativi.",
    input_schema: {
      type: 'object',
      properties: {
        preferred_modality: {
          type: 'string',
          enum: ['in_studio', 'phone', 'video'],
          description: "Modalità preferita dal visitatore",
        },
        preferred_time_window: {
          type: 'string',
          enum: ['morning', 'afternoon', 'flexible'],
          description: "Finestra oraria preferita",
        },
      },
      required: ['preferred_modality'],
    },
  },
  {
    name: 'escalate_to_human',
    description:
      "Indica che il caso richiede contatto umano immediato (urgenza, complessità, situazione delicata). Da usare per: arresti/fermi, sfratti imminenti, scadenze legali sotto i 7 giorni, situazioni di violenza domestica, casi che esulano dalle aree dello studio.",
    input_schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'Motivo della escalation (max 200 caratteri)',
        },
        suggested_action: {
          type: 'string',
          enum: ['call_studio', 'call_112', 'consult_other_lawyer'],
          description: 'Azione suggerita al visitatore',
        },
      },
      required: ['reason', 'suggested_action'],
    },
  },
];
