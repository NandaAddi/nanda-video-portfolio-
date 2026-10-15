import { createClient } from '@supabase/supabase-js';

export interface PortfolioProjectRecord {
  id: string;
  category: 'editing' | 'commercial' | 'motion';
  duration: string;
  youtube_id: string;
  videos?: Array<{ title: string; youtube_id: string }>;
  thumbnail_url: string;
  tools: string[];
  sort_order: number;
  is_published: boolean;
  // English (en)
  title_en: string;
  client_en: string;
  category_label_en: string;
  role_en: string;
  description_en: string;
  full_description_en: string;
  // Indonesian (id)
  title_id: string;
  client_id: string;
  category_label_id: string;
  role_id: string;
  description_id: string;
  full_description_id: string;
  created_at?: string;
  updated_at?: string;
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const PROJECTS_TABLE = 'hello_portfolio_projects';

// Fallback dummy client if credentials aren't provided yet
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
