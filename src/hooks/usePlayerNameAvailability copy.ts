import { useEffect, useState } from 'react'
import api from '@/utils/contracts-api'
import BadWordFilter from 'bad-words'

const words = new BadWordFilter()

export const usePlayerNameAvailability = (input: string) => {
  const [state, setState] = useState<boolean>(false)
  const [profane, setProfane] = useState<boolean>(false)

  const checkName = async () => {
    const players = await api.getPlayerCards()
    const playerNames = players.map((player: any) => player.name)
    const isAvailable = !playerNames.includes(input)
    setState(isAvailable)

    const isProfane = words.isProfane(input)
    setProfane(isProfane)
  }

  useEffect(() => {
    checkName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  return {
    isAvailable: state,
    isProfane: profane,
  }
}
