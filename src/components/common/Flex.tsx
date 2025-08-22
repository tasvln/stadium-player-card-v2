import { styled } from 'stitches.config'
import Box from './Box'

const Flex = styled(Box, {
  display: 'flex',
  variants: {
    center: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    expandVertical: {
      true: {
        flexDirection: 'column',
        flex: 1,
      },
    },
  },
})

export default Flex
