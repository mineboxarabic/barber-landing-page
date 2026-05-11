import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useInViewReveal(margin = '-80px') {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` });
  return { ref, inView };
}
