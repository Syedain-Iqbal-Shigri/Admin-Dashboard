import { supabase } from '../lib/supabase'

export async function getPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}

export async function createPackage(pkg) {
  const { data, error } = await supabase
    .from('packages')
    .insert(pkg)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePackage(id, updates) {
  const { data, error } = await supabase
    .from('packages')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePackage(id) {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id)
  if (error) throw error
}
