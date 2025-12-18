import { auth } from '@/auth'
import { UserRole } from '@/generated/prisma/enums'
import {
  ADMIN_ROUTES_PREFIX,
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_SUCCESS_REDIRECT,
  LOGIN_ROUTES,
  PUBLIC_ROUTES,
  UNAUTHORIZED_REDIRECT,
} from '@/route'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAdminRoute = ADMIN_ROUTES_PREFIX.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  console.log('========================================')
  console.log('[Middleware.proxy] Path:', nextUrl.pathname)
  console.log('[Middleware.proxy] Logged In:', isLoggedIn)
  console.log('[Middleware.proxy] userId:', req.auth?.user?.id)
  console.log('[Middleware.proxy] Role:', userRole)
  console.log('[Middleware.proxy] Admin Route:', isAdminRoute)
  console.log('========================================')

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_SUCCESS_REDIRECT, nextUrl)
      )
    }
    return NextResponse.next()
  }

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN_ROUTES, nextUrl))
  }

  if (isAdminRoute) {
    if (userRole !== UserRole.ADMIN) {
      console.log('[Middleware.proxy] Access Denied: Not an admin')
      return NextResponse.redirect(new URL(UNAUTHORIZED_REDIRECT, nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
