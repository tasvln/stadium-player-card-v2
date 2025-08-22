import { Modal } from '@/components/common'
import { ReactNode } from 'react'
import { CSS } from 'stitches.config'

type SimpleModalWrapper = {
  children: ReactNode
  title?: string
  onOpenChange?: (open: boolean) => void
  open?: boolean
  paddingTop?: boolean
  css?: CSS
}

const SimpleModalWrapper: React.FC<SimpleModalWrapper> = ({
  children,
  title,
  onOpenChange,
  open,
  paddingTop = true,
  css,
}) => {
  return (
    <Modal.Root onOpenChange={onOpenChange} open={open}>
      <Modal.Content
        css={css}
        paddingTop={paddingTop}
        squared
        header={title && <Modal.Header title={title} backgroundColor="#d2d2d2" slim />}
      >
        {children}
      </Modal.Content>
    </Modal.Root>
  )
}

export default SimpleModalWrapper
