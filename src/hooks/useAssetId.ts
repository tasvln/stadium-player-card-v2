import { useState, useEffect } from 'react'

import icons from '@/json/player/icons.json'
import bgs from '@/json/player/bgs.json'
import titles from '@/json/player/titles.json'
import frames from '@/json/player/frames.json'
import colors from '@/json/player/colors.json'

type AssetsType = {
  icon: string
  bg: string
  title: string
  frame: string
  color: string
}

const useAssetId = (props: AssetsType) => {
  const { icon, bg, title, frame, color } = props

  const [iconId, setIconId] = useState<number>(0)
  const [bgId, setBgId] = useState<number>(0)
  const [titleId, setTitleId] = useState<number>(0)
  const [frameId, setFrameId] = useState<number>(0)
  const [colorId, setColorId] = useState<number>(0)

  const getIds = () => {
    setIconId(icons.findIndex((i) => i.name === icon))
    setBgId(bgs.findIndex((i) => i.name === bg))
    setTitleId(titles.findIndex((i) => i.name === title))
    setFrameId(frames.findIndex((i) => i.name === frame))
    setColorId(colors.findIndex((i) => i.name === color))
  }

  useEffect(() => {
    getIds()
  }, [icon, bg, title, frame, color])

  const ids = {
    icons,
    bgId,
    titleId,
    frameId,
    colorId,
  }

  const data = {
    icon: icons[iconId].img,
    bg: bgs[bgId].img ?? '',
    bgName: bgs[bgId].name ?? '',
    title: titles[titleId].name ?? '',
    frame: frames[frameId].img ?? '',
    color: colors[colorId].hex,
    artistName: bgs[bgId].artist ?? '',
  }

  return { ids, data }
}

export default useAssetId