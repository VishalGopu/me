import { useEffect, useState } from 'react'
import { profile, tones } from './content'
import { useStore } from './store'

function useTyped(text: string, speed = 70) {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) {
      setN(text.length)
      return
    }
    setN(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(i)
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, reduce])
  return text.slice(0, n)
}

export default function Hero() {
  const tone = useStore((s) => s.tone)
  const t = tones[tone]
  const typed = useTyped(t.command)

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
      <p className="tagline">{t.tagline}</p>
      <p className="sub">{t.sub}</p>

      <div className="tag" aria-label="Asset tag">
        <span className="barcode" aria-hidden="true" />
        <span className="tag-text">
          <b>ASSET {t.tag[0]}</b>
          <span>{t.tag[1]}</span>
        </span>
      </div>

      <dl className="board">
        {t.stats.map((s) => (
          <div key={s.k}>
            <dt>{s.k}</dt>
            <dd>{s.v}</dd>
          </div>
        ))}
      </dl>

      <p className="nudge">→ {t.nudge}</p>
    </section>
  )
}
