import { useLayoutEffect, useRef } from 'react'
import { gsap, reduce, scrollToTarget } from '../lib/motion.js'
import { PHONE, TEL, EMAIL, FAX } from '../data.jsx'
import { Link } from 'react-router-dom'
import { NAV } from './Header.jsx'
import { Clock, Arrow } from './ui.jsx'

const WORD = 'CG Accounting'

export default function Footer() {
  const word = useRef(null)

  useLayoutEffect(() => {
    const el = word.current
    // Scale the wordmark so it spans the content width exactly.
    const fit = () => {
      el.style.fontSize = ''
      const avail = el.parentElement.clientWidth
      const size = parseFloat(getComputedStyle(el).fontSize)
      el.style.fontSize = `${(size * avail * 0.995) / el.getBoundingClientRect().width}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)

    const ctx = !reduce && gsap.context(() => {
      gsap.from(el.querySelectorAll('.ch'), {
        yPercent: 110, duration: 1.4, stagger: 0.035, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 98%' },
      })
    })
    return () => { window.removeEventListener('resize', fit); ctx && ctx.revert() }
  }, [])

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="f-top">
          <div>
            <p className="f-intro">Serving clients throughout the United States, Israel, Europe, and Latin America.</p>
          </div>
          <div>
            <h3 className="mono dim">Explore</h3>
            <ul>{NAV.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="mono dim">Contact</h3>
            <ul>
              <li><span className="dim">3113 Stirling Rd. Suite 102<br />Fort Lauderdale, FL 33312</span></li>
              <li><a href={TEL}>Tel {PHONE}</a></li>
              <li><span className="dim">Fax {FAX}</span></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mono dim">Policies</h3>
            <ul>
              <li><a href="#">[Privacy policy]</a></li>
              <li><a href="#">[Accessibility statement]</a></li>
            </ul>
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <span className="f-word" ref={word} aria-hidden="true">
            {Array.from(WORD).map((c, i) => <span className="ch" key={i}>{c === ' ' ? ' ' : c}</span>)}
          </span>
        </div>

        <div className="f-base mono">
          <span>© CG Accounting Corporation {new Date().getFullYear()}</span>
          <Clock />
          <button onClick={() => scrollToTarget(0)}>Back to top <Arrow /></button>
        </div>
      </div>
    </footer>
  )
}
