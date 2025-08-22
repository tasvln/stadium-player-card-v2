import { Modal } from '@/components/common'
import useModal from '@/store/modal'
import { ReactNode } from 'react'

interface ModalContainerProps {
  children: ReactNode
  modalKey: string
}

export default function ModalContainer(props: ModalContainerProps) {
  const { children, modalKey } = props

  const { activeModal, setModal } = useModal()

  const isOpen = activeModal ? modalKey === activeModal['type'] : false

  return (
    <Modal.Root open={isOpen} onOpenChange={() => setModal(null)}>
      {children}
    </Modal.Root>
  )
}
