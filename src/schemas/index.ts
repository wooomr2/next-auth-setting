import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.email({ error: '올바른 이메일 주소를 입력해주세요.' }),
  password: z.string().min(1, { error: '비밀번호를 입력하세요' }),
})

export const RegisterSchema = z.object({
  email: z.email({ error: '올바른 이메일 주소를 입력해주세요.' }),
  password: z
    .string()
    .min(6, { error: '비밀번호는 최소 6자 이상이어야 합니다.' }),
  name: z.string().min(1, { error: '이름을 입력하세요' }),
})
