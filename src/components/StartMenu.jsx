export default function StartMenu({ onOpenApp, onClose }) {
  const pinned = [
    { id: 'about', icon: '\u{1F464}', title: 'About Me', sub: 'Who I am' },
    { id: 'mycomputer', icon: '/icons/my-computer.png', title: 'My Computer', sub: 'Browse files' },
    { id: 'projects', icon: '/icons/disk-drive.png', title: 'My Projects', sub: 'Browse my work' },
    { id: 'resume', icon: '/icons/folder-file.png', title: 'Resume.pdf', sub: 'Adobe Reader' },
    { id: 'contact', icon: '/icons/ie-globe.png', title: 'Contact Me', sub: 'Mail' },
  ]

  const places = [
    { id: 'mycomputer', location: 'documents', icon: '/icons/folder-file.png', title: 'My Documents' },
    { id: 'mycomputer', location: 'pictures', icon: '/icons/folder-file.png', title: 'My Pictures' },
    { id: 'mycomputer', location: 'music', icon: '/icons/folder-file.png', title: 'My Music' },
    { id: 'mycomputer', location: 'root', icon: '/icons/my-computer.png', title: 'My Computer' },
  ]

  const handleOpen = (id, location) => {
    onOpenApp(id, location)
    onClose()
  }

  const renderIcon = (icon) =>
    typeof icon === 'string' && icon.startsWith('/') ? (
      <img src={icon} alt="" className="start-menu-item-img" />
    ) : (
      <span>{icon}</span>
    )

  return (
    <div className="start-menu" onMouseDown={(e) => e.stopPropagation()}>
      <div className="start-menu-header">
        <div className="start-avatar">ZL</div>
        <div className="start-username">Zoli Le</div>
      </div>

      <div className="start-menu-body">
        <div className="start-menu-left">
          {pinned.map((item) => (
            <div key={item.id} className="start-menu-item" onClick={() => handleOpen(item.id)}>
              <span className="start-menu-item-icon">{renderIcon(item.icon)}</span>
              <span className="start-menu-item-text">
                <strong>{item.title}</strong>
                <small>{item.sub}</small>
              </span>
            </div>
          ))}
        </div>

        <div className="start-menu-right">
          {places.map((item) => (
            <div
              key={item.title}
              className="start-menu-item"
              onClick={() => handleOpen(item.id, item.location)}
            >
              <span className="start-menu-item-icon">{renderIcon(item.icon)}</span>
              <span className="start-menu-item-text"><strong>{item.title}</strong></span>
            </div>
          ))}
        </div>
      </div>

      <div className="start-menu-footer">
        <div style={{ fontSize: 11, color: '#556' }}>Windows XP</div>
        <button
          className="shutdown-btn"
          onClick={() => window.open('https://github.com', '_blank')}
        >
          {'\u{1F310}'} GitHub
        </button>
      </div>
    </div>
  )
}
