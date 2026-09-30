const TOP_PINNED = [
  { id: 'about', icon: '/icons/info.png', title: 'About Me', sub: 'Who I am' },
  { id: 'mycomputer', icon: '/icons/my-computer.png', title: 'My Computer', sub: 'Browse files' },
]

const PROGRAM_PINNED = [
  { id: 'projects', icon: '/icons/disk-drive.png', title: 'My Projects', sub: 'Browse my work' },
  { id: 'resume', icon: '/icons/pdf-icon.png', title: 'Resume.pdf', sub: 'Adobe Reader' },
  { id: 'contact', icon: '/icons/ie-globe.png', title: 'Contact Me', sub: 'Mail' },
]

const PLACES = [
  { id: 'mycomputer', location: 'documents', icon: '/icons/empty-folder.png', title: 'My Documents' },
  { id: 'mycomputer', location: 'pictures', icon: '/icons/folder-pictures.png', title: 'My Pictures' },
  { id: 'mycomputer', location: 'music', icon: '/icons/folder-music.png', title: 'My Music' },
  { id: 'mycomputer', location: 'c', icon: '/icons/my-computer.png', title: 'My Computer' },
]

export default function StartMenu({ onOpenApp, onClose, onLogOff, onTurnOffComputer }) {
  const handleOpen = (id, location) => {
    onOpenApp(id, location)
    onClose()
  }

  const renderItem = (item) => (
    <div key={item.title} className="start-menu-item" onClick={() => handleOpen(item.id, item.location)}>
      <span className="start-menu-item-icon">
        <img src={item.icon} alt="" className="start-menu-item-img" />
      </span>
      <span className="start-menu-item-text">
        <strong>{item.title}</strong>
        {item.sub && <small>{item.sub}</small>}
      </span>
    </div>
  )

  return (
    <div className="start-menu" onMouseDown={(e) => e.stopPropagation()}>
      <div className="start-menu-header">
        <div className="start-avatar">ZL</div>
        <div className="start-username">Zoli Le</div>
      </div>

      <div className="start-menu-body">
        <div className="start-menu-left">
          {TOP_PINNED.map(renderItem)}
          <div className="start-menu-divider" />
          {PROGRAM_PINNED.map(renderItem)}
        </div>

        <div className="start-menu-right">
          {PLACES.map(renderItem)}
        </div>
      </div>

      <div className="start-menu-footer">
        <button className="footer-btn logoff-btn" onClick={onLogOff}>
          <img src="/icons/log-off.png" alt="" className="footer-btn-icon" />
          Log Off
        </button>
        <button className="footer-btn shutdown-btn" onClick={onTurnOffComputer}>
          <img src="/icons/shutdown.png" alt="" className="footer-btn-icon" />
          Turn Off Computer
        </button>
      </div>
    </div>
  )
}
