import type { NextApiRequest, NextApiResponse } from 'next'
import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authorizeWallet } from './wallet'

const providers = (req: NextApiRequest, _res: NextApiResponse): Provider[] => [
  CredentialsProvider({
    name: 'Ethereum',
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'Signature',
        type: 'text',
        placeholder: '0x0',
      },
    },
    authorize: async (credentials: Record<'message' | 'signature', string> | undefined) =>
      await authorizeWallet(credentials, req),
  }),
]

export default providers