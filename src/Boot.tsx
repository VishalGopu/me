import { useEffect, useState } from 'react'
import type { units } from './content'

type Unit = (typeof units)[number]

// A short "OS boot" shown the first time each server is opened.
// Click or press any key to skip.
export default function Boot({ unit, onDone }: { unit: Unit; onDone: () => void }) {
  const lines: [string, string][] = [
    ['', `GV-BIOS 1.0   POST ........ ok`],
    ['', `hardware: ${unit.lcd} (${unit.kind})`],
    ['', `loading kernel 6.12.0-gv ...`],
    ['  OK  ', `mounted /srv/${unit.key}`],
    ['  OK  ', `started ${unit.key}.service`],
    ['', `GVOS 1.0 · rack-01 · tty1`],
  ]
  const [n, setN] = useState(1)

  useEffect(() => {
    if (n < lines.length) {
      const t = setTimeout(() => setN(n + 1), 130)
      return () => clearTimeout(t)
    }
    const t = setTimeout(onDone, 380)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n])

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Tab') return
      onDone()
    }
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [onDone])

  return (
    <div className="boot" onClick={onDone} role="status" aria-label={`Loading ${unit.label}`}>
      <div aria-hidden="true">
        {lines.slice(0, n).map(([tag, text], i) => (
          <p key={i}>
            {tag ? <span className="ok">[{tag}]</span> : <span className="pad" />} {text}
          </p>
        ))}
        <p>
          <span className="cursor-block" />
        </p>
      </div>
      <div className="bar-track" aria-hidden="true">
        <i style={{ width: `${(n / lines.length) * 100}%` }} />
      </div>
      <p className="skip" aria-hidden="true">
        click or press any key to skip
      </p>
    </div>
  )
}
