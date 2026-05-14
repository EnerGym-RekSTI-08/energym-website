import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://hzxjzksqxrosgnpernih.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_BZx1BlGXxLPANelKyVE9cg__fsS9f8f'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)