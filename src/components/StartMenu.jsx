export default function StartMenu({ onOpenApp, onClose }) {
  const pinned = [
    { id: 'about', icon: '\u{1F464}', title: 'About Me', sub: 'Who I am' },
    { id: 'projects', icon: '\u{1F4C1}', title: 'My Projects', sub: 'Browse my work' },
    { id: 'resume', icon: '\u{1F4C4}', title: 'Resume', sub: 'Adobe Reader' },
    { id: 'contact', icon: '\u2709\uFE0F', title: 'Contact Me', sub: 'Mail' },
  ]

  const recent = [
    { id: 'projects', icon: '\u{1F310}', title: 'Portfolio.exe' },
    { id: 'about', icon: '\u{1F4DD}', title: 'AboutMe.txt' },
    { id: 'contact', icon: '\u{1F4E7}', title: 'NewMessage.msg' },
  ]

  const handleOpen = (id) => {
    onOpenApp(id)
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
              <span className="start-menu-item-icon">{item.icon}</span>
              <span className="start-menu-item-text">
                <strong>{item.title}</strong>
                <small>{item.sub}</small>
              </span>
            </div>
          ))}

          <div className="start-menu-divider" />

          {recent.map((item, i) => (
            <div key={i} className="start-menu-item" onClick={() => handleOpen(item.id)}>
              <span className="start-menu-item-icon">{item.icon}</span>
              <span className="start-menu-item-text">
                <strong>{item.title}</strong>
              </span>
            </div>
          ))}

          <div className="search-box">Search programs and files</div>
        </div>

        <div className="start-menu-right">
          <div className="start-menu-item" onClick={() => handleOpen('projects')}>
            <span className="start-menu-item-icon">{'\u{1F4C2}'}</span>
            <span className="start-menu-item-text"><strong>My Projects</strong></span>
          </div>
          <div className="start-menu-item" onClick={() => handleOpen('about')}>
            <span className="start-menu-item-icon">{'\u{1F5A5}\uFE0F'}</span>
            <span className="start-menu-item-text"><strong>My Computer</strong></span>
          </div>
          <div className="start-menu-item" onClick={() => handleOpen('contact')}>
            <span className="start-menu-item-icon">{'\u{1F3AE}'}</span>
            <span className="start-menu-item-text"><strong>Control Panel</strong></span>
          </div>
          <div className="start-menu-item" onClick={() => handleOpen('resume')}>
            <span className="start-menu-item-icon">{'\u{1F5C2}\uFE0F'}</span>
            <span className="start-menu-item-text"><strong>Devices and Printers</strong></span>
          </div>
        </div>
      </div>

      <div className="start-menu-footer">
        <div style={{ fontSize: 11, color: '#556' }}>Windows 7 Ultimate</div>
        <button
          className="shutdown-btn"
          onClick={() =>
            window.open('https://github.com/Solaininn', '_blank')
          }
        >
          {'\u{1F310}'} GitHub
        </button>
      </div>
    </div>
  )
}
