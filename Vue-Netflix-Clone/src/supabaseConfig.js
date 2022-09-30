import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://maibsiymodtnkvrzhgst.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haWJzaXltb2R0bmt2cnpoZ3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1MzI1MTMsImV4cCI6MTk4MDEwODUxM30.z221LolPH7AVf_vuaj12Zvv1a-2kvPGl8kgpm9ShVvg"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);