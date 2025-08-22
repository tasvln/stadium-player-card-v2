import React, { useState, useEffect, useCallback } from 'react'
import ConnectWalletButton from "@/components/ConnectWallet";
// import { constants, utils } from 'ethers'
import currency from 'currency.js'
// import { Blob } from 'nft.storage'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
// import {
//   usePrepareContractWrite,
//   useContractWrite,
//   useAccount
// } from 'wagmi'

import { useIsMobile } from '@/hooks/useIsMobile'

import icons from '@/json/player/icons.json'
import bgs from '@/json/player/bgs.json'
import titles from '@/json/player/titles.json'
import frames from '@/json/player/frames.json'
import colors from '@/json/player/colors.json'
import { Box, Grid, Button, Text, Image as ImageComponent, Flex } from '@/components/common'
import { styled } from 'stitches.config'
import PlayerCard from '@/components/player/svg'
// import { usePlayerNameAvailability } from '@/hooks/usePlayerNameAvailability'
import useSound from 'use-sound'
import { Input, List } from '@/components/player/styles'
import StatusDot from '@/components/common/StatusDot'
import { StadiumOut, VolumeIcon } from '@/components/icons'
// import { ENV } from '@/utils/env'
// import { GOERLI_STADIUM_ADDRESS, STADIUM_ADDRESS } from '@/utils/variables'

// Stadium Contract ABI
// import StadiumABI from '@debased/contracts/abi/contracts/Stadium.sol/Stadium.json'
// import { parseEther } from 'viem'
import { useModeStore } from '@/store/mode'
// import { useSession } from 'next-auth/react';
import { CARD_HEIGHT, CARD_WIDTH, downloadCanvas } from '@/utils/svg';
import { ConfirmMint } from '@/components/modal';
import Minting from '@/components/modal/Minting';

type PlayerMintProps = {
  mode: 'mint' | 'edit' | 'test'
}

type WindowProps = {
  children?: React.ReactNode
  css?: any
  title?: string
}

const Window = ({ css, children, title }: WindowProps) => {
  return (
    <Box
      css={css}
    >
      <Top>
        {title}
      </Top>
      {children}
    </Box>
  )
}

const Top = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px 10px',
  background: '$border',
  textTransform: 'uppercase',
  fontSize: 14,
  fontWeight: 600,
})

