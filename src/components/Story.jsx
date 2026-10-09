import { useLayoutEffect, useRef } from 'react'
import { gsap, reduce } from '../lib/motion.js'
import { STORY } from '../data.jsx'
import { SecHead, Split, pad } from './ui.jsx'

export default function Story({ idx = '03' }) {
  const root = useRef(null)
  const track = useRef(null)
  const prog = useRef(null)

  useLayoutEffect(() => {
    const section = root.current
    const mm = gsap.matchMedia()

    // Desktop: pin the section and scrub the timeline sideways.
    mm.add('(min-width: 861px)', () => {
      if (reduce) {
        section.classList.add('static-tl')
        return () => section.classList.remove('static-tl')
      }
      const wrap = track.current.parentElement
      const dist = () => {
        const cs = getComputedStyle(wrap)
        const inner = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
        return Math.max(0, track.current.scrollWidth - inner)
      }
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => (section.offsetHeight >= window.innerHeight ? 'bottom bottom' : 'center center'),
          end: () => '+=' + dist(),
          pin: true, scrub: 1, invalidateOnRefresh: true,
        },
      })
        .to(track.current, { x: () => -dist(), ease: 'none' }, 0)
        .to(prog.current, { scaleX: 1, ease: 'none' }, 0)
    })

    // Mobile: vertical stack, cards rise in.
    mm.add('(max-width: 860px)', () => {
      section.classList.add('static-tl')
      if (!reduce) {
        section.querySelectorAll('.stop').forEach((p) => {
          gsap.from(p, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 90%' } })
        })
      }
      return () => section.classList.remove('static-tl')
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="story inv" id="story" ref={root} data-tone="light" aria-labelledby="story-h">
      <div className="wrap">
        <SecHead idx={idx} label="Our story" right="Philadelphia → Fort Lauderdale" />
        <div className="story-head">
          <Split id="story-h" className="h2" text="From Wall Street to *Fort Lauderdale.*" />
        </div>
        <div className="tl" ref={track}>
          {STORY.map((s, i) => (
            <article className={`stop${i === STORY.length - 1 ? ' dark' : ''}`} key={s.title}>
              <div className="stop-top mono">
                <span>{pad(i + 1)} / {pad(STORY.length)}</span>
                <span className="dim">David Goldis</span>
              </div>
              <div>
                <div className="when">{s.when}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="tl-prog" aria-hidden="true"><i ref={prog} /></div>
      </div>
    </section>
  )
}
