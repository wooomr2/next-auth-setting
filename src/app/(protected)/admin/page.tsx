'use client'

import { adminAction } from '@/actions/admin-action'
import { FormSuccess } from '@/app/auth/_components/form-success'
import { RoleGate } from '@/app/role-gate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserRole } from '@/generated/prisma/enums'
import { toast } from 'sonner'

export default function AdminHomepPage() {
  const onServerActionClick = () => {
    adminAction().then((res) => {
      if (res?.success) {
        toast.success('서버 액션 성공')
      } else {
        toast.error('서버 액션 실패')
      }
    })
  }

  const onApiRouteClick = () => {
    fetch('/api/admin').then((res) => {
      if (res.ok) {
        toast.success('API 요청 성공')
      } else {
        toast.error('API 요청 실패')
      }
    })
  }

  return (
    <Card className="w-150">
      <CardHeader className="text-center">
        <p>Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={[UserRole.ADMIN]}>
          <FormSuccess message="관리자 페이지에 오신 것을 환영합니다!" />
        </RoleGate>
        <Button onClick={onApiRouteClick}>Admin-only API Test</Button>
        <Button onClick={onServerActionClick}>
          Admin-only ServerAction Test
        </Button>
      </CardContent>
    </Card>
  )
}
