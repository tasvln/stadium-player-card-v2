import { NextApiRequest, NextApiResponse } from 'next'
import { AuthOptions } from 'next-auth'
import { providers } from '@/utils/auth'
import { SERVER_ENV } from '@/utils/env'
import { prisma } from '../db'

const options = (req: NextApiRequest, res: NextApiResponse): AuthOptions => ({
  providers: providers(req, res),
  session: {
    strategy: 'jwt',
  },
  secret: SERVER_ENV.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      const user = await prisma.user.findUnique({
        where: { address: token.sub },
      })
      session.address = token.sub
      session.user.address = token.sub
      session.user.image = user?.image
      session.user.id = user?.id
      return { ...session, userId: user?.id }
    },
    async jwt({ token }: { token: any }) {
      const user = await prisma.user.findUnique({
        where: { address: token.sub },
      })

      token.userId = user?.id
      token.role = user?.role
      return token
    },
  },
})

export default options
