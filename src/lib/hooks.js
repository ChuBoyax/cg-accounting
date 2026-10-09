import { useEffect, useRef, useState } from 'react'
import { gsap, reduce, finePointer } from './motion.js'

/* Element drifts toward the pointer while hovered, springs back on leave. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer || reduce) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, .4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, .4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * strength)
      yTo((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength])
  return ref
}

/* Subtle 3D tilt toward the pointer. */
export function useTilt(max = 6) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer || reduce) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' })
    gsap.set(el, { transformPerspective: 1100 })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * max * 2)
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
    }
    const leave = () => { rx(0); ry(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

const LATIN = 'abcdefghijklmnopqrstuvwxyz#%&*+/<>'
const HEBREW = 'אבגדהוזחטיכלמנסעפצקרשת'

/* Decodes from noise into `text` whenever `text` changes. */
export function useScramble(text, { rtl = false, duration = 950 } = {}) {
  const [out, setOut] = useState(text)
  const first = useRef(true)
  useEffect(() => {
    if (first.current || reduce) {
      first.current = false
      setOut(text)
      return
    }
    const pool = rtl ? HEBREW : LATIN
    const ranks = Array.from(text, (_, i) => (i / text.length) * 0.6 + Math.random() * 0.4)
    const t0 = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        s += p >= ranks[i] || ch === ' ' ? ch : pool[(Math.random() * pool.length) | 0]
      }
      setOut(s)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, rtl, duration])
  return out
}

const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

/* Live office time in Fort Lauderdale. */
export function useClock() {
  const [t, setT] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setT(fmt.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}
