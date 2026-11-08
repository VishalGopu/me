import { create } from 'zustand'
import { units, type UnitKey } from './content'

let trigger: HTMLElement | null = null

// Deep link: /#projects opens that server.
const hash = typeof window !== 'undefined' ? (window.location.hash.slice(1) as UnitKey) : ''
const initialOpen = units.some((u) => u.key === hash) ? (hash as UnitKey) : null

interface State {
  open: UnitKey | null
  unplugged: number[]
  booted: UnitKey[]
  markBooted: (key: UnitKey) => void
  toggleCable: (i: number) => void
  setOpen: (key: UnitKey | null) => void
}

export const useStore = create<State>((set, get) => ({
  open: initialOpen,
  unplugged: [],
  booted: [],
  markBooted: (key) => set((st) => (st.booted.includes(key) ? st : { booted: [...st.booted, key] })),
  toggleCable: (i) =>
    set((st) => ({
      unplugged: st.unplugged.includes(i) ? st.unplugged.filter((x) => x !== i) : [...st.unplugged, i],
    })),
  setOpen: (key) => {
    if (key && !get().open) trigger = document.activeElement as HTMLElement | null
    set({ open: key })
    if (!key) {
      trigger?.focus()
      trigger = null
    }
  },
}))
