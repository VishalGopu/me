import { create } from 'zustand'
import { units, type Tone, type UnitKey } from './content'

let trigger: HTMLElement | null = null

// Deep links: /#projects opens a server, /?tone=pro picks the tone.
const hash = typeof window !== 'undefined' ? (window.location.hash.slice(1) as UnitKey) : ''
const initialOpen = units.some((u) => u.key === hash) ? (hash as UnitKey) : null
const initialTone: Tone =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('tone') === 'pro' ? 'pro' : 'fun'

interface State {
  open: UnitKey | null
  tone: Tone
  unplugged: number[]
  toggleCable: (i: number) => void
  setOpen: (key: UnitKey | null) => void
  setTone: (tone: Tone) => void
}

export const useStore = create<State>((set, get) => ({
  open: initialOpen,
  tone: initialTone,
  unplugged: [],
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
  setTone: (tone) => set({ tone }),
}))
