import { Session, getServerSession, type StadiumUserToken } from 'next-auth'
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from '@prisma/client'
import helpers from '@/utils/helpers'
import { options } from '@/utils/auth'
import { PlayerCard } from '@/utils/types/common'

type UpdateUserArgs = Prisma.UserUpdateInput

/**
 *
 * @param user Accepts user object from data base
 * @description Returns a user object with only the fields that are needed for the session
 * @returns StadiumUserToken object id, email, address, role, username
 */
export const getStadiumUser = (user: StadiumUserToken): StadiumUserToken => ({
  id: user.id,
  email: user.email,
  address: user.address,
  role: user.role,
  username: user.username,
  playerCard: user.playerCard,
})

/**
 * @param user User object
 * @description Returns a user identifier based on the user object passed in
 * @returns { email: string } | { address: string } | { id: string }
 */
export const getUserIdentifier = (
  user: Pick<UpdateUserArgs, 'email' | 'address' | 'id'>
): { email: string } | { address: string } | { id: string } => {
  if (user?.id) {
    return { id: user.id as string }
  }

  if (user?.address) {
    const address = ethers.utils.isAddress(user.address as string) ? user.address : undefined
    if (!address) throw new Error('Invalid Ethereum address')
    return { address: user.address as string }
  }

  if (!user?.email) throw new Error('No account identifier found')

  return { email: user.email as string }
}

/**
 *
 * @param ctx NextApiRequest, NextApiResponse
 * @returns { session: Session | null, card: PlayerCard | null }
 */

export const getPlayerCard = async (ctx: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<{
  session: Session | null
  card: PlayerCard | null
}> => {
  const { req, res } = ctx
  // get current server session
  if (!req || !res) throw new Error('Request and response objects are required')
  const session = await getServerSession(req, res, options(req, res))
  // return if no session
  if (!session) return { session: null, card: null }
  // return if no user address
  if (!session.user.address) return { session, card: null }
  // get playercard from API
  const card = await helpers.playerCard.fetchPlayerCard(session.user.address)
  // add session and player card to context
  return { session, card }
}
