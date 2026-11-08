// All site text lives here, so editing content never means touching layout code.
// Source: résumé in ../src (phone number intentionally omitted).

export const profile = {
  name: 'Gopu Vishal',
  email: 'gopuvishal003@gmail.com',
  linkedin: 'https://in.linkedin.com/in/vishal-gopu-831306256',
  github: 'https://github.com/VishalGopu',
}

export type UnitKey = 'about' | 'experience' | 'projects' | 'skills' | 'terminal' | 'contact'
export type Kind = 'server' | 'compute' | 'storage' | 'switch' | 'console' | 'router'

export const units: {
  key: UnitKey
  label: string
  hint: string
  kind: Kind
  led: 'green' | 'amber' | 'blue'
  lcd: string
}[] = [
  { key: 'about', label: 'about', hint: 'Who I am', kind: 'server', led: 'green', lcd: 'gv-about' },
  { key: 'experience', label: 'experience', hint: 'Where I have worked', kind: 'compute', led: 'green', lcd: 'node-02' },
  { key: 'projects', label: 'projects', hint: 'What I have built', kind: 'storage', led: 'amber', lcd: 'vol-04' },
  { key: 'skills', label: 'skills', hint: 'What I work with', kind: 'switch', led: 'green', lcd: 'sw-16p' },
  { key: 'terminal', label: 'terminal', hint: 'Poke around', kind: 'console', led: 'blue', lcd: 'tty1' },
  { key: 'contact', label: 'contact', hint: 'Get in touch', kind: 'router', led: 'green', lcd: 'gw-01' },
]

// Left-hand copy in two tones, so the choice can be made by looking at both.
export type Tone = 'fun' | 'pro'
export const tones: Record<
  Tone,
  {
    label: string
    command: string
    tagline: string
    sub: string
    tag: [string, string]
    stats: { k: string; v: string }[]
    nudge: string
    linksDown: string
  }
> = {
  fun: {
    label: 'playful',
    command: 'whoami',
    tagline: 'I make computers talk to each other, then I make them behave.',
    sub: 'Kubernetes · Networking · Why is it down',
    tag: ['GV-0001', 'Property of nobody. Runs on chai.'],
    stats: [
      { k: 'pods', v: '250 (all fine, probably)' },
      { k: 'learners', v: '127+ breaking my labs' },
      { k: 'deploys', v: '30 min → 2 min' },
    ],
    nudge: 'Go on, pull a server out of the rack.',
    linksDown: 'All links down. Have you tried plugging it back in?',
  },
  pro: {
    label: 'professional',
    command: 'whoami',
    tagline: 'DevOps and platform engineer. I build and operate Kubernetes infrastructure.',
    sub: 'Kubernetes · Networking · Platform engineering',
    tag: ['GV-0001', 'Software Engineering Intern · Cyberparadigm'],
    stats: [
      { k: 'pods managed', v: '250' },
      { k: 'learners served', v: '127+' },
      { k: 'deploy time', v: '30 min → 2 min' },
    ],
    nudge: 'Select a server to open a section.',
    linksDown: 'All links down. Plug a cable back in to restore the network.',
  },
}

export const about = {
  intro:
    'I am a computer science student and DevOps-minded engineer. I like the layer under the app: clusters, networks, isolation, and the pipelines that ship code. Right now I run a multi-tenant Kubernetes platform for a cybersecurity learning product.',
  education: [
    { school: 'Keshav Memorial Institute of Technology', years: '2025 – 2028', what: 'B.Tech, Computer Science and Engineering', note: 'CGPA 7.5 / 10' },
    { school: 'Government Polytechnic Warangal', years: '2022 – 2025', what: 'Diploma, Computer Science and Engineering', note: 'CGPA 9.5 / 10' },
  ],
  achievement: {
    title: '1st Prize, Surjana Tech Fest (state level)',
    note: 'Among all polytechnic colleges in Telangana, 2025. Built a smart pregnancy monitoring system: an IoT device tracking ECG, heart rate and SpO2, streamed live to hospital dashboards. Also a hand-gesture IoT controller with voice output, SMS alerts, an SOS and an AI chat assistant.',
  },
}

