import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { featuredProducts } from "../data/siteData";

export default function ProductShowcase() {
  return (
    <section className="border-y border-theme bg-secondary py-20 md:py-28">
      <Container>
        <SectionTitle
          label="Featured products"
          title="OUR COLOUR RANGE"
          description="Vibrant colour solutions engineered for visual impact."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
