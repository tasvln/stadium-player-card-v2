import { signOut, useSession, signIn } from 'next-auth/react'
import { useAccount } from 'wagmi'

export const useAuth = () => {
  const { data: session } = useSession()
  const wallet = useAccount()

  return { session, wallet, signIn, signOut }
}
