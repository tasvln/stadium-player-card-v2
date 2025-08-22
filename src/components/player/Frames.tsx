import { ScrollContainer, SelectButton, Top } from './styles'
import NextImage from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'
import { FrameProps } from './types'
import { Text, Box, Button } from '@/components/common'
import { CloseIcon } from '@/components/icons'

type PlayerFramesProps = {
  frames: FrameProps[]
  playerFrame: string
  setPlayerFrame: (frame: string) => void
  setFramePrice: (price: number) => void
  setFrameName: (name: string) => void
  play: (value: any) => void
  containerCss?: any
  setShowModal?: (show: boolean) => void
}

const PlayerFrames = (props: PlayerFramesProps) => {
  const { frames, playerFrame, setPlayerFrame, setFramePrice, setFrameName, play, containerCss, setShowModal } = props

  const { isMobile } = useIsMobile()

  return (
    <Box css={containerCss}>
      <Top
        css={{
          '@md': {
            background: '#3c3c3c',
            flexDirection: 'row',
            height: 50,
          },
        }}
      >
        <Text size={2} weight="bold" css={{ '@md': { color: '$white' } }} uppercase>
          Frames
        </Text>
        {isMobile && (
          <Button
            variant="ghost"
            css={{
              position: 'absolute',
              left: 10,
            }}
            aria-label="Close modal"
            icon="standalone"
            onClick={() => {
              setShowModal!(false)
            }}
          >
            <CloseIcon color="white" />
          </Button>
        )}
      </Top>
      <ScrollContainer
        css={{
          height: 'calc(100% - 32px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 10,
          padding: '20px 16px',

          '@md': {
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
          },
        }}
      >
        {frames?.map((frame: FrameProps) => (
          <Box
            key={frame?.id}
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: '100%',
              position: 'relative',

              '@md': {
                height: 100,
                minWidth: 100,
              },
            }}
          >
            <Box
              css={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            >
              <NextImage priority src="/images/mint/crosses-in-corner.png" alt="box_bg" fill />
            </Box>
            <SelectButton
              css={{
                position: 'relative',
                width: '90%',
                height: '90%',
              }}
              active={playerFrame == frame?.img}
              onClick={() => {
                setPlayerFrame(frame?.img)
                setFramePrice(frame?.price)
                setFrameName(frame?.name)
                play({ id: `frame${frame.name}` })
              }}
            >
              {frame?.name == 'noFrame' ? (
                <Text
                  css={{
                    color: '$grey',
                  }}
                  uppercase
                >
                  No <br /> Frame
                </Text>
              ) : (
                <NextImage src={frame?.img} alt={frame?.name} fill style={{ borderRadius: 10 }} />
              )}
            </SelectButton>
          </Box>
        ))}
      </ScrollContainer>
    </Box>
  )
}

export default PlayerFrames
