import { db } from '../db'

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  })
}
