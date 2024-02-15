
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyaGR2aGV1amV0bGJyamlsZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxOTYzMDcsImV4cCI6MjAyMTc3MjMwN30.Ap3RE19bMqHeVrDOxM97AIwyrNk0dKqOwijn2ito8nk'
const supabaseUrl ='https://lrhdvheujetlbrjileul.supabase.co'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase