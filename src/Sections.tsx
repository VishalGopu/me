import { useState } from 'react'
import { about, experience, profile, projects, skills } from './content'

export function About() {
  return (
    <div className="sec">
      <p className="lead">{about.intro}</p>

      <h3>education</h3>
      <ul className="rows">
        {about.education.map((e) => (
          <li key={e.school}>
            <div>
              <b>{e.school}</b>
              <span>{e.what}</span>
            </div>
            <div className="right">
              <span>{e.years}</span>
              <span className="dim">{e.note}</span>
            </div>
          </li>
        ))}
      </ul>

      <h3>achievement</h3>
      <div className="callout">
        <b>{about.achievement.title}</b>
        <p>{about.achievement.note}</p>
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <div className="sec">
      <div className="job">
        <div>
          <h2>{experience.role}</h2>
          <p className="dim">
            {experience.company} · {experience.where}
          </p>
        </div>
        <span className="when">{experience.when}</span>
      </div>
      <ul className="bullets">
        {experience.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export function Projects() {
  const [sel, setSel] = useState<number | null>(null)
  return (
    <div className="sec">
      <p className="dim hintline">Each project is a drive in the chassis. Pull one out.</p>
      <div className="caddies">
        {projects.map((p, i) => (
          <button
            key={p.drive}
            className={`caddy ${sel === i ? 'out' : ''}`}
            aria-expanded={sel === i}
            onClick={() => setSel(sel === i ? null : i)}
          >
            <span className="caddy-top">
              <span className="serial">{p.drive}</span>
              <i className={`led green ${sel === i ? '' : 'idle'}`} />
            </span>
            <b>{p.name}</b>
            <span className="stack">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </span>
            {sel === i && (
              <ul className="bullets small">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <div className="sec">
      <p className="dim hintline">Each group is patched with its own cable colour.</p>
      <div className="groups">
        {skills.map((g) => (
          <div key={g.group} className="group">
            <h3>
              <i className={`wire ${g.cable}`} /> {g.group}
            </h3>
            <ul className="portlist">
              {g.items.map((it) => (
                <li key={it}>
                  <i className="rj link" /> {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Contact() {
  const links = [
    { k: 'email', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'linkedin', v: 'linkedin.com/in/vishal-gopu-831306256', href: profile.linkedin },
    { k: 'github', v: 'github.com/VishalGopu', href: profile.github },
  ]
  return (
    <div className="sec">
      <p className="lead">Open to internships and DevOps / platform roles. The fastest way in is email.</p>
      <ul className="links">
        {links.map((l) => (
          <li key={l.k}>
            <a href={l.href} target={l.k === 'email' ? undefined : '_blank'} rel="noreferrer">
              <i className="rj link" />
              <span className="k">{l.k}</span>
              <span className="v">{l.v}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
