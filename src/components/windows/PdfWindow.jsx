// Generic PDF viewer used for anything opened through the "open-pdf" action
// in FileExplorerWindow (AutoCAD drawings, etc). It just renders whatever
// `src` it's given — no dedicated component per document needed.
export default function PdfWindow({ src }) {
  return <iframe className="resume-frame" src={src} title="PDF Document" />
}
