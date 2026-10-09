import { useState } from 'react'
import { PHONE, TEL, EMAIL, FAX } from '../data.jsx'
import { SecHead, Split, Btn } from './ui.jsx'
import photo from '../../images/contact/imgContactus.png'

const FIELDS = [
  { k: 'name', label: 'Name', auto: 'name', required: true },
  { k: 'email', label: 'Email', type: 'email', auto: 'email', required: true },
  { k: 'phone', label: 'Phone', type: 'tel', auto: 'tel' },
  { k: 'company', label: 'Company', auto: 'organization' },
  { k: 'subject', label: 'Subject', full: true },
]

export default function Contact({ idx = '01' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', comment: '' })
  const [status, setStatus] = useState('')

  const bind = (k) => ({ name: k, value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) })

  /* No backend yet: opens the visitor's email app addressed to David. */
  const onSubmit = (e) => {
    e.preventDefault()
    const name = form.name.trim(), email = form.email.trim(), comment = form.comment.trim()
    if (!name || !email || !comment) return setStatus('Add your name, email and a comment, then send again.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setStatus('Check your email address. It should look like name@example.com.')
    const subject = form.subject.trim() || `Website inquiry from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${form.phone}\nCompany: ${form.company}\n\n${comment}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus(`Your email app is opening with your message to ${EMAIL}.`)
  }

  return (
    <section id="contact" aria-labelledby="ct-h">
      <div className="wrap">
        <SecHead idx={idx} label="Contact" right="Fort Lauderdale, FL" />
        <div className="ct-grid">
          <div>
            <Split id="ct-h" className="h2" text="Visit or get *in touch.*" />
            <address className="info" data-reveal>
              <div><span className="mono dim">Office</span><span>CG Accounting Corporation<br />3113 Stirling Rd. Suite 102<br />Fort Lauderdale, FL 33312</span></div>
              <div><span className="mono dim">Tel</span><span><a href={TEL}>{PHONE}</a></span></div>
              <div><span className="mono dim">Fax</span><span>{FAX}</span></div>
              <div><span className="mono dim">Email</span><span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
            </address>
            <div className="ct-photo" data-reveal>
              <img src={photo} width="272" height="262" loading="lazy" alt="Smiling receptionist wearing a headset" />
            </div>
          </div>

          <form className="form" noValidate onSubmit={onSubmit} data-reveal>
            {FIELDS.map((f) => (
              <div className={`fld${f.full ? ' full' : ''}`} key={f.k}>
                <label className="mono dim" htmlFor={`f-${f.k}`}>{f.label}{f.required && ' *'}</label>
                <input id={`f-${f.k}`} type={f.type || 'text'} autoComplete={f.auto} required={f.required} {...bind(f.k)} />
              </div>
            ))}
            <div className="fld full">
              <label className="mono dim" htmlFor="f-comment">Comment *</label>
              <textarea id="f-comment" required {...bind('comment')} />
            </div>
            <div className="form-foot full">
              <p className="form-msg" role="status" aria-live="polite">{status}</p>
              <Btn type="submit">Send message</Btn>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
