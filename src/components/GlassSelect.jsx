import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function GlassSelect({ value, onChange, options, ariaLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!selectRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const chooseOption = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="product-filter-control flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-3 text-left text-sm font-medium text-primary outline-none focus:border-pigment-magenta"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          size={17}
          aria-hidden="true"
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="product-filter-menu theme-scrollbar absolute inset-x-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-xl p-1"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => chooseOption(option.value)}
              className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                value === option.value
                  ? "bg-pigment-magenta/20 text-pigment-magenta"
                  : "text-primary hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
