export default function AboutWindow() {
  return (
    <div className="about-content">
      <div className="about-photo">{'ZL'}</div>
      <div className="about-text">
        <h2>Zoli Le</h2>
        <div className="tagline">Computer Engineering student @ UNLV &middot; Las Vegas, NV</div>
        <p>
          I am a Computer Engineering student at the University of Nevada, Las Vegas,
          where I strive to continue my pursuit of learning new skills in both
          hardware and software engineering. I love to combine the physical
          with the theoretical and find that the best projects come from a
          great understanding of both. I've enjoyed making my own projects
          from Machine Learning algorithms to FPGA digital logic and circuit
          boards. 
        </p>
        <p>
          As a Lead Software Engineer for ACM UNLV, I have helped build and
          structure the club's official site. I have previously led and completed
          IT projects as a student worker at UNLV OIT, as well as maintaining
          AWS-hosted MLS listings as an independent realtor's data coordinator, 
          and drafted architectural floor plans in AutoCAD and Fusion 360.
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
