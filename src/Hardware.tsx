import type { Kind } from './content'

// The front-panel details that make each unit look like a different real machine.
// Used both in the rack and on the pulled-out chassis.

const range = (n: number) => Array.from({ length: n }, (_, i) => i)

export function Leds({ led, delay = 0 }: { led: 'green' | 'amber' | 'blue'; delay?: number }) {
  return (
    <span className="leds" aria-hidden="true">
      <em className="etch">PWR ACT</em>
      <i className={`led ${led}`} style={{ animationDelay: `${delay}s` }} />
      <i className="led amber off" />
    </span>
  )
}

export default function Hardware({ kind, lcd }: { kind: Kind; lcd: string }) {
  switch (kind) {
    case 'server':
      return (
        <span className="hw" aria-hidden="true">
          <span className="vent" />
          <span className="lcd">{lcd}</span>
          <span className="usb" />
          <span className="usb" />
          <span className="pwr" />
        </span>
      )
    case 'compute':
      return (
        <span className="hw" aria-hidden="true">
          <span className="bays n4">
            {range(4).map((i) => (
              <i key={i} className={`bay ${i < 3 ? 'lit' : ''} ${i === 1 ? 'act' : ''}`} />
            ))}
          </span>
          <span className="lcd">{lcd}</span>
        </span>
      )
    case 'storage':
      return (
        <span className="hw" aria-hidden="true">
          <span className="bays n4 tall">
            {range(8).map((i) => (
              <i key={i} className={`bay ${i < 4 ? 'lit' : ''} ${i === 2 ? 'act' : ''}`} />
            ))}
          </span>
        </span>
      )
    case 'switch':
      return (
        <span className="hw" aria-hidden="true">
          <span className="ports sw">
            {range(16).map((i) => (
              <i key={i} className={`rj ${i % 3 !== 1 ? 'link' : ''}`} />
            ))}
          </span>
        </span>
      )
    case 'console':
      return (
        <span className="hw" aria-hidden="true">
          <span className="vent" />
          <span className="lcd">{lcd}</span>
          <span className="keys">
            {range(14).map((i) => (
              <i key={i} />
            ))}
          </span>
        </span>
      )
    case 'router':
      return (
        <span className="hw" aria-hidden="true">
          <span className="vent short" />
          <span className="lcd">{lcd}</span>
          <span className="ports">
            {range(4).map((i) => (
              <i key={i} className={`rj ${i < 3 ? 'link' : ''}`} />
            ))}
          </span>
          <span className="sfp" />
          <span className="sfp" />
        </span>
      )
  }
}
