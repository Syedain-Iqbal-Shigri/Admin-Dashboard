import { supabase } from '../lib/supabase'

export async function getCars() {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('brand')
  if (error) throw error
  return data
}

export async function createCar(car) {
  const { data, error } = await supabase
    .from('cars')
    .insert(car)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateCar(id, updates) {
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCar(id) {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id)
  if (error) throw error
}
