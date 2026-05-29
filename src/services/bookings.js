import { supabase } from '../lib/supabase'

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data
}

export async function updateBooking(id, updates) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteBooking(id) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id)
  if (error) throw error
}
