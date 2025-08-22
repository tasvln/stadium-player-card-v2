import { ENV, isDev, isPreview, isProd, SERVER_ENV } from '@/utils/env'
import { SiweMessage } from 'siwe'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest } from 'next'
import { getCsrfToken } from 'next-auth/react'
import { ethHelpers } from '../eth'

export type EthereumAccount = {
  id: string
  provider: string
  providerAccountId: string
  type: string
  address: string
  chainId: number
  username: string
  loggedInUserId?: any
}

export const authorizeWallet = async (
  credentials: Partial<Record<'message' | 'signature' | 'csrfToken', string>> | undefined,
  req?: NextApiRequest
): Promise<EthereumAccount | null> => {
  try {
    const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))
    const devUrl = isDev ? new URL('http://localhost:3000') : new URL(SERVER_ENV.NEXTAUTH_URL)
    const previewUrl = isPreview ? new URL(`https://${ENV.VERCEL_URL}`) : devUrl
    const hasNextAuthUrl = SERVER_ENV.NEXTAUTH_URL ? new URL(SERVER_ENV.NEXTAUTH_URL) : previewUrl
    const url = isProd ? new URL(SERVER_ENV.NEXTAUTH_URL) : hasNextAuthUrl

    const nonce = await getCsrfToken({ req })

    // to check if there is a user logged in
    const token = req ? await getToken({ req }) : undefined

    const result = await siwe.verify({
      signature: credentials?.signature || '',
      domain: url.host,
      nonce,
    })

    if (result.success) {
      return {
        id: siwe.address,
        provider: 'ethereum',
        providerAccountId: siwe.address,
        type: 'credentials',
        address: siwe.address,
        chainId: siwe.chainId,
        username: ethHelpers.truncateEthAddress(siwe.address),
        loggedInUserId: token?.id ?? undefined,
      }
    }
    return null
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return null
  }
}
