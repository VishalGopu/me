import { useEffect, useRef, useState } from 'react'
import { experience, profile, skills, units, type UnitKey } from './content'
import { useStore } from './store'

type Line = { kind: 'in' | 'out'; text: string }

const SECTIONS = units.map((u) => u.key)

const NEOFETCH = `vishal@rack-01
--------------
OS:       Debian (the sensible choice)
Host:     Gopu Vishal, B.Tech CSE
Role:     ${experience.role} @ ${experience.company}
Cluster:  3-node kubeadm, 250 pods
Network:  Cilium + WireGuard
Shell:    this one
Uptime:   since the diploma`

export default function Terminal() {
  const setOpen = useStore((s) => s.setOpen)
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'Welcome to rack-01. Type "help" to see what works.' },
  ])
  const [value, setValue] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [hi, setHi] = useState(-1)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  function run(raw: string): string | null {
    const [cmd, ...args] = raw.trim().split(/\s+/)
    switch (cmd) {
      case '':
        return ''
      case 'help':
        return 'help  whoami  ls  open <section>  skills  contact  neofetch  ping  traceroute  clear'
      case 'whoami':
        return `${profile.name}: DevOps and platform engineer who likes networks.`
      case 'ls':
        return SECTIONS.join('  ')
      case 'open': {
        const k = args[0] as UnitKey
        if (!SECTIONS.includes(k)) return `open: no such section "${args[0] ?? ''}". Try: ls`
        setTimeout(() => setOpen(k), 150)
        return `opening ${k}...`
      }
      case 'skills':
        return skills.map((g) => `${g.group}: ${g.items.join(', ')}`).join('\n')
      case 'contact':
        return `${profile.email}\n${profile.github}\n${profile.linkedin}`
      case 'neofetch':
        return NEOFETCH
      case 'ping':
        return 'PING rack-01 (10.0.0.1): 56 data bytes\n64 bytes from 10.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms\n64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=0.039 ms'
      case 'traceroute':
        return 'traceroute to rack-01\n 1  laptop (192.168.1.5)      0.3 ms\n 2  home-router (192.168.1.1) 1.1 ms\n 3  isp-edge                  8.4 ms\n 4  cloudflare                11.9 ms\n 5  rack-01 (you are here)    12.6 ms'
      case 'sudo':
        return 'vishal is not in the sudoers file. This incident will be reported.'
      case 'clear':
        return null
      default:
        return `${cmd}: command not found. Try "help".`
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const out = run(value)
    const input: Line = { kind: 'in', text: value }
    if (out === null) setLines([])
    else setLines((l) => [...l, input, ...(out ? [{ kind: 'out' as const, text: out }] : [])])
    if (value.trim()) setHist((h) => [...h, value])
    setHi(-1)
    setValue('')
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp' && hist.length) {
      e.preventDefault()
      const n = hi === -1 ? hist.length - 1 : Math.max(0, hi - 1)
      setHi(n)
      setValue(hist[n])
    } else if (e.key === 'ArrowDown' && hi !== -1) {
      e.preventDefault()
      const n = hi + 1
      if (n >= hist.length) {
        setHi(-1)
        setValue('')
      } else {
        setHi(n)
        setValue(hist[n])
      }
    }
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) => (
        <pre key={i} className={l.kind}>
          {l.kind === 'in' ? `$ ${l.text}` : l.text}
        </pre>
      ))}
      <form onSubmit={submit} className="term-in">
        <span aria-hidden="true">$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          aria-label="Terminal input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </form>
      <div ref={endRef} />
    </div>
  )
}
