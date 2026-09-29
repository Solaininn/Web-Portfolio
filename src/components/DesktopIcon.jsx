export default function DesktopIcon({ icon, label, selected, onSelect, onOpen }) {
  const isImage = typeof icon === 'string' && icon.startsWith('/')
  return (
    <div
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      {isImage ? (
        <img className="desktop-icon-glyph" src={icon} alt="" draggable={false} />
      ) : (
        <div className="desktop-icon-emoji">{icon}</div>
      )}
      <div className="desktop-icon-label">{label}</div>
    </div>
  )
}
