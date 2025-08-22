import { Container, ScrollContainer, SelectButton, Switch, SwitchButton, Top } from './styles'
import NextImage from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'
import { IconProps } from './types'
import { Text, Box, Button } from '@/components/common'
import { CloseIcon } from '@/components/icons'

type PlayerIconsProps = {
  icons: IconProps[]
  playerIcon: string
  iconSwitch: string
  containerCss?: any
  setIconSwitch: (value: string) => void
  setPlayerIcon: (icon: string) => void
  setIconPrice: (price: number) => void
  setIconName: (name: string) => void
  play: (sound: { id: string }) => void
  setShowModal?: (show: boolean) => void
}

const PlayerIcons = (props: PlayerIconsProps) => {
  const {
    icons,
    playerIcon,
    iconSwitch,
    setPlayerIcon,
    setIconPrice,
    setIconName,
    play,
    setIconSwitch,
    containerCss,
    setShowModal,
  } = props

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
          icons
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
      <Switch>
        <SwitchButton onClick={() => setIconSwitch('base')} active={iconSwitch == 'base'}>
          <Text weight="bold" css={{ fontSize: 14 }} uppercase>
            base
          </Text>
          <Text weight="bold" css={{ fontSize: 14, color: '$grey' }} uppercase>
            free
          </Text>
        </SwitchButton>
        <SwitchButton onClick={() => setIconSwitch('special')} active={iconSwitch == 'special'}>
          <Text weight="bold" css={{ fontSize: 14 }} uppercase>
            special
          </Text>
          <Text weight="bold" css={{ fontSize: 14, color: '$grey' }} uppercase>
            +.02ETH
          </Text>
        </SwitchButton>
      </Switch>
      <ScrollContainer
        css={{
          height: 'calc(100% - 68px)',

          '@md': {
            overflowX: 'scroll',
          },
        }}
      >
        {iconSwitch == 'base' && (
          <Box
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 8,

              '@md': {
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'auto',
                width: 'fit-content',
              },
            }}
          >
            {icons?.map((i: IconProps) => (
              <>
                {i?.type == 'free' && (
                  <SelectButton
                    key={i?.id}
                    onClick={() => {
                      setPlayerIcon(i?.img)
                      setIconPrice(i?.price)
                      setIconName(i?.name)
                      play({ id: 'base' })
                    }}
                    active={playerIcon == i?.img}
                  >
                    <NextImage src={i?.thumbnail} alt={i?.name} fill />
                  </SelectButton>
                )}
              </>
            ))}
          </Box>
        )}
        {iconSwitch == 'special' && (
          <Box
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 8,

              '@md': {
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'auto',
                width: 'fit-content',
              },
            }}
          >
            {icons?.map((i: IconProps) => (
              <>
                {i?.type == 'paid' && (
                  <SelectButton
                    key={i?.id}
                    onClick={() => {
                      setPlayerIcon(i?.img)
                      setIconPrice(i?.price)
                      setIconName(i?.name)
                      play({ id: 'special' })
                    }}
                    active={playerIcon == i?.img}
                  >
                    <NextImage src={i?.thumbnail} alt={i?.name} fill />
                  </SelectButton>
                )}
              </>
            ))}
          </Box>
        )}
      </ScrollContainer>
    </Container>
  )
}

export default PlayerIcons
