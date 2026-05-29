import { supabase } from '../lib/supabase'

export async function getMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data
}

export async function updateMessageStatus(id, status) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteMessage(id) {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)
  if (error) throw error
}
