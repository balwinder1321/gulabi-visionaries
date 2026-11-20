import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize Supabase if a valid, active Supabase project is provided
const isConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_URL.startsWith('https://') &&
  !SUPABASE_URL.includes('fmeejunrt') && // Filter out dead test project
  SUPABASE_ANON_KEY
);

export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
