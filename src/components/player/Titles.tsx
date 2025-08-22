import { ScrollContainer, SelectButton, Top } from './styles'
import { useIsMobile } from '@/hooks/useIsMobile'
import { TitleProps } from './types'
import { Text, Box, Button } from '@/components/common'
import { CloseIcon } from '@/components/icons'

type PlayerTitlesProps = {
  titles: TitleProps[]
  playerTitle: string
  setPlayerTitle: (title: string) => void
  setTitlePrice: (price: number) => void
  play: (value: any) => void
  containerCss?: any
  accessCardData?: any
  setShowModal?: (show: boolean) => void
}

const PlayerTitles = (props: PlayerTitlesProps) => {
  const { titles, playerTitle, setPlayerTitle, setTitlePrice, play, containerCss, accessCardData, setShowModal } = props

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
          titles
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
          gap: 10,
          padding: '20px 16px',

          '@md': {
            overflowY: 'scroll',
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          css={{
            paddingBottom: 10,
            borderBottom: '3px solid $border',
            marginBottom: 8,
          }}
        >
          <Text weight="bold" css={{ color: '$grey', marginBottom: '$2' }} uppercase>
            free
          </Text>
          {titles?.map((i: TitleProps) => (
            <Box key={i.id}>
              {i?.type == 'free' && (
                <SelectButton
                  css={{
                    background: playerTitle == i?.name ? '$black' : '$white',
                    color: playerTitle == i?.name ? '$white' : '$black',
                    padding: 4,
                    margin: '0 -4px',
                    height: 'auto',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: 14,

                    '@md': {
                      minWidth: '100%',
                      borderRadius: 0,
                    },
                  }}
                  key={i?.id}
                  onClick={() => {
                    setPlayerTitle(i?.name)
                    setTitlePrice(i?.price)
                    play({ id: 'title' })
                  }}
                >
                  {i.name}
                </SelectButton>
              )}
            </Box>
          ))}
          {titles?.map((i: TitleProps) => (
            <Box key={i.id}>
              {i.when == 'accessCard' && accessCardData != null && (
                <Box>
                  <SelectButton
                    css={{
                      background: playerTitle == i?.name ? '$black' : '$white',
                      color: playerTitle == i?.name ? '$white' : '$black',
                      padding: 4,
                      margin: '0 -4px',
                      height: 'auto',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: 14,

                      '@md': {
                        width: '100%',
                        borderRadius: 0,
                      },
                    }}
                    key={i?.id}
                    onClick={() => {
                      setPlayerTitle(i?.name)
                      setTitlePrice(i?.price)
                      play({ id: 'title' })
                    }}
                  >
                    {i.name}
                  </SelectButton>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <Box>
          <Text weight="bold" css={{ color: '$grey', marginBottom: '$2' }} uppercase>
            +.02ETH
          </Text>
          {titles?.map((i: TitleProps) => (
            <Box key={i.id}>
              {i?.type == 'paid' && (
                <SelectButton
                  css={{
                    background: playerTitle == i?.name ? '$black' : '$white',
                    color: playerTitle == i?.name ? '$white' : '$black',
                    padding: 4,
                    margin: '0 -4px',
                    height: 'auto',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: 14,

                    '@md': {
                      width: '100%',
                      borderRadius: 0,
                    },
                  }}
                  key={i?.id}
                  onClick={() => {
                    setPlayerTitle(i?.name)
                    setTitlePrice(i?.price)
                    play({ id: 'titlePaid' })
                  }}
                >
                  {i.name}
                </SelectButton>
              )}
            </Box>
          ))}
        </Box>
      </ScrollContainer>
    </Box>
  )
}

export default PlayerTitles
