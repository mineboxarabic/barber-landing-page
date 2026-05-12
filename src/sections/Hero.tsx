import React from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import Button from 'components/Button';
import GrainOverlay from 'components/GrainOverlay';
import { images } from 'assets/images';

const bookingUrl = 'https://book.squareup.com/appointments/the-chair-barbershop';

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      delay: prefersReduced ? 0 : delay,
    } satisfies Transition,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <motion.img
        src={images.heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ scale: prefersReduced ? 1 : 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/55 to-brand-dark/95" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(103,47,37,0.35)_0%,transparent_70%)]" />

      <GrainOverlay opacity={0.06} />

      <motion.div
        className="absolute inset-0 bg-brand-dark z-10 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' } satisfies Transition}
      />

      <motion.div
        className="absolute top-28 left-8 md:left-14 z-20 hidden md:flex flex-col items-start gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray">
          01 - Welcome
        </span>
        <div className="w-10 h-px bg-brand-gray/50" />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center gap-4 px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-2"
        >
          <span className="w-8 h-px bg-brand-brown" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1l1.5 5.5L15 8l-5.5 1.5L8 15l-1.5-5.5L1 8l5.5-1.5L8 1z" fill="#a16a38" />
          </svg>
          <span className="w-8 h-px bg-brand-brown" />
        </motion.div>

        <motion.p {...fadeIn(0.4)} className="font-script text-4xl md:text-5xl text-brand-cream">
          Your Neighbourhood
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            {
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: prefersReduced ? 0 : 0.5,
            } satisfies Transition
          }
          className="font-display text-7xl md:text-9xl font-bold text-brand-cream leading-none tracking-[0.02em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          The Chair
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: prefersReduced ? 0 : 1.1 } satisfies Transition}
          className="w-20 h-px bg-brand-green origin-center mt-2"
        />

        <motion.p
          {...fadeIn(1.2)}
          className="font-sans text-[11px] md:text-xs tracking-[0.4em] uppercase text-brand-gray mt-2"
        >
          Barbershop - Established 2009
        </motion.p>

        <motion.div {...fadeIn(1.45)} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button href={bookingUrl} aria-label="Book a haircut appointment">
            Book a Cut
          </Button>
          <Button href="#services" variant="ghost" aria-label="View our services">
            View Services
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 } satisfies Transition}
      >
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-brand-gray to-transparent origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' } satisfies Transition}
        />
      </motion.div>
    </section>
  );
}
