import { useCallback, useEffect, useMemo, useState } from 'react'
import TextToSVG from 'text-to-svg'

const CARD_WIDTH = 344
const CARD_HEIGHT = 476

const getTextDefault = (color: string, bg?: string) => {
  const textColor =
    color == '#D9D9D9' ||
    color == '#19E6B5' ||
    color == '#19E62D' ||
    color == '#B1E619' ||
    color == '#E6DE19' ||
    color == '#ffffff' ||
    color == '#19DAE6'
      ? '#000'
      : '#fff'
  return textColor
}

const getBgPathDefault = (color: string) => {
  const bgPathColor =
    color == '#D9D9D9' || color == '#9F9F9F' || color == '#FFFFFF' || color == '#4F4F4F' || color == '#000000'
      ? '#FFFFFF'
      : '#00000060'
  return bgPathColor
}

type UsePlayerCardSVGTextProps = {
  name: string | undefined
  cardNo: string | undefined
  title: string | undefined
  artistName: string | undefined
  bgName: string | undefined
  colorName: string | undefined
  color: string | undefined
}

export const usePlayerCardSVGText = ({
  name,
  cardNo,
  title,
  color,
  colorName,
  artistName,
  bgName,
}: UsePlayerCardSVGTextProps) => {
  const [printName, setPrintName] = useState<string>()
  const [printTitle, setPrintTitle] = useState<string>()
  const [printArtistName, setPrintArtistName] = useState<string>()
  const [printCardNo, setPrintCardNo] = useState<string>()
  const [printBgName, setPrintBgName] = useState<string>()

  const textDefault = useMemo(() => getTextDefault(color as string), [color])
  const bgPathDefault = useMemo(() => getBgPathDefault(color as string), [color])

  console.log('textDefault', textDefault)
  console.log('bgPathDefault', bgPathDefault)

  const writeName = useCallback(() => {
    TextToSVG.load('/fonts/Tungsten-Bold.ttf', (_, textToSVG) => {
      const svg = textToSVG?.getD(name!.toUpperCase(), {
        fontSize: 38,
        x: CARD_WIDTH / 2,
        y: 320,
        anchor: 'center middle',
        attributes: {
          fill: textDefault,
        },
      })
      // @ts-ignore
      setPrintName(svg as React.ReactElement)
    })
  }, [name, textDefault])

  const writeTitle = useCallback(() => {
    TextToSVG.load('/fonts/jb-im.ttf', (_, textToSVG) => {
      const svg = textToSVG?.getD(title!.toUpperCase(), {
        fontSize: 18,
        x: CARD_WIDTH / 2,
        y: 348,
        anchor: 'center middle',
        attributes: {
          fill: textDefault,
        },
      })
      // @ts-ignore
      setPrintTitle(svg as React.ReactElement)
    })
  }, [textDefault, title])

  const writeArtistName = useCallback(() => {
    TextToSVG.load('/fonts/jb-r.ttf', (_, textToSVG) => {
      const svg = textToSVG?.getD(artistName!.toUpperCase(), {
        fontSize: 10,
        x: 20,
        y: CARD_HEIGHT - 15,
        anchor: 'left baseline',
        attributes: {
          fill: textDefault,
        },
      })
      // @ts-ignore
      setPrintArtistName(svg as React.ReactElement)
    })
  }, [artistName, textDefault])

  const writeBgName = useCallback(() => {
    const stadiumBgs = ['stadium', 'stadium bg']
    // Determine whether bg name starts with 'stadium' or not
    const arenaName = bgName?.toUpperCase() + ' ' + colorName?.split(' ')[1].toUpperCase()
    const mainBgName = stadiumBgs.includes(bgName as string) ? colorName?.toUpperCase() : bgName === 'arena' ? arenaName : bgName

    TextToSVG.load('/fonts/jb-r.ttf', (_, textToSVG) => {
      const svg = textToSVG?.getD(mainBgName!.toUpperCase(), {
        fontSize: 10,
        x: CARD_WIDTH / 2,
        y: CARD_HEIGHT - 15,
        anchor: 'center baseline',
        attributes: {
          fill: textDefault,
        },
      })
      // @ts-ignore
      setPrintBgName(svg as React.ReactElement)
    })
  }, [bgName, colorName, textDefault])

  const writeCardNo = useCallback(() => {
    const mainCardNo = `Card #${cardNo}`
    TextToSVG.load('/fonts/jb-r.ttf', (_, textToSVG) => {
      const svg = textToSVG?.getD(mainCardNo.toUpperCase(), {
        fontSize: 10,
        x: CARD_WIDTH - 20,
        y: CARD_HEIGHT - 15,
        anchor: 'right baseline',
        attributes: {
          fill: textDefault,
        },
      })
      // @ts-ignore
      setPrintCardNo(svg as React.ReactElement)
    })
  }, [cardNo, textDefault])

  /**
   * Use effects to write text
   */
  useEffect(() => {
    writeName()
  }, [name, writeName])

  useEffect(() => {
    if (cardNo) writeCardNo()
  }, [cardNo, writeCardNo])

  useEffect(() => {
    if (artistName) writeArtistName()
  }, [artistName, writeArtistName])

  useEffect(() => {
    if (title) writeTitle()
  }, [title, writeTitle])

  useEffect(() => {
    writeBgName()
  }, [bgName, writeBgName])

  return {
    printName,
    printTitle,
    printArtistName,
    printCardNo,
    printBgName,
    textDefault,
    bgPathDefault,
  }
}
