import { useState } from 'react'

export default function ContactWindow() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact-content">
      <h2>New Message</h2>
      <div className="sub">Send me a message!</div>

      {sent && (
        <div className="sent-confirm">
          Message sent. Thanks for reaching out! I'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="win7-field">
          <label>Your name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="win7-field">
          <label>Your email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="win7-field">
          <label>Message</label>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <button type="submit" className="win7-primary-btn">Send Message</button>
      </form>

      <div className="contact-links">
        <div className="contact-link-row">
          <span>{'\u2709\uFE0F'}</span>
          <a href="mailto:Zolikale@icloud.com">Zolikale@icloud.com</a>
        </div>
        <div className="contact-link-row">
          <span>{'\u{1F3EB}'}</span>
          <a href="mailto:Lez1@unlv.nevada.edu">Lez1@unlv.nevada.edu</a>
        </div>
        <div className="contact-link-row">
          <span>{'\u{1F4CD}'}</span>
          <span>Las Vegas, NV</span>
        </div>
        <div className="contact-link-row">
          <span>{'\u{1F4BC}'}</span>
          <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="contact-link-row">
          <span>{'\u{1F4C1}'}</span>
          <a href="#" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  )
}
