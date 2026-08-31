export default function ResumeWindow() {
  return (
    <div className="resume-viewer">
      <div className="resume-page">
        <h1>Alex Morgan</h1>
        <div className="resume-sub">
          Full-Stack Developer &middot; hello@alexmorgan.dev &middot; alexmorgan.dev
        </div>

        <div className="resume-section">
          <h3>Experience</h3>
          <div className="resume-entry">
            <div className="row">
              <span>Senior Frontend Developer &mdash; Northwind Digital</span>
              <span>2023 &ndash; Present</span>
            </div>
            <div className="meta">Leading UI architecture for a suite of internal tools used by 40+ teams.</div>
          </div>
          <div className="resume-entry">
            <div className="row">
              <span>Software Engineer &mdash; Brightlane Labs</span>
              <span>2021 &ndash; 2023</span>
            </div>
            <div className="meta">Built and shipped customer-facing features across a React/Node stack.</div>
          </div>
          <div className="resume-entry">
            <div className="row">
              <span>Junior Developer &mdash; Studio Fen</span>
              <span>2020 &ndash; 2021</span>
            </div>
            <div className="meta">Contributed to marketing sites and internal design-system components.</div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Education</h3>
          <div className="resume-entry">
            <div className="row">
              <span>B.S. Computer Science &mdash; State University</span>
              <span>2016 &ndash; 2020</span>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Skills</h3>
          <div className="meta">
            JavaScript, TypeScript, React, Node.js, PostgreSQL, Python, Docker, Figma
          </div>
        </div>
      </div>
    </div>
  )
}
