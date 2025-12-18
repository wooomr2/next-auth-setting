import { requireAdmin } from '@/lib/auth-guard'
import { FormSuccess } from '@/app/auth/_components/form-success'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AdminTestButtons } from './_components/admin-test-buttons'

export default async function AdminHomepPage() {
  const user = await requireAdmin()

  return (
    <Card className="w-150">
      <CardHeader className="text-center">
        <p>Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormSuccess
          message={`관리자 페이지에 오신 것을 환영합니다, ${user.name}님!`}
        />
        <AdminTestButtons />
      </CardContent>
    </Card>
  )
}
