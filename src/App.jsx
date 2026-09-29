import { useEffect, useState, useCallback } from 'react'
import './App.css'
import Window from './components/Window'
import DesktopIcon from './components/DesktopIcon'
import StartMenu from './components/StartMenu'
import BootScreen from './components/BootScreen'
import AboutWindow from './components/windows/AboutWindow'
import ProjectsWindow from './components/windows/ProjectsWindow'
import ContactWindow from './components/windows/ContactWindow'
import ResumeWindow from './components/windows/ResumeWindow'
import FileExplorerWindow, { EXPLORER_LOCATIONS } from './components/windows/FileExplorerWindow'

const APP_DEFS = {
  about: {
    title: 'About Me',
    icon: '\u{1F464}',
    Component: AboutWindow,
    menubar: false,
    statusbar: null,
    offsetIndex: 0,
  },
  mycomputer: {
    title: 'My Computer',
    icon: '\u{1F5A5}\uFE0F',
    Component: FileExplorerWindow,
    menubar: true,
    statusbar: null,
    offsetIndex: 4,
  },
  projects: {
    title: 'My Projects',
    icon: '\u{1F4C1}',
    Component: ProjectsWindow,
    menubar: true,
    statusbar: '3 items',
    offsetIndex: 1,
  },
  contact: {
    title: 'Contact Me',
    icon: '\u2709\uFE0F',
    Component: ContactWindow,
    menubar: false,
    statusbar: null,
    offsetIndex: 2,
  },
  resume: {
    title: 'Resume.pdf - Adobe Reader',
    icon: '\u{1F4C4}',
    Component: ResumeWindow,
    menubar: false,
    statusbar: 'Page 1 of 1',
    offsetIndex: 3,
  },
}

const DESKTOP_ICONS = [
  { id: 'about', label: 'About Me', icon: '\u{1F464}' },
  { id: 'mycomputer', label: 'My Computer', icon: '/icons/my-computer.png' },
  { id: 'projects', label: 'My Projects', icon: '/icons/disk-drive.png' },
  { id: 'resume', label: 'Resume.pdf', icon: '/icons/folder-file.png' },
  { id: 'contact', label: 'Contact Me', icon: '/icons/ie-globe.png' },
  { id: 'recyclebin', label: 'Recycle Bin', icon: '/icons/recycle-bin.png' },
]

let zCounter = 10

// Windows open to set size
function getDefaultRect(offsetIndex = 0) {
  const vw = window.innerWidth
  const vh = Math.max(400, window.innerHeight - 34)
  const w = Math.min(1500, Math.round(vw * 0.85))
  const h = Math.min(880, Math.round(vh * 0.85))
  const baseX = Math.round((vw - w) / 2)
  const baseY = Math.max(10, Math.round((vh - h) / 2) - 10)
  const stagger = offsetIndex * 26
  return {
    x: Math.max(8, baseX - 45 + stagger),
    y: Math.max(8, baseY - 25 + stagger),
    w,
    h,
  }
}

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

// "My Computer" status change
function getWindowTitle(win) {
  if (win.id === 'mycomputer') {
    return (EXPLORER_LOCATIONS[win.location] && EXPLORER_LOCATIONS[win.location].title) || win.title
  }
  return win.title
}

function getWindowStatus(win) {
  if (win.id === 'mycomputer') {
    return (EXPLORER_LOCATIONS[win.location] && EXPLORER_LOCATIONS[win.location].status) || ''
  }
  return win.statusbar
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState({})
  const [activeId, setActiveId] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  const openApp = useCallback((id, location) => {
    if (id === 'recyclebin') return
    setWindows((prev) => {
      if (prev[id]) {
        zCounter += 1
        return {
          ...prev,
          [id]: {
            ...prev[id],
            minimized: false,
            z: zCounter,
            ...(location ? { location } : {}),
          },
        }
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
          rect: getDefaultRect(def.offsetIndex),
          minimized: false,
          maximized: false,
          z: zCounter,
          location: location || 'root',
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

  const navigateExplorer = useCallback((location) => {
    setWindows((prev) =>
      prev.mycomputer ? { ...prev, mycomputer: { ...prev.mycomputer, location } } : prev
    )
  }, [])

  const openWindows = Object.values(windows)

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />
  }

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
              selected={selectedIcon === ic.id}
              onSelect={() => setSelectedIcon(ic.id)}
              onOpen={() => openApp(ic.id)}
            />
          ))}
        </div>

        {openWindows.map((win) => {
          const def = APP_DEFS[win.id]
          const Content = def.Component
          const displayWin = { ...win, title: getWindowTitle(win), statusbar: getWindowStatus(win) }
          return (
            <Window
              key={win.id}
              win={displayWin}
              isActive={activeId === win.id}
              onFocus={() => focusApp(win.id)}
              onClose={() => closeApp(win.id)}
              onMinimize={() => minimizeApp(win.id)}
              onMaximize={() => maximizeApp(win.id)}
              onUpdateRect={(rect) => updateRect(win.id, rect)}
            >
              {win.id === 'mycomputer' ? (
                <Content location={win.location} onNavigate={navigateExplorer} onOpenApp={openApp} />
              ) : (
                <Content />
              )}
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
          <div className="start-flag">
            <div /><div /><div /><div />
          </div>
          <span className="start-label">start</span>
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
              <span className="taskbar-item-label">{getWindowTitle(win)}</span>
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
