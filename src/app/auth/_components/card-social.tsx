'use client'

import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export const CardSocial = () => {
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button size="lg" className="flex-1" variant="outline" onClick={() => {}}>
        <FcGoogle size={20} />
      </Button>

      <Button size="lg" className="flex-1" variant="outline" onClick={() => {}}>
        <FaGithub size={20} />
      </Button>
    </div>
  )
}
