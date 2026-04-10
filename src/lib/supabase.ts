import { createClient } from '@supabase/supabase-js';

// PRODUCTION FALLBACK (CRITICAL: Fixed typo vge -> vhge)
const PROD_URL = 'https://vhgeajunebshovovonntr.supabase.co';
const PROD_ANON_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay1kNThjMmRjOWExNjg0ZTliOTYyNjAzMmNkNGU4YTVhYiJ9.eyJpc3MiOiJodHRwczovL29pZGMuc3VwYWJhc2UuY29tL3ZoSFAzUDRqZ081N254bm50cl9wcm9qZWN0Iiwic3ViIjoicHJvamVjdDp2SFAzUDRqZ081N254bm50ciIsImF1ZCI6Imh0dHBzOi8vdkhQM1A0amdPNTdueG5udHIuc3VwYWJhc2UuY29tLyIsImV4cCI6MTc3NTgxNTQwNn0.V9X_7b_9_X-Y-Z-A...'; // Note: Only if ENV is missing

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || PROD_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; 

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Using production fallback for URL.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
