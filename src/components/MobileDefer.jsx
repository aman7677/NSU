import { useState, useEffect } from "react";

export default function MobileDefer({ children, delay = 100 }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [shouldRender, setShouldRender] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isMobile, delay]);

  if (!shouldRender) return null;
  return children;
}
