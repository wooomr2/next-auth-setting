import { UserRole } from '@/generated/prisma/enums'
import { DefaultSession } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }

  interface User {
    role?: ROLE
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role?: UserRole
  }
}
