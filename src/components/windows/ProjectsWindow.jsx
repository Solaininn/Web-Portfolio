import React, { useEffect, useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    name: 'Rebel Locate',
    icon: '\u{1F4CD}',
    color: '#3f6fc9',
    summary: 'ML geolocator that predicts a UNLV building & room from a photo.',
    role: 'Team project',
    tags: ['Python', 'PyTorch', 'CNN', 'KNN'],
    description:
      'A machine learning-based geolocator that predicts a photo\u2019s building and room on the UNLV campus using extracted and organized EXIF metadata, built on a self-captured database of over 6,000 geotagged images. Designed and implemented a K-Nearest Neighbors model to classify buildings from GPS metadata using K-value cross-validation, then fine-tuned a Convolutional Neural Network on MIT\u2019s Places365 pretrained weights to predict rooms and buildings, reaching an average test accuracy of 81%.',
    repo: 'Solaininn/2024-RebelLocate',
  },
  {
    id: 2,
    name: 'FPGA Sudoku',
    icon: '\u{1F3AE}',
    color: '#c9563f',
    summary: 'An interactive Sudoku game built entirely in hardware on an FPGA.',
    role: 'Team project',
    tags: ['SystemVerilog', 'FPGA', 'Quartus Prime'],
    description:
      'An interactive Sudoku game engineered entirely in hardware using SystemVerilog on the Intel DE2-115 FPGA, featuring real-time VGA graphics and hardware-based user controls. Designed modular digital logic for cursor navigation, board state management, and switch-driven number input using finite state machines and synchronous memory modules, plus a VGA rendering pipeline with Character ROM support to display the grid, cursor highlighting, and numeric values directly through hardware.',
    repo: 'Solaininn/2026-FPGA-Sudoku',
  },
  {
    id: 3,
    name: 'ACM UNLV Website',
    icon: '\u{1F310}',
    color: '#2f9e5f',
    summary: 'The official site for ACM UNLV, built as Lead Software Engineer.',
    role: 'Lead Software Engineer \u2014 ACM UNLV',
    tags: ['Next.js', 'Tailwind CSS', 'shadcn/ui'],
    description:
      'The official platform for ACM UNLV, showcasing club events, resources, and initiatives, built with Next.js, Tailwind CSS, and shadcn/ui. Designed and implemented responsive UI components, including an animated landing page built with Figma and CSS, to improve the overall user experience and visual engagement.',
    repo: null,
  },
]

// ---- tiny markdown renderer (headings, bold/italic/code, links, lists, code fences, images, blockquotes) ----

function decodeBase64Utf8(b64) {
  const clean = b64.replace(/\n/g, '')
  const binary = atob(clean)
  const percentEncoded = binary
    .split('')
    .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
  return decodeURIComponent(percentEncoded)
}

