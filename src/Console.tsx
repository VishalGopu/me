import { useEffect, useRef } from 'react'
import { units } from './content'
import Hardware, { Leds } from './Hardware'
import { About, Contact, Experience, Projects, Skills } from './Sections'
import Terminal from './Terminal'
import { useStore } from './store'

const VIEWS = {
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  terminal: Terminal,
  contact: Contact,
}

// The server you clicked, slid out of the rack, with a KVM console showing its content.
export default function Console() {
  const open = useStore((s) => s.open)
  const setOpen = useStore((s) => s.setOpen)
  const closeRef = useRef<HTMLButtonElement>(null)
  const unit = units.find((u) => u.key === open)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  if (!unit) return null
  const View = VIEWS[unit.key]
  const idx = units.indexOf(unit)

  return (
    <div className="backdrop" onClick={() => setOpen(null)}>
      <div
        key={unit.key}
        className="pulled"
        role="dialog"
        aria-modal="true"
        aria-label={unit.label}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`unit chassis kind-${unit.kind}`}>
          <i className="screw l" />
          <i className="screw r" />
          <span className="plate">
            <small>{idx}</small>
            <b>{unit.label}</b>
          </span>
          <Hardware kind={unit.kind} lcd={unit.lcd} />
          <Leds led={unit.led} />
          <button ref={closeRef} className="eject" onClick={() => setOpen(null)} aria-label="Close and slide back into rack">
            esc · close
          </button>
        </div>
        <div className="slides" aria-hidden="true" />

        <div className="screen">
          <div className="glass">
            <div className="tty">
              <span>rack-01 · {unit.lcd} · console</span>
              <span className="nav">
                <button onClick={() => setOpen(units[(idx + units.length - 1) % units.length].key)} aria-label="Previous server">
                  ‹ {units[(idx + units.length - 1) % units.length].label}
                </button>
                <button onClick={() => setOpen(units[(idx + 1) % units.length].key)} aria-label="Next server">
                  {units[(idx + 1) % units.length].label} ›
                </button>
              </span>
            </div>
            <div className="viewport">
              <View />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
