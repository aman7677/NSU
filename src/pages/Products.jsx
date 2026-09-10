import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import Container from "../components/Container";
import ProductCatalogueCard from "../components/ProductCatalogueCard";
import ProductDetailModal from "../components/ProductDetailModal";
import PageIntro from "../components/PageIntro";
import { productFilters, products } from "../data/products";
import CustomShadeSection from "../components/CustomShadeSection";
import GlassSelect from "../components/GlassSelect";

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeColour, setActiveColour] = useState("all");
  const [activeApplication, setActiveApplication] = useState("all");
  const [activeGrade, setActiveGrade] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const colourOptions = useMemo(
    () => [...new Set(products.filter((product) => product.shade).map((product) => product.shade))].sort(),
    [],
  );
  const applicationOptions = useMemo(
    () => [...new Set(products.flatMap((product) => product.applications || []))].sort(),
    [],
  );
  const gradeOptions = useMemo(
    () => [...new Set(products.filter((product) => product.grade).map((product) => product.grade))].sort((a, b) => Number(a) - Number(b)),
    [],
  );
  const visibleProducts = useMemo(() => {
    let filtered =
      activeFilter === "all"
        ? products
        : products.filter((product) => product.filter === activeFilter);
    if (activeColour !== "all") {
      filtered = filtered.filter((product) => product.shade === activeColour);
    }
    if (activeApplication !== "all") {
      filtered = filtered.filter((product) => product.applications?.includes(activeApplication));
    }
    if (activeGrade !== "all") {
      filtered = filtered.filter((product) => product.grade === activeGrade);
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          (product.code && product.code.toLowerCase().includes(lowerQuery)) ||
          product.colour.toLowerCase().includes(lowerQuery) ||
          product.application.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }
    return filtered;
  }, [activeApplication, activeColour, activeFilter, activeGrade, searchQuery]);
  return (
    <>
      <PageIntro
        eyebrow="NSU colour systems"
        title="OUR PRODUCTS"
        description="Explore our range of vibrant colour and pigment solutions."
      />
      <Container className="pb-20 md:pb-28">
        <div className="mb-6 max-w-sm relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-secondary" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="product-filter-control glass-card glass-search w-full rounded-full py-2.5 pl-11 pr-4 text-sm text-primary outline-none transition-[border-color,box-shadow] focus:border-pigment-magenta focus:ring-1 focus:ring-pigment-magenta"
          />
        </div>
        <div
          aria-label="Filter products"
          className="-mx-6 mb-10 flex flex-nowrap items-center gap-x-5 overflow-x-auto border-y border-theme px-6 py-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-y-3 md:px-0"
        >
          <span className="mr-2 shrink-0 text-[10px] font-bold uppercase tracking-[.16em] text-secondary">
            Filter range
          </span>
          {productFilters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative min-h-9 shrink-0 cursor-pointer text-[11px] font-bold uppercase tracking-[.13em] transition-all hover:underline hover:underline-offset-4 hover:decoration-2 ${
                activeFilter === filter.id
                  ? "text-pigment-magenta"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
            Colour family
            <GlassSelect
              value={activeColour}
              onChange={setActiveColour}
              ariaLabel="Colour family"
              options={[{ value: "all", label: "All shades" }, ...colourOptions.map((colour) => ({ value: colour, label: colour }))]}
            />
          </label>
          <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
            Application
            <GlassSelect
              value={activeApplication}
              onChange={setActiveApplication}
              ariaLabel="Application"
              options={[{ value: "all", label: "All applications" }, ...applicationOptions.map((application) => ({ value: application, label: application }))]}
            />
          </label>
          <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
            Grade
            <GlassSelect
              value={activeGrade}
              onChange={setActiveGrade}
              ariaLabel="Grade"
              options={[{ value: "all", label: "All grades" }, ...gradeOptions.map((grade) => ({ value: grade, label: grade }))]}
            />
          </label>
        </div>
        <p className="mb-8 text-sm text-secondary">
          <span className="font-semibold text-primary">
            {visibleProducts.length}
          </span>{" "}
          product entries
        </p>
        
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="mb-6 text-lg text-secondary">No products found matching your search.</p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
                setActiveColour("all");
                setActiveApplication("all");
                setActiveGrade("all");
              }}
              className="glass-action-button rounded-full border border-theme px-6 py-2.5 text-sm font-medium transition-colors hover:border-pigment-magenta hover:text-pigment-magenta"
            >
              Clear Filters
            </button>
          </div>
        ) : (
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
        )}
      </Container>
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
      <CustomShadeSection />
    </>
  );
}
