import * as Dialog from '@radix-ui/react-dialog'
import { ComponentProps } from '@stitches/react'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import { TouchEvent } from 'react'
import { floatingElementKeyframes } from 'src/css/keyframes'

import { styled, keyframes, CSS } from 'stitches.config'
import Button from './Button'
import Text from './Text'
import { H3Heading } from './Heading'

// Dialog overlay
const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,

  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',

  background: '$black60',
  backdropFilter: 'blur(10px)',

  '@bp1-max': {
    '& > *': {
      width: '100%',
    },
  },

  '@bp1': {
    alignItems: 'center',
    justifyContent: 'center',
  },

  "&[data-state='open']": {
    animation: `${floatingElementKeyframes.fadeIn} $transitions$1 $transitions$ease forwards`,
  },
  "&[data-state='closed']": {
    animation: `${floatingElementKeyframes.fadeOut} $transitions$1 $transitions$ease forwards`,
  },
})

// Modal body
const Body = styled('div', {
  flex: 1,
  overflow: 'auto',
  scrollbarWidth: 'thin',
})

// Footer
const Footer = styled('div', {
  padding: '$4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  background: '$white80',
  backdropFilter: 'blur(10px)',

  bottom: 0,
  left: 0,
  width: '100%',
  position: 'absolute',

  [`${Button}:only-child`]: {
    width: '100%',
  },
})

// Modal header
type HeaderProps = {
  children?: React.ReactNode
  onBackClick?: () => void
  title?: string
  slim?: boolean
  backgroundColor?: string
}

function Header(props: HeaderProps) {
  // TODO: document usage: if children, do not pass title and vice versa
  const { onBackClick, title, children, backgroundColor = 'white100' } = props

  // TODO: deprecate title and check if children is string to adjust positioning
  return (
    <HeaderPrimitive css={{ zIndex: 1, backgroundColor }} slim={props.slim}>
      {!onBackClick && !title && !children && <ShadowButton />}
      {onBackClick && (
        <Button icon="standalone" onClick={onBackClick} size={0} variant="ghost">
          <ArrowLeftIcon />
        </Button>
      )}
      {children}
      {title && (
        <>
          {!onBackClick && <ShadowButton />}
          <Dialog.Title asChild>
            {!props.slim ? (
              <H3Heading weight="semibold">{title}</H3Heading>
            ) : (
              <Text weight="bold" uppercase>
                {title}
              </Text>
            )}
          </Dialog.Title>
        </>
      )}
      <Close>
        <CloseIcon />
      </Close>
    </HeaderPrimitive>
  )
}

function CloseButton() {
  return (
    <PinTopRight>
      <Close css={{ backdropFilter: 'blur(10px)' }}>
        <CloseIcon />
      </Close>
    </PinTopRight>
  )
}

// This is needed to visually align the title in the middle when there's
// nothing within the left hand-side of the header.
export const ShadowButton = styled('div', {
  width: '$formElement0',
  height: '$formElement0',
})

export const HeaderPrimitive = styled('div', {
  padding: '$4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$white80',
  backdropFilter: 'blur(10px)',
  top: 0,
  left: 0,
  width: '100%',
  position: 'absolute',

  variants: {
    slim: {
      true: {
        padding: 0,
        height: 'auto !important',
      },
    },
  },
})

export const Close = styled(Dialog.Close, Button, {
  flexShrink: 0,
  defaultVariants: {
    size: 0,
    icon: 'standalone',
    variant: 'ghost',
  },
})

const PinTopRight = styled('div', {
  zIndex: 1,
  top: '$4',
  right: '$4',
  position: 'absolute',
})

// Dialog content
const contentShow = keyframes({
  from: { opacity: 0, transform: 'translate3d(0, 5vh, 0)' },
  to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
})
const contentHide = keyframes({
  from: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  to: { opacity: 0, transform: 'translate3d(0, 5vh, 0)' },
})

type ContentPrimitiveProps = ComponentProps<typeof ContentPrimitive>

