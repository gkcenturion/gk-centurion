import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pypmuqgplowqbhcrrouo.supabase.co';
const supabaseAnonKey = 'sb_publishable_WibYvzkc0uXnN1tvFlLJIQ_Tx2mAtVm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);




