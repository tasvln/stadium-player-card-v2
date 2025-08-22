import { VisibilityType } from "@prisma/client";
import { Game, Team, TeamPlayer, TeamRoster, User } from '@prisma/client'

export interface SiteAdminDashboardData {
  events: { id: string; name: string; slug: string }[]
  games: { id: string; name: string; teamSize: number }[]
  admins: { id: string; address: string; displayName?: string }[]
  leagues: { id: string; name: string; slug: string }[]
}

export interface PlayerCard {
  name: string
  title: string
  address: string
  chainId: number
  color: string
  frame: string
  background: string
  icon: string
  ipfsHash: string
  createdOn: Date
  updatedOn: Date
  id: number
  description: string | null
  location: string | null
  visibility: VisibilityType
}

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}

export type TeamData = Team & {
  rosters: (TeamRoster & { team: Team; game: Game; teamPlayers: { user: User }[] })[]
}

export type UserData = {
  playerCard: PlayerCard
  user?:
    | (User & {
        teams: (TeamPlayer & {
          team: TeamData
        })[]
        ownedTeams: TeamData[]
      })
    | null
  teams: TeamData[]
}

export type Earnings = {
  total: number
  symbol: string
  eventsWon: number
  eventsPlayed: number
  achievements: number
  stadiumPoints: number
} | null

