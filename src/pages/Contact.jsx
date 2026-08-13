import Container from '../components/Container'
import EnquiryForm from '../components/EnquiryForm'
import PageIntro from '../components/PageIntro'
import SectionTitle from '../components/SectionTitle'

export default function Contact() {
  return <><PageIntro eyebrow="B2B enquiries" title="LET'S TALK COLOUR." description="Tell us what you're looking for and our team will get back to you." /><Container className="pb-20 md:pb-28"><div className="grid gap-12 lg:grid-cols-12 lg:gap-16"><div className="lg:col-span-8"><EnquiryForm /></div><aside className="lg:col-span-4"><SectionTitle label="Contact information" number="01" title="Start with your requirement." description="Share the colour, application and quantity context you have. The more detail you can provide, the easier it is to begin the right conversation." /><div className="mt-10 border-t border-black"><div className="border-b border-black/15 py-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-black/45">Email</p><p className="mt-2 text-sm">Available on request</p></div><div className="border-b border-black/15 py-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-black/45">Phone</p><p className="mt-2 text-sm">Available on request</p></div><div className="border-b border-black/15 py-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-black/45">Address</p><p className="mt-2 text-sm">Available on request</p></div></div></aside></div></Container></>
}
