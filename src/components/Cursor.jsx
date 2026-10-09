import { useEffect, useRef } from 'react'
import { gsap, reduce, finePointer } from '../lib/motion.js'

const enabled = finePointer && !reduce

/* Trailing ring + dot. Switches to ink over light sections, grows over anything clickable. */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('has-cursor', 'cursor-out')
    gsap.set([ring.current, dot.current], { x: -100, y: -100 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 })

    const move = (e) => {
      html.classList.remove('cursor-out')
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY)
      const t = e.target instanceof Element ? e.target : null
      const tone = t?.closest('[data-tone]')?.dataset.tone || 'dark'
      ring.current.dataset.tone = tone
      dot.current.dataset.tone = tone
      ring.current.classList.toggle('hover', !!t?.closest('a, button, [data-hover]'))
    }
    const out = () => html.classList.add('cursor-out')

    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', out)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', out)
      html.classList.remove('has-cursor', 'cursor-out')
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
