import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Seo from "./components/Seo";
import Home from "./pages/Home";

const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Applications = lazy(() => import("./pages/Applications"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const GlobalMarkets = lazy(() => import("./pages/GlobalMarkets"));
const TechnicalResources = lazy(() => import("./pages/TechnicalResources"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  return (
    <SiteLayout>
      <Seo pathname={location.pathname} />
      <Suspense
        fallback={
          <div
            className="min-h-[40vh] bg-card"
            aria-busy="true"
            aria-label="Loading page"
          />
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/global-markets" element={<GlobalMarkets />} />
            <Route path="/technical-resources" element={<TechnicalResources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </SiteLayout>
  );
}
