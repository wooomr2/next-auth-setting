'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_SUCCESS_REDIRECT } from '@/route'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export const AuthSocial = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_SUCCESS_REDIRECT,
    })
  }

  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button
        size="lg"
        className="flex-1"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle size={20} />
      </Button>

      <Button
        size="lg"
        className="flex-1"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <FaGithub size={20} />
      </Button>
    </div>
  )
}
