import { supabase } from '../lib/supabase'

export async function getHotels() {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}

export async function createHotel(hotel) {
  const { data, error } = await supabase
    .from('hotels')
    .insert(hotel)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateHotel(id, updates) {
  const { data, error } = await supabase
    .from('hotels')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteHotel(id) {
  const { error } = await supabase
    .from('hotels')
    .delete()
    .eq('id', id)
  if (error) throw error
}
