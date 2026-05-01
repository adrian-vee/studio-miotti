/**
 * Tipi del database Supabase.
 *
 * Rigenerare con:
 *   pnpm supabase:types
 *
 * Quando le migration sql saranno applicate, questo file verrà sovrascritto
 * automaticamente da `supabase gen types typescript`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          source: 'form_contact' | 'lex_assistant' | 'newsletter' | 'lead_magnet';
          name: string | null;
          email: string | null;
          phone: string | null;
          area_diritto: string | null;
          message: string | null;
          qualified_score: number;
          status: 'new' | 'contacted' | 'converted' | 'lost';
          gdpr_consent: boolean;
          gdpr_consent_at: string | null;
          marketing_consent: boolean;
          ip_hash: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
        };
        Insert: Partial<Database['public']['Tables']['leads']['Row']> & {
          source: Database['public']['Tables']['leads']['Row']['source'];
          gdpr_consent: boolean;
        };
        Update: Partial<Database['public']['Tables']['leads']['Row']>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          lead_id: string | null;
          created_at: string;
          scheduled_at: string;
          duration_min: number;
          type: 'first_consult_free' | 'consult_paid' | 'followup' | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
          notes: string | null;
          meet_url: string | null;
        };
        Insert: Partial<Database['public']['Tables']['bookings']['Row']> & {
          scheduled_at: string;
        };
        Update: Partial<Database['public']['Tables']['bookings']['Row']>;
        Relationships: [
          {
            foreignKeyName: 'bookings_lead_id_fkey';
            columns: ['lead_id'];
            isOneToOne: false;
            referencedRelation: 'leads';
            referencedColumns: ['id'];
          },
        ];
      };
      subscribers: {
        Row: {
          email: string;
          created_at: string;
          confirmed: boolean;
          confirmed_at: string | null;
          unsubscribed: boolean;
          unsubscribed_at: string | null;
          tags: string[];
        };
        Insert: Partial<Database['public']['Tables']['subscribers']['Row']> & {
          email: string;
        };
        Update: Partial<Database['public']['Tables']['subscribers']['Row']>;
        Relationships: [];
      };
      downloads: {
        Row: {
          id: string;
          email: string;
          guide_slug: string;
          downloaded_at: string;
        };
        Insert: Partial<Database['public']['Tables']['downloads']['Row']> & {
          email: string;
          guide_slug: string;
        };
        Update: Partial<Database['public']['Tables']['downloads']['Row']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
