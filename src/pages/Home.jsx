import { useLayoutEffect, useRef } from 'react'
import { gsap, reduce } from '../lib/motion.js'
import { useMagnetic } from '../lib/hooks.js'
import { HOME, REGIONS, PHONE, TEL, EMAIL } from '../data.jsx'
import { SecHead, Split, Arrow, pad } from '../components/ui.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import LitText from '../components/LitText.jsx'
import building from '../../images/img_home_front.jpg'
import banner from '../../images/cab_r1_c1.png'

const STATS = [
  { n: 1991, label: 'Established in Fort Lauderdale' },
  { n: 5, label: 'Languages spoken in the office' },
  { n: 4, label: 'Regions served' },
  { n: 30, sup: '+', label: 'Years of public accounting' },
]

/* Photo that opens out of a smaller frame and settles its zoom as it scrolls in. */
function Photo() {
  const fig = useRef(null)

  useLayoutEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      const st = { trigger: fig.current, start: 'top 92%', end: 'top 30%', scrub: true }
      gsap.fromTo(fig.current, { clipPath: 'inset(14% 10% 14% 10% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: st })
      gsap.fromTo('img', { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: st })
    }, fig)
    return () => ctx.revert()
  }, [])

  return (
    <figure className="photo" ref={fig}>
      <img src={building} width="716" height="333" loading="lazy" alt="One Emerald Place, a two-story white office building with black awnings in Emerald Lake Corporate Park" />
      <figcaption className="glass mono">One Emerald Place<span className="cap-addr"> · 3113 Stirling Rd #102</span></figcaption>
    </figure>
  )
}

function Welcome() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.stat b span').forEach((el) => {
        const o = { v: 0 }
        gsap.to(o, {
          v: +el.dataset.n, duration: 2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(o.v) },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="welcome" ref={root} aria-labelledby="welcome-h">
      <div className="wrap">
        <SecHead idx="02" label="Welcome" right="Since 1991" />
        <LitText as="h2" id="welcome-h" className="big-lit" text={HOME.welcomeLead} />
        <div className="welcome-grid">
          <Photo />
          <p className="body-lg dim" data-reveal>{HOME.welcomeRest}</p>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label} data-reveal>
              <b><span data-n={s.n}>{s.n}</span>{s.sup && <sup>{s.sup}</sup>}</b>
              <span className="mono dim">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PILLARS = ['Small firm approach', 'Perfect product, fair price', '“Big Four” capabilities']

function Philosophy() {
  return (
    <section className="inv" data-tone="light" aria-labelledby="philo-h">
      <div className="wrap">
        <SecHead idx="03" label="Our philosophy" />
        <Split id="philo-h" className="h2" text="Our goal is to achieve the *perfect product at a fair price.*" />
        <div className="philo-grid">
          <div data-reveal>
            <div className="abacus" role="img" aria-label="Wooden abacus resting on tax forms" style={{ backgroundImage: `url(${banner})` }} />
            <ol className="pillars">
              {PILLARS.map((p, i) => (
                <li key={p}><span className="it">{['i.', 'ii.', 'iii.'][i]}</span><span>{p}</span></li>
              ))}
            </ol>
          </div>
          <p className="lead" data-reveal>{HOME.philosophy.join(' ')}</p>
        </div>
      </div>
    </section>
  )
}

function World() {
  return (
    <section aria-labelledby="world-h">
      <div className="wrap">
        <SecHead idx="04" label="Worldwide" right="Fort Lauderdale, FL" />
        <div className="world-head">
          <Split id="world-h" className="h2" text="Multicultural and *multilingual.*" />
          <p className="lead dim" data-reveal>{HOME.world}</p>
        </div>
        <ol className="rows">
          {REGIONS.map((r, i) => (
            <li className="row region" key={r}>
              <span className="mono dim">{pad(i + 1)}</span>
              <h3>{r}</h3>
              <span className="mono dim note">Served from Fort Lauderdale</span>
              <Arrow className="arr" size={18} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Commitment() {
  const ball = useMagnetic(0.4)
  return (
    <section className="cta on-sig" data-tone="signal" aria-labelledby="commit-h">
      <div className="wrap">
        <span className="mono">[ 05 ] Our commitment</span>
        <h2 id="commit-h" className="sr">Our commitment</h2>
        <LitText className="commit" text={HOME.commitment} />
        <div className="cta-row">
          <a className="cta-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="cta-ball" href={TEL} ref={ball}>
            <span><Arrow size={22} />Call<br />{PHONE}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Welcome />
      <Philosophy />
      <World />
      <Commitment />
    </>
  )
}
