import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nljqbvqvrbmcxhmxuqqt.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sanFidnF2cmJtY3hobXh1cXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEyNzk5OTUsImV4cCI6MTk3Njg1NTk5NX0.4Zx_4WLqO9mL8b48rJdQUfCdRQV_1uQ9O_bWkilv5bw"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);