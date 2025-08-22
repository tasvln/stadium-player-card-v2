import React from 'react'
import { MotionStack } from './Motion'

export const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
      ease: 'easeOut',
      duration: 0.5,
    },
  },
}

type TransitionProps = {
  children: React.ReactNode
} & React.ComponentProps<typeof MotionStack>

const TransitionPane = ({ children, ...restProps }: TransitionProps) => {
  return (
    <MotionStack {...restProps} variants={variants} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
      {children}
    </MotionStack>
  )
}

export default TransitionPane
