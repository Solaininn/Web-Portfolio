export default function AboutWindow() {
  return (
    <div className="about-content">
      <div className="about-photo">{'\u{1F9D1}\u200D\u{1F4BB}'}</div>
      <div className="about-text">
        <h2>Alex Morgan</h2>
        <div className="tagline">Full-stack developer &middot; building calm, well-crafted software</div>
        <p>
          I'm a developer who likes taking software from a rough idea to something
          people actually enjoy using. I've spent the last few years building web
          apps end to end &mdash; APIs, databases, and the pixel-level details of the UI.
        </p>
        <p>
          Outside of client work, I like picking apart old operating systems for fun,
          which is more or less how this desktop happened. When I'm not at the
          keyboard, I'm usually hiking, restoring an old radio, or losing at chess.
        </p>
        <div className="skills-row">
          {['JavaScript', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Python', 'Figma', 'Docker'].map((s) => (
            <span className="skill-chip" key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
