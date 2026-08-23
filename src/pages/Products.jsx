import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Container from "../components/Container";
import ProductCatalogueCard from "../components/ProductCatalogueCard";
import ProductDetailModal from "../components/ProductDetailModal";
import PageIntro from "../components/PageIntro";
import { productFilters, products } from "../data/products";

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const visibleProducts = useMemo(
    () =>
      activeFilter === "all"
        ? products
        : products.filter((product) => product.filter === activeFilter),
    [activeFilter],
  );
  return (
    <>
      <PageIntro
        eyebrow="NSU colour systems"
        title="OUR PRODUCTS"
        description="Explore our range of vibrant colour and pigment solutions."
      />
      <Container className="pb-20 md:pb-28">
        <div
          aria-label="Filter products"
          className="-mx-6 mb-10 flex flex-nowrap gap-x-5 overflow-x-auto border-y border-theme px-6 py-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-y-3 md:px-0"
        >
          <span className="mr-2 shrink-0 pt-2 text-[10px] font-bold uppercase tracking-[.16em] text-secondary">
            Filter range
          </span>
          {productFilters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative min-h-9 shrink-0 text-[11px] font-bold uppercase tracking-[.13em] transition-colors ${activeFilter === filter.id ? "text-primary" : "text-secondary hover:text-primary"}`}
            >
              {filter.label}
              {activeFilter === filter.id && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-pigment-magenta" />
              )}
            </button>
          ))}
        </div>
        <p className="mb-8 text-sm text-secondary">
          <span className="font-semibold text-primary">
            {visibleProducts.length}
          </span>{" "}
          product entries
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <ProductCatalogueCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </div>
      </Container>
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
