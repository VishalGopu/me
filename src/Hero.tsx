import { useEffect, useState } from 'react'
import { hero, profile } from './content'
import { useStore } from './store'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Types the shell command once on load; shows it instantly if motion is reduced.
function useTyped(text: string, speed = 70) {
  const [n, setN] = useState(() => (reduceMotion() ? text.length : 0))
  useEffect(() => {
    if (reduceMotion()) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(i)
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return text.slice(0, n)
}

export default function Hero() {
  const typed = useTyped(hero.command)
  const allDown = useStore((s) => s.unplugged.length === 8)

  return (
    <section className="hero">
      <p className="prompt" aria-hidden="true">
        <span className="user">vishal@rack-01</span>
        <span className="sep">:</span>
        <span className="path">~</span>
        <span className="sep">$ </span>
        {typed}
      </p>

      <h1>
        {profile.name}
        <span className="cursor" aria-hidden="true" />
      </h1>
      <p className="tagline">{hero.tagline}</p>
      <p className="sub">{hero.sub}</p>

      <div className="tag" aria-label="Asset tag">
        <span className="barcode" aria-hidden="true" />
        <span className="tag-text">
          <b>ASSET {hero.tag[0]}</b>
          <span>{hero.tag[1]}</span>
        </span>
      </div>

      <dl className="board">
        {hero.stats.map((s) => (
          <div key={s.k}>
            <dt>{s.k}</dt>
            <dd>{s.v}</dd>
          </div>
        ))}
      </dl>

      <p className={`nudge ${allDown ? 'alert' : ''}`} aria-live="polite">
        {allDown ? `✗ ${hero.linksDown}` : `→ ${hero.nudge}`}
      </p>
    </section>
  )
}
