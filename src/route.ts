/**
 * 인증 없이 접근 가능한 공개 경로
 */
export const PUBLIC_ROUTES = ['/']

export const LOGIN_ROUTES = '/auth/login'

/**
 * 인증 관련 경로 (로그인한 사용자는 리다이렉트)
 */
export const AUTH_ROUTES = [LOGIN_ROUTES, '/auth/register', '/auth/error']

/**
 * API 인증 경로 prefix (항상 허용)
 */
export const API_AUTH_PREFIX = '/api/auth'

/**
 * ADMIN 권한이 필요한 경로
 */
export const ADMIN_ROUTES_PREFIX = ['/admin', '/api/admin']

/**
 * 로그인 성공 시 기본 리다이렉트 경로
 */
export const DEFAULT_ADMIN_LOGIN_SUCCESS_REDIRECT = '/admin'

/**
 * 로그인 성공 시 기본 리다이렉트 경로
 */
export const DEFAULT_LOGIN_SUCCESS_REDIRECT = '/settings'

/**
 * 권한 부족 시 리다이렉트 경로
 */
export const UNAUTHORIZED_REDIRECT = '/auth/error?error=AccessDenied'
