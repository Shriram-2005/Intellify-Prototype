import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Protected Routes
  if (!user && (path.startsWith('/dashboard') || path.startsWith('/practice') || (path.startsWith('/admin') && path !== '/admin/login'))) {
    const url = request.nextUrl.clone()
    if (path.startsWith('/admin')) {
      url.pathname = '/admin/login'
    } else {
      url.pathname = '/auth/login'
    }
    return NextResponse.redirect(url)
  }

  // Admin Route Protection
  if (user && path.startsWith('/admin') && path !== '/admin/login') {
    // Check if user is an admin by querying the profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // Prevent logged in users from visiting login page
  if (user && (path.startsWith('/auth/login') || path.startsWith('/auth/signup') || path === '/admin/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
