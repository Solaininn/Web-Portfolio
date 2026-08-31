export default function AboutWindow() {
  return (
    <div className="about-content">
      <div className="about-photo">{'ZL'}</div>
      <div className="about-text">
        <h2>Zoli Le</h2>
        <div className="tagline">Computer Engineering student @ UNLV &middot; Las Vegas, NV</div>
        <p>
          I'm a Computer Engineering student at the University of Nevada, Las Vegas
          (Dean's Honour List), working across software and hardware &mdash; from
          machine learning and full-stack web to FPGA digital logic and AV/IT
          systems. I like projects that combine a bit of everything: writing code,
          wiring hardware, and designing the interface people actually touch.
        </p>
        <p>
          Currently the Lead Software Engineer for ACM UNLV, where I help build and
          maintain the club's official site. Previously worked in classroom
          technology at UNLV IT, ran AWS-hosted MLS infrastructure as an independent
          realtor's data coordinator, and drafted architectural floor plans in
          AutoCAD and Fusion 360.
        </p>
        <div className="skills-row">
          {['C++', 'C#', 'Python', 'TypeScript', 'JavaScript', 'Java', 'Verilog', 'SystemVerilog', 'HTML/CSS', 'AWS', 'AutoCAD', 'Fusion 360', 'FPGA / Quartus'].map((s) => (
            <span className="skill-chip" key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
