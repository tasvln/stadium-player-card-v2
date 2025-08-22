import { Container, SelectButton, Top } from './styles'
import { useIsMobile } from '@/hooks/useIsMobile'
import { ColorProps } from './types'
import { Text, Box, Button } from '@/components/common'
import { CloseIcon } from '@/components/icons'

type PlayerColorsProps = {
  colors: ColorProps[]
  playerColor: string
  containerCss?: any
  setColorName: (name: string) => void
  setPlayerColor: (color: string) => void
  play: (sound: { id: string }) => void
  setShowModal?: (show: boolean) => void
}

const PlayerColors = (props: PlayerColorsProps) => {
  const { colors, playerColor, setColorName, setPlayerColor, play, containerCss, setShowModal } = props

  const { isMobile } = useIsMobile()

  return (
    <Container css={containerCss}>
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
          colors
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
      <Box
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
          gap: 8,
          width: '100%',
          padding: '4% 24px',

          '@md': {
            padding: 24,
            gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
          },

          '@media (max-width: 600px)': {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {colors?.map((c: ColorProps) => (
          <SelectButton
            key={c?.id}
            active={playerColor == c?.hex}
            css={{
              display: 'flex',
              background: c?.hex,
              width: 32,
              height: 32,
              outline: '1px solid $border',

              '@md': {
                width: '100%',
                height: 50,
              },
            }}
            onClick={() => {
              setColorName(c.name)
              setPlayerColor(c?.hex)
              play({ id: 'color' })
            }}
          />
        ))}
      </Box>
    </Container>
  )
}

export default PlayerColors
