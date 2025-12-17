'use client'

import { useCurrentUser } from '@/hooks/use-currnet-user'

const SettingsPage = () => {
  const session = useCurrentUser()

  return (
    <div className="bg-white p-10 rounded-xl">{JSON.stringify(session)}</div>
  )
}

export default SettingsPage
