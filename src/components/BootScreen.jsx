import { useEffect, useState } from 'react'

export default function BootScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2200)
    const t2 = setTimeout(onDone, 2700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className={`boot-screen ${fading ? 'fade-out' : ''}`}>
      <div className="boot-flag">
        <div /><div /><div /><div />
      </div>
      <div className="boot-progress-track">
        <div className="boot-progress-bar" />
      </div>
      <div className="boot-caption">Starting Zoli.OS&hellip;</div>
    </div>
  )
}
