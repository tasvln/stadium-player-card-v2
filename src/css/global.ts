import { globalCss } from 'stitches.config'

export const globalStyles = globalCss({
  '*': {
    outline: 'none',
    boxSizing: 'border-box',
    scrollBehavior: 'smooth',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },

  '#__next': {
    display: 'flex',
    flexDirection: 'column',
  },

  '@font-face': {
    fontFamily: 'Tungsten',
    src: 'url("/fonts/Tungsten-Bold.ttf")',
  },

  body: {
    margin: 0,
    padding: 0,
    scrollBehavior: 'smooth',
    fontFamily: '$jb',
    color: '$black100',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    transition: 'background-color $2 $ease',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },

  'p,a': {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '1rem',
    lineHeight: 'initial',
    margin: 0,
    padding: 0,
  },

  button: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    padding: 0,

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: .5,
      pointerEvents: 'none',
    },
  },

  'input, select, textarea, button': {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'none',
    '-webkit-appearance': 'none',
  },
})
