import { Fragment } from 'react'
import { useMagnetic, useClock } from '../lib/hooks.js'

export const pad = (n) => String(n).padStart(2, '0')

// Spotlight follows the pointer across every .card in the container at once.
export const spotlight = (e) => {
  e.currentTarget.querySelectorAll('.card').forEach((c) => {
    const r = c.getBoundingClientRect()
    c.style.setProperty('--mx', `${e.clientX - r.left}px`)
    c.style.setProperty('--my', `${e.clientY - r.top}px`)
  })
}

/* Shows one region of an image. `box` is [x, y, w, h] in the source's pixels, `nat` its [width, height].
   The old site's art is several photos per file, so this pulls each photo out on its own. */
export function Crop({ src, box: [x, y, w, h], nat: [W, H], alt, className = '' }) {
  const style = {
    backgroundImage: `url(${src})`,
    backgroundSize: `${(W / w) * 100}% auto`,
    backgroundPosition: `${W === w ? 0 : (x / (W - w)) * 100}% ${H === h ? 0 : (y / (H - h)) * 100}%`,
    aspectRatio: `${w} / ${h}`,
  }
  return <div className={`crop ${className}`} role="img" aria-label={alt} style={style} />
}

export function Arrow({ className, size = 14 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Pill button with a rolling label and a magnetic pull. `children` must be a string. */
export function Btn({ href, children, variant = 'signal', className = '', ...rest }) {
  const ref = useMagnetic(0.25)
  const Tag = href ? 'a' : 'button'
  return (
    <Tag ref={ref} href={href} className={`btn btn-${variant} ${className}`} {...rest}>
      <span className="roll"><span data-t={children}>{children}</span></span>
      <span className="ic"><Arrow /></span>
    </Tag>
  )
}

/* "[ 04 ]  Services ———————— right" */
export function SecHead({ idx, label, right }) {
  return (
    <div className="sh" data-sh>
      <span className="mono">[ {idx} ]</span>
      <span className="mono dim">{label}</span>
      <span className="rule" />
      {right && <span className="mono dim">{right}</span>}
    </div>
  )
}

/* Heading whose words rise in on scroll. Wrap words in *asterisks* for the serif italic. */
export function Split({ text, as: Tag = 'h2', className = '', ...rest }) {
  let italic = false
  const words = text.split(' ').map((raw) => {
    const open = raw.startsWith('*')
    const close = /\*[.,!?]?$/.test(raw) || /\*$/.test(raw)
    const it = italic || open
    if (open && !close) italic = true
    if (close) italic = false
    return { w: raw.replace(/\*/g, ''), it }
  })
  return (
    <Tag className={`split ${className}`} {...rest}>
      <span className="sr">{text.replace(/\*/g, '')}</span>
      <span aria-hidden="true">
        {words.map((x, i) => (
          <Fragment key={i}>
            <span className="w"><span className={x.it ? 'it' : undefined}>{x.w}</span></span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}

export function Clock({ className = '' }) {
  const t = useClock()
  return (
    <span className={`mono ${className}`}>
      <i aria-hidden="true" />FLL {t}
    </span>
  )
}
