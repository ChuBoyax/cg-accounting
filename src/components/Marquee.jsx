import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduce } from '../lib/motion.js'
import { HIGHLIGHTS } from '../data.jsx'

/* Endless band that speeds up and follows scroll direction. */
export default function Marquee() {
  const track = useRef(null)

  useLayoutEffect(() => {
    if (reduce) return
    const loop = gsap.to(track.current, { xPercent: -50, duration: 48, ease: 'none', repeat: -1 })
    // Start deep into the repeat so it can also run backwards when scrolling up.
    loop.totalTime(loop.duration() * 500)
    let dir = 1
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        dir = self.direction
        const boost = Math.min(Math.abs(self.getVelocity()) / 260, 7)
        gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.25, overwrite: true })
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25, ease: 'power2.out' })
      },
    })
    return () => { st.kill(); loop.kill() }
  }, [])

  const items = HIGHLIGHTS.map((t) => <li key={t}>{t}</li>)
  return (
    <div className="marq" data-tone="signal" aria-label="Highlights">
      <div className="marq-track" ref={track}>
        <ul>{items}</ul>
        <ul aria-hidden="true">{items}</ul>
      </div>
    </div>
  )
}
