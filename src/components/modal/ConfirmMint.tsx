import { ENV } from "@/utils/env"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import SimpleModalWrapper from "./common/SimpleModal"
import { Box, Checkbox, Text, Grid, Button } from "../common"

type MintData = {
  title: string | undefined
  name: string | undefined
  color: string | undefined
  icon: string | undefined
  frame: string | undefined
  background: string | undefined
}

type ConfirmMintProps = {
  open: boolean
  name: string | undefined
  onClick?: (e: any) => void
  onClose?: () => void

  //mint process
  ipfsHash?: string
  signature?: string
  onSignature: (signature: string) => void
  onIpfsHash: (ipfsHash: string) => void
  data: MintData

  isError: boolean
  isUploading?: boolean
  isLoading: boolean
  mintError: any
  prepareError: any
}

const ConfirmMint = (props: ConfirmMintProps) => {
  const {
    open,
    name,
    onClick,
    onClose,
    ipfsHash,
    signature,
    onSignature,
    onIpfsHash,
    data,
    isError,
    isUploading,
    isLoading,
    mintError,
    prepareError,
  } = props
  const { address } = useAccount()
  const [accept, setAccept] = useState<boolean>(false)
  const handleAccept = () => {
    setAccept(!accept)
  }
  
  useEffect(() => {
    axios
      .post(`${ENV.BACKEND_API}/api/v1/cards/mint/${address}`, data)
      .then(async (rsp) => {
        if (rsp.status !== 200) {
          throw new Error(rsp.data.message || 'Failed to mint')
        }
        const data: {
          player: {
            title: string
            name: string
            price: number
            nonce: any
            ipfsHash: string
          }
          signature: string
        } = rsp.data

        onIpfsHash(data.player.ipfsHash)
        onSignature(data.signature)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }, [address, data, onIpfsHash, onSignature])

  console.log('mintError', JSON.stringify(mintError?.details))

  return (
    <SimpleModalWrapper open={open} onOpenChange={onClose} title={`MINT PLAYER CARD [${name}]`}>
      <Box
        css={{
          background: '$white100',
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid $black20',
            paddingBottom: '$4',
            marginBottom: '$6',
            gap: '$2',
          }}
        >
          <Text size={"5"} lineHeight={"0"} uppercase font={"tungsten"}>Let’s go over a few things before you mint your player card:</Text>
          <Box 
            css={{ 
              marginTop: '$2',
              display: 'flex',
              flexDirection: 'column',
              gap: '$2',
            }}
          >
            <Text size={"2"} css={{ textAlign: 'justify' }} uppercase><b>+</b> Minting this ID is <b>non-transferable</b>, meaning you cannot send this card to another wallet until you retire it.</Text>
            <Text size={"2"} css={{ textAlign: 'justify' }} uppercase><b>+</b> Your <b>name cannot be changed</b> after minting this ID. You can change your icon, frame, and title at any time.</Text>
            <Text size={"2"} css={{ textAlign: 'justify' }} uppercase><b>+</b> Player Cards give you access to <b>more of STADIUM</b>, from competing in tournaments, to unlocking badges, icons, and other cosmetics, as well as early access playtests to new games.</Text>
          </Box>
        </Box>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '$2',
          }}
        >
          <Text size={"5"} lineHeight={"0"} uppercase font={"tungsten"}>Once you’re all set, make sure you check the box below stating you’ve read all this info!</Text>
          <Box css={{ marginTop: '$2' }}>
            <Checkbox
              name="accept"
              checked={accept}
              label="I agree with the terms of the Player Card System, and terms and conditions of Stadium."
              onChange={handleAccept}
              size={2}
            />
          </Box>
        </Box>
        <Grid
          css={{
            gridTemplateColumns: '1fr 1fr',
            gap: '$2',
            marginTop: '$3',
          }}
        >
          <Button
            variant={"outline"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            css={{
              width: '100%',
            }}
            disabled={ipfsHash ? isLoading || !accept || isError : true}
            onClick={onClick}
          >
            {ipfsHash ? (isLoading ? 'Waiting for approval' : 'Mint Player ID') : 'Preparing'}
          </Button>
        </Grid>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'auto',
            overflow: 'auto',
            textAlign: 'center',
            marginTop: '$4',
          }}
        >
          <Text css={{ color: '$red' }}>{JSON.stringify(mintError.details)}</Text>
        </Box>
      </Box>
    </SimpleModalWrapper>
  )
}

export default ConfirmMint;