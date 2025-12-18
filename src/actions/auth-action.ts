'use server'

import { signIn, signOut } from '@/auth'
import { db } from '@/db/db'
import * as authRepository from '@/db/repository/auth.repository'
import * as verificationTokenRepository from '@/db/repository/verification-token.repository'
import { UserRole } from '@/generated/prisma/enums'
import {
  DEFAULT_ADMIN_LOGIN_SUCCESS_REDIRECT,
  DEFAULT_LOGIN_SUCCESS_REDIRECT,
} from '@/route'
import { LoginSchema, RegisterSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import { AuthError } from 'next-auth'
import z from 'zod'
import { ApiResponse } from './type'

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<ApiResponse> => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { success: false, message: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  try {
    const existingUser = await authRepository.getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        success: false,
        message: '이메일 또는 패스워드가 유효하지 않습니다.',
      }
    }

    if (!existingUser.emailVerified) {
      await verificationTokenRepository.generateToken(existingUser.email)

      return {
        success: true,
        message:
          '인증 이메일을 발송하였습니다.(TODO:: 이메일 인증 SMTP 설정 후 작업)',
      }
    }

    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo:
        existingUser.role === UserRole.ADMIN
          ? DEFAULT_ADMIN_LOGIN_SUCCESS_REDIRECT
          : DEFAULT_LOGIN_SUCCESS_REDIRECT,
    })
  } catch (err) {
    console.error('[auth-action.login]:', err)
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: '이메일 또는 비밀번호가 유효하지 않습니다.',
          }
        default:
          return { success: false, message: '인증 오류!!' }
      }
    }

    throw err
  }

  return { success: true, message: 'Email sent' }
}

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<ApiResponse> => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    return { success: false, message: 'Invalid fields' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await authRepository.getUserByEmail(email)

  if (existingUser) {
    return { success: false, message: 'User already exists' }
  }

  await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      // TODO:: 이메일 인증 작업 완성 후 삭제
      emailVerified: new Date(),
    },
  })

  await verificationTokenRepository.generateToken(email)

  return { success: true, message: 'comfirmation email sent' }
}

export const logout = async () => {
  await signOut()
}

export const getUserByEmail = async (email: string) => {
  return await authRepository.getUserByEmail(email)
}
