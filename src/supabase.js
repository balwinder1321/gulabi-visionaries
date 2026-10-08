import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://fmeejunrtqjrkwvqvmfz.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ViNu7oc4BX3qq95Max9bmA_MeH_QOX-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
