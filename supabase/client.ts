import { createClient } from '@supabase/supabase-js'

export function createSuperClient(){
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,  process.env.NEXT_PUBLIC_SUPABASE_ANON!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    return supabase;
  }
  