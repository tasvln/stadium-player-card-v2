import { Container, SelectButton, Switch, SwitchButton, Top, BgBox } from './styles'
import NextImage from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'
import { CloseIcon } from '@/components/icons'
import { BgProps } from './types'
import { Text, Box, Button } from '@/components/common'

type PlayerBgsProps = {
  bgs: BgProps[]
  bgSwitch: string
  containerCss?: any
  bgName: string
  accessCardData: any
  setBgSwitch: (value: string) => void
  setBgPrice: (price: number) => void
  setBgName: (name: string) => void
  setPlayerBg: (bg: string) => void
  setBgArtist: (artist: string) => void
  play: (sound: { id: string }) => void
  setShowModal?: (show: boolean) => void
}

const PlayerBgs = (props: PlayerBgsProps) => {
  const {
    bgs,
    bgSwitch,
    setBgSwitch,
    setBgPrice,
    setBgName,
    setPlayerBg,
    setBgArtist,
    play,
    containerCss,
    bgName,
    accessCardData,
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
          backgrounds
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
        <SwitchButton onClick={() => setBgSwitch('common')} active={bgSwitch == 'common'}>
          <Text weight="bold" css={{ fontSize: 14 }} uppercase>
            common
          </Text>
          <Text weight="bold" css={{ fontSize: 14, color: '$grey' }} uppercase>
            free
          </Text>
        </SwitchButton>
        <SwitchButton onClick={() => setBgSwitch('special')} active={bgSwitch == 'special'}>
          <Text weight="bold" css={{ fontSize: 14 }} uppercase>
            special
          </Text>
          <Text weight="bold" css={{ fontSize: 14, color: '$grey' }} uppercase>
            +.04ETH
          </Text>
        </SwitchButton>
      </Switch>
      <Box
        css={{
          height: 'calc(100% - 68px)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 20,
        }}
      >
        {bgSwitch == 'common' && (
          <BgBox
            css={{
              '@md': {
                overflowX: 'scroll',
                overflowY: 'hidden',
              },
            }}
          >
            {bgs?.map((bg: BgProps) => (
              <>
                {bg.when == 'accessCard' && accessCardData != null && (
                  <SelectButton
                    key={bg?.id}
                    onClick={() => {
                      setPlayerBg(bg.img)
                      setBgPrice(bg.price)
                      setBgArtist(bg.artist)
                      setBgName(bg.name)
                      play({ id: 'bgUnlockable' })
                    }}
                    active={bgName == bg?.name}
                    css={{
                      minWidth: 72,
                      height: '100%',

                      '@md': {
                        minWidth: 100,
                        height: 100,
                      },
                    }}
                  >
                    <NextImage src={bg?.thumbnail} alt={bg?.name} style={{ objectFit: 'cover' }} fill />
                  </SelectButton>
                )}
              </>
            ))}
            {bgs?.map((bg: BgProps) => (
              <>
                {bg?.type == 'free' && (
                  <SelectButton
                    key={bg?.id}
                    onClick={() => {
                      setPlayerBg(bg.img)
                      setBgPrice(bg.price)
                      setBgArtist(bg.artist)
                      setBgName(bg.name)
                      play({ id: 'bgUnlockable' })
                    }}
                    active={bgName == bg?.name}
                    css={{
                      minWidth: 72,
                      height: '100%',

                      '@md': {
                        minWidth: 100,
                        height: 100,
                      },
                    }}
                  >
                    <NextImage src={bg?.thumbnail} style={{ objectFit: 'cover' }} alt={bg?.name} fill />
                  </SelectButton>
                )}
              </>
            ))}
          </BgBox>
        )}
        {bgSwitch == 'special' && (
          <BgBox>
            {bgs?.map((bg: BgProps) => (
              <>
                {bg?.type == 'paid' && (
                  <SelectButton
                    key={bg?.id}
                    onClick={() => {
                      setPlayerBg(bg.img)
                      setBgPrice(bg.price)
                      setBgArtist(bg.artist)
                      setBgName(bg.name)
                      play({ id: 'bg' })
                    }}
                    active={bgName == bg?.name}
                    css={{
                      minWidth: 72,
                      height: '100%',

                      '@md': {
                        minWidth: 100,
                        height: 100,
                      },
                    }}
                  >
                    <NextImage src={bg?.thumbnail} style={{ objectFit: 'cover' }} alt={bg?.name} fill />
                  </SelectButton>
                )}
              </>
            ))}
          </BgBox>
        )}
      </Box>
    </Container>
  )
}

export default PlayerBgs
