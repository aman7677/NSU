import { ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Hero from "../sections/Hero";
import ProductShowcase from "../sections/ProductShowcase";
import FAQSection from "../components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <section className="bg-primary py-16 text-primary md:py-24">
        <Container>
          <SectionTitle
            label="The NSU standard"
            title="Built for intensity. Engineered for consistency."
            description="From vivid sindoor to fluorescent and industrial pigments, every NSU solution is created to perform with confidence."
            className="border-theme text-primary [&_p]:text-secondary [&_span]:text-secondary"
          />
          <Link
            to="/products"
            className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-pigment-yellow hover:text-pigment-pink"
          >
            Discover the range <ArrowDownRight size={17} />
          </Link>
        </Container>
      </section>
      <FAQSection />
    </>
  );
}
