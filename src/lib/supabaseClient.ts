import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xndcgcpibqzlpvykbvvr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZGNnY3BpYnF6bHB2eWtidnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNTU2NjMsImV4cCI6MjAxNzkzMTY2M30.Yw8wGakjdXZAx1fr_p1UT1PzXGwYykjFbe_j_b1fi5s')

export default supabase