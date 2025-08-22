import { Top, PreButton } from './styles'
import Box from '@/components/common/Box'
import Text from '@/components/common/Text'
import NextImage from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'
import PlayerCardSvg from './svg'

type PlayerPreviewProps = {
  playerName: string
  playerTitle: string
  playerIcon: string
  playerColor: string
  playerBg: string
  playerFrame: string
  bgArtist: string
  bgName: string
  colorName: string
  svgLoading: boolean
  setSvgLoading: (loading: boolean) => void
  containerCss: any
  svgRef: React.RefObject<SVGSVGElement>
  randomizeCard: () => void
  saveAsPng: (value: boolean) => void
}

const PlayerPreview = (props: PlayerPreviewProps) => {
  const {
    playerName,
    playerTitle,
    playerIcon,
    playerColor,
    playerBg,
    playerFrame,
    bgArtist,
    bgName,
    colorName,
    svgLoading,
    setSvgLoading,
    containerCss,
    svgRef,
    randomizeCard,
    saveAsPng,
  } = props

  const { isMobile } = useIsMobile()

  return (
    <Box css={containerCss}>
      <Top>
        <Text size={2} weight="bold" uppercase>
          preview
        </Text>
      </Top>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(100% - 32px)',
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            userSelect: 'none',

            '@md': {
              height: '100%',
            },
          }}
        >
          {!isMobile && (
            <Box
              css={{
                width: '100%',
                height: 580,
                position: 'absolute',
              }}
            >
              <NextImage src="/images/mint/card-table.png" alt="bg" fill />
            </Box>
          )}
          <Box
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 580,
              zIndex: 1,

              '@md': {
                height: '100%',
                backgroundImage: `url("/images/mint/card-table.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',

                '& svg': {
                  height: 440,
                  margin: 10,
                },
              },

              '@media (max-width: 375px)': {
                '& svg': {
                  height: 380,
                },
              },
            }}
          >
            <PlayerCardSvg
              ref={svgRef}
              id="playerSvg"
              name={playerName || 'player name'}
              title={playerTitle == 'NONE' ? '' : playerTitle}
              icon={playerIcon}
              color={playerColor}
              background={playerBg}
              iconFrame={playerFrame}
              artistName={bgArtist}
              bgName={bgName}
              cardNo={''}
              colorName={colorName}
              setLoading={setSvgLoading}
            />
          </Box>
        </Box>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <PreButton onClick={randomizeCard}>randomize</PreButton>
          <PreButton disabled={svgLoading} onClick={() => saveAsPng(true)}>
            save as png
          </PreButton>
        </Box>
      </Box>
    </Box>
  )
}

export default PlayerPreview
