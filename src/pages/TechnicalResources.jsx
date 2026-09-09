import { ArrowUpRight, BookOpen, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FAQSection from "../components/FAQSection";
import PageIntro from "../components/PageIntro";
import { DocumentStatus } from "../components/ProductDocuments";
import { documentTypes, getDocument } from "../data/productDocuments.js";
import { applications } from "../data/applications";
import { nsuFluorescentPigments } from "../data/products";

function ResourceProductCard({ product }) {
  return (
    <article className="glass-card rounded-2xl p-6">
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">{product.category}</p>
      <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-.04em]">{product.name}</h2>
      <p className="mt-3 text-sm text-secondary">Grade {product.grade} · {product.shade}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {documentTypes.map(([key, label]) => (
          <DocumentStatus key={key} label={label} href={getDocument(product, key)} />
        ))}
      </div>
      <Link to={`/products/${product.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-pigment-yellow hover:text-pigment-pink">
        View product <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}

export default function TechnicalResources() {
  return (
    <>
      <PageIntro
        eyebrow="NSU / Technical Resources"
        title="DOCUMENTATION FOR YOUR COLOUR BRIEF."
        description="Find product documents, application guidance, and answers to common questions. Approved technical documents are provided where available."
      />
      <Container className="pb-20 md:pb-28">
        <section className="grid gap-5 md:grid-cols-2">
          <article className="glass-card rounded-2xl p-7 md:p-9">
            <FileText className="text-pigment-yellow" size={30} strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-7 text-3xl font-semibold tracking-[-.06em]">Product Technical Data</h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary">TDS and COA availability is shown for each product below. Missing documents remain available on request until approved files are published.</p>
          </article>
          <article className="glass-card rounded-2xl p-7 md:p-9">
            <ShieldCheck className="text-pigment-orange" size={30} strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-7 text-3xl font-semibold tracking-[-.06em]">Safety Data</h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary">SDS availability is shown per product. No safety values or claims are added where approved documentation is not present.</p>
          </article>
        </section>

        <section className="mt-20 border-t border-theme pt-14">
          <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Product documents</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-.06em] md:text-5xl">Fluorescent pigment resources</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-secondary">Select a product to view its technical information and document status. All current document states are controlled by the centralized product data.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {nsuFluorescentPigments.map((product) => <ResourceProductCard key={product.slug} product={product} />)}
          </div>
        </section>

        <section className="mt-20 border-t border-theme pt-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Application Guides</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.06em] md:text-5xl">Start with the application.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-secondary">Review the application areas currently represented in the NSU catalogue, then contact the team for product-specific guidance.</p>
            </div>
            <Button to="/applications" variant="secondary">Explore applications</Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <Link key={application.number} to="/applications" className="border border-theme bg-card/60 p-5 transition-colors hover:border-pigment-magenta">
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">{application.number}</p>
                <h3 className="mt-3 font-semibold tracking-[-.03em]">{application.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-theme pt-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Need more detail?</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.06em] md:text-5xl">Request a technical resource.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact?intent=sample">Request a sample</Button>
              <Button to="/contact?intent=quote" variant="secondary">Request a quote</Button>
              <Button to="/contact?intent=technical" variant="secondary">Contact technical team</Button>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3 text-sm text-secondary"><BookOpen size={17} className="text-pigment-yellow" /> Approved resources can be requested through the existing NSU enquiry form.</div>
        </section>
      </Container>
      <FAQSection />
    </>
  );
}
