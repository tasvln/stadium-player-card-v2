import { CSS } from 'stitches.config'

export const countCss: CSS = {
  lineHeight: '$0',
  borderRadius: '$round',
  position: 'relative',
  transition: 'background-color $1 $ease, color $1 $ease',
}

export const primaryButtonCss: CSS = {
  // TODO: add primary button styles for hover colors
  backgroundColor: '$buttonBg',
  boxShadow: 'none',
  color: '$white100',
  fontWeight: '$medium',

  '@hover': {
    '&:hover': {
      boxShadow: '$regular1',
      backgroundColor: '$black100',
      transform: 'translate3d(0, -1px, 0)',
    },
  },
  '&:active': {
    backgroundColor: '$black90',
    boxShadow: 'none',
    transform: 'translate3d(0, 2px, 0)',
  },
  '&:focus-visible': {
    borderColor: '$white100',
    outline: '4px solid $black30',
  },
  '&:disabled': {
    backgroundColor: '$black5',
    boxShadow: 'none',
    color: '$black50',
    transform: 'none',

    '&:active': {
      backgroundColor: '$black50',
    },
  },
}