function resolveImageSrc(src, repo, branch) {
  if (/^https?:\/\//.test(src)) return src
  const cleaned = src.replace(/^\.?\//, '')
  return `https://raw.githubusercontent.com/${repo}/${branch}/${cleaned}`
}

// Relative README links (demo clips, docs, other files in the repo) get pointed
// back at GitHub instead of the portfolio's own domain, where they 404.
function resolveLinkHref(href, repo, branch) {
  if (/^https?:\/\//.test(href) || href.startsWith('#') || href.startsWith('mailto:')) {
    return href
  }
  const cleaned = href.replace(/^\.?\//, '')
  const isMedia = /\.(png|jpe?g|gif|svg|webp|mp4|mov|webm)(\?.*)?$/i.test(cleaned)
  return isMedia
    ? `https://raw.githubusercontent.com/${repo}/${branch}/${cleaned}`
    : `https://github.com/${repo}/blob/${branch}/${cleaned}`
}

function parseInline(text, repo, branch, key0) {
  const nodes = []
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match
  let key = key0 || 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) nodes.push(<strong key={key++}>{match[1]}</strong>)
    else if (match[2] !== undefined) nodes.push(<em key={key++}>{match[2]}</em>)
    else if (match[3] !== undefined) nodes.push(<code key={key++}>{match[3]}</code>)
    else if (match[4] !== undefined)
      nodes.push(
        <a key={key++} href={resolveLinkHref(match[5], repo, branch)} target="_blank" rel="noreferrer">
          {match[4]}
        </a>
      )
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function renderMarkdown(markdown, repo, branch) {
  const lines = markdown.split('\n')
  const blocks = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      i++
      continue
    }

    if (line.trim().startsWith('```')) {
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      blocks.push(
        <pre className="readme-code" key={key++}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      blocks.push(
        React.createElement(`h${level}`, { key: key++ }, parseInline(headingMatch[2], repo, branch))
      )
      i++
      continue
    }

    if (/^([-*_]\s*){3,}$/.test(line.trim())) {
      blocks.push(<hr key={key++} />)
      i++
      continue
    }

    if (line.trim().startsWith('>')) {
      const quoteLines = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      blocks.push(<blockquote key={key++}>{parseInline(quoteLines.join(' '), repo, branch)}</blockquote>)
      continue
    }

    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      blocks.push(
        <img
          key={key++}
          className="readme-img"
          alt={imgMatch[1]}
          src={resolveImageSrc(imgMatch[2], repo, branch)}
        />
      )
      i++
      continue
    }

    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const isOrdered = /^\s*\d+\.\s+/.test(line)
      const items = []
      while (i < lines.length && /^\s*([-*+]|\d+\.)\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*([-*+]|\d+\.)\s+/, '')
        items.push(<li key={key++}>{parseInline(itemText, repo, branch)}</li>)
        i++
      }
      blocks.push(React.createElement(isOrdered ? 'ol' : 'ul', { key: key++ }, items))
      continue
    }

    const paraLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*([-*+]|\d+\.)\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('>')
    ) {
      paraLines.push(lines[i])
      i++
    }
    blocks.push(<p key={key++}>{parseInline(paraLines.join(' '), repo, branch)}</p>)
  }

  return blocks
}

function ReadmeViewer({ repo }) {
  const [state, setState] = useState({ status: 'loading', content: '', branch: 'main' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', content: '', branch: 'main' })
    fetch(`https://api.github.com/repos/${repo}/readme`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const text = decodeBase64Utf8(data.content)
        const branchMatch = (data.download_url || '').match(
          /raw\.githubusercontent\.com\/[^/]+\/[^/]+\/([^/]+)\//
        )
        setState({ status: 'ready', content: text, branch: branchMatch ? branchMatch[1] : 'main' })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', content: '', branch: 'main' })
      })
    return () => {
      cancelled = true
    }
  }, [repo])

  if (state.status === 'loading') {
    return <div className="readme-status">Loading README\u2026</div>
  }
  if (state.status === 'error') {
    return (
      <div className="readme-status">
        Couldn't load the README from GitHub.{' '}
        <a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer">
          View the repo directly &#8599;
        </a>
      </div>
    )
  }
  return <div className="readme-body">{renderMarkdown(state.content, repo, state.branch)}</div>
}

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
        {!p.repo && <p className="desc">{p.description}</p>}
        <div className="project-tags" style={{ marginBottom: 16 }}>
          {p.tags.map((t) => (
            <span className="project-tag" key={t}>{t}</span>
          ))}
        </div>

        {p.repo && (
          <>
            <div className="readme-divider" />
            <div className="readme-header">
              <span>README</span>
              <a
                className="win7-link-btn"
                href={`https://github.com/${p.repo}`}
                target="_blank"
                rel="noreferrer"
              >
                {'\u{1F4C1}'} View on GitHub
              </a>
            </div>
            <ReadmeViewer repo={p.repo} />
          </>
        )}
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
