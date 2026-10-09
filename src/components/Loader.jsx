import { useLayoutEffect, useRef } from 'react'
import { gsap, reduce, heroIntro, headerIntro } from '../lib/motion.js'

/* Counts up to the founding year, then wipes away to reveal the hero. */
export default function Loader({ onDone }) {
  const root = useRef(null)
  const num = useRef(null)
  const bar = useRef(null)

  useLayoutEffect(() => {
    if (reduce) {
      num.current.textContent = '1991'
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }

    const ctx = gsap.context(() => {
      const o = { v: 0 }
      gsap.timeline({ onComplete: onDone })
        .from('.ld-meta > *', { opacity: 0, y: 12, stagger: 0.08, duration: 0.7, ease: 'power2.out' }, 0)
        .to(o, { v: 1991, duration: 1.8, ease: 'expo.inOut', onUpdate: () => { num.current.textContent = String(Math.round(o.v)).padStart(4, '0') } }, 0)
        .to(bar.current, { scaleX: 1, duration: 1.8, ease: 'expo.inOut' }, 0)
        .to('.ld-inner', { yPercent: -18, opacity: 0, duration: 0.8, ease: 'expo.in' }, '+=.2')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.45')
        // Deferred out of this context: GSAP runs callbacks inside it, which would scope the hero
        // selectors to the loader and revert the intro when the loader unmounts.
        .add(() => setTimeout(() => { heroIntro(); headerIntro() }), '-=.7')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="loader" ref={root} role="status" aria-label="Loading">
      <div className="ld-inner">
        <div className="ld-meta mono">
          <span>CG Accounting Corp.</span>
          <span>Fort Lauderdale, FL</span>
          <span>Est.</span>
        </div>
        <div>
          <div className="ld-num" ref={num} aria-hidden="true">0000</div>
          <div className="ld-bar"><i ref={bar} /></div>
        </div>
      </div>
    </div>
  )
}
