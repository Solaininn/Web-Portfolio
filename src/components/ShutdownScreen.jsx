import { useEffect, useState } from 'react'

export default function ShutdownScreen({ onPowerOn }) {
  const [off, setOff] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOff(true), 1600)
    return () => clearTimeout(t)
  }, [])

  if (!off) {
    return (
      <div className="shutdown-screen">
        <div className="boot-flag shutdown-flag">
          <div /><div /><div /><div />
        </div>
        <div className="shutdown-caption">Shutting down&hellip;</div>
      </div>
    )
  }

  return (
    <div
      className="shutdown-screen shutdown-screen-off"
      onClick={onPowerOn}
      role="button"
      tabIndex={0}
    >
      <div className="shutdown-safe">It's now safe to turn off your computer.</div>
      <div className="shutdown-hint">Click anywhere to turn it back on</div>
    </div>
  )
}
