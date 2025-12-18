'use client'

import { UserButton } from '@/app/(protected)/_components/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href={'/settings'}>settings</Link>
        </Button>

        <Button asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
          <Link href={'/admin'}>admin</Link>
        </Button>
        <UserButton />
      </div>
    </nav>
  )
}
