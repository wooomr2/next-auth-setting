import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.email({ error: '올바른 이메일 주소를 입력해주세요.' }),
  password: z
    .string()
    .min(8, { error: '비밀번호는 최소 8자 이상이어야 합니다.' }),
})
