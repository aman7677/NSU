import Container from "../components/Container";
import EnquiryForm from "../components/EnquiryForm";
import PageIntro from "../components/PageIntro";
import { companyDetails } from "../data/company";

export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="B2B enquiries"
        title="LET'S TALK COLOUR."
        description="Tell us what you're looking for and our team will get back to you."
      />
      <Container className="pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
          <aside className="lg:col-span-4">
            <div className="border-t border-theme pt-8">
              <h2 className="max-w-4xl text-4xl font-semibold leading-[.92] tracking-[-0.075em] md:text-6xl">
                Start with your requirement.
              </h2>
            </div>
            <address className="mt-10 not-italic">
              <div className="border-t border-theme">
                <div className="border-b border-black/15 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Contact person
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    {companyDetails.contactName}
                  </p>
                </div>
                <div className="border-b border-black/15 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Phone
                  </p>
                  <a
                    className="mt-2 inline-block text-sm font-medium underline decoration-pigment-magenta decoration-2 underline-offset-4 hover:text-pigment-magenta"
                    href={companyDetails.phoneHref}
                  >
                    {companyDetails.phone}
                  </a>
                </div>
                <div className="border-b border-black/15 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Office address
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    {companyDetails.address}
                  </p>
                </div>
                <div className="border-b border-black/15 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Manufacturing unit
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    {companyDetails.manufacturingUnit}
                  </p>
                </div>
              </div>
            </address>
          </aside>
        </div>
      </Container>
    </>
  );
}
