import DotField from './DotField.jsx'

/* Shorter hero for inner pages: two-line title, second line in the serif italic. */
export default function PageHero({ code, label, title, accent, note }) {
  return (
    <section className="hero phero" data-hero aria-labelledby="page-h">
      <DotField />
      <div className="wrap">
        <div className="hero-meta mono dim" data-intro>
          <span>[ {code} ] {label}</span>
          <span>Fort Lauderdale, Florida</span>
          <span>Est. 1991</span>
        </div>
        <h1 id="page-h">
          <span className="sr">{title} {accent}</span>
          <span aria-hidden="true">
            <span className="ln"><span>{title}</span></span>
            <span className="ln"><span className="it">{accent}<span className="sig">.</span></span></span>
          </span>
        </h1>
        {note && <p className="phero-note mono dim" data-intro>{note}</p>}
      </div>
    </section>
  )
}
