import { PlayerCard, UserRole } from '@prisma/client'
import { DefaultJWT } from 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { AuthOptions as DefaultAuthOptions } from 'next-auth'

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    id: string
    role: UserRole
    address: string | `0x${string}` | null
    username: string | null
    playerCard: Pick<Partial<PlayerCard>, 'icon' | 'background'> | null
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      id: string
      email?: string | null
      address: string | `0x${string}` | null
      username: string | null
      role: string
      playerCard: Pick<Partial<PlayerCard>, 'icon' | 'background'> | null
    }
  }

  type AuthUser = {
    address?: string
    email?: string
    loggedInUserId?: string
    provider: string
    id: string
    username: string
    emailVerified?: Date | null
  }

  type StadiumUserToken = {
    id: string
    username: string | null
    role: UserRole
    email: string | null
    address: string | null
    playerCard: Pick<Partial<PlayerCard>, 'icon' | 'background'> | null
  }
}

declare module 'next-auth/core/types' {
  interface JWTCallback {
    token: JWT
    user?: AuthUser | undefined
    account?: Account | null | undefined
    profile?: Profile | undefined
    trigger?: string | undefined
    session?: { username?: string }
  }

  interface AuthOptions extends Omit<DefaultAuthOptions, 'jwt' | 'adapter'> {
    jwt: (params: JWTCallback) => Promise<JWT>
    // TODO: handle this with the dummy adapter
    adapter: Adapter
  }
}
