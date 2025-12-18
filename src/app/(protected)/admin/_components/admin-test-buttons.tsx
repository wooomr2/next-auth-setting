'use client'

import { adminAction } from '@/actions/admin-action'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function AdminTestButtons() {
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
    <>
      <Button onClick={onApiRouteClick} className="w-full">
        Admin-only API Test
      </Button>
      <Button onClick={onServerActionClick} className="w-full">
        Admin-only ServerAction Test
      </Button>
    </>
  )
}
