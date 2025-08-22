import { create } from 'zustand'

interface ModeState {
  mode: 'test' | 'mint' | 'edit'
  setMode: (mode: string) => void
}

export const useModeStore = create<ModeState>((set) => ({
  mode: 'mint',
  setMode: (mode) => set({ mode: mode as 'test' | 'mint' | 'edit' }),
}))