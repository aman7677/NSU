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
      </Container>
    </>
  );
}
