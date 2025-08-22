import { ComponentProps, VariantProps } from '@stitches/react'

import { styled } from 'stitches.config'

import { primaryButtonCss } from 'src/css/button'

type ButtonProps = ComponentProps<typeof Button>
type ButtonVariants = VariantProps<typeof Button>

const Button = styled('button', {
  paddingY: 0,
  cursor: 'pointer',
  appearance: 'none',

  borderRadius: '$2',
  boxSizing: 'border-box',
  border: '1px solid transparent',
  backgroundColor: 'transparent',

  willChange: 'transform',
  transition:
    'background-color $1 $ease, border $1 $ease, box-shadow $1 $ease, color $1 $ease, outline $1 $ease, transform $1 $ease',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: '$body',
  fontWeight: '$semibold',
  height: '$formElement1',

  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  svg: {
    display: 'block',
  },

  variants: {
    size: {
      0: {
        height: '$formElement0',
        paddingX: '$4',
        fontSize: '$1',
      },
      1: {
        height: '$formElement1',
        paddingX: '$6',
        fontSize: '$2',
      },
      2: {
        height: '$formElement2',
        paddingX: '$7',
        fontSize: '$2',
      },
      'view-nav': { paddingX: 10, fontSize: '$2', userSelect: 'none', whiteSpace: 'nowrap' },
    },
    icon: {
      true: {},
      standalone: {},
    },
    variant: {
      base: {
        '&:focus-visible': {
          outline: 'none',
        },
      },
      primary: primaryButtonCss,
      outline: {
        backgroundColor: '$white100',
        boxShadow: '$regular0',
        color: '$black100',

        '@hover': {
          '&:hover': {
            borderColor: '$black100',
            boxShadow: '$regular0, inset 0px 0px 0px 1px $colors$black100',
          },
        },
        '&:active, &[data-state=open]': {
          borderColor: '$black100',
          backgroundColor: '$black5',
          transform: 'translate3d(0, 2px, 0)',
          boxShadow: '$regular0, inset 0px 0px 0px 1px $colors$black100',
        },
        '&:focus-visible': {
          borderColor: '$black100',
          outline: '4px solid $black30',
        },
        '&:disabled': {
          boxShadow: '$regular0',
          color: '$black40',
          '@hover': {
            '&:hover': {
              borderColor: 'transparent',
              boxShadow: '$regular0',
            },
          },
          '&:active, &[data-state=open]': {
            backgroundColor: '$white100',
            transform: 'none',
          },
        },
      },
      raised: {
        backgroundColor: '$white100',
        borderColor: 'transparent',
        boxShadow: '$soft0',
        color: '$black100',

        '@hover': {
          '&:hover': {
            borderColor: 'transparent',
            boxShadow: '$soft1',
            transform: 'translate3d(0, -1px, 0)',
          },
        },
        '&:active, &[data-state=open]': {
          borderColor: 'transparent',
          boxShadow: '$soft0',
          transform: 'translate3d(0, 2px, 0)',
        },

        '&:focus-visible': {
          borderColor: '$black100',
          outline: '4px solid $black30',
        },
        '&:disabled': {
          color: '$black40',
          transform: 'none',
          borderColor: 'transparent',
          '@hover': {
            '&:hover': {
              boxShadow: '$soft0',
            },
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$black100',

        '@hover': {
          '&:hover': {
            backgroundColor: '$black5',
          },
        },
        '&:active, &[data-state=open]': {
          backgroundColor: '$black5',
          transform: 'translate3d(0, 2px, 0)',
        },
        '&:focus-visible': {
          borderColor: '$black100',
          outline: '4px solid $black30',
        },
        '&:disabled': {
          color: '$black40',
          '@hover': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          '&:active, &[data-state=open]': {
            transform: 'none',
          },
        },
      },
      blur: {
        backgroundColor: '$white20',
        backdropFilter: 'blur(10px)',
        color: '$white100',

        '@hover': {
          '&:hover': {
            backgroundColor: '$white100',
            boxShadow: '$regular1',
            color: '$black100',
            transform: 'translate3d(0, -1px, 0)',
          },
        },
        '&:active, &[data-state=open]': {
          boxShadow: 'none',
          transform: 'translate3d(0, 2px, 0)',
        },
        '&:focus-visible': {
          borderColor: '$white100',
          outline: '4px solid $white50',
        },
        '&:disabled': {
          backgroundColor: '$white60',
          backdropFilter: 'blur(10px)',
          color: '$black60',

          '@hover': {
            '&:hover': {
              transform: 'none',
              boxShadow: 'none',
            },
          },
        },
      },
      danger: {
        backgroundColor: '$black100',
        color: '$white100',

        '@hover': {
          '&:hover': {
            boxShadow: '$regular1',
            backgroundColor: '$red100',
            transform: 'translate3d(0, -1px, 0)',
          },
        },
        '&:active, &[data-state=open]': {
          backgroundColor: '$red100',
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

          '&:active, &[data-state=open]': {
            backgroundColor: '$black50',
          },
        },
      },
      disabled: {
        backgroundColor: 'none',
        color: '#757575',

        '&:hover': {
          backgroundColor: 'none',
        },
      },
      inactive: {
        backgroundColor: '$grey100',
        color: '#fff',
      },
      uiToggle: {
        display: 'flex',
        paddingX: 16,
        paddingY: 0,
        backgroundColor: '$white100',
        borderRadius: 9999,
        textTransform: 'capitalize',
        fontSize: 14,
        fontWeight: 700,
        boxShadow: '$regular0',
        height: 40,
        gap: 8,
        userSelect: 'none',
      },
      'view-nav': {
        backgroundColor: '$white100',
      },
      'profile-outline': {
        backgroundColor: 'transparent',
        border: '2px solid #213D52',

        '&:hover': {
          backgroundColor: '#213d54',
          color: '$white100',
        },
      },
      dimmed: {
        background: '#D6DCE0',
        border: '2px solid transparent',

        '&:hover': {
          border: '2px solid #213d54',
        },
      },
    },
  },
  defaultVariants: {
    size: 1,
    variant: 'outline',
  },
  compoundVariants: [
    /*
     * Button with icon in size 0 */
    {
      size: 0,
      icon: true,
      css: {
        paddingX: '$4',
        svg: {
          width: 'auto',
          height: '$icon0',
        },
        'svg:first-child': {
          marginRight: '6px',
        },
        'svg:last-child': {
          marginLeft: '6px',
        },
      },
    },
    {
      size: 0,
      icon: 'standalone',
      css: {
        padding: 0,
        borderRadius: '50%',
        width: '$formElement0',
        height: '$formElement0',
        svg: {
          width: 'auto',
          height: '$icon1',
        },
      },
    },

    /*
     * Button with icon in size 1 */
    {
      size: 1,
      icon: true,
      css: {
        paddingRight: '$4',
        paddingLeft: '$5',
        svg: {
          width: 'auto',
          height: '$icon1',
        },
        'svg:first-child': {
          marginRight: '$2',
        },
        'svg:last-child': {
          marginLeft: '$2',
        },
      },
    },
    {
      size: 1,
      icon: 'standalone',
      css: {
        padding: 0,
        borderRadius: '50%',
        width: '$formElement1',
        height: '$formElement1',
        svg: {
          height: '$icon2',
          width: 'auto',
        },
      },
    },

    /*
     * Button with icon in size 2 */
    {
      size: 2,
      icon: true,
      css: {
        paddingX: '$6',
        svg: {
          width: 'auto',
          height: '$icon2',
        },
        'svg:first-child': {
          marginRight: '$3',
        },
        'svg:last-child': {
          marginLeft: '$3',
        },
      },
    },
    {
      size: 2,
      icon: 'standalone',
      css: {
        padding: 0,
        borderRadius: '50%',
        width: '$formElement2',
        height: '$formElement2',
        svg: {
          height: '$icon3',
          width: 'auto',
        },
      },
    },
  ],
})

export type { ButtonProps, ButtonVariants }
export default Button
