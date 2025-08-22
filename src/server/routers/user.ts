import { TRPCError } from '@trpc/server'

import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure 
} from '../trpc'
import { z } from 'zod'
import { ENV } from '@/utils/env'
import axios, { AxiosResponse } from 'axios'

const regex = new RegExp(/^[a-zA-Z0-9]*$/)

export const userRouter = createTRPCRouter({
  one: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: { id: input.id },
    })
  }),
})