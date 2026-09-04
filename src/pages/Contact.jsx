import Container from "../components/Container";
import EnquiryForm from "../components/EnquiryForm";
import PageIntro from "../components/PageIntro";
import { companyDetails } from "../data/company";

/*
 * ─── Recommended form state for <EnquiryForm /> ───
 *
 * When adding submission handling to the EnquiryForm component,
 * consider adding these React state variables:
 *
 *   const [isSubmitting, setIsSubmitting] = useState(false);
 *     → true while the form request is in-flight; use to show a
 *       loading spinner and disable the submit button.
 *
 *   const [isSuccess, setIsSuccess] = useState(false);
 *     → true after a successful submission; swap the form for a
 *       success/thank-you message.
 *
 *   const [error, setError] = useState(null);
 *     → holds an error message string (or null). Display inline
 *       above the submit button so the user can correct and retry.
 *
 * Typical flow:
 *   1. User clicks submit → setIsSubmitting(true), setError(null)
 *   2. API call succeeds  → setIsSubmitting(false), setIsSuccess(true)
 *   3. API call fails     → setIsSubmitting(false), setError(err.message)
 */

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
                {/* Contact person */}
                {/* <div className="border-b border-theme py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Contact person
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    {companyDetails.contactName}
                  </p>
                </div> */}

                {/* Phone */}
                <div className="border-b border-theme py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Phone
                  </p>
                  <a
                    className="mt-2 inline-block text-sm font-medium decoration-pigment-magenta decoration-2 underline-offset-4 hover:text-pigment-magenta"
                    href={companyDetails.phoneHref}
                    aria-label={"Call us at " + companyDetails.phone}
                  >
                    {companyDetails.phone}
                  </a>
                </div>

                {/* Email (conditionally rendered) */}
                {companyDetails.email && (
                  <div className="border-b border-theme py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                      Email
                    </p>
                    <a
                      className="mt-2 inline-block text-sm font-medium decoration-pigment-magenta decoration-2 underline-offset-4 hover:text-pigment-magenta"
                      href={"mailto:" + companyDetails.email}
                      aria-label={"Email us at " + companyDetails.email}
                    >
                      {companyDetails.email}
                    </a>
                  </div>
                )}

                {/* Office address */}
                <div className="border-b border-theme py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Office address
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
                    {companyDetails.address}
                  </p>
                </div>

                {/* Manufacturing unit */}
                <div className="border-b border-theme py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
                    Manufacturing unit
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
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
