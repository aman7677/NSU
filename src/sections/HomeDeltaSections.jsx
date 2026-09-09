import { ArrowUpRight, Beaker, Globe2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { applications } from "../data/applications";
import { companyDetails } from "../data/company";

export function HomeApplications() {
  return (
    <section className="border-y border-theme bg-secondary py-20 text-primary md:py-28">
      <Container>
        <SectionTitle
          label="Applications"
          title="COLOUR FOR EVERY APPLICATION."
          description="Application-led colour directions for the products and processes represented in the NSU range."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <article key={application.number} className="glass-card rounded-2xl p-6">
              <p className="text-3xl font-bold tracking-[-.08em]" style={{ color: application.accent }}>
                {application.number}
              </p>
              <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-.04em]">{application.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-secondary">{application.description}</p>
            </article>
          ))}
        </div>
        <Link to="/applications" className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-pigment-yellow hover:text-pigment-pink">
          Explore applications <ArrowUpRight size={16} />
        </Link>
      </Container>
    </section>
  );
}

export function HomeTechnologyQuality() {
  return (
    <section className="border-b border-theme bg-primary py-20 text-primary md:py-28">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-card rounded-2xl p-8 md:p-10">
            <Beaker className="text-pigment-orange" size={30} strokeWidth={1.6} />
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Technology &amp; R&amp;D</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[.95] tracking-[-.06em] md:text-5xl">Colour development shaped around the brief.</h2>
            <p className="mt-5 text-base leading-relaxed text-secondary">Custom colour development brings the target shade, intended application, and formulation requirements into focus before a suitable direction is discussed.</p>
            <Button to="/contact?intent=technical" variant="secondary" className="mt-8">Discuss a technical requirement</Button>
          </article>
          <article className="glass-card rounded-2xl p-8 md:p-10">
            <ShieldCheck className="text-pigment-yellow" size={30} strokeWidth={1.6} />
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Quality</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[.95] tracking-[-.06em] md:text-5xl">Consistency is part of the colour.</h2>
            <p className="mt-5 text-base leading-relaxed text-secondary">Specific quality and technical requirements should be reviewed with the NSU team against approved product information.</p>
            <Button to="/contact?intent=technical" variant="secondary" className="mt-8">Talk to the technical team</Button>
          </article>
        </div>
      </Container>
    </section>
  );
}

export function HomeBusinessResources() {
  return (
    <section className="border-b border-theme bg-secondary py-20 text-primary md:py-28">
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-theme bg-card/60 p-7 md:p-8 lg:col-span-2">
            <Globe2 className="text-pigment-yellow" size={30} strokeWidth={1.6} />
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Global Business</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[.95] tracking-[-.06em] md:text-5xl">Start a conversation about your market.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary">For regional supply and application enquiries, connect with Narayan Sindur Udyog using the available NSU contact details.</p>
            <div className="mt-7 grid gap-2 text-sm text-secondary sm:grid-cols-2">
              <p><span className="font-semibold text-primary">Head office:</span> {companyDetails.address}</p>
              <p><span className="font-semibold text-primary">Manufacturing unit:</span> {companyDetails.manufacturingUnit}</p>
            </div>
          </article>
          <article className="rounded-2xl border border-theme bg-card/60 p-7 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Technical Resources</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[.95] tracking-[-.06em]">Approved documents, when available.</h2>
            <p className="mt-5 text-sm leading-relaxed text-secondary">TDS, SDS, and COA documents are available on request where approved NSU documentation exists.</p>
            <Button to="/technical-resources" variant="secondary" className="mt-8">Explore technical resources</Button>
          </article>
        </div>
      </Container>
    </section>
  );
}

export function HomeRequestAndFinalCta() {
  return (
    <>
      <section className="border-b border-theme bg-primary py-20 text-primary md:py-28">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Request a sample</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[.94] tracking-[-.07em] md:text-6xl">See the colour in your application.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary">Share your product, application, and required quantity with the NSU team.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact?intent=sample">Request a sample</Button>
              <Button to="/contact?intent=quote" variant="secondary">Request a quote</Button>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-secondary py-20 text-primary md:py-28">
        <Container>
          <div className="border-t border-theme pt-8 md:pt-12">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-yellow">Start with NSU</p>
            <h2 className="mt-5 max-w-5xl text-5xl font-semibold leading-[.88] tracking-[-.08em] md:text-8xl">Bring your colour brief to life.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Talk to NSU</Button>
              <Button to="/products" variant="secondary">Explore products</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
