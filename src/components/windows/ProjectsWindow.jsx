import { useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    name: 'TaskFlow',
    icon: '\u2705',
    color: '#3f8f5f',
    summary: 'A drag-and-drop kanban app for small teams.',
    role: 'Full-stack developer',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    description:
      'TaskFlow is a lightweight project management tool with real-time kanban boards, activity history, and per-project permissions. Built the drag-and-drop board with optimistic UI updates and a WebSocket layer for live collaboration.',
    demo: '#',
    code: '#',
  },
  {
    id: 2,
    name: 'PixelPantry',
    icon: '\u{1F373}',
    color: '#d67d2c',
    summary: 'Recipe organizer with pantry-aware suggestions.',
    role: 'Frontend developer',
    tags: ['React', 'Tailwind', 'Supabase'],
    description:
      'A recipe manager that cross-references what you have in your pantry to suggest what you can cook tonight. Includes barcode-based pantry entry and a shopping list generator for missing ingredients.',
    demo: '#',
    code: '#',
  },
  {
    id: 3,
    name: 'CommitLens',
    icon: '\u{1F50D}',
    color: '#4361c9',
    summary: 'Visual analytics dashboard for git repositories.',
    role: 'Solo project',
    tags: ['TypeScript', 'D3.js', 'Express'],
    description:
      'CommitLens pulls commit history from any public repo and renders contributor activity, code churn, and file heatmaps. Built the data pipeline and the D3-based visualizations from scratch.',
    demo: '#',
    code: '#',
  },
  {
    id: 4,
    name: 'Nimbus Notes',
    icon: '\u2601\uFE0F',
    color: '#2f95a8',
    summary: 'Offline-first note-taking app with sync.',
    role: 'Full-stack developer',
    tags: ['React Native', 'SQLite', 'CRDT'],
    description:
      'A mobile-first notes app that works fully offline and syncs conflict-free across devices using CRDTs. Focused on making sync invisible and reliable, even on flaky connections.',
    demo: '#',
    code: '#',
  },
]

export default function ProjectsWindow() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    const p = selected
    return (
      <div className="project-detail">
        <div className="project-detail-back" onClick={() => setSelected(null)}>
          &#8592; Back to My Projects
        </div>
        <h2>{p.icon} {p.name}</h2>
        <div className="role">{p.role}</div>
        <p className="desc">{p.description}</p>
        <div className="project-tags" style={{ marginBottom: 16 }}>
          {p.tags.map((t) => (
            <span className="project-tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="project-detail-links">
          <a className="win7-link-btn" href={p.demo} target="_blank" rel="noreferrer">
            {'\u{1F5A5}\uFE0F'} Live Demo
          </a>
          <a className="win7-link-btn" href={p.code} target="_blank" rel="noreferrer">
            {'\u{1F4C1}'} View Code
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="explorer-toolbar">
        <span>{'\u2190'}</span>
        <span>{'\u2192'}</span>
        <div className="path-pill">My Computer &gt; My Projects</div>
      </div>
      <div className="project-grid">
        {PROJECTS.map((p) => (
          <div className="project-tile" key={p.id} onClick={() => setSelected(p)}>
            <div className="project-tile-thumb" style={{ background: p.color }}>
              {p.icon}
            </div>
            <div className="project-tile-body">
              <h4>{p.name}</h4>
              <p>{p.summary}</p>
              <div className="project-tags">
                {p.tags.slice(0, 2).map((t) => (
                  <span className="project-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
