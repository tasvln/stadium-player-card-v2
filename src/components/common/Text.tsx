import { ComponentProps, VariantProps } from '@stitches/react'

import { styled } from 'stitches.config'

type TextProps = ComponentProps<typeof Text>
type TextVariants = VariantProps<typeof Text>

const Text = styled('div', {
  variants: {
    size: {
      0: { fontSize: '$0', letterSpacing: '$0' },
      1: { fontSize: '$1', letterSpacing: '$0' },
      2: { fontSize: '$2', letterSpacing: '$0' },
      3: { fontSize: '$3', letterSpacing: '$0' },
      4: { fontSize: '$4', letterSpacing: '$-1' },
      5: { fontSize: '$5', letterSpacing: '$-2' },
      6: { fontSize: '$6', letterSpacing: '$-2' },
      7: { fontSize: '$7', letterSpacing: '$-2' },
      8: { fontSize: '$8', letterSpacing: '$-2' },
      9: { fontSize: '$9', letterSpacing: '$-3' },
      10: { fontSize: '$10', letterSpacing: '$-3' },
    },
    lineHeight: {
      0: { lineHeight: '$0' },
      1: { lineHeight: '$1' },
      2: { lineHeight: '$2' },
      3: { lineHeight: '$3' },
    },
    weight: {
      regular: { fontWeight: '$regular' },
      medium: { fontWeight: '$medium' },
      semibold: { fontWeight: '$semibold' },
      bold: { fontWeight: '$bold' },
    },
    color: {
      error: {
        color: '$red100',
      },
      strong: {
        color: '$black100',
      },
      dim: {
        color: '$black70',
      },
      light: {
        color: '$white100',
      },
      subtle: {
        color: '$subTextColor',
      },
    },
    uppercase: {
      true: {
        textTransform: 'uppercase',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    ellipsis: {
      true: {
        truncate: true,
      },
    },
    center: {
      true: {
        textAlign: 'center',
      },
    },
    font: {
      tungsten: {
        fontFamily: 'Tungsten',
      },
    },
    outline: {
      true: {
        fontFamily: 'Tungsten',
        '-webkit-text-stroke': '1px #53697A',
        // '-webkit-text-fill-color': 'rgba(255,255,255,.6)',
        background: 'linear-gradient(rgba(255,255,255,.05), rgba(255,255,255,.6))',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        textTransform: 'uppercase',
        userSelect: 'none',
      },
    },
  },
})

export type { TextProps, TextVariants }
export default Text
