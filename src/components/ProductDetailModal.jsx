import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { PigmentVisual } from "./ProductCatalogueCard";

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};

export default function ProductDetailModal({ product, onClose }) {
  const closeRef = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 z-[70] flex items-end modal-backdrop backdrop-blur-sm bg-black/40 md:items-center md:justify-center md:p-8"
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92dvh] w-full max-w-6xl overflow-y-auto bg-card md:max-h-[86dvh]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center border border-theme bg-card backdrop-blur transition-colors hover:text-pigment-magenta"
        >
          <X size={21} />
        </button>

        <div className="grid md:grid-cols-2">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
            className="min-h-[310px] md:min-h-[640px]"
          >
            <PigmentVisual product={product} mode="packet" className="h-full" />
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.18 },
              },
            }}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-10 lg:p-12"
          >
            <motion.p
              variants={item}
              className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta"
            >
              {product.category}
            </motion.p>
            <motion.h1
              variants={item}
              id="product-detail-title"
              className="mt-5 text-4xl font-semibold leading-[.92] tracking-[-.07em] md:text-6xl"
            >
              {product.name}
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-8 flex items-center gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(product.pigment);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-3 transition-opacity hover:opacity-75"
                title="Copy HEX code"
                aria-live="polite"
              >
                <span
                  className="h-5 w-5 rounded-full border border-theme"
                  style={{ backgroundColor: product.pigment }}
                />
                <span className="text-sm font-medium">
                  {copied ? "Copied!" : product.colour}
                </span>
              </button>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-7 text-base leading-relaxed text-secondary"
            >
              {product.description}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex items-center gap-4"
            >
              <span className="text-sm font-medium text-secondary">
                Applications
              </span>
              <span className="text-sm">{product.application}</span>
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <Button href="#" className="inline-flex items-center gap-3">
                Contact us <ArrowUpRight size={14} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
