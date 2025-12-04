'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BackButton } from './back-button'
import { CardHeader as Header } from './card-header'
import { CardSocial } from './card-social'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel?: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel || ''} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <CardSocial />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
