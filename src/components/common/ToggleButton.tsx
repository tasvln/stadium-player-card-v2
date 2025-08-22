import { ComponentProps, VariantProps } from '@stitches/react'

import { styled } from 'stitches.config'

import { primaryButtonCss } from '@/css/button'

import Button from './Button'

type ToggleButtonProps = ComponentProps<typeof ToggleButton>
type ToggleButtonVariants = VariantProps<typeof ToggleButton>

const ToggleButton = styled(Button, {
  variants: {
    variant: {
      outline: {},
      ghost: {},
      blur: {},
      raised: {},
    },
    size: {
      0: {},
      1: {},
      2: {},
    },
    pressed: {
      true: {},
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
  compoundVariants: [
    {
      pressed: true,
      variant: 'raised',
      css: primaryButtonCss,
    },
    {
      pressed: true,
      variant: 'outline',
      css: primaryButtonCss,
    },
    {
      pressed: true,
      variant: 'ghost',
      css: {
        backgroundColor: '$black5',
        '@hover': {
          '&:hover': {
            transform: 'translate3d(0, -1px, 0)',
          },
        },
      },
    },
    {
      pressed: true,
      variant: 'blur',
      css: {
        backgroundColor: '$white100',
        color: '$black100',
      },
    },
  ],
})

export type { ToggleButtonProps, ToggleButtonVariants }
export default ToggleButton
