import PageHero from '../components/PageHero.jsx'
import Contact from '../components/Contact.jsx'
import Directions from '../components/Directions.jsx'

export default function ContactPage() {
  return (
    <>
      <PageHero code="05" label="Contact Us" title="Contact" accent="Us" note="3113 Stirling Rd. Suite 102 · Fort Lauderdale, FL 33312" />
      <Contact idx="01" />
      <Directions idx="02" />
    </>
  )
}
