import { useEffect, useState, useCallback } from 'react'
import './App.css'
import Window from './components/Window'
import DesktopIcon from './components/DesktopIcon'
import StartMenu from './components/StartMenu'
import AboutWindow from './components/windows/AboutWindow'
import ProjectsWindow from './components/windows/ProjectsWindow'
import ContactWindow from './components/windows/ContactWindow'
import ResumeWindow from './components/windows/ResumeWindow'

const APP_DEFS = {
  about: {
    title: 'About Me',
    icon: '\u{1F464}',
    Component: AboutWindow,
    menubar: false,
    statusbar: null,
    defaultRect: { x: 120, y: 60, w: 560, h: 380 },
  },
  projects: {
    title: 'My Projects',
    icon: '\u{1F4C1}',
    Component: ProjectsWindow,
    menubar: true,
    statusbar: '4 items',
    defaultRect: { x: 90, y: 40, w: 680, h: 480 },
  },
  contact: {
    title: 'Contact Me',
    icon: '\u2709\uFE0F',
    Component: ContactWindow,
    menubar: false,
    statusbar: null,
    defaultRect: { x: 200, y: 90, w: 500, h: 460 },
  },
  resume: {
    title: 'Resume.pdf - Adobe Reader',
    icon: '\u{1F4C4}',
    Component: ResumeWindow,
    menubar: false,
    statusbar: 'Page 1 of 1',
    defaultRect: { x: 160, y: 30, w: 640, h: 560 },
  },
}

const DESKTOP_ICONS = [
  { id: 'about', label: 'About Me', icon: '\u{1F464}', color: 'linear-gradient(145deg,#6fb7f0,#2f5ca0)' },
  { id: 'projects', label: 'My Projects', icon: '\u{1F4C1}', color: 'linear-gradient(145deg,#ffd873,#e0a52e)' },
  { id: 'resume', label: 'Resume.pdf', icon: '\u{1F4C4}', color: 'linear-gradient(145deg,#f0827a,#c8362b)' },
  { id: 'contact', label: 'Contact Me', icon: '\u2709\uFE0F', color: 'linear-gradient(145deg,#7fd9a8,#2f9e5f)' },
  { id: 'recyclebin', label: 'Recycle Bin', icon: '\u{1F5D1}\uFE0F', color: 'linear-gradient(145deg,#c7ceda,#8b95a5)' },
]

let zCounter = 10

function formatTime(date) {
  let h = date.getHours()
  const m = date.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })
}

export default function App() {
  const [windows, setWindows] = useState({})
  const [activeId, setActiveId] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  const openApp = useCallback((id) => {
    if (id === 'recyclebin') return
    setWindows((prev) => {
      if (prev[id]) {
        zCounter += 1
        return { ...prev, [id]: { ...prev[id], minimized: false, z: zCounter } }
      }
      const def = APP_DEFS[id]
      zCounter += 1
      return {
        ...prev,
        [id]: {
          id,
          title: def.title,
          icon: def.icon,
          menubar: def.menubar,
          statusbar: def.statusbar,
          rect: { ...def.defaultRect },
          minimized: false,
          maximized: false,
          z: zCounter,
        },
      }
    })
    setActiveId(id)
  }, [])

  const closeApp = useCallback((id) => {
    setWindows((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setActiveId((prev) => (prev === id ? null : prev))
  }, [])

  const minimizeApp = useCallback((id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }))
    setActiveId((prev) => (prev === id ? null : prev))
  }, [])

  const maximizeApp = useCallback((id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], maximized: !prev[id].maximized } }))
  }, [])

  const focusApp = useCallback((id) => {
    zCounter += 1
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], z: zCounter, minimized: false } }))
    setActiveId(id)
  }, [])

  const updateRect = useCallback((id, rect) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], rect } }))
  }, [])

  const openWindows = Object.values(windows)

  return (
    <div
      className="win7-desktop"
      onMouseDown={() => {
        setSelectedIcon(null)
        setStartOpen(false)
      }}
    >
      <div className="desktop-surface">
        <div className="desktop-icons" onMouseDown={(e) => e.stopPropagation()}>
          {DESKTOP_ICONS.map((ic) => (
            <DesktopIcon
              key={ic.id}
              icon={ic.icon}
              label={ic.label}
              color={ic.color}
              selected={selectedIcon === ic.id}
              onSelect={() => setSelectedIcon(ic.id)}
              onOpen={() => openApp(ic.id)}
            />
          ))}
        </div>

        {openWindows.map((win) => {
          const def = APP_DEFS[win.id]
          const Content = def.Component
          return (
            <Window
              key={win.id}
              win={win}
              isActive={activeId === win.id}
              onFocus={() => focusApp(win.id)}
              onClose={() => closeApp(win.id)}
              onMinimize={() => minimizeApp(win.id)}
              onMaximize={() => maximizeApp(win.id)}
              onUpdateRect={(rect) => updateRect(win.id, rect)}
            >
              <Content />
            </Window>
          )
        })}
      </div>

      {startOpen && (
        <StartMenu onOpenApp={openApp} onClose={() => setStartOpen(false)} />
      )}

      <div className="win7-taskbar" onMouseDown={(e) => e.stopPropagation()}>
        <div
          className="start-button"
          onClick={(e) => {
            e.stopPropagation()
            setStartOpen((s) => !s)
          }}
        >
          <div className="start-orb">
            <div className="start-flag">
              <div /><div /><div /><div />
            </div>
          </div>
        </div>

        <div className="taskbar-divider" />

        <div className="taskbar-items">
          {openWindows.map((win) => (
            <div
              key={win.id}
              className={`taskbar-item ${activeId === win.id && !win.minimized ? 'active' : ''}`}
              onClick={() => {
                if (win.minimized) {
                  focusApp(win.id)
                } else if (activeId === win.id) {
                  minimizeApp(win.id)
                } else {
                  focusApp(win.id)
                }
              }}
            >
              <span className="taskbar-item-icon">{win.icon}</span>
              <span className="taskbar-item-label">{win.title}</span>
            </div>
          ))}
        </div>

        <div className="system-tray">
          <div className="tray-icons">
            <span title="Network">{'\u{1F4F6}'}</span>
            <span title="Volume">{'\u{1F50A}'}</span>
          </div>
          <div className="clock-block">
            <div>{formatTime(now)}</div>
            <div>{formatDate(now)}</div>
          </div>
        </div>
        <div className="show-desktop" />
      </div>
    </div>
  )
}
