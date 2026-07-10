// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// ВАЖНО: Используйте SERVICE_ROLE_KEY, чтобы сервер мог грузить файлы без ограничений
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 

export const supabase = createClient(supabaseUrl, supabaseKey);