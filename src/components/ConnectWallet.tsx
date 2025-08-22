import React from 'react'
import { CSS, styled } from 'stitches.config'

import { ConnectKitButton } from 'connectkit'
import Button from '@/components/common/Button'

// Set visibility as show for default argument
const ConnectWalletButton: React.FC<{
  variant?: 'ghost' | 'primary'
  css?: CSS
  size?: 1 | 2 | 0
  text?: React.ReactNode
}> = ({ variant, css, size = 2, text }) => {
  return (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <Button
            size={size}
            variant={typeof variant === 'undefined' ? 'ghost' : variant}
            onClick={show}
            // icon
            css={css}
          >
            {text ? text : <ButtonText>Connect Wallet</ButtonText>}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default ConnectWalletButton

const ButtonText = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 70,
  textAlign: 'center',
  '@bp0': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
  },
})
