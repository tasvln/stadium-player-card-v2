import { create } from 'zustand'

interface Modal {
  type: 'SELECT_CARD' | 'CONFIRM_MINT'
  props?: any
}

type ModalType = {
  activeModal: Modal | null
  setModal: (modal: Modal | null) => void
}

const useModal = create<ModalType>((set) => ({
  activeModal: null,
  setModal: (modal) => set(() => ({ activeModal: modal })),
}))

export default useModal
