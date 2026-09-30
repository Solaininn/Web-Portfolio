// Virtual filesystem for the "My Computer" file explorer. To add real photos or
// tracks later, just add entries to the `pictures` / `music` items arrays below,
// e.g. { id: 'sunset', label: 'sunset.jpg', icon: '/pictures/sunset.jpg' } (put
// the actual file in the public/pictures folder).
export const EXPLORER_LOCATIONS = {
  root: {
    title: 'My Computer',
    parent: null,
    status: '1 object',
    items: [
      { id: 'c', label: 'Local Disk (C:)', icon: '/icons/disk-drive.png', target: 'c' },
    ],
  },
  c: {
    title: 'Local Disk (C:)',
    parent: 'root',
    status: '3 objects',
    items: [
      { id: 'documents', label: 'My Documents', icon: '/icons/empty-folder.png', target: 'documents' },
      { id: 'pictures', label: 'My Pictures', icon: '/icons/folder-pictures.png', target: 'pictures' },
      { id: 'music', label: 'My Music', icon: '/icons/folder-music.png', target: 'music' },
    ],
  },
  documents: {
    title: 'My Documents',
    parent: 'c',
    status: '1 object',
    items: [
      { id: 'resume', label: 'Resume.pdf', icon: '/icons/pdf-icon.png', action: 'open-resume' },
    ],
  },
  pictures: {
    title: 'My Pictures',
    parent: 'c',
    status: '0 objects',
    items: [],
  },
  music: {
    title: 'My Music',
    parent: 'c',
    status: '0 objects',
    items: [],
  },
}

export function buildBreadcrumb(locationId) {
  const chain = []
  let cur = locationId
  while (cur) {
    const loc = EXPLORER_LOCATIONS[cur]
    if (!loc) break
    chain.unshift({ id: cur, label: loc.title })
    cur = loc.parent
  }
  return chain
}

function renderThumb(icon) {
  if (typeof icon === 'string' && icon.startsWith('/')) {
    return <img src={icon} alt="" className="fe-thumb-img" />
  }
  return <span>{icon}</span>
}

export default function FileExplorerWindow({ location, onNavigate, onOpenApp }) {
  const loc = EXPLORER_LOCATIONS[location] || EXPLORER_LOCATIONS.root
  const breadcrumb = buildBreadcrumb(location)
  const canGoBack = !!loc.parent

  const handleItemOpen = (item) => {
    if (item.action === 'open-resume') {
      onOpenApp('resume')
    } else if (item.target) {
      onNavigate(item.target)
    }
  }

  return (
    <>
      <div className="explorer-toolbar">
        <span
          className={`fe-back ${canGoBack ? '' : 'disabled'}`}
          onClick={() => canGoBack && onNavigate(loc.parent)}
        >
          {'\u2190'}
        </span>
        <span className="fe-back disabled">{'\u2192'}</span>
        <div className="path-pill">
          {breadcrumb.map((b, i) => (
            <span key={b.id}>
              {i > 0 && <span className="fe-crumb-sep">&nbsp;&gt;&nbsp;</span>}
              <span
                className={i === breadcrumb.length - 1 ? 'fe-crumb-current' : 'fe-crumb'}
                onClick={() => i !== breadcrumb.length - 1 && onNavigate(b.id)}
              >
                {b.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="fe-body">
        <div className="fe-sidebar">
          <div className="fe-sidebar-title">Other Places</div>
          {breadcrumb.slice(0, -1).map((b) => (
            <div key={b.id} className="fe-sidebar-link" onClick={() => onNavigate(b.id)}>
              {b.label}
            </div>
          ))}
        </div>

        <div className="fe-content">
          {loc.items.length === 0 ? (
            <div className="fe-empty">This folder is empty.</div>
          ) : (
            <div className="project-grid">
              {loc.items.map((item) => (
                <div className="project-tile" key={item.id} onClick={() => handleItemOpen(item)}>
                  <div className="project-tile-thumb fe-thumb">{renderThumb(item.icon)}</div>
                  <div className="project-tile-body">
                    <h4>{item.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
