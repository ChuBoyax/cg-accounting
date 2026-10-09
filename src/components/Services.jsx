import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reduce, refresh } from '../lib/motion.js'
import { SERVICE_GROUPS, REFERRAL } from '../data.jsx'
import { SecHead, Split, Arrow, Crop, pad, spotlight } from './ui.jsx'
import art from '../../images/services/imgServicesNew.png'

const ART = [312, 372]

export default function Services({ idx = '01' }) {
  const [active, setActive] = useState('ind')
  const tabRefs = useRef({})
  const paneRefs = useRef({})
  const pill = useRef(null)
  const mounted = useRef(false)
  const group = SERVICE_GROUPS.find((g) => g.key === active)

  const placePill = () => {
    const t = tabRefs.current[active]
    pill.current.style.width = t.offsetWidth + 'px'
    pill.current.style.transform = `translateX(${t.offsetLeft}px)`
  }

  useLayoutEffect(() => {
    placePill()
    if (!mounted.current) { mounted.current = true; return }
    if (!reduce) {
      gsap.fromTo(paneRefs.current[active].querySelectorAll('.card'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' })
    }
    refresh()
  }, [active])

  useEffect(() => {
    window.addEventListener('resize', placePill)
    document.fonts?.ready.then(placePill)
    return () => window.removeEventListener('resize', placePill)
  }, [active])

  const onKeyDown = (e, i) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = SERVICE_GROUPS[(i + step + SERVICE_GROUPS.length) % SERVICE_GROUPS.length].key
    tabRefs.current[next].focus()
    setActive(next)
  }

  return (
    <section id="services" aria-labelledby="svc-h">
      <div className="wrap">
        <SecHead idx={idx} label="Services" right="Individuals · Business · QuickBooks" />
        <Split id="svc-h" className="h2" text="Tax and accounting for *people and businesses.*" />

        <div className="svc-grid">
          <div className="svc-side">
            <div className="seg" role="tablist" aria-label="Service group" data-reveal>
              <span className="pill" ref={pill} aria-hidden="true" />
              {SERVICE_GROUPS.map((g, i) => (
                <button
                  key={g.key}
                  ref={(el) => (tabRefs.current[g.key] = el)}
                  role="tab"
                  id={`t-${g.key}`}
                  aria-selected={active === g.key}
                  aria-controls={`p-${g.key}`}
                  tabIndex={active === g.key ? 0 : -1}
                  onClick={() => setActive(g.key)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <p className="svc-count mono dim">{pad(group.items.length)} services · {group.label}</p>
            <Crop className="svc-photo" src={art} nat={ART} box={[46, 4, 220, 150]} alt="Team meeting around a conference table, seen from above" />
          </div>

          <div>
            {SERVICE_GROUPS.map((g) => (
              <div
                key={g.key}
                ref={(el) => (paneRefs.current[g.key] = el)}
                id={`p-${g.key}`}
                role="tabpanel"
                aria-labelledby={`t-${g.key}`}
                hidden={active !== g.key}
              >
                <ul className="bento svc-cards" onPointerMove={spotlight} data-reveal>
                  {g.items.map((s, i) => (
                    <li className="card" key={s.title}>
                      <div className="card-top">
                        <span className="mono dim">{pad(i + 1)}</span>
                        <Arrow className="dim" />
                      </div>
                      <div>
                        <h3>{s.title}</h3>
                        {s.note && <p>({s.note})</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="referral" data-reveal>
          <Crop className="ref-photo" src={art} nat={ART} box={[46, 212, 220, 140]} alt="Handshake over financial paperwork" />
          <div>
            <span className="mono dim">Referral network</span>
            <p className="lead">{REFERRAL}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
