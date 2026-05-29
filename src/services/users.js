import { supabase } from '../lib/supabase'

export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}

export async function updateUser(id, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteUser(id) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
  if (error) throw error
}
