import ApplicationFeature from "../components/ApplicationFeature";
import Container from "../components/Container";
import PageIntro from "../components/PageIntro";
import { applications } from "../data/applications";
import CountUp from "../components/CountUp";
import ApplicationSelector from "../components/ApplicationSelector";
import GradeFinder from "../components/GradeFinder";
import Button from "../components/Button";

export default function Applications() {
  return (
    <>
      <PageIntro
        eyebrow="NSU / Application-led colour"
        title="COLOUR FOR EVERY APPLICATION."
        description="Colour solutions shaped around the visual and practical requirements of your application."
      />
      <ApplicationSelector />
      <GradeFinder />
      <Container className="pb-16 md:pb-24">
        <div className="mb-10 flex items-center justify-between border-y border-theme py-5 text-[10px] font-bold uppercase tracking-[.18em] text-primary md:mb-14 md:py-6">
          <span className="text-secondary">Application index</span>
          <span>
            <CountUp value={applications?.length || 0} suffix=" areas" />
          </span>
        </div>
        {!applications || applications.length === 0 ? (
          <div className="text-center">No applications currently available.</div>
        ) : (
          <ul className="grid grid-cols-1 gap-8 lg:gap-12">
            {applications.map((application, index) => (
              <li
                key={application.number}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ApplicationFeature
                  application={application}
                  index={index}
                />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-theme pt-8 md:mt-24">
          <p className="mr-3 text-sm text-secondary">Have an application requirement?</p>
          <Button to="/contact?intent=sample" icon={false}>Request a sample</Button>
          <Button to="/contact?intent=quote" variant="secondary" icon={false}>Request a quote</Button>
          <Button to="/contact?intent=technical" variant="secondary" icon={false}>Contact technical team</Button>
        </div>
      </Container>
    </>
  );
}
