import { useInView, useReducedMotion, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function CountUp({ value, suffix = '', duration = 2.5 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView && ref.current) {
      if (reduceMotion) {
        ref.current.textContent = value;
        return;
      }

      const controls = animate(0, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (ref.current) ref.current.textContent = Math.round(latest);
        },
      });
      return controls.stop;
    }
  }, [inView, value, duration, reduceMotion]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
