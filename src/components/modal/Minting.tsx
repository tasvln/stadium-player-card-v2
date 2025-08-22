import { useEffect, useState } from "react"
import SimpleModalWrapper from "./common/SimpleModal"
import { useAccount, useWaitForTransaction } from "wagmi"
import helpers from "@/utils/helpers"
import { useRouter } from "next/router"
import { Box, Link, Button, Text } from "../common"

type MintingProps = {
  open: boolean 
  hash?: string | undefined
  error?: Error | null
  onClose?: () => void
}

const Minting = (props: MintingProps) => {
  const { open, hash, error, onClose } = props
  
  const [minted, setMinted] = useState<boolean>(false)
  const [errored, setErrored] = useState<boolean>(false)

  const { address } = useAccount()
  const { isSuccess, isLoading } = useWaitForTransaction({
    confirmations: 2,
    hash: hash as `0x${string}`,
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log(`Player minted! ${helpers.eth.buildEtherscanTxLink(data.transactionHash)}`)
    },
    onSettled(data, error) {
      // eslint-disable-next-line no-console
      console.log('Settled', { data, error })
      if (error) setErrored(true)
      else setMinted(true)
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (minted) router.push(`/players/${address}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minted])

  return (
    <SimpleModalWrapper
      open={open}
      onOpenChange={onClose}
      title={isSuccess ? 'STATUS: MINTED!' : errored ? 'STATUS: MINT FAILED' : 'STATUS: MINTING IN PROGRESS...'}
    >
      <Box
        css={{
          background: '$white100',
          marginTop: -20,
        }}
      >
        {!errored && typeof hash !== 'undefined' && (
          <Box>
            <Link href={helpers.eth.buildEtherscanTxLink(hash as string)} target="_blank" rel="noreferrer">
              <Button 
                variant={'base'}
                css={{
                  width: '100%',
                }}
              >
                View on Etherscan
              </Button>
            </Link>
          </Box>
        )}
        {errored && typeof hash !== 'undefined' && (
          <Box>
            <Text css={{ textAlign: 'justify', marginBottom: '$2' }} uppercase>
              There was an error minting your player, please try again. If you think this is a bug, please{' '}
              <a href="https://twitter.com/projectstadium"><b>contact support</b></a>.
            </Text>
            <Link href={helpers.eth.buildEtherscanTxLink(hash as string)} target="_blank" rel="noreferrer">
              <Button 
                variant={'base'}
                css={{
                  width: '100%',
                }}
              >
                View on Etherscan
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </SimpleModalWrapper>
  )
}

export default Minting