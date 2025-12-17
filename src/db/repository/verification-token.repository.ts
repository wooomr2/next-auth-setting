import { v4 as uuidv4 } from 'uuid'
import { db } from '../db'

// export const getVerificationTokenByToken = async (token: string) => {
//   try {
//     const verificationToken = await db.verificationToken.findUnique({
//       where: { token: token },
//     })

//     return verificationToken
//   } catch {
//     return null
//   }
// }

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email: email },
    })

    return verificationToken
  } catch {
    return null
  }
}

export const generateToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // 15 minutes from now
  // TODO:: timezone issue
  console.log(expires)
  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } })
  }

  const newToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return newToken
}
