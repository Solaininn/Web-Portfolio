export default function ResumeWindow() {
  return (
    <div className="resume-viewer">
      <div className="resume-page">
        <h1>Zoli Le</h1>
        <div className="resume-sub">
          Las Vegas, NV &middot; &middot; Zolikale@icloud.com
        </div>

        <div className="resume-section">
          <h3>Education</h3>
          <div className="resume-entry">
            <div className="row">
              <span>University of Nevada, Las Vegas</span>
              <span>Aug. 2023 &ndash; May 2027</span>
            </div>
            <div className="meta">B.S. Computer Engineering, Dean's Honour List</div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Skills</h3>
          <div className="meta">
            <strong>Languages:</strong> C++, Python, HTML, CSS, Assembly (x86, MIPS), TypeScript, JavaScript, Java, Verilog
          </div>
          <div className="meta">
            <strong>Tools:</strong> Xcode, VS Code, Fusion 360, Blender, AutoCAD, PyCharm, Quartus, FPGA
          </div>
          <div className="meta">
            <strong>Mechanical:</strong> Welding, drilling, soldering, wire termination
          </div>
          <div className="meta">
            <strong>AWS:</strong> Cloud Practitioner, Networking
          </div>
        </div>

        <div className="resume-section">
          <h3>Experience</h3>
          <div className="resume-entry">
            <div className="row">
              <span>Classroom Technology Student Worker &mdash; UNLV Information Technology</span>
              <span>Nov 2024 &ndash; Sep 2025</span>
            </div>
            <div className="meta">
              Supported and maintained AV/IT systems across 100+ university classrooms, leading modernization
              projects, equipment installs, and end-to-end system verification. Customized UI touch panel
              interfaces and configured Biamp DSP routing and DMPS/HDMI switching for reliable AV delivery.
            </div>
          </div>
          <div className="resume-entry">
            <div className="row">
              <span>Real Estate Data &amp; MLS Coordinator &mdash; Independent Realtor</span>
              <span>Mar 2020 &ndash; Feb 2024</span>
            </div>
            <div className="meta">
              Maintained AWS-hosted MLS listings using EC2, S3, Route 53, and CloudFront with IAM security
              practices, supporting 1,400+ occasional clients and 100+ recurring investors.
            </div>
          </div>
          <div className="resume-entry">
            <div className="row">
              <span>AutoCAD Floor Plans &amp; Blueprints &mdash; AutoCAD, Fusion 360</span>
              <span>Aug 2020 &ndash; May 2024</span>
            </div>
            <div className="meta">
              Designed and drafted 2D floor plans and blueprints for residential and school facility buildings,
              then built 3D models in Fusion 360 to visualize spatial layouts before construction.
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Projects</h3>
          <div className="resume-entry">
            <div className="row">
              <span>Rebel Locate &mdash; UNLV Geolocation System</span>
            </div>
            <div className="meta">
              ML-based geolocator predicting building/room from photo EXIF metadata across 6,000+ geotagged
              images; KNN classifier plus a CNN fine-tuned on Places365 weights, 81% average test accuracy.
            </div>
          </div>
          <div className="resume-entry">
            <div className="row">
              <span>FPGA Sudoku</span>
            </div>
            <div className="meta">
              Interactive Sudoku built entirely in hardware with SystemVerilog on an Intel DE2-115 FPGA, with
              real-time VGA graphics, FSM-driven controls, and a Character ROM rendering pipeline.
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Leadership</h3>
          <div className="resume-entry">
            <div className="row">
              <span>Lead Software Engineer &mdash; ACM UNLV</span>
              <span>Aug 2024 &ndash; Present</span>
            </div>
            <div className="meta">
              Contributing to ACM UNLV's official website with Next.js, Tailwind CSS, and shadcn/ui, including
              responsive UI components and an animated landing page built with Figma and CSS.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
