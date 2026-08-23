import ApplicationFeature from "../components/ApplicationFeature";
import Container from "../components/Container";
import PageIntro from "../components/PageIntro";
import { applications } from "../data/applications";
import CountUp from "../components/CountUp";

export default function Applications() {
  return (
    <>
      <PageIntro
        eyebrow="NSU / Application-led colour"
        title="COLOUR FOR EVERY APPLICATION."
        description="Colour solutions shaped around the visual and practical requirements of your application."
      />
      <Container className="pb-16 md:pb-24">
        <div className="mb-10 flex items-center justify-between border-y border-theme py-5 text-[10px] font-bold uppercase tracking-[.18em] text-primary md:mb-14 md:py-6">
          <span className="text-secondary">Application index</span>
          <span>
            <CountUp value={6} suffix=" areas" />
          </span>
        </div>
        <div>
          {applications.map((application, index) => (
            <ApplicationFeature
              key={application.number}
              application={application}
              index={index}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