export const experience = {
  role: 'Software Engineering Intern',
  company: 'Cyberparadigm',
  where: 'Hyderabad, India',
  when: 'Oct 2025 – Present',
  points: [
    'Maintain a self-managed 3-node kubeadm Kubernetes cluster running 250 pods, powering a cybersecurity learning platform and CTF engine used by 127+ learners across 25+ hands-on labs.',
    'Enforce multi-tenant isolation with Kata Containers (VM-level sandboxing) and Cilium network policies, isolating 100 concurrent tenant workloads at pod level and blocking host-network access.',
    'Built lab provisioning for the CTF and learning platforms: an in-cluster operator creating per-team workspaces via server-side apply, with per-tenant resource limits and time-based auto-termination.',
    'Built an HTTP routing gateway (reverse proxy with signed URLs) and per-member WireGuard VPN access to isolated challenge targets, using AWS IAM roles and Terraform to deploy the VPN on demand.',
    'Built GitLab CI/CD pipelines that build Docker images and deploy with PM2 and Docker on PR approval, cutting deployment time from 30 min to 2 min.',
    'Designed PostgreSQL backend services with Prisma ORM for challenge orchestration, session state and dynamic lab provisioning, supporting 300 users.',
  ],
}

export const projects: { drive: string; name: string; stack: string[]; points: string[] }[] = [
  {
    drive: 'bay-0',
    name: 'Universal Agentic System',
    stack: ['LLMs', 'Tool calling', 'APIs', 'Database integration'],
    points: [
      'Reusable agentic customer-support system combining LLM reasoning, tool execution and application databases to handle domain-specific queries and workflows.',
      'Modular architecture that separates agent orchestration from business logic and data access, so different applications plug in through configurable tools and database connections.',
    ],
  },
  {
    drive: 'bay-1',
    name: 'Kubernetes RCA MCP Server',
    stack: ['Kubernetes', 'MCP', 'Kubernetes API', 'Agentic AI'],
    points: [
      'Read-only diagnostic system using MCP tools to investigate cluster failures by correlating pod status, logs, events, resource topology and configuration changes.',
      'Covers workload health, service dependencies, network policies and scheduling failures, for evidence-driven root cause analysis and remediation recommendations.',
    ],
  },
  {
    drive: 'bay-2',
    name: 'GinPro — Ginning ERP Platform',
    stack: ['Mobile app', 'SQLite', 'Offline sync', 'RBAC'],
    points: [
      'ERP platform for cotton-ginning operations with mobile workflows, role-based access control and automated billing.',
      'Offline-first persistence on SQLite that syncs when the network returns, so work continues in remote areas with unreliable connectivity.',
    ],
  },
  {
    drive: 'bay-3',
    name: 'AI-Powered Video Generation Platform',
    stack: ['Flask', 'Remotion', 'Ollama', 'VoxCPM'],
    points: [
      'AI video pipeline combining LLM script generation, synthesized narration and programmatic scene rendering with Remotion.',
      'Flask REST APIs orchestrate each stage: script processing, scene composition, audio generation and final render.',
    ],
  },
]

export const skills: { group: string; cable: string; items: string[] }[] = [
  { group: 'Networking & observability', cable: 'blue', items: ['Cilium', 'WireGuard', 'Tailscale', 'Cloudflare Tunnel', 'Prometheus', 'Grafana'] },
  { group: 'DevOps & cloud', cable: 'orange', items: ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'Linux', 'Git', 'GitHub Actions'] },
  { group: 'Backend', cable: 'green', items: ['Node.js', 'Express.js', 'NestJS', 'Next.js', 'REST APIs', 'JWT', 'WebSockets'] },
  { group: 'Databases', cable: 'yellow', items: ['PostgreSQL', 'Redis', 'Prisma ORM'] },
  { group: 'AI', cable: 'red', items: ['Ollama', 'LangChain', 'LangGraph', 'RAG', 'MCP', 'Vector databases'] },
  { group: 'Languages', cable: 'white', items: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript'] },
  { group: 'Core CS', cable: 'blue', items: ['DSA', 'OOP', 'DBMS', 'Operating systems', 'Computer networks'] },
]
