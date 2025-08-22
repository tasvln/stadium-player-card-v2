import { TRPCError } from '@trpc/server'

import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure 
} from '../trpc'
import { z } from 'zod'
import { ENV } from '@/utils/env'
import axios, { AxiosResponse } from 'axios'

import helpers from '@/utils/helpers'
import { Earnings, PlayerCard, TeamData, UserData } from '@/utils/types/common'
import { prismaHelpers } from '@/utils/helpers/prisma'
import { isAddress } from 'viem'
import { Prisma } from '@prisma/client'
import { fetchPlayerCard } from '@/utils/helpers/playerCard'

const { includes } = prismaHelpers

const { attachUserDataToPlayerCard } = helpers.playerCard

export const cardsRouter = createTRPCRouter({
  players: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.string().nullish(),
        filters: z
          .object({
            name: z.string().optional(),
            gameId: z.string().optional(),
            teamId: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { name, gameId, teamId } = input.filters || {}
      const queryString =
        name || gameId || teamId
          ? `${name ? `&name=${name}` : ''}${gameId ? `&gameId=${gameId}` : ''}${teamId ? `&teamId=${teamId}` : ''}`
          : ''

      const { data }: { data: { players: PlayerCard[]; nextCursor: string } } = await axios.get(
        `${ENV.BACKEND_API}/api/v1/players?limit=${input.limit}${queryString}${
          input.cursor ? `&cursor=${input.cursor}` : ''
        }`
      )

      const playerData = await attachUserDataToPlayerCard(data.players, ctx.prisma)

      return {
        players: playerData as UserData[],
        nextCursor: data.nextCursor,
      }
    }),
  card: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const checkAddress = isAddress(input)
    let address = checkAddress ? input : undefined
    let id = !checkAddress ? input : undefined

    let userIdentifier: Prisma.UserWhereInput | undefined = undefined

    if (id) {
      userIdentifier = { id }
    }

    if (address) {
      userIdentifier = { address: { equals: address, mode: 'insensitive' } }
    }

    if (!userIdentifier) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid input' })

    let playerUser = await ctx.prisma.user.findFirst({
      where: userIdentifier,
      include: {
        ...includes.user.data.include,
        profile: true,
        accounts: true,
      },
    })

    let playerCard: PlayerCard | undefined = undefined

    if (!address && playerUser?.address) {
      address = playerUser.address as `0x${string}`
    }

    const validatePlayerCard = (card: Partial<PlayerCard>): PlayerCard | undefined => {
      type RequiredKeys<T> = {
        [K in keyof T]: T extends Record<K, T[K]> ? K : never
      }[keyof T]

      const requiredKeys: RequiredKeys<PlayerCard>[] = ['id', 'address', 'background', 'frame']

      if (requiredKeys.every((key) => key && key in card)) {
        return card as PlayerCard
      }

      return undefined
    }

    if (address) {
      const fetchedPlayerCard = await fetchPlayerCard(address)
      playerCard = fetchedPlayerCard ? validatePlayerCard(fetchedPlayerCard) : undefined
    }

    if (!playerUser && playerCard) {
      playerUser = await ctx.prisma.user.create({
        data: {
          address: address as string,
          chainId: ENV.CHAIN,
          playerCard: {
            create: {
              ...playerCard,
            },
          },
        },
        include: {
          ...includes.user.data.include,
          profile: true,
          accounts: true,
        },
      })
    }

    if (!playerUser) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    if (!id) id = playerUser.id
    return { playerCard, user: playerUser }
  }),
})