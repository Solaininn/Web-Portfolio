import { useState } from 'react'

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
