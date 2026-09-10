import Hero from "../sections/Hero";
import Features from "../sections/Features";
import ProductShowcase from "../sections/ProductShowcase";
import Testimonials from "../sections/Testimonials";
import CustomShadeSection from "../components/CustomShadeSection";
import {
  HomeApplications,
  HomeBusinessResources,
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
        <MobileDefer delay={900}><Testimonials /></MobileDefer>
      </div>
    </>
  );
}
