import { supabase } from '../lib/supabase'

export async function getHotelPartners() {
  const { data, error } = await supabase
    .from('hotel_partners')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}

export async function createHotelPartner(partner) {
  const { data, error } = await supabase
    .from('hotel_partners')
    .insert(partner)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateHotelPartner(id, updates) {
  const { data, error } = await supabase
    .from('hotel_partners')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteHotelPartner(id) {
  const { error } = await supabase
    .from('hotel_partners')
    .delete()
    .eq('id', id)
  if (error) throw error
}