const Player = () => {
  const router = useRouter()
  // const { data: session } = useSession();
  // const { address, isDisconnected } = useAccount()
  
  const { mode, setMode } = useModeStore();

  const { isMobile } = useIsMobile()

  // Refs
  const svgRef: React.RefObject<any> = React.useRef();

  // User States
  // const [accessCardData, setAccessCardData] = useState<AccessCard>(null)
  const [playerCardNo, setPlayerCardNo] = React.useState<number>(0)

  // Card States
  const [playerName, setPlayerName] = React.useState<string | undefined>(undefined)
  const [playerIcon, setPlayerIcon] = useState<string>(icons[1]?.img)
  const [playerColor, setPlayerColor] = useState<string>(colors[10]?.hex)
  const [playerFrame, setPlayerFrame] = useState<string>(frames[0]?.img)
  const [playerTitle, setPlayerTitle] = useState<string>(titles[0]?.name)
  const [playerBg, setPlayerBg] = useState<string>(bgs[0]?.img)

  const [bgArtist, setBgArtist] = useState<string>(bgs[0]?.artist)
  const [bgName, setBgName] = useState<string>(bgs[0]?.name)

  const [frameName, setFrameName] = useState<string>(frames[0]?.name)
  const [iconName, setIconName] = useState<string>(icons[1]?.name)
  const [colorName, setColorName] = useState<string>(colors[10]?.name)

  const [ipfsHash, setIpfsHash] = useState<string | undefined>()
  const [signature, setSignature] = useState<string | undefined>()

  // Price States
  const [iconPrice, setIconPrice] = useState<number>(icons[1]?.price)
  const [framePrice, setFramePrice] = useState<number>(0)
  const [titlePrice, setTitlePrice] = useState<number>(titles[0]?.price)
  const [bgPrice, setBgPrice] = useState<number>(bgs[0]?.price)
  const [namePrice, setNamePrice] = useState<number>(0)

  const [totalPrice, setTotalPrice] = useState<number | string>(0)

  // Modal States
  const [chooseCard, setChooseCard] = React.useState<boolean>(false)
  const [confirmMint, setConfirmMint] = React.useState<boolean>(false)

  // Tabs States
  const [iconSwitch, setIconSwitch] = React.useState<'base' | 'special'>('base')
  const [bgSwitch, setBgSwitch] = React.useState<'base' | 'special'>('base')

  // Loading States
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState<string | undefined>(undefined)
  const [svgLoading, setSvgLoading] = useState<boolean>(true)
  const [minting, setMinting] = React.useState<boolean>(false)
  const [mobileOptionModal, setMobileOptionModal] = useState<boolean>(false)
  const [mobileOption, setMobileOption] = useState<'name' | 'icon' | 'bg' | 'frame' | 'title' | 'color' | undefined>(
    undefined
  )

  // Other States
  // const [soundOn, setSoundOn] = useState<boolean>(true)
  // const [play] = useSound('/audio/PLYRBUILDER.wav', {
  //   sprite: {
  //     color: [0, 900],
  //     base: [2000, 900],
  //     special: [5000, 1500],
  //     title: [12000, 1000],
  //     titleUnlockable: [9000, 9000],
  //     titlePaid: [15000, 2000],
  //     frame0: [19000, 900],
  //     frame1: [18000, 900],
  //     frame2: [21000, 1000],
  //     frame3: [24000, 1500],
  //     frame4: [27000, 3000],
  //     bg: [7000, 2000],
  //     bgUnlockable: [42000, 1000],
  //   },
  //   soundEnabled: soundOn,
  //   volume: 0.75,
  //   interrupt: true,
  // })

  // User Name Input
  // const { isAvailable, isProfane } = usePlayerNameAvailability(playerName as string)

  // Randomize Player Card

  const randomizeCard = () => {
    // Filter out un-lockable backgrounds if user doesn't have access card
    let filteredBgs = [...bgs]
    // if (!session?.user.playerCard) {
    //   filteredBgs = bgs.filter((bg) => bg.when !== 'accessCard')
    // }
    const maxIcons = icons.length
    const maxColors = colors.length
    const maxBgs = filteredBgs.length
    const maxFrames = frames.length
    const maxTitles = titles.length

    const randomIconNum = Math.floor(Math.random() * maxIcons)
    const randomColorNum = Math.floor(Math.random() * maxColors)
    const randomBgNum = Math.floor(Math.random() * maxBgs)
    const randomFrameNum = Math.floor(Math.random() * maxFrames)
    const randomTitleNum = Math.floor(Math.random() * maxTitles)

    const randomFilteredBG = filteredBgs[randomBgNum]

    // Set Values States
    setPlayerIcon(icons[randomIconNum]?.img)
    setPlayerColor(colors[randomColorNum]?.hex)
    setPlayerBg(randomFilteredBG?.img)
    setPlayerFrame(frames[randomFrameNum]?.img)
    setPlayerTitle(titles[randomTitleNum]?.name)
    // if (!session?.user.playerCard && titles[randomTitleNum].when == 'accessCard') {
    //   return setPlayerTitle(titles[randomTitleNum - 1]?.name)
    // }
    setBgArtist(randomFilteredBG?.artist)
    setBgName(randomFilteredBG?.name)
    setColorName(colors[randomColorNum]?.name)
    setFrameName(frames[randomFrameNum]?.name)
    setIconName(icons[randomIconNum]?.name)

    // Set Price States
    setIconPrice(icons[randomIconNum]?.price)
    setFramePrice(frames[randomFrameNum]?.price)
    setTitlePrice(titles[randomTitleNum]?.price)
    setBgPrice(randomFilteredBG?.price)
  }

  // Save SVG as PNG


  // saveAsPng Function
  const saveAsPng = useCallback(
    (download: boolean) => {
      // Get the reference to the SVG element
      const svg = svgRef.current
      // Serialize the SVG element as a XML string
      const svgXML = new XMLSerializer().serializeToString(svg as any)
      // Encode it as a data string
      const blob = new Blob([svgXML], {
        type: 'image/svg+xml;charset=utf-8',
      })

      const url = URL.createObjectURL(blob)

      const img = new Image(CARD_WIDTH, CARD_HEIGHT)

      img.onload = () => {
        const canvas = document.createElement('canvas')

        canvas.width = CARD_WIDTH
        canvas.height = CARD_HEIGHT

        // Create a canvas context object and draw the image on canvas
        // Use the original width and height of the image
        // Use TODataURL() method to get the data URL
        const canvasContext: any = canvas.getContext('2d')
        canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height)
        window.URL.revokeObjectURL(url)

        if (download) downloadCanvas(canvas, 'player-card.png')
        // eslint-disable-next-line no-console
        console.log('canvas: ', canvas)
      }
      img.src = url
    },
    [svgRef]
  )

  // useEffect(() => {
  //   if (isProfane) {
  //     setNamePrice(99)
  //   } else {
  //     setNamePrice(0)
  //   }
  // }, [isProfane])

  // Mint Card Functions
  // const CONTRACT_ADDRESS = ENV.CHAIN == 1 ? STADIUM_ADDRESS : GOERLI_STADIUM_ADDRESS
  
  // const {
  //   config,
  //   error: prepareError,
  //   isError: isPrepareError,
  // } = usePrepareContractWrite({
  //   address: CONTRACT_ADDRESS as `0x${string}`,
  //   abi: StadiumABI,
  //   functionName: 'mintNamed',
  //   args: [
  //     1, //type
  //     playerName, //name
  //     ipfsHash, //ipfs hash
  //     utils.formatBytes32String('Stadium'), //stadium id
  //     utils.parseEther(totalPrice.toString()), //price
  //     constants.HashZero, //nonce
  //     signature, //signature
  //   ],
  //   gas: BigInt(420000),
  //   value: parseEther(totalPrice.toString() as any),
  //   chainId: ENV.CHAIN,
  //   enabled: ipfsHash != null,
  // })

  // const { error, writeAsync: mintPlayer, isLoading: isMintPlayerLoading } = useContractWrite(config)

  // const handleMint = async (e: any) => {
  //   e.preventDefault()

  //   try {
  //     // Mint player
  //     const mintTx = await mintPlayer?.()

  //     setTxHash(mintTx?.hash)
  //     setConfirmMint(false)

  //     //store in database
  //     await axios.post(`${ENV.BACKEND_API}/api/v1/cards/${address}`, {
  //       title: playerTitle,
  //       name: playerName,

  //       color: colorName,
  //       icon: iconName,
  //       frame: frameName,
  //       background: bgName,
  //       ipfsHash: ipfsHash,
  //       txHash: mintTx?.hash,
  //     })

  //     setMinting(true)
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.log('ERR: 401', err)
  //   }
  // }

  useEffect(() => {
    const price = currency(iconPrice).add(bgPrice).add(framePrice).add(titlePrice).add(namePrice)
    setTotalPrice(price.toString())
  }, [bgPrice, framePrice, iconPrice, namePrice, titlePrice])

  // useEffect(() => {
  //   if (session?.user.playerCard) {
  //     // eslint-disable-next-line no-console
  //     console.log(`🚀 -----------------------------------------------------------------🚀`)
  //     // eslint-disable-next-line no-console
  //     console.log(`🚀 Minted: ${session?.user.playerCard ? 'Success' : 'Failed'}`)
  //     // eslint-disable-next-line no-console
  //     console.log(`🚀 -----------------------------------------------------------------🚀`)
  //     setMode('edit')
  //   }
  // }, [session])

  return (
    <Box>
      {/* {minting && (
        <Minting 
          open={minting} 
          hash={txHash} 
          onClose={() => setMinting(false)} 
          // error={error}
        />
      )} */}
      {/* {confirmMint && (
        <ConfirmMint
          open={confirmMint}
          name={playerName}
          onClose={() => setConfirmMint(false)}
          onClick={handleMint}
          ipfsHash={ipfsHash}
          signature={signature}
          onIpfsHash={setIpfsHash}
          onSignature={setSignature}
          data={{
            title: playerTitle,
            name: playerName,

            color: colorName,
            icon: iconName,
            frame: frameName,
            background: bgName,
          }}
          isLoading={isMintPlayerLoading}
          prepareError={prepareError}
          isError={isPrepareError}
          mintError={error}
        />
      )} */}
      <NextSeo
        title={`STADIUM: Build Your Legend Onchain`}
        description="STADIUM starts with you. Create your own personal player card. Earn, buy, and trade digital collectible assets from leagues and events to flex among your teammates and competition."
        openGraph={{
          type: 'website',
          url: `https://projectstadium.com/mint`,
          description:
            'STADIUM starts with you. Create your own personal player card. Earn, buy, and trade digital collectible assets from leagues and events to flex among your teammates and competition.',
          images: [
            {
              url: '/images/logos/stadium-text-wavy.png',
            },
          ],
        }}
      />
      <Wrapper>
        <Box
          css={{
            width: '100%',
            height: 'fit-content',
            padding: '8px 32px',
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text size={'2'} weight={'bold'} italic uppercase>
            {mode == 'mint' && 'Mint'}{mode == 'edit' && 'Edit'}{mode == 'test' && 'Test'} Mode
          </Text>
          <Flex
            css={{
              marginBottom: 20,
              justifyContent: 'flex-end',
            }}
          >
            {/* <VolumeIcon onClick={() => setSoundOn(!soundOn)} /> */}
          </Flex>
        </Box>
        <Grid
          css={{
            width: '100%',
            height: '100%',
            gridTemplateColumns: '300px auto 400px',
            padding: 32,
            paddingTop: 8,
            gap: 16,
            overflow: 'hidden',
          }}
        >
          <Column>
            <Window 
              title="icons"
              css={{
                border: '1px solid $border',
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 auto',
                overflowY: 'auto',
              }}
            >
              <Grid
                css={{
                  gridTemplateColumns: '1fr 1fr',
                  borderBottom: '1px solid $border',
                }}
              >
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
              </Grid>
              <WindowContent>
                <ScrollContainer>
                  <Grid
                    css={{
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 8,
                    }}
                  >
                    {icons.map((icon, i) => (
                      <>
                        {iconSwitch === 'base' && icon.type === 'free' && (
                          <SelectButton
                            key={i}
                            onClick={() => {
                              setPlayerIcon(icon?.img)
                              setIconPrice(icon?.price)
                              setIconName(icon?.name)
                              // play({ id: 'base' })
                            }}
                            active={playerIcon == icon?.img}
                          >
                            <ImageComponent
                              src={icon.img}
                              alt={icon.name}
                              css={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </SelectButton>
                        )}
                        {iconSwitch === 'special' && icon.type === 'paid' && (
                          <SelectButton
                            key={i}
                            onClick={() => {
                              setPlayerIcon(icon?.img)
                              setIconPrice(icon?.price)
                              setIconName(icon?.name)
                              // play({ id: 'base' })
                            }}
                            active={playerIcon == icon?.img}
                          >
                            <ImageComponent
                              src={icon.img}
                              alt={icon.name}
                              css={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </SelectButton>
                        )}
                      </>
                    ))}
                  </Grid>
                </ScrollContainer>
              </WindowContent>
            </Window>
            <Window 
              title="background"
              css={{
                border: '1px solid $border',
                display: 'flex',
                flexDirection: 'column',
                flex: '0 0 auto',
                overflowY: 'auto',
              }}
            >
              <Grid
                css={{
                  gridTemplateColumns: '1fr 1fr',
                  borderBottom: '1px solid $border',
                }}
              >
                <SwitchButton onClick={() => setBgSwitch('base')} active={bgSwitch == 'base'}>
                  <Text weight="bold" css={{ fontSize: 14 }} uppercase>
                    base
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
              </Grid>
              <WindowContent>
                <ScrollContainer
                  css={{
                    overflow: 'auto hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Grid
                    css={{
                      display: 'inline-flex',
                      gap: 8,
                    }}
                  >
                    {bgs.map((bg, i) => (
                      <>
                        {bgSwitch === 'base' && bg.type === 'free' && (
                          <SelectButton
                            key={i}
                            onClick={() => {
                              setPlayerBg(bg.img)
                              setBgPrice(bg.price)
                              setBgArtist(bg.artist)
                              setBgName(bg.name)
                              // play({ id: 'bgUnlockable' })
                            }}
                            active={bgName == bg?.name}
                          >
                            <ImageComponent
                              src={bg.img ? bg.img : bg.thumbnail}
                              alt={bg.name}
                              css={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </SelectButton>
                        )}
                        {bgSwitch === 'special' && bg.type === 'paid' && (
                          <SelectButton
                            key={i}
                            onClick={() => {
                              setPlayerBg(bg.img)
                              setBgPrice(bg.price)
                              setBgArtist(bg.artist)
                              setBgName(bg.name)
                              // play({ id: 'bgUnlockable' })
                            }}
                            active={bgName == bg?.name}
                          >
                            <ImageComponent
                              src={bg.img ? bg.img : bg.thumbnail}
                              alt={bg.name}
                              css={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </SelectButton>
                        )}
                      </>
                    ))}
                  </Grid>
                </ScrollContainer>
              </WindowContent>
            </Window>
            <Window 
              title="colors"
              css={{
                border: '1px solid $border',
                display: 'flex',
                flexDirection: 'column',
                flex: '0 0 auto',
                overflowY: 'auto',
              }}
            >
              <WindowContent>
                <ScrollContainer
                  css={{
                    overflow: 'hidden',
                    width: '100%',
                  }}
                >
                  <Grid
                    css={{
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: 8,
                      height: 70,
                      width: '100%',
                    }}
                  >
                    {colors.map((color, i) => (
                      <SelectButton
                        key={i}
                        css={{
                          background: color.hex,
                          outline: playerColor == color?.hex ? '3px solid $black' : '1px solid $border',
                        }}
                        onClick={() => {
                          setColorName(color.name)
                          setPlayerColor(color?.hex)
                          // play({ id: 'color' })
                        }}
                      />
                    ))}
                  </Grid>
                </ScrollContainer>
              </WindowContent>
            </Window>
          </Column>
          <Column>
            <Window
              title="preview"
              css={{
                border: '1px solid $border',
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 auto',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              <PreviewBox>
                <PlayerCard
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
              </PreviewBox>
              <Box
                css={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <PreviewButton
                  onClick={randomizeCard}
                >
                  randomize
                </PreviewButton>
                <PreviewButton>save as png</PreviewButton>
              </Box>
            </Window>
          </Column>
          <Column>
            <Grid
              css={{
                // border: '1px solid $red',
                gridTemplateColumns: '1fr 1fr',
                flex: '1 1 auto',
                overflowY: 'auto',
                gap: 16,
              }}
            >
              <Window
                title="frame"
                css={{
                  border: '1px solid $border',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 auto',
                  overflowY: 'auto',
                }}
              >
                <WindowContent>
                  <ScrollContainer>
                    <Grid
                      css={{
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 8,
                      }}
                    >
                      {frames.map((frame, i) => (
                        <SelectButton
                          key={i}
                          active={playerFrame == frame?.img}
                          onClick={() => {
                            setPlayerFrame(frame?.img)
                            setFramePrice(frame?.price)
                            setFrameName(frame?.name)
                            // play({ id: `frame${frame.name}` })
                          }}
                        >
                          {frame.name == 'noFrame' ? (
                            <Text
                              css={{
                                color: '$grey',
                              }}
                              uppercase
                            >
                              No <br /> Frame
                            </Text>
                          ) : (
                            <ImageComponent
                              src={frame.img}
                              alt={frame.name}
                              css={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          )}
                        </SelectButton>
                      ))}
                    </Grid>
                  </ScrollContainer>
                </WindowContent>
              </Window>
              <Window
                title="title"
                css={{
                  border: '1px solid $border',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 auto',
                  overflowY: 'auto',
                }}
              >
                <WindowContent>
                  <ScrollContainer>
                    <Text
                      css={{
                        color: '$grey',
                        marginBottom: 8,
                      }}
                      uppercase
                      weight={'bold'}
                    >
                      free
                    </Text>
                    <Grid
                      css={{
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: 8,
                      }}
                    >
                      {titles.map((title, i) => (
                        <>
                          {title.type === 'free' && (
                            <SelectButton
                              key={i}
                              css={{
                                background: playerTitle == title?.name ? '$black' : '$white',
                                textAlign: 'left',
                                padding: '2px 8px',
                              }}
                              onClick={() => {
                                setPlayerTitle(title?.name)
                                setTitlePrice(title?.price)
                                // play({ id: 'title' })
                              }}
                            >
                              <Text
                                css={{
                                  color: playerTitle == title?.name ? '$white' : '$black',
                                }}
                                uppercase
                              >
                                {title.name}
                              </Text>
                            </SelectButton>
                          )}
                        </>
                      ))}
                    </Grid>
                    <Text
                      css={{
                        color: '$grey',
                        marginTop: 16,
                        marginBottom: 8,
                      }}
                      uppercase
                      weight={'bold'}
                    >
                      +0.2ETH
                    </Text>
                    <Grid
                      css={{
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: 8,
                      }}
                    >
                      {titles.map((title, i) => (
                        <>
                          {title.type === 'paid' && (
                            <SelectButton
                              key={i}
                              css={{
                                background: playerTitle == title?.name ? '$black' : '$white',
                                textAlign: 'left',
                                padding: '2px 8px',
                              }}
                              onClick={() => {
                                setPlayerTitle(title?.name)
                                setTitlePrice(title?.price)
                                // play({ id: 'title' })
                              }}
                            >
                              <Text
                                css={{
                                  color: playerTitle == title?.name ? '$white' : '$black',
                                }}
                                uppercase
                              >
                                {title.name}
                              </Text>
                            </SelectButton>
                          )}
                        </>
                      ))}
                    </Grid>
                  </ScrollContainer>
                </WindowContent>
              </Window>
            </Grid>
            <Window
              title="player name"
              css={{
                border: '1px solid $border',
                display: 'flex',
                flexDirection: 'column',
                flex: '0 0 auto',
                overflowY: 'auto',
              }}
            >
              <WindowContent
                css={{
                  padding: 8,
                }}
              >
                <Input
                  placeholder="Player Name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  type="text"
                />
                <Box
                  css={{
                    textAlign: 'left',
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '$2',
                    marginTop: '$2',
                  }}
                >
                  <StatusDot color={'green'} />
                  <Text css={{ fontSize: 14 }} uppercase>
                    {'Available'}
                  </Text>
                </Box>
              </WindowContent>
            </Window> 
            <Box
              css={{
                // border: '1px solid $border',
                display: 'flex',
                flexDirection: 'column',
                flex: '0 0 auto',
                overflowY: 'auto',
              }}
            >
              <WindowContent
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  height: '100%',
                }}
              >
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <List top={true}>
                    <span>COST</span>
                    <p>{totalPrice} ETH</p>
                  </List>
                  <List>
                    <span>ICON</span>
                    <p>{iconPrice}</p>
                  </List>
                  <List>
                    <span>BACKGROUND</span>
                    <p>{bgPrice}</p>
                  </List>
                  <List>
                    <span>FRAME</span>
                    <p>{framePrice}</p>
                  </List>
                  <List>
                    <span>TITLE</span>
                    <p>{titlePrice}</p>
                  </List>
                  <List>
                    <span>NAME</span>
                    <p>{namePrice}</p>
                  </List>
                </Box>
                <Box
                  css={{
                    // border: mode === 'test' ? '4px dashed $red' : '4px dashed $black',
                    marginTop: 16,
                    borderRadius: 14,
                    padding: 8,
                  }}
                >
                  {/* {mode == 'mint' && session?.user.address ? (
                    <Button 
                      variant={'primary'}
                      css={{
                        background: '$black',
                        width: '100%',
                      }}
                      onClick={() => setConfirmMint(true)}
                      disabled={!playerName || !isAvailable}
                    >
                      Mint Player
                    </Button>
                  ) : mode == 'edit' && session?.user.address ? (
                    <Button 
                      variant={'primary'}
                      css={{
                        background: '$black',
                        width: '100%',
                      }}
                      onClick={() => setConfirmMint(true)}
                      disabled={!playerName || !isAvailable}
                    >
                      Mint Player
                    </Button>
                  ) : mode == 'test' ? ( */}
                    <Button
                      variant={'primary'}
                      css={{
                        background: '$red',
                        width: '100%',
                      }}
                      onClick={() => {
                        setMode('mint')
                      }}
                      disabled
                    >
                      Mint Mode
                    </Button>
                  {/* // ) : (
                  //   <ConnectWalletButton 
                  //     size={1}
                  //     variant="primary"
                  //     text="Connect Wallet"
                  //     css={{
                  //       background: '$black100',
                  //       width: '100%',
                  //     }}
                  //   />
                  // )} */}
                </Box>
              </WindowContent>
            </Box>
          </Column>
        </Grid>
      </Wrapper>
    </Box>
  )
};

export default Player;


const Wrapper = styled('div', {
  width: '100%',
  height: '100vh',
  minHeight: '-webkit-fill-available',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflowY: 'auto',

  '@md': {
    background: '$white',
  },
})

const Column = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  overflowY: 'hidden',
})

const SwitchButton = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 10px',
  background: '$cardSel',

  '&:first-child': {
    borderRight: '1px solid $border',
  },

  variants: {
    active: {
      true: {
        background: '$white',
      },
    },
    textActive: {
      true: {
        color: '$white',
        background: '$black',
      },
    },
    frames: {
      true: {
        background: 'rgba($color: #000000, $alpha: 0.1)',
      },
    },
  },
})

const SelectButton = styled('button', {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // backgroundColor: '$black10',

  '&:hover': {
    outline: '2px dashed $stadiumElectric',
  },

  variants: {
    active: {
      true: {
        outline: '3px solid $black'
      },
    },
  },
})

const WindowContent = styled('div', {
  // display: 'flex',
  flex: '1 1 auto',
  overflowY: 'auto',
})

const ScrollContainer = styled('div', {
  overflowY: 'auto',
  height: '100%',
  padding: 6,

  '&::-webkit-scrollbar': {
    width: 8,
  },

  '&::-webkit-scrollbar-track': {
    background: '$black10',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$black50',
  },
})

const PreviewButton = styled('button', {
  padding: '8px 20px',
  background: '$border',
  fontSize: '1rem',
  textTransform: 'uppercase',
  fontWeight: 600,

  '&:hover': {
    background: '$white',
  },
})

const PreviewBox = styled('div', {
  backgroundImage: 'conic-gradient( $black10 25%, #fff 0 50%, $black10 0 75%, #fff 0)',
  backgroundSize: '20px 20px',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})