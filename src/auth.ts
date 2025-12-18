import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { db } from './db/db'
import { getUserById } from './db/repository/auth.repository'
import { LOGIN_ROUTES, UNAUTHORIZED_REDIRECT } from './route'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: LOGIN_ROUTES,
    error: UNAUTHORIZED_REDIRECT,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) {
        return false
      }

      // prevent signIn if email is not verified for credentials provider
      if (account?.provider === 'credentials') {
        const exsistingUser = await getUserById(user.id)
        if (!exsistingUser || !exsistingUser.emailVerified) {
          return false
        }

        // TODO:: Add 2FA chek login
      }

      return true
    },

    async session({ session, user, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }
        if (token.role) {
          session.user.role = token.role
        }
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub)
      if (!existingUser) {
        return token
      }

      token.role = existingUser.role
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
