import { useEffect, useRef, useState } from 'react'
import { reduce } from '../lib/motion.js'
import { LANGS } from '../data.jsx'
import { SecHead, Split, pad } from './ui.jsx'
import en from '../../images/services/flagEnglish.png'
import he from '../../images/services/flagHebrew.png'
import es from '../../images/services/flagSpanish.png'
import fr from '../../images/services/flagFrench.png'
import yi from '../../images/services/flagYiddish.png'

const FLAGS = { en, he, es, fr, yi }

/* Five panels; the active one expands. Cycles on its own until the pointer is over it. */
export default function Languages({ idx = '06' }) {
  const [on, setOn] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => { if (!paused.current) setOn((i) => (i + 1) % LANGS.length) }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="pt0" aria-labelledby="lang-h">
      <div className="wrap">
        <SecHead idx={idx} label="Languages" right="EN · HE · ES · FR · YI" />
        <Split id="lang-h" className="h2" text="Language spoken *in the office.*" />
        <div
          className="langs"
          data-reveal
          onPointerEnter={() => (paused.current = true)}
          onPointerLeave={() => (paused.current = false)}
        >
          {LANGS.map((l, i) => (
            <button
              key={l.lang}
              className={`lp${on === i ? ' on' : ''}`}
              aria-pressed={on === i}
              aria-label={`${l.name}: ${l.word}`}
              onPointerEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
            >
              <span className="lp-top"><span className="mono">{pad(i + 1)}</span><img className="flag" src={FLAGS[l.lang]} width="158" height="90" alt="" /></span>
              <span className="vname">{l.name}</span>
              <span className="lp-bot">
                <span className="word" lang={l.lang} dir={l.rtl ? 'rtl' : undefined}>{l.word}</span>
                <span className="mono">{l.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
