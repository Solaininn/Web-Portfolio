export default function DesktopIcon({ icon, label, selected, onSelect, onOpen }) {
  return (
    <div
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <img className="desktop-icon-glyph" src={icon} alt="" draggable={false} />
      <div className="desktop-icon-label">{label}</div>
    </div>
  )
}
