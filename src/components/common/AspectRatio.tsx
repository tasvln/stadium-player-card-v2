import { ComponentProps } from '@stitches/react'
import { ReactNode } from 'react'

import Box from './Box'

export type StitchesBoxProps = ComponentProps<typeof Box>
interface AspectRatioProps {
  children?: ReactNode
  // null is supported here to opt-out of locking the aspect ratio
  ratio: number | null
  css?: StitchesBoxProps['css']
}

export default function AspectRatio(props: AspectRatioProps) {
  const { children, ratio = 4 / 3, css } = props
  return (
    <Box
      css={{
        ...css,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {ratio && (
        <Box
          css={{
            width: '100%',
            height: 0,
            paddingBottom: 100 / ratio + '%',
          }}
        />
      )}
      <Box
        css={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        {children && children}
      </Box>
    </Box>
  )
}
