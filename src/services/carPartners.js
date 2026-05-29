import { supabase } from '../lib/supabase'

export async function getCarPartners() {
  const { data, error } = await supabase
    .from('car_partners')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}

export async function createCarPartner(partner) {
  const { data, error } = await supabase
    .from('car_partners')
    .insert(partner)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateCarPartner(id, updates) {
  const { data, error } = await supabase
    .from('car_partners')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCarPartner(id) {
  const { error } = await supabase
    .from('car_partners')
    .delete()
    .eq('id', id)
  if (error) throw error
}
