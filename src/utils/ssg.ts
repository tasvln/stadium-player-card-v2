import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson'
import { appRouter } from '@/server/root'
import { createInnerTRPCContext } from '@/server/trpc'

export const ssg = createServerSideHelpers({
  router: appRouter,
  ctx: createInnerTRPCContext({ session: null, player: null }),
  transformer: superjson,
})