const ContentPrimitive = styled(Dialog.Content, {
  $$headerHeight: '68px',
  $$footerHeight: '88px',

  width: '100%',
  maxHeight: '80vh',
  background: '$white100',
  borderTopLeftRadius: '$4',
  borderTopRightRadius: '$4',
  overflow: 'hidden',
  boxShadow: '$regular2',

  display: 'flex',
  flexDirection: 'column',

  [`${HeaderPrimitive}`]: {
    boxShadow: '0px 0px 0px 1px $colors$black5',
    height: '$$headerHeight',
  },

  [`${Footer}`]: {
    padding: '$5',
    height: '$$footerHeight',
    boxShadow: '0px -1px 0px 0px $colors$black5',
  },

  '&:focus': {
    outline: 'none',
  },

  // Full height slide in transition on mobile
  '@bp1-max': {
    transform: 'translate3d(0, 100%, 0)',
    "&[data-state='open']": {
      animation: `${floatingElementKeyframes.longFadeInUp} $transitions$2 $transitions$ease forwards`,
    },
    "&[data-state='closed']": {
      animation: `${floatingElementKeyframes.longFadeInDown} $transitions$2 $transitions$ease forwards`,
    },
  },

  '@bp1': {
    maxWidth: 480,
    borderRadius: '$4',

    // A subtler, slide/fade in transition on desktop
    opacity: 0,
    "&[data-state='open']": {
      animation: `${contentShow} $transitions$2 $transitions$ease forwards`,
      animationDelay: '125ms',
    },
    "&[data-state='closed']": {
      animation: `${contentHide} $transitions$2 $transitions$ease forwards`,
    },
  },

  variants: {
    hasHeader: { true: {}, false: {} },
    hasFooter: { true: {}, false: {} },
    size: {
      0: {
        [`${Body}`]: {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      },
      1: {
        [`${Body}`]: {
          paddingX: '$6',
          paddingTop: '$7',
          paddingBottom: 'calc($6 + env(safe-area-inset-bottom))',
        },
      },
      2: {
        [`${Body}`]: {
          paddingX: '$8',
          paddingTop: '$8',
          paddingBottom: 'calc($8 + env(safe-area-inset-bottom))',
        },
      },
    },
    pt: {
      false: {
        paddingTop: 0,
      },
    },
    squared: {
      true: {
        [`${Body}`]: {
          border: '4px solid #d2d2d2',
        },
        borderRadius: '$0',
      },
    },
  },
  compoundVariants: [
    // With Header
    {
      size: 0,
      hasHeader: true,
      css: {
        [`${Body}`]: {
          paddingTop: '$$headerHeight',
        },
      },
    },
    {
      size: 1,
      hasHeader: true,
      css: {
        [`${Body}`]: {
          paddingTop: 'calc($$headerHeight + $1)',
        },
      },
    },
    {
      size: 1,
      pt: false,
      hasHeader: true,
      css: {
        [`${Body}`]: {
          paddingTop: 36,
        },
      },
    },
    {
      size: 2,
      hasHeader: true,
      css: {
        [`${Body}`]: {
          paddingTop: 'calc($$headerHeight + $8)',
        },
      },
    },
    // With Footer
    {
      size: 0,
      hasFooter: true,
      css: {
        [`${Body}`]: {
          paddingBottom: 'calc($$footerHeight + env(safe-area-inset-bottom))',
        },
      },
    },
    {
      size: 1,
      hasFooter: true,
      css: {
        [`${Body}`]: {
          paddingBottom: 'calc($$footerHeight + $6 + env(safe-area-inset-bottom))',
        },
      },
    },
    {
      size: 2,
      hasFooter: true,
      css: {
        [`${Body}`]: {
          paddingBottom: 'calc($$footerHeight + $8 + env(safe-area-inset-bottom))',
        },
      },
    },
  ],
  defaultVariants: {
    size: 1,
  },
})

type ContentProps = Dialog.DialogContentProps & {
  children: React.ReactNode
  size?: ContentPrimitiveProps['size']
  header?: React.ReactNode
  footer?: React.ReactNode
  backgroundColor?: string
  squared?: boolean
  paddingTop?: boolean
  css?: CSS
}

function Box(props: ContentProps) {
  const { children, size = 1, header, footer, ...contentProps } = props
  return (
    <ContentPrimitive
      css={{ backgroundColor: props.backgroundColor ?? '$white100' }}
      hasFooter={Boolean(footer)}
      hasHeader={Boolean(header)}
      size={size}
      squared={props?.squared}
      pt={props?.paddingTop}
      {...contentProps}
    >
      {header || <CloseButton />}
      <Body css={props?.css}>{children}</Body>
      {footer}
    </ContentPrimitive>
  )
}

function Content(props: ContentProps) {
  return (
    <Dialog.Portal>
      <Overlay>
        <Box {...props} />
      </Overlay>
    </Dialog.Portal>
  )
}

// Button stack
const ButtonStack = styled('div', {
  gap: '$2',
  display: 'flex',
  flexDirection: 'column',
})

// BodyTitle
type BodyTitleContainerProps = ComponentProps<typeof BodyTitleContainer>

type BodyTitleProps = {
  align?: BodyTitleContainerProps['align']
  description?: string | React.ReactNode
  title?: string | React.ReactNode
}

function BodyTitle(props: BodyTitleProps) {
  const { align, title, description } = props
  if (!title && !description) {
    return null
  }
  return (
    <BodyTitleContainer align={align}>
      {title && (
        <Dialog.Title asChild>
          <H3Heading lineHeight={1} size={{ '@initial': 4, '@bp2': 5 }} weight="semibold">
            {title}
          </H3Heading>
        </Dialog.Title>
      )}
      {description && (
        <Dialog.Description asChild>
          <Text color="dim" lineHeight={3}>
            {description}
          </Text>
        </Dialog.Description>
      )}
    </BodyTitleContainer>
  )
}

const BodyTitleContainer = styled('div', {
  gap: '$2',
  display: 'flex',
  flexDirection: 'column',
  variants: {
    align: {
      left: {
        alignItems: 'flex-start',
        textAlign: 'left',
      },
      center: {
        alignItems: 'center',
        textAlign: 'center',
      },
      right: {
        alignItems: 'flex-end',
        textAlign: 'right',
      },
    },
  },
  defaultVariants: {
    align: 'left',
  },
})

// Utils
const onTouchEnd = (_ev: TouchEvent<unknown>) => {
  if (typeof document !== 'undefined') {
    document.body.style.pointerEvents = ''
  }
}

// Default props
Content.defaultProps = {
  onTouchEnd: (ev: any) => ev.stopPropagation(),
}
Overlay.defaultProps = {
  onTouchEnd,
}
Dialog.Close.defaultProps = {
  onTouchEnd,
}

const Modal = {
  Box,
  BodyTitle,
  ButtonStack,
  Close: Dialog.Close,
  Content,
  Footer,
  Header,
  Overlay,
  Portal: Dialog.Portal,
  Root: Dialog.Root,
  Trigger: Dialog.Trigger,
}

export default Modal
