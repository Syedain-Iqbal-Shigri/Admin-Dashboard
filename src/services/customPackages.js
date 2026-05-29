import { supabase } from '../lib/supabase'

export async function getCustomPackageRequests() {
  const { data, error } = await supabase
    .from('custom_package_requests')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data
}

export async function updateRequestStatus(id, status) {
  const { data, error } = await supabase
    .from('custom_package_requests')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteRequest(id) {
  const { error } = await supabase
    .from('custom_package_requests')
    .delete()
    .eq('id', id)
  if (error) throw error
}
