import tokenAddresses from '@debased/contracts/tokenAddresses.json'

export const vars = {
  alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID as string,
  goerliAlchemyId: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_ID as string,
}

// export const STADIUM_ACCESS_CARDS = '0x616e1D1b8968547bD8c7884Ac0983e6321c6Ff88'
export const GOERLI_STADIUM_ADDRESS = tokenAddresses.Stadium[5]
export const STADIUM_ADDRESS = tokenAddresses.Stadium[1]
export const GOERLI_PRIZEPOOL_ADDRESS = tokenAddresses.PrizePool[5]
// export const PRIZEPOOL_ADDRESS = tokenAddresses.PrizePool[1]
