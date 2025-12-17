'use server'

import { signIn } from '@/auth'
import { db } from '@/db/db'
import * as authRepository from '@/db/repository/auth.repository'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { LoginSchema, RegisterSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import { AuthError } from 'next-auth'
import z from 'zod'

type ApiRsponse<T = void> = {
  success: boolean
  message?: string
  data?: T
}

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<ApiRsponse> => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { success: false, message: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
): Promise<ApiRsponse> => {
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
    },
  })

  // TODO:: Send verification token email

  return { success: true, message: 'User created successfully' }
}

export const getUserByEmail = async (email: string) => {
  return await authRepository.getUserByEmail(email)
}
