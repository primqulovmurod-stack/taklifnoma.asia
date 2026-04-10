import { createClient } from '@supabase/supabase-js';

const PROD_URL = 'https://vhgeajunebshovovonntr.supabase.co';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || PROD_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('MISSING SUPABASE ENV VARS - Using production fallback for URL');
}

export const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null as any;
