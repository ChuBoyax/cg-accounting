import { useLayoutEffect, useRef } from 'react'
import { gsap, reduce } from '../lib/motion.js'

/* Text whose words light up one by one as it scrolls through the viewport. */
export default function LitText({ text, as: Tag = 'p', className = '', ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelectorAll('.mw'), { opacity: 0.14 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 50%', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref} className={`lit ${className}`} {...rest}>
      {text.split(' ').map((w, i) => <span key={i} className="mw">{w}{' '}</span>)}
    </Tag>
  )
}
