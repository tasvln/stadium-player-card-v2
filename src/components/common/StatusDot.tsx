import { styled } from 'stitches.config'

const StatusDot = styled('div', {
  width: '12px',
  height: '12px',
  borderRadius: '$round',
  border: '1px solid $border',
  variants: {
    color: {
      red: {
        backgroundColor: '$red100',
      },
      yellow: {
        backgroundColor: '$yellow',
      },
      green: {
        backgroundColor: '$offGreen',
      },
    },
  },
  defaultVariants: {
    color: 'red',
  },
})

export default StatusDot
