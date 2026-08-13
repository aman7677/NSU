import ApplicationFeature from '../components/ApplicationFeature'
import Container from '../components/Container'
import PageIntro from '../components/PageIntro'
import { applications } from '../data/applications'
import CountUp from '../components/CountUp'

export default function Applications() {
  return <><PageIntro eyebrow="NSU / Application-led colour" title="COLOUR FOR EVERY APPLICATION." description="Colour solutions shaped around the visual and practical requirements of your application." /><Container className="pb-8 md:pb-16"><div className="mb-12 flex items-center justify-between border-t border-black pt-4 text-[10px] font-bold uppercase tracking-[.16em] text-black/45"><span>Application index</span><span><CountUp value={6} suffix=" areas" /></span></div><div>{applications.map((application, index) => <ApplicationFeature key={application.number} application={application} index={index} />)}</div></Container></>
}
