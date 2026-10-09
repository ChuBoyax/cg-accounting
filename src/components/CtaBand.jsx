import { useMagnetic } from '../lib/hooks.js'
import { PHONE, TEL, EMAIL } from '../data.jsx'
import { Split, Arrow } from './ui.jsx'

export default function CtaBand() {
  const ball = useMagnetic(0.4)

  return (
    <section className="cta on-sig" data-tone="signal" aria-label="Get in touch">
      <div className="wrap">
        <span className="mono">[ Talk to us ]</span>
        <Split as="h2" text="Personal attention, *in your language.*" style={{ marginTop: 28 }} />
        <div className="cta-row">
          <a className="cta-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="cta-ball" href={TEL} ref={ball}>
            <span><Arrow size={22} />Call<br />{PHONE}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
