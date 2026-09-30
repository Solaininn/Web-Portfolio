export default function StartMenu({ onOpenApp, onClose }) {
  const pinned = [
    { id: 'about', icon: '/icons/info.png', title: 'About Me', sub: 'Who I am' },
    { id: 'mycomputer', icon: '/icons/my-computer.png', title: 'My Computer', sub: 'Browse files' },
    { id: 'projects', icon: '/icons/disk-drive.png', title: 'My Projects', sub: 'Browse my work' },
    { id: 'resume', icon: '/icons/pdf-icon.png', title: 'Resume.pdf', sub: 'Adobe Reader' },
    { id: 'contact', icon: '/icons/ie-globe.png', title: 'Contact Me', sub: 'Mail' },
  ]

  const places = [
    { id: 'mycomputer', location: 'documents', icon: '/icons/empty-folder.png', title: 'My Documents' },
    { id: 'mycomputer', location: 'pictures', icon: '/icons/folder-pictures.png', title: 'My Pictures' },
    { id: 'mycomputer', location: 'music', icon: '/icons/folder-music.png', title: 'My Music' },
    { id: 'mycomputer', location: 'root', icon: '/icons/my-computer.png', title: 'My Computer' },
  ]

  const handleOpen = (id, location) => {
    onOpenApp(id, location)
    onClose()
  }

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
              <span className="start-menu-item-icon">
                <img src={item.icon} alt="" className="start-menu-item-img" />
              </span>
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
              <span className="start-menu-item-icon">
                <img src={item.icon} alt="" className="start-menu-item-img" />
              </span>
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
          GitHub
        </button>
      </div>
    </div>
  )
}
