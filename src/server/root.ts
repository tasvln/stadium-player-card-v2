import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/user'
import { cardsRouter } from './routers/cards'

/**
 * This is the primary router.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  cards: cardsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
