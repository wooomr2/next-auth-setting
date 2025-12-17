'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthCardHeader as Header } from './auth-card-header'
import { AuthSocial } from './auth-social'
import { BackButton } from './back-button'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel?: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const AuthCardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-100 shadow-md">
      <CardHeader>
        <Header label={headerLabel || ''} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <AuthSocial />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
