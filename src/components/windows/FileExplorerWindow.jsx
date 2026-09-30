export const EXPLORER_LOCATIONS = {
  c: {
    title: 'Local Disk (C:)',
    parent: null,
    path: 'C:\\',
    kind: 'Local Disk',
    status: '3 objects',
    items: [
      { id: 'documents', label: 'My Documents', icon: '/icons/empty-folder.png', target: 'documents', type: 'File Folder' },
      { id: 'pictures', label: 'My Pictures', icon: '/icons/folder-pictures.png', target: 'pictures', type: 'File Folder' },
      { id: 'music', label: 'My Music', icon: '/icons/folder-music.png', target: 'music', type: 'File Folder' },
    ],
  },
  documents: {
    title: 'My Documents',
    parent: 'c',
    path: 'C:\\My Documents',
    kind: 'File Folder',
    status: '1 object',
    items: [
      { id: 'resume', label: 'Resume.pdf', icon: '/icons/pdf-icon.png', action: 'open-resume', type: 'Adobe Acrobat Document' },
    ],
  },
  pictures: {
    title: 'My Pictures',
    parent: 'c',
    path: 'C:\\My Pictures',
    kind: 'File Folder',
    status: '0 objects',
    items: [],
  },
  music: {
    title: 'My Music',
    parent: 'c',
    path: 'C:\\My Music',
    kind: 'File Folder',
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

export default function FileExplorerWindow({ location, onNavigate, onOpenApp }) {
  const loc = EXPLORER_LOCATIONS[location] || EXPLORER_LOCATIONS.c
  const canGoBack = !!loc.parent
  const canGoUp = !!loc.parent

  const handleItemOpen = (item) => {
    if (item.action === 'open-resume') {
      onOpenApp('resume')
    } else if (item.target) {
      onNavigate(item.target)
    }
  }

  return (
    <>
      <div className="fe-toolbar">
        <button
          type="button"
          className={`fe-tool-btn ${canGoBack ? '' : 'disabled'}`}
          disabled={!canGoBack}
          onClick={() => canGoBack && onNavigate(loc.parent)}
        >
          <span className="fe-tool-arrow">{'\u2190'}</span> Back
        </button>
        <button type="button" className="fe-tool-btn disabled" disabled>
          <span className="fe-tool-arrow">{'\u2192'}</span>
        </button>
        <button
          type="button"
          className={`fe-tool-btn ${canGoUp ? '' : 'disabled'}`}
          disabled={!canGoUp}
          onClick={() => canGoUp && onNavigate(loc.parent)}
        >
          <span className="fe-tool-arrow">{'\u2191'}</span> Up
        </button>
        <div className="fe-tool-sep" />
        <button type="button" className="fe-tool-btn disabled" disabled>
          <img src="/icons/search.png" alt="" className="fe-tool-icon" /> Search
        </button>
        <button type="button" className="fe-tool-btn disabled" disabled>Folders</button>
      </div>

      <div className="fe-address-bar">
        <span className="fe-address-label">Address</span>
        <div className="fe-address-field">
          <img src="/icons/disk-drive.png" alt="" className="fe-address-icon" />
          <span>{loc.path}</span>
        </div>
        <button type="button" className="fe-go-btn" disabled>Go</button>
      </div>

      <div className="fe-body-xp">
        <div className="fe-sidebar-xp">
          <div className="fe-panel">
            <div className="fe-panel-header">File and Folder Tasks</div>
            <div className="fe-panel-body">
              <div className="fe-task disabled">Make a new folder</div>
              <div className="fe-task disabled">Publish this folder to the Web</div>
            </div>
          </div>

          <div className="fe-panel">
            <div className="fe-panel-header">Other Places</div>
            <div className="fe-panel-body">
              {loc.id !== 'c' && (
                <div className="fe-task" onClick={() => onNavigate('c')}>Local Disk (C:)</div>
              )}
              {loc.id !== 'documents' && (
                <div className="fe-task" onClick={() => onNavigate('documents')}>My Documents</div>
              )}
              <div className="fe-task disabled">My Network Places</div>
            </div>
          </div>

          <div className="fe-panel">
            <div className="fe-panel-header">Details</div>
            <div className="fe-panel-body fe-details">
              <strong>{loc.title}</strong>
              <div>{loc.kind}</div>
            </div>
          </div>
        </div>

        <div className="fe-content-xp">
          {loc.items.length === 0 ? (
            <div className="fe-empty">This folder is empty.</div>
          ) : (
            <div className="fe-grid-xp">
              {loc.items.map((item) => (
                <div className="fe-grid-item" key={item.id} onClick={() => handleItemOpen(item)}>
                  <img src={item.icon} alt="" className="fe-grid-icon" />
                  <div className="fe-grid-label">
                    <div className="fe-grid-name">{item.label}</div>
                    <small>{item.type}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fe-statusbar-xp">
        <span>{loc.status}</span>
        <span>0 bytes</span>
        <span className="fe-statusbar-computer">
          <img src="/icons/my-computer.png" alt="" /> My Computer
        </span>
      </div>
    </>
  )
}
