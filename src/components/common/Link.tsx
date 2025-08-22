import { ComponentProps, VariantProps } from '@stitches/react'

import { styled } from 'stitches.config'

import Text from 'src/components/common/Text'

type LinkProps = ComponentProps<typeof Link>
type LinkVariants = VariantProps<typeof Link>

const Link = styled('a', Text, {
  // Resets to handle as="button", for buttons which look like anchors
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color $1 $ease, background-color $1 $ease, opacity $1 $ease, outline $1 $ease, transform $1 $ease',

  '&:focus-visible': {
    outline: '4px solid $black30',
    outlineOffset: '4px',
    borderRadius: '$2',
  },

  '&:active': {
    transform: 'translate3d(0, 1px, 0)',
  },

  variants: {
    isDark: {
      true: {},
    },
    active: {
      true: {
        opacity: 1,
      },
    },
    hasUnderline: {
      true: {
        display: 'inline-block',
        textDecorationColor: 'currentColor',
        textDecorationLine: 'underline',
        textDecorationThickness: '1px',
        textUnderlineOffset: '3px',
      },
    },
    variant: {
      primary: {
        color: '$black70',
        '@hover': {
          '&:hover': {
            color: '$black100',
          },
        },
      },
      strong: {
        color: '$black100',
        '@hover': {
          '&:hover': {
            color: '$black70',
          },
        },
      },
      light: {
        color: '$subTextColor',
        '@hover': {
          '&:hover': {
            color: '$white80',
          },
        },
      },
      nav: {
        opacity: 0.3,

        '&:hover': {
          opacity: 1,
        },
      }
    },
  },
  compoundVariants: [
    {
      isDark: true,
      variant: 'primary',
      css: {
        color: '$white70',
        '@hover': {
          '&:hover': {
            color: '$white100',
          },
        },
      },
    },
    {
      isDark: true,
      variant: 'strong',
      css: {
        color: '$white100',
        '@hover': {
          '&:hover': {
            color: '$white70',
          },
        },
      },
    },
  ],
})

export type { LinkProps, LinkVariants }
export default Link
