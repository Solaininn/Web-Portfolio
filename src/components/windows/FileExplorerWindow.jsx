const PROJECT_FOLDERS = [
  { id: 1, name: 'Rebel Locate' },
  { id: 2, name: 'FPGA Sudoku' },
  { id: 3, name: 'ACM UNLV Website' },
]

export const EXPLORER_LOCATIONS = {
  c: {
    title: 'Local Disk (C:)',
    parent: null,
    path: 'C:\\',
    kind: 'Local Disk',
    status: '4 objects',
    items: [
      { id: 'documents', label: 'My Documents', icon: '/icons/empty-folder.png', target: 'documents', type: 'File Folder' },
      { id: 'pictures', label: 'My Pictures', icon: '/icons/folder-pictures.png', target: 'pictures', type: 'File Folder' },
      { id: 'music', label: 'My Music', icon: '/icons/folder-music.png', target: 'music', type: 'File Folder' },
      { id: 'projects', label: 'My Projects', icon: '/icons/empty-folder.png', target: 'projects', type: 'File Folder' },
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
  projects: {
    title: 'My Projects',
    parent: 'c',
    path: 'C:\\My Projects',
    kind: 'File Folder',
    status: `${PROJECT_FOLDERS.length + 1} objects`,
    items: [
      ...PROJECT_FOLDERS.map((p) => ({
        id: `project-${p.id}`,
        label: p.name,
        icon: '/icons/empty-folder.png',
        target: `project-${p.id}`,
        type: 'File Folder',
      })),
      { id: 'autocad', label: 'AutoCAD Drawings', icon: '/icons/empty-folder.png', target: 'autocad-drawings', type: 'File Folder' },
    ],
  },
  // To add another AutoCAD drawing later: drop the PDF file in
  // public/pdfs/, then add one more item object below with a unique id,
  // its label, and a pdfSrc pointing at the file. That's it — no new
  // component or app id needed, it reuses the generic PDF viewer.
  'autocad-drawings': {
    title: 'AutoCAD Drawings',
    parent: 'projects',
    path: 'C:\\My Projects\\AutoCAD Drawings',
    kind: 'File Folder',
    status: '1 object',
    items: [
      {
        id: 'classroom-plan',
        label: 'Classroom.pdf',
        icon: '/icons/pdf-icon.png',
        action: 'open-pdf',
        pdfSrc: '/pdfs/classroom-plan.pdf',
        pdfLabel: 'Classroom.pdf',
        type: 'Adobe Acrobat Document',
      },
    ],
  },
}

// One folder per project, each holding a single "<name>.pdf" file that opens
// straight to that project's detail/README view in My Projects.
PROJECT_FOLDERS.forEach((p) => {
  EXPLORER_LOCATIONS[`project-${p.id}`] = {
    title: p.name,
    parent: 'projects',
    path: `C:\\My Projects\\${p.name}`,
    kind: 'File Folder',
    status: '1 object',
    items: [
      {
        id: 'readme',
        label: `${p.name}.pdf`,
        icon: '/icons/pdf-icon.png',
        action: 'open-project',
        projectId: p.id,
        type: 'Adobe Acrobat Document',
      },
    ],
  }
})

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
    } else if (item.action === 'open-project') {
      onOpenApp('projects', item.projectId)
    } else if (item.action === 'open-pdf') {
      onOpenApp('pdfviewer', { src: item.pdfSrc, label: item.pdfLabel })
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
          <img src="/icons/back.png" alt="" className="fe-tool-icon" /> Back
        </button>
        <button type="button" className="fe-tool-btn disabled" disabled>
          <img src="/icons/forward.png" alt="" className="fe-tool-icon" />
        </button>
        <button
          type="button"
          className={`fe-tool-btn ${canGoUp ? '' : 'disabled'}`}
          disabled={!canGoUp}
          onClick={() => canGoUp && onNavigate(loc.parent)}
        >
          <img src="/icons/folder-up.png" alt="" className="fe-tool-icon" /> Up
        </button>
        <div className="fe-tool-sep" />
        <button type="button" className="fe-tool-btn disabled" disabled>
          <img src="/icons/search.png" alt="" className="fe-tool-icon" /> Search
        </button>
        <button type="button" className="fe-tool-btn disabled" disabled>
          <img src="/icons/folders.png" alt="" className="fe-tool-icon" /> Folders
        </button>
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
              {location !== 'c' && (
                <div className="fe-task" onClick={() => onNavigate('c')}>Local Disk (C:)</div>
              )}
              {location !== 'documents' && (
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
