import PageHero from '../components/PageHero.jsx'
import Team from '../components/Team.jsx'
import Story from '../components/Story.jsx'
import Affiliations from '../components/Affiliations.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function AboutPage() {
  return (
    <>
      <PageHero code="02" label="About Us" title="About" accent="Us" note="David Goldis · Public Accountant for 30+ years" />
      <Team idx="01" />
      <Story idx="02" />
      <Affiliations idx="03" />
      <CtaBand />
    </>
  )
}
