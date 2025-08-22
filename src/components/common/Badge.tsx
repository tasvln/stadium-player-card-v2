import { styled } from 'stitches.config'

const Badge = styled('div', {
  lineHeight: '$1',
  letterSpacing: '$1',
  fontWeight: '$medium',

  borderRadius: '$round',
  border: '1px solid transparent',

  variants: {
    mono: {
      true: {
        fontFamily: '$mono',
      },
      false: {
        fontFamily: '$body',
      },
    },
    uppercase: {
      true: {
        textTransform: 'uppercase',
      },
    },
    size: {
      0: {
        fontSize: '$0',
        paddingX: '$2',
        paddingY: '4px',
      },
      1: {
        fontSize: '$1',
        paddingX: '14px',
        paddingY: '6px',
      },
      2: {
        fontSize: '$2',
        paddingX: '$4',
        paddingY: '6px',
      },
    },
    variant: {
      primary: {
        color: '$white100',
        backgroundColor: '$black100',
      },
      light: {
        color: '$black70',
        backgroundColor: '$black5',
      },
      outline: {
        color: '$black100',
        borderColor: '$black10',
      },
      white: {
        color: '$black100',
        backgroundColor: '$white100',
      },
      blur: {
        color: '$white100',
        backgroundColor: '$white20',
        backdropFilter: 'blur(10px)',
      },
      blue: {
        color: '$white100',
        backgroundColor: '#0094FF',
      },
    },
  },
})

Badge.defaultProps = {
  size: 0,
  mono: false,
  variant: 'light',
}

export default Badge
