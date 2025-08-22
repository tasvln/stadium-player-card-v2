import { SIWESession } from 'connectkit';
import { getCsrfToken, signIn } from 'next-auth/react'
import { SiweMessage } from 'siwe'

const SIGN_IN_MESSAGE = 'Sign in to Stadium Protocol'

type SIWEConfig = {
  // Required
  getNonce: () => Promise<string>;
  createMessage: (args: { nonce: string; address: string; chainId: number }) => string;
  verifyMessage: (args: { message: string; signature: string }) => Promise<boolean>;
  getSession: () => Promise<SIWESession | null>;
  signOut: () => Promise<boolean>;
  // Optional
  enabled?: boolean; // defaults true
  nonceRefetchInterval?: number; // in milliseconds, defaults to 5 minutes
  sessionRefetchInterval?: number; // in milliseconds, defaults to 5 minutes
  signOutOnDisconnect?: boolean; // defaults true
  signOutOnAccountChange?: boolean; // defaults true
  signOutOnNetworkChange?: boolean; // defaults true
  onSignIn?: (session?: SIWESession) => void;
  onSignOut?: () => void;
};

export const siweConfig: SIWEConfig = {
  // This endpoint is polled every 5 minutes by default
  getNonce: async () => {
    const nonce = await getCsrfToken()
    if (!nonce) throw new Error('SIWE Config: No CSRF Token found.')
    return nonce
  },
  createMessage: ({ nonce, address, chainId }) => {
    const message = new SiweMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: SIGN_IN_MESSAGE,
    }).prepareMessage()

    return message
  },
  verifyMessage: async ({ message, signature }) => {
    const response = await signIn('credentials', {
      message: JSON.stringify(message),
      redirect: false,
      signature,
    })
    return response?.ok ?? false
  },
  // TODO this needs to call the next auth session server side and return the SIWE session object transformed from the next auth route.
  getSession: async () => {
    const response = await fetch('/api/auth/session')

    if (response.ok) {
      const session = await response.json()
      return session
    }
    return null
  },
  signOut: async () => {
    // https://next-auth.js.org/getting-started/client#signout
    // TODO this being disabled may have some negative side effects.
    // await signOut({ redirect: false })
    return true
  },
}
