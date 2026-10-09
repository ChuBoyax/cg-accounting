import { SecHead, Split, pad, spotlight } from './ui.jsx'
import baseball from '../../images/about/logoHollywoodBaseball.png'
import youngIsrael from '../../images/about/logoYoungH.png'
import bikur from '../../images/about/logoBikur.png'
import handForIsrael from '../../images/about/imgHandforIsrael.jpg'
import torasEmes from '../../images/about/logoTorahs.png'
import marlins from '../../images/about/logoMarlins.jpg'

// Roles and organisations verbatim from the client's About Us page.
const AFFILIATIONS = [
  { role: 'Founder and commissioner', org: 'City of Hollywood Sunday Baseball League', logo: baseball, w: 151, h: 84 },
  { role: 'Gabbai, ritual committee, former board of member', org: 'Young Israel of Hollywood', logo: youngIsrael, w: 151, h: 82 },
  { role: 'Founding member', org: 'Bikur Cholim of Hollywood', logo: bikur, w: 151, h: 82 },
  { role: 'Founder & Treasurer', org: 'A Hand For Israel Corp.', logo: handForIsrael, w: 97, h: 45 },
  { role: 'Board member', org: 'Toras Emes Academy of Miami', logo: torasEmes, w: 151, h: 82 },
  { role: 'Founder and head gabbai', org: 'Bais Medrash Miami Marlins', logo: marlins, w: 151, h: 82 },
]

export default function Affiliations({ idx = '03' }) {
  return (
    <section aria-labelledby="aff-h">
      <div className="wrap">
        <SecHead idx={idx} label="Affiliations" right={`${AFFILIATIONS.length} organizations`} />
        <Split id="aff-h" className="h2" text="Community *affiliations.*" />
        <ul className="bento aff-grid" onPointerMove={spotlight} data-reveal>
          {AFFILIATIONS.map((a, i) => (
            <li className="card aff-card" key={a.org}>
              <div className="card-top">
                <span className="mono dim">{pad(i + 1)}</span>
              </div>
              <div className="logo-tile">
                <img src={a.logo} width={a.w} height={a.h} loading="lazy" alt={`${a.org} logo`} />
              </div>
              <div>
                <h3>{a.org}</h3>
                <p>{a.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
