import { Dispute, Match, Registrant, Event, User, Team, EventFormat, League, Game } from '@prisma/client'

export type EventRegistrantFromQuery = Omit<Registrant, 'eventRosterId'> & {
  player: Partial<Pick<User, 'id' | 'username' | 'address'>> | null
  roster: {
    id: string
    team: Partial<Pick<Team, 'id' | 'name' | 'ownerId'>>
    teamPlayers: {
      playerId: string | null
    }[]
  } | null
  matchAsPlayerOne?: MatchScoringData[]
  matchAsPlayerTwo?: MatchScoringData[]
}

type BaseRegistrant = {
  id: string
  checkedIn: boolean
  seed: number | null
  name: string
  registeredAt: Date
  matches?: MatchScoringData[]
}

type TeamRegistrant = BaseRegistrant & {
  type: 'team'
  teamId: string
  rosterId: string
  ownerId: string
  playerId?: never
  players: {
    id: string
  }[]
}

type PlayerRegistrant = BaseRegistrant & {
  type: 'player'
  playerId: string
  rosterId?: never
}

export type EventRegistrant = TeamRegistrant | PlayerRegistrant

export type EventParams = Event & {
  league: Pick<League, 'name' | 'slug'> | null
  game: Pick<Game, 'name' | 'teamSize'>
  type: 'player' | 'team'
  registrants: EventRegistrant[]
  standings?: Partial<Standing>[] | null
}

export type MatchIds = Pick<Match, 'playerOneId' | 'playerTwoId'>
export type MatchScoring = Pick<Match, 'playerOneScore' | 'playerTwoScore' | 'winner'>
export type MatchScoringData = MatchIds & MatchScoring

export type NewMatch = Omit<Match, 'playerOneScore' | 'playerTwoScore' | 'winner' | 'underReview' | 'autoAdvance'>

export interface NewGroup extends NewMatch {
  groupNumber: number
}

export type ByeRound = {
  matchNumber: string
  playerId: string
}

export interface EventWithRegistrants extends Event {
  registrants: Registrant[]
}

export type NewGroups = Array<EventRegistrant[]>

export type MatchSetup = Array<[string, string]>

export type EventViews = 'winnersBracket' | 'participants' | 'losersBracket' | 'leaderboard' | 'info'

export type BracketScrollDirections = 'next' | 'prev'

export interface MatchNode {
  node: HTMLDivElement
  round: number
}

export type PlayerName = Pick<User, 'username'>

export type DisputeWithMessages = Dispute & {
  match: {
    matchNumber: string
  }
  reportedBy: { id: string; username: string | null }
  messages: {
    createdBy: { id: string; username: string | null } & { role: string }
    createdAt: Date
    createdById: string
    message: string
  }[]
}

export type NewCreatedMatch = Omit<Match, 'id' | 'underReview' | 'playerOneScore' | 'playerTwoScore' | 'autoAdvance'>
export type NewMatchBeforeMatchNumber = Omit<NewCreatedMatch, 'winnerNextMatch' | 'loserNextMatch' | 'matchNumber'>
export type EmptyMatch = Omit<NewCreatedMatch, 'winner' | 'autoAdvance'>

export type SeedsSplit = {
  seededPlayers: EventRegistrant[]
  unseededPlayers: EventRegistrant[]
}

export type EventWithGame = Event & {
  game: {
    id: string
    name: string
  }
}

export type PlayerInfo = Pick<User, 'id' | 'username'>
type MatchPlayer = { player: PlayerInfo | null } | null

export type PlayerWithRecords = {
  record: { wins: number; losses: number }
  placement: number
  playerId: string
  player?: PlayerInfo | null
}

export type PlacementsData = Match & {
  playerOne: MatchPlayer
  playerTwo: MatchPlayer
}

export type NewEventData = {
  id?: string
  name: string
  slug: string
  shortDescription: string
  description: string
  hostedBy: string
  leagueId: string
  gameId: string
  format: EventFormat
  startDate: Date
  checkInTime: Date | null
  prizePool: string
  maxRegistrants: number
  winnerRoundWinConditions: number[]
  loserRoundWinConditions: number[]
  liveStreams: string[]
  currentWeek: number | null
}

export type Standing = EventRegistrant & {
  id: string
  name: string
  wins: number
  losses: number
  matchWins: number
  matchLosses: number
  record: string
  matchRecord: string
  score: number
}

export type EventRegistrantsQueryOptions = {
  id: boolean
  name: boolean
  registeredAt: boolean
  rosterId: boolean
  checkedIn: boolean
  seed: boolean
  eventSlug: boolean
  playerId: boolean
  event?: boolean
  player: {
    select: {
      id: boolean
      username: boolean
      address: boolean
    }
  }
  roster: {
    select: {
      id: boolean
      teamPlayers: {
        select: {
          playerId: boolean
        }
      }
      team: {
        select: {
          id: boolean
          name: boolean
          ownerId: boolean
        }
      }
    }
  }
}
