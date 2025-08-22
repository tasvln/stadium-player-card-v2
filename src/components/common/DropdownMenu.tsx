import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import NextLink from 'next/link'
import { omit } from 'ramda'
import * as React from 'react'
import { floatingElementKeyframes } from 'src/css/keyframes'

import { styled, globalCss, CSS } from 'stitches.config'

import { onGrid } from '@/utils/styles'

/* DropdownMenu.Content */
const Overlay = styled('div', {
  bottom: 0,
  left: 0,

  width: '100vw',
  height: '100vh',
  position: 'fixed',

  pointerEvents: 'none',
  background: '$black60',
  backdropFilter: 'blur(10px)',

  '@bp1': {
    display: 'none',
  },
})

const ContentInner = styled('div', {
  padding: '$2',
  maxWidth: '80vw',
  overflow: 'auto',
  borderRadius: '$0',
  position: 'relative',
  boxShadow: '$regular2',
  background: '$white100',
})

const ContentOuter = styled(RadixDropdownMenu.Content, {
  transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
  [`${ContentInner}`]: {
    transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
  },
  '@media (prefers-reduced-motion: no-preference)': {
    // When the Content appears above the trigger
    '&[data-side=top][data-state=open]': {
      [`${ContentInner}`]: {
        animation: `${floatingElementKeyframes.fadeInUp} $transitions$1 $transitions$ease`,
      },
      [`${Overlay}`]: {
        animation: `${floatingElementKeyframes.fadeIn} $transitions$1 $transitions$ease`,
      },
    },
    '&[data-side=top][data-state=closed]': {
      // We need this fake animation here for Radix to know there's some animation on the parent container
      animation: `${floatingElementKeyframes.fakeAnimaton} $transitions$1 $transitions$ease`,
      [`${ContentInner}`]: {
        // Otherwise the child will be unmounted before the animation is done
        animation: `${floatingElementKeyframes.fadeOutUp} $transitions$1 $transitions$ease`,
      },
      [`${Overlay}`]: {
        animation: `${floatingElementKeyframes.fadeOut} $transitions$1 $transitions$ease`,
      },
    },

    // When the Content appears below the trigger
    '&[data-side=bottom][data-state=open]': {
      [`${ContentInner}`]: {
        animation: `${floatingElementKeyframes.fadeInDown} $transitions$1 $transitions$ease`,
      },
      [`${Overlay}`]: {
        animation: `${floatingElementKeyframes.fadeIn} $transitions$1 $transitions$ease`,
      },
    },
    '&[data-side=bottom][data-state=closed]': {
      // We need this fake animation here for Radix to know there's some animation on the parent container
      animation: `${floatingElementKeyframes.fakeAnimaton} $transitions$1 $transitions$ease`,
      [`${ContentInner}`]: {
        // Otherwise the child will be unmounted before the animation is done
        animation: `${floatingElementKeyframes.fadeOutDown} $transitions$1 $transitions$ease`,
      },
      [`${Overlay}`]: {
        animation: `${floatingElementKeyframes.fadeOut} $transitions$1 $transitions$ease`,
      },
    },
  },
})

type ContentProps = React.ComponentProps<typeof RadixDropdownMenu.Content> & {
  minWidth?: CSS['minWidth']
}

const Content = React.forwardRef(function Content(
  props: ContentProps,
  /* We need to forward the ref here because Radix won't add an exit transition */
  ref: React.Ref<HTMLDivElement> | undefined
) {
  const { children, minWidth, ...rest } = props
  return (
    <ContentOuter {...rest} ref={ref}>
      <Overlay />
      <ContentInner css={{ minWidth }}>{children}</ContentInner>
    </ContentOuter>
  )
})

Content.defaultProps = {
  align: 'start',
  collisionPadding: onGrid(2),
  sideOffset: onGrid(2),
}

