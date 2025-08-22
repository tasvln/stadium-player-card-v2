import { Variants, motion } from 'framer-motion'
import { CSS, styled } from 'stitches.config'
import Header from './Header'

// type ButtonProps = {
// name: string
// action: () => void
// }

type ModalProps = {
  children: React.ReactNode
  handleClose: () => void
  title: string
  maxWidth?: number
  wrapperCSS?: CSS
  contentCSS?: CSS
  // primaryButton?: ButtonProps
  // secondaryButton?: ButtonProps
}

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
    },
  },
}

const wrapperVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      bounce: 0,
    },
  },
}

const BaseModal: React.FC<ModalProps> = ({
  children,
  handleClose,
  title,
  wrapperCSS,
  contentCSS,
  maxWidth = 550,
  // primaryButton,
  // secondaryButton,
}) => {
  return (
    <Overlay key="base-modal" initial="hidden" animate="show" exit="hidden" variants={overlayVariants}>
      <Wrapper key="base-modal-wrapper" layout css={{ ...wrapperCSS, maxWidth }} variants={wrapperVariants}>
        <Header title={title} handleClose={handleClose} />
        <Content css={contentCSS}>{children}</Content>
      </Wrapper>
    </Overlay>
  )
}

export default BaseModal

const Overlay = styled(motion.div, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: '$black60',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
})

const Content = styled('div', {
  border: '4px solid #d2d2d2',
  borderTop: 'none',
  borderRadius: '$0',
})

const Wrapper = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '80vh',
  background: '$white100',
  overflow: 'hidden',
  boxShadow: '$regular2',
  position: 'relative',
  variants: {
    size: {
      0: {
        [`${Content}`]: {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      },
      1: {
        [`${Content}`]: {
          paddingX: '$6',
          paddingTop: '$7',
          paddingBottom: 'calc($6 + env(safe-area-inset-bottom))',
        },
      },
      2: {
        [`${Content}`]: {
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
  },
  defaultVariants: {
    size: 1,
  },
})
