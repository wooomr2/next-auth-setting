import { Button } from '@/components/ui/button'
import { LoginButton } from './auth/_components/login-button'

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <LoginButton>
        <Button size="lg">로그인</Button>
      </LoginButton>
    </main>
  )
}
