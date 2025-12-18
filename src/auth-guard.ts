import { auth } from '@/auth'
import { UserRole } from '@/generated/prisma/enums'
import { LOGIN_ROUTES, UNAUTHORIZED_REDIRECT } from '@/route'
import { redirect } from 'next/navigation'

/**
 * 현재 로그인한 사용자 정보를 가져옵니다.
 * @throws 로그인하지 않은 경우 로그인 페이지로 리다이렉트
 */
export async function getCurrentUser() {
  const session = await auth()
  if (!session?.user) {
    redirect(LOGIN_ROUTES)
  }
  return session.user
}

/**
 * 현재 사용자가 특정 역할인지 확인합니다.
 */
export async function hasRole(role: UserRole): Promise<boolean> {
  const session = await auth()
  return session?.user?.role === role
}

/**
 * ADMIN 권한이 있는지 확인합니다.
 * @throws ADMIN이 아닌 경우 에러 페이지로 리다이렉트
 */
export async function requireAdmin() {
  const session = await requireAuth()

  if (session.user.role !== UserRole.ADMIN) {
    redirect(UNAUTHORIZED_REDIRECT)
  }
  return session.user
}

/**
 * 특정 역할을 요구합니다.
 * @throws 해당 역할이 아닌 경우 에러 페이지로 리다이렉트
 */
export async function requireRole(roles: UserRole[]) {
  const session = await requireAuth()

  if (!roles.includes(session.user.role)) {
    redirect(UNAUTHORIZED_REDIRECT)
  }
  return session.user
}

/**
 * 인증된 사용자인지만 확인합니다.
 * @throws 로그인하지 않은 경우 로그인 페이지로 리다이렉트
 * @return session
 */
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect(LOGIN_ROUTES)
  }
  return session
}
