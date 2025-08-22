import { CSS } from 'stitches.config'

export const cardBorder: CSS = {
  '&:after': {
    width: '100%',
    height: '100%',
    display: 'block',
    borderRadius: '$4',
    pointerEvents: 'none',
    boxShadow: '0 0 0 1px $colors$black5',

    position: 'absolute',
    content: '""',
    top: 0,
    left: 0,
  },
}
