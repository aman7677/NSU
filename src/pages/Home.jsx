import { ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import ProductShowcase from "../sections/ProductShowcase";
import Testimonials from "../sections/Testimonials";
import FAQSection from "../components/FAQSection";
import CustomShadeSection from "../components/CustomShadeSection";
import {
  HomeApplications,
  HomeBusinessResources,
  HomeRequestAndFinalCta,
  HomeTechnologyQuality,
} from "../sections/HomeDeltaSections";
import MobileDefer from "../components/MobileDefer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-[200vh] md:min-h-0">
        <MobileDefer delay={100}><Features /></MobileDefer>
      <MobileDefer delay={200}><ProductShowcase /></MobileDefer>
      <MobileDefer delay={300}><HomeApplications /></MobileDefer>
      <MobileDefer delay={400}><HomeTechnologyQuality /></MobileDefer>
      <MobileDefer delay={500}><CustomShadeSection /></MobileDefer>
      <MobileDefer delay={600}><HomeBusinessResources /></MobileDefer>
      <MobileDefer delay={700}>
        <section className="bg-primary py-16 text-primary md:py-24">
          <Container>
            <SectionTitle
              label="The NSU standard"
              title="ENGINEERED FOR BRILLIANT COLOUR."
              description="From vivid sindoor to fluorescent and industrial pigments, explore the NSU range by colour and application."
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
      </MobileDefer>
      <MobileDefer delay={800}><FAQSection /></MobileDefer>
        <MobileDefer delay={900}><Testimonials /></MobileDefer>
        <MobileDefer delay={1000}><HomeRequestAndFinalCta /></MobileDefer>
      </div>
    </>
  );
}
