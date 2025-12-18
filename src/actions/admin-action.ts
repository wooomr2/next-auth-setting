'use server'

import { UserRole } from '@/generated/prisma/enums'
import { currentRole } from './auth-action'

export const adminAction = async () => {
  const role = await currentRole()
  if (role !== UserRole.ADMIN) {
    return { success: false, message: 'Forbidden' }
  }
   return { success: true, message: 'Success' }
}
