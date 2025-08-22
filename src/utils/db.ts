import { SERVER_ENV, isDev } from '../utils/env'
import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type
// @ts-ignore
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: SERVER_ENV.DATABASE_URL,
      },
    },
  })

if (isDev) global.prisma = prisma
