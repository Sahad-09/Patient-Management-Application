import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path starts with /patients
  const isPatientPath = path.startsWith('/patients')

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // Redirect logic
  if (!token && isPatientPath) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/patients', '/patients/:path*']
}