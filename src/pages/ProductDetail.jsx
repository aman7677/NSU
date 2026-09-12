import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import PageIntro from "../components/PageIntro";
import ProductCatalogueCard, { PigmentVisual } from "../components/ProductCatalogueCard";
import ProductDocuments, { ProductDocumentActions } from "../components/ProductDocuments";
import TechnicalSpecifications from "../components/TechnicalSpecifications";
import { products } from "../data/products";
import { companyDetails } from "../data/company";

const whatsappUrl = companyDetails.socialLinks.find(({ name }) => name === "WhatsApp")?.href;

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <>
        <PageIntro eyebrow="Product not found" title="THIS COLOUR IS OUT OF RANGE." description="The product page you are looking for does not exist." />
        <Container className="pb-24">
          <Button to="/products">Back to products</Button>
        </Container>
      </>
    );
  }

  const applications = product.applications || product.tags || [];
  const productTitle = product.grade && !product.name.includes(String(product.grade))
    ? `${product.name} ${product.grade}`
    : product.name;
  const relatedProducts = products.filter(
    (item) => item.slug && item.slug !== product.slug && item.filter === product.filter,
  ).slice(0, 3);

  return (
    <>
      <PageIntro
        eyebrow="NSU Fluorescent Pigments · Narayan Sindur Udyog"
        title={productTitle}
        description={product.description}
        titleClassName="max-w-5xl leading-[1.05]"
      />
      <Container className="pb-20 md:pb-28">
        <Link to="/products" className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-secondary transition-colors hover:text-pigment-magenta">
          <ArrowLeft size={15} /> Back to products
        </Link>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,.95fr)] lg:gap-12">
          <div className="min-h-[20rem] overflow-hidden rounded-2xl border border-theme md:min-h-[34rem]">
            <PigmentVisual product={product} mode="packet" className="h-full" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Fluorescent pigment powder</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[.92] tracking-[-.07em] md:text-6xl">{product.name}</h2>
            <dl className="mt-8 grid grid-cols-2 border-y border-theme py-5 text-sm">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-secondary">Grade</dt>
                <dd className="mt-2 font-semibold">{product.grade}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-secondary">Shade</dt>
                <dd className="mt-2 font-semibold">{product.shade}</dd>
              </div>
            </dl>
            <p className="mt-7 text-base leading-relaxed text-secondary">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={`/contact?product=${encodeURIComponent(product.name)}&intent=sample`}>Request sample</Button>
              <Button to={`/contact?product=${encodeURIComponent(product.name)}&intent=quote`} variant="secondary">Request quote</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button to={`/contact?product=${encodeURIComponent(product.name)}&intent=technical`} variant="secondary" icon={false}>Contact technical team</Button>
              <Button href={whatsappUrl} variant="secondary" icon={false} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} /> WhatsApp
              </Button>
            </div>
            <div className="mt-6 border-t border-theme pt-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[.17em] text-secondary">Product documents</p>
              <ProductDocumentActions product={product} />
            </div>
            <p className="mt-5 text-xs font-medium uppercase tracking-[.14em] text-secondary">Manufactured by Narayan Sindur Udyog</p>
          </div>
        </section>

        <section className="mt-20 grid gap-12 border-t border-theme pt-14 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Applications</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.06em] md:text-5xl">Built for application-led colour.</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {applications.map((application) => (
                <span key={application} className="border border-theme px-3 py-2 text-xs font-medium text-secondary">{application}</span>
              ))}
            </div>
          </div>
          <TechnicalSpecifications product={product} />
        </section>

        <ProductDocuments product={product} />

        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-theme pt-14">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Continue exploring</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.06em] md:text-5xl">Related fluorescent pigments</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedProducts.map((related) => <ProductCatalogueCard key={related.slug} product={related} />)}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
