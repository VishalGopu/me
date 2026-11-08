import { useEffect, useState } from 'react'
import './App.css'
import './Console.css'
import './Polish.css'
import Console from './Console'
import Hero from './Hero'
import Rack from './Rack'
import { tones, units, type Tone } from './content'
import { useStore } from './store'

function StatusBar() {
  const [sec, setSec] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSec((x) => x + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const down = useStore((s) => s.unplugged.length)
  const f = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="status" aria-hidden="true">
      <i className={`dot ${down ? 'warn' : ''}`} /> rack-01 · links {8 - down}/8 · up {f(Math.floor(sec / 3600))}:{f(Math.floor(sec / 60) % 60)}:{f(sec % 60)}
    </div>
  )
}

export default function App() {
  const tone = useStore((s) => s.tone)
  const setTone = useStore((s) => s.setTone)
  const setOpen = useStore((s) => s.setOpen)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        return
      }
      const t = e.target as HTMLElement
      const cur = useStore.getState().open
      if (cur && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && t.tagName !== 'INPUT') {
        const i = units.findIndex((u) => u.key === cur)
        const d = e.key === 'ArrowRight' ? 1 : -1
        setOpen(units[(i + d + units.length) % units.length].key)
        return
      }
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return
      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 0 && n < units.length) setOpen(units[n].key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  return (
    <main className="room">
      <div className="wall" aria-hidden="true">
        <div className="ceiling" />
        <div className="far" />
        <div className="glow-l" />
      </div>
      <div className="light" aria-hidden="true" />
      <StatusBar />

      {/* Temporary: lets you compare both tones. Remove once you choose. */}
      <div className="tone" role="group" aria-label="Preview tone">
        <span>tone</span>
        {(Object.keys(tones) as Tone[]).map((k) => (
          <button key={k} aria-pressed={tone === k} onClick={() => setTone(k)}>
            {tones[k].label}
          </button>
        ))}
      </div>

      <Hero />
      <Rack />
      <Console />

      <p className="hints" aria-hidden="true">
        <kbd>0</kbd>–<kbd>5</kbd> open · <kbd>esc</kbd> close · <kbd>←</kbd>
        <kbd>→</kbd> browse
      </p>
    </main>
  )
}
