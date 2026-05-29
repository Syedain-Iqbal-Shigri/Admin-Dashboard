import { supabase } from '../lib/supabase'

export async function getReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data
}

export async function updateReviewStatus(id, status) {
  const { data, error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteReview(id) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)
  if (error) throw error
}
