import { createClient } from '@supabase/supabase-js';

// Developer Note: These environment variables will be stored securely in a '.env.local' file.
// They are required to authenticate your specific project with the Supabase API.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// The 'supabase' client is the single object you'll use for ALL auth and database operations.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
