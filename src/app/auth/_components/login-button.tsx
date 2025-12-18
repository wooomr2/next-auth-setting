'use client'

import { LOGIN_ROUTES } from '@/route'
import { useRouter } from 'next/navigation'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(LOGIN_ROUTES)
  }

  if (mode === 'modal') {
    return (
      <span className="text-blue-500 underline cursor-pointer">TODO::</span>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
