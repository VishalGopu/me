import { units } from './content'
import Hardware, { Leds } from './Hardware'
import { useStore } from './store'

const CABLES = ['blue', 'yellow', 'red', 'orange', 'green', 'white', 'blue', 'yellow']

function Screws() {
  return (
    <>
      <i className="screw l" />
      <i className="screw r" />
    </>
  )
}

export default function Rack() {
  const open = useStore((s) => s.open)
  const setOpen = useStore((s) => s.setOpen)
  const unplugged = useStore((s) => s.unplugged)
  const toggleCable = useStore((s) => s.toggleCable)

  return (
    <div className="rack-wrap">
      <div className="rack" role="group" aria-label="Server rack. Each server opens a section.">
        <div className="side" aria-hidden="true" />
        <div className="tray" aria-hidden="true" />
        <div className="rail left" />
        <div className="rail right" />

        {/* patch panel */}
        <div className="unit panel" aria-hidden="true">
          <Screws />
          <span className="plate">
            <b>patch-01</b>
            <small>1U · cat6</small>
          </span>
          <span className="hw">
            <span className="ports sw">
              {CABLES.map((c, i) => (
                <i key={i} className={`rj ${unplugged.includes(i) ? '' : `link ${c}`}`} />
              ))}
            </span>
          </span>
        </div>

        {units.map((u, i) => (
          <button
            key={u.key}
            className={`unit live kind-${u.kind} ${open === u.key ? 'empty' : ''}`}
            onClick={() => setOpen(u.key)}
            aria-label={`${u.label}: ${u.hint}`}
          >
            <Screws />
            <span className="plate">
              <small>{i}</small>
              <b>{u.label}</b>
            </span>
            <Hardware kind={u.kind} lcd={u.lcd} />
            <Leds led={u.led} delay={i * 0.37} />
            <span className="tip" aria-hidden="true">
              <kbd>{i}</kbd> {u.hint}
            </span>
          </button>
        ))}

        {/* UPS */}
        <div className="unit ups" aria-hidden="true">
          <Screws />
          <span className="plate">
            <b>ups</b>
            <small>2U · 3kVA</small>
          </span>
          <span className="hw">
            <span className="bar">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </span>
        </div>

        <svg className="cables" viewBox="0 0 470 644">
          {CABLES.map((c, i) => {
            const x = 256 + 19 * i
            const ty = 14 + i * 2.2
            const out = 478 + i * 7
            const off = unplugged.includes(i)
            const startY = off ? 118 + (i % 3) * 8 : 72
            const route = `V 38 Q ${x} ${ty} ${x + 14} ${ty} H ${out - 12} Q ${out} ${ty} ${out} ${ty + 22} V 590 q 0 16 -9 24`
            const toggle = () => toggleCable(i)
            return (
              <g
                key={i}
                className={`cable-g ${off ? 'off' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={!off}
                aria-label={`Patch cable ${i + 1}, ${c}. ${off ? 'Unplugged. Press to plug in.' : 'Plugged in. Press to unplug.'}`}
                onClick={toggle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggle()
                  }
                }}
                style={{ transformOrigin: `${x}px 38px`, transformBox: 'view-box' }}
              >
                <path className="hit" d={`M${x} ${startY} ${route}`} />
                <path className={`cable ${c}`} d={`M${x} ${startY} ${route}`} />
                <rect className={`plug ${c}`} x={x - 6} y={startY - 4} width="12" height="10" rx="2" />
              </g>
            )
          })}
        </svg>
        <div className="base" aria-hidden="true" />
      </div>
      <div className="floor" aria-hidden="true" />
    </div>
  )
}