/* DropdownMenu.Item */
const sharedBaseStyles = {
  gap: '$3',
  width: '100%',
  display: 'flex',
  alignItems: 'center',

  paddingY: '$3',
  paddingX: '$4',

  color: '$black100',
  cursor: 'pointer',
  transition: 'background $1 $ease, color $1 $ease',
  borderRadius: '$2',

  fontSize: '$3',
  fontFamily: '$body',
  lineHeight: '$2',
  textDecoration: 'none',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$black10',
  },

  '@hover': {
    '&:hover': {
      backgroundColor: '$black5',
    },
  },

  '&[data-disabled]': {
    color: '$black50',
    backgroundColor: 'transparent !important',
  },

  variants: {
    variant: {
      danger: {
        color: '$red100',
      },
    },
  },
}

const BaseItemLink = styled('a', {
  ...sharedBaseStyles,
  textDecoration: 'none',
})

const BaseItem = styled(RadixDropdownMenu.Item, {
  ...sharedBaseStyles,
})

type BaseItemProps = React.ComponentProps<typeof BaseItem>

type BaseDropdownItemProps = {
  children: React.ReactNode
  /** @warn not used by inside DropdownMenu.Item */
  icon?: React.ReactNode
  enabled?: boolean
  variant?: BaseItemProps['variant']
}

export type DropdownItemTypeProps =
  | {
      type?: 'button'
      onClick(): void
    }
  | {
      type: 'link'
      href: string
      onClick?(): void
    }
  | {
      type: 'external-link'
      href: string
      onClick?(): void
    }

export type DropdownItemProps = BaseDropdownItemProps & DropdownItemTypeProps

function Item(props: DropdownItemProps) {
  switch (props.type) {
    case 'link': {
      const { children, href, ...rest } = props
      const baseProps = omit(['type'], rest)
      return (
        <NextLink href={href} passHref>
          <RadixDropdownMenu.Item {...baseProps} asChild>
            <BaseItemLink>{children}</BaseItemLink>
          </RadixDropdownMenu.Item>
        </NextLink>
      )
    }
    case 'external-link': {
      const { children, href, ...rest } = props
      const baseProps = omit(['type'], rest)
      return (
        <RadixDropdownMenu.Item {...baseProps} asChild>
          <BaseItemLink href={href} target="_blank" rel="noreferrer">
            {children}
          </BaseItemLink>
        </RadixDropdownMenu.Item>
      )
    }
    default: {
      return <BaseItem {...props} />
    }
  }
}

/* Global styles needed to turn the dropdown menu into a sheet on mobile */
export const globalStyles = globalCss({
  ['div[data-radix-popper-content-wrapper]']: {
    zIndex: '999 !important',
  },
  '@bp1-max': {
    ['div[data-radix-popper-content-wrapper]']: {
      transform: 'none !important',
      top: 'auto !important',
      bottom: '0 !important',
      left: '0 !important',
      width: '100% !important',

      [`${ContentOuter}`]: {
        [`${ContentInner}`]: {
          width: '100%',
          maxWidth: '100%',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          transform: 'translate3d(0, 100%, 0)',

          paddingTop: '$6',
          paddingBottom: 'calc($6 + env(safe-area-inset-bottom))',
        },

        '@media (prefers-reduced-motion: no-preference)': {
          '&[data-state=open]': {
            [`${ContentInner}`]: {
              animation: `${floatingElementKeyframes.longFadeInUp} $transitions$2 $transitions$ease forwards !important`,
              animationDelay: '125ms',
            },
          },
          '&[data-state=closed]': {
            [`${ContentInner}`]: {
              animation: `${floatingElementKeyframes.longFadeInDown} $transitions$2 $transitions$ease forwards !important`,
            },
          },
        },
      },
    },
  },
})

const Dropdown = {
  Content,
  globalStyles,
  Item,
  Portal: RadixDropdownMenu.Portal,
  Root: RadixDropdownMenu.Root,
  Separator: RadixDropdownMenu.Separator,
  Trigger: RadixDropdownMenu.Trigger,
}

export default Dropdown
