'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: (formData.get('email') as string).trim(),
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  if (authData.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single()

    if (profile && profile.role === 'admin') {
      await supabase.auth.signOut()
      redirect(`/auth/login?error=${encodeURIComponent("Admins are not allowed in the student portal. Please use your specific portal.")}`)
    }
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function adminLogin(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: (formData.get('email') as string).trim(),
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`)
  }

  // Verify if the user is actually an admin
  if (authData.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      await supabase.auth.signOut()
      redirect(`/admin/login?error=${encodeURIComponent("Unauthorized: Admin access required.")}`)
    }
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: (formData.get('email') as string).trim(),
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
  }

  // Create the corresponding profile in the database
  if (authData.user) {
    const fullName = formData.get('name') as string || '';
    await supabase.from('profiles').insert({
      id: authData.user.id,
      email: data.email,
      full_name: fullName,
      role: 'user'
    });
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
