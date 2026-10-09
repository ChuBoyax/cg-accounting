import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { reduce } from '../lib/motion.js'
import { useScramble } from '../lib/hooks.js'
import { HERO_WORDS, PHONE, TEL, EMAIL } from '../data.jsx'
import { Btn, Arrow } from './ui.jsx'
import DotField from './DotField.jsx'

export default function Hero() {
  const [wi, setWi] = useState(0)
  const word = HERO_WORDS[wi]
  const text = useScramble(word.text, { rtl: word.rtl })

  /* "accountant" cycles through the five office languages */
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setWi((i) => (i + 1) % HERO_WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" data-hero aria-labelledby="hero-h">
      <DotField />
      <div className="wrap">
        <div className="hero-meta mono dim" data-intro>
          <span>[ 01 ] CG Accounting Corporation</span>
          <span>Fort Lauderdale, Florida</span>
          <span>Est. 1991</span>
        </div>

        <h1 id="hero-h">
          <span className="sr">Your accountant, with personal attention.</span>
          <span aria-hidden="true">
            <span className="ln"><span>Your <span className="scr" lang={word.lang} dir={word.rtl ? 'rtl' : undefined}>{text}</span>,</span></span>
            <span className="ln"><span>with personal</span></span>
            <span className="ln"><span>attention<span className="sig">.</span></span></span>
          </span>
        </h1>

        <div className="hero-foot">
          <div data-intro>
            <address className="hero-addr">
              <span>3113 Stirling Rd #102<br />Fort Lauderdale, FL 33312</span>
              <span><a href={TEL}>{PHONE}</a><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </address>
            <div className="hero-links">
              <a className="txt-link" href="https://www.irs.gov/wheres-my-refund" target="_blank" rel="noopener">Check your federal refund <Arrow /></a>
              <Link className="txt-link" to="/tax-info">Tax forms &amp; links <Arrow /></Link>
            </div>
          </div>
          <div data-intro>
            <span className="mono dim">Spoken in the office</span>
            <div className="langbar mono" aria-hidden="true">
              {HERO_WORDS.map((x, i) => <span key={x.lang} className={i === wi ? 'on' : undefined}>{x.name}</span>)}
            </div>
          </div>
          <div className="ctas" data-intro>
            <Btn href={TEL}>{`Call ${PHONE}`}</Btn>
            <Btn href={`mailto:${EMAIL}`} variant="ghost">Email David</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
