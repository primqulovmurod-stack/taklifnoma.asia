import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vgeajunebshovovonntr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZWFqdW5lYnNob3Zovm9ubm50ciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA5NjQ3ODM3LCJleHAiOjIwMjUyMjM4Mzd9.0R6tG27Y_K6X1X-_8h6d6g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
