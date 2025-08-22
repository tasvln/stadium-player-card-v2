import { styled } from 'stitches.config'
import Box from './Box'

const Stack = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  variants: {
    center: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    expandVertical: {
      true: {
        flex: 1,
      },
    },
  },
})

export default Stack
