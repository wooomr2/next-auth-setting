'use client'

import { FormError } from '@/app/auth/_components/form-error'
import { UserRole } from '@/generated/prisma/enums'
import { useCurrentRole } from '@/hooks/use-current-role'

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole()

  if (!role || !allowedRoles.includes(role)) {
    return <FormError message="접근 권한이 없습니다" />
  }

  return <>{children}</>
}
