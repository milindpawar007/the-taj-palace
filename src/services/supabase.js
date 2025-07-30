import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseUrl='https://sedibfbnbjjwgloufiwn.supabase.co'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

