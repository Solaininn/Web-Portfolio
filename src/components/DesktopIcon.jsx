export default function DesktopIcon({ icon, label, color, selected, onSelect, onOpen }) {
  return (
    <div
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <div className="desktop-icon-glyph" style={{ background: color }}>
        {icon}
      </div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  )
}
