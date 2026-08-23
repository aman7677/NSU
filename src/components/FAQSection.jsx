import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import Container from "./Container";

const faqItems = [
  {
    question: "What types of colour products does NSU specialize in?",
    answer:
      "NSU specializes in traditional colour products, with a primary focus on high-quality Sindoor and other cultural colour applications shaped around your visual and practical requirements.",
  },
  {
    question: "Are NSU's traditional colours safe for personal and cultural use?",
    answer:
      "Yes, our products are crafted with strict quality control to ensure they are safe and reliable, reflecting the trust we've built with our customers since 1983.",
  },
  {
    question: "Do you supply different grades of Sindoor based on specific needs?",
    answer:
      "Absolutely. We offer suitable grades of our colour products depending on your specific application requirements and shade selection.",
  },
  {
    question: "Does NSU supply products in bulk for wholesale?",
    answer:
      "Yes, our structured and globally trusted manufacturing process allows us to fulfill both standard and bulk orders to meet the demands of our partners.",
  },
  {
    question: "What makes NSU's Sindoor unique?",
    answer:
      "Our Sindoor is deeply connected to Indian traditions, culture, and emotions. It is more than just a product; it represents decades of dedication, patience, and a commitment to quality.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <section className="border-y border-theme bg-secondary py-20 text-primary md:py-28">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">
            Questions, answered
          </p>
          <h2 className="max-w-3xl font-semibold text-4xl leading-[.95] tracking-[-.065em] md:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
            A few helpful details about NSU, our colour products, and how we work with partners.
          </p>

          <div className="mt-12 border-t border-theme">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div key={item.question} className="border-b border-theme">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors duration-300 ease-in-out faq-question md:py-6"
                  >
                    <span className="text-base font-semibold leading-snug tracking-[-.02em] md:text-lg">
                      {item.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-theme text-pigment-magenta transition-colors duration-300">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-6 pr-12 text-sm leading-relaxed text-secondary md:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}