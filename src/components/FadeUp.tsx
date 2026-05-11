import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: prefersReduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
