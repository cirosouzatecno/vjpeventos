import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export function requireSupabase() {
  if (!supabase) throw new Error('A conexão com o Supabase ainda não foi configurada neste ambiente.')
  return supabase
}

export async function isAdmin() {
  if (!supabase) return false
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  return Boolean(data)
}

export function youtubeEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?controls=1&rel=0&modestbranding=1&playsinline=1`
}

export function youtubeThumbnail(id) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
}
