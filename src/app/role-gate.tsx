'use client'

import { FormError } from '@/app/auth/_components/form-error'
import { UserRole } from '@/generated/prisma/enums'
import { useCurrentRole } from '@/hooks/use-current-role'
import { useSession } from 'next-auth/react'

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const { status } = useSession()
  const role = useCurrentRole()

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (status === 'loading') {
    return null
  }

  if (!role || !allowedRoles.includes(role)) {
    return <FormError message="접근 권한이 없습니다" />
  }

  return <>{children}</>
}
