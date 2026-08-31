import { useRef, useCallback } from 'react'

export default function Window({
  win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdateRect,
  children,
}) {
  const dragRef = useRef(null)
  const windowRef = useRef(null)

  const startDrag = useCallback((e) => {
    if (win.maximized) return
    onFocus()
    const startX = e.clientX
    const startY = e.clientY
    const startLeft = win.rect.x
    const startTop = win.rect.y

    dragRef.current = { startX, startY, startLeft, startTop }

    const onMove = (ev) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      onUpdateRect({
        ...win.rect,
        x: Math.max(0, startLeft + dx),
        y: Math.max(0, startTop + dy),
      })
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [win, onFocus, onUpdateRect])

  const startResize = useCallback((e, mode) => {
    e.stopPropagation()
    onFocus()
    const startX = e.clientX
    const startY = e.clientY
    const startRect = { ...win.rect }

    const onMove = (ev) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      const next = { ...startRect }
      if (mode.includes('right')) next.w = Math.max(320, startRect.w + dx)
      if (mode.includes('bottom')) next.h = Math.max(200, startRect.h + dy)
      onUpdateRect(next)
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [win, onFocus, onUpdateRect])

  if (win.minimized) return null

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: '100%', zIndex: win.z, borderRadius: 0 }
    : {
        left: win.rect.x,
        top: win.rect.y,
        width: win.rect.w,
        height: win.rect.h,
        zIndex: win.z,
      }

  return (
    <div
      ref={windowRef}
      className={`win7-window ${isActive ? 'active' : 'inactive'}`}
      style={style}
      onMouseDown={onFocus}
    >
      <div className="win7-titlebar" onMouseDown={startDrag} onDoubleClick={onMaximize}>
        <div className="win7-titlebar-title">
          <span className="win7-titlebar-icon">{win.icon}</span>
          <span>{win.title}</span>
        </div>
        <div className="win7-titlebar-controls">
          <div className="win7-btn" onMouseDown={(e) => { e.stopPropagation(); onMinimize() }}>
            &#x2013;
          </div>
          <div className="win7-btn" onMouseDown={(e) => { e.stopPropagation(); onMaximize() }}>
            {win.maximized ? '\u2750' : '\u25A1'}
          </div>
          <div className="win7-btn close" onMouseDown={(e) => { e.stopPropagation(); onClose() }}>
            &#x2715;
          </div>
        </div>
      </div>

      {win.menubar && (
        <div className="win7-menubar">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Tools</span>
          <span>Help</span>
        </div>
      )}

      <div className="win7-window-body">{children}</div>

      {win.statusbar && (
        <div className="win7-statusbar">{win.statusbar}</div>
      )}

      {!win.maximized && (
        <>
          <div className="resize-handle right" onMouseDown={(e) => startResize(e, 'right')} />
          <div className="resize-handle bottom" onMouseDown={(e) => startResize(e, 'bottom')} />
          <div className="resize-handle corner" onMouseDown={(e) => startResize(e, 'right bottom')} />
        </>
      )}
    </div>
  )
}
