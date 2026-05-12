import React, { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion';
import scissorsVideo from 'assets/output.webm';

interface ScissorsDividerProps {
  lineColor?: string;
  fromBg?: string;
  toBg?: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScissorsDivider({
  lineColor = 'rgba(175,169,159,0.35)',
  fromBg = '#161616',
  toBg = '#161616',
}: ScissorsDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const prefersReduced = useReducedMotion();

  const T = {
    bgFade: 0.8,
    lineEnter: 0.7,
    lineEnterDelay: 0.2,
    travel: 3.4,
    travelDelay: 0.95,
    lineFall: 0.8,
    lineFallDelay: 4.05,
  };

  useEffect(() => {
    if (inView && videoRef.current && !prefersReduced) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = 0.5;
      const playPromise = videoRef.current.play();
      playPromise?.catch(() => {
        // Ignore autoplay rejection; muted video should play where supported.
      });
    }
  }, [inView, prefersReduced]);

  if (prefersReduced) {
    return <div className="w-full h-8" style={{ background: lineColor }} />;
  }

  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    leftPct: 12 + i * 6,
    delay: T.travelDelay + 0.35 + (i / 14) * T.travel * 0.8,
    drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 4),
    rotate: (i % 2 === 0 ? 1 : -1) * (40 + (i % 5) * 20),
    length: 8 + (i % 4) * 3,
  }));

  const accentDots = [0.1, 0.5, 0.9];

  return (
    <div
      ref={ref}
      className="relative w-full h-[200px] overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fromBg} 0%, ${fromBg} 50%, ${toBg} 50%, ${toBg} 100%)`,
        perspective: '800px',
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(103,47,37,0.08) 0%, transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: T.bgFade, ease: EASE_OUT } satisfies Transition}
      />

      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${lineColor} 15%, ${lineColor} 85%, transparent 100%)`,
          boxShadow: `0 0 8px ${lineColor}`,
        }}
        initial={{ scaleX: 0, transformOrigin: 'center' }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          { duration: T.lineEnter, ease: EASE_OUT, delay: T.lineEnterDelay } satisfies Transition
        }
      />

      {accentDots.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-brown"
          style={{ left: `${pos * 100}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
          transition={
            { duration: 0.4, delay: T.lineEnterDelay + 0.3 + i * 0.1 } satisfies Transition
          }
        />
      ))}

      <motion.div
        className="absolute bottom-[-9%] pointer-events-none"
        initial={{ x: '-28vw', opacity: 0 }}
        animate={
          inView
            ? {
                x: ['-28vw', '-8vw', '108vw', '118vw'],
                opacity: [0, 1, 1, 0],
              }
            : { x: '-28vw', opacity: 0 }
        }
        transition={
          {
            duration: T.travel,
            delay: T.travelDelay,
            ease: EASE_OUT,
            times: [0, 0.1, 0.9, 1],
          } satisfies Transition
        }
      >
        <video
          ref={videoRef}
          src={scissorsVideo}
          autoPlay
          muted
          loop
          playsInline
          className="block w-[360px] sm:w-[440px] scale-x-[-1]"
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: [0, 1, 0], scale: [0, 2.5, 0] } : { opacity: 0, scale: 0 }}
        transition={
          {
            duration: 0.5,
            delay: T.travelDelay + T.travel * 0.45,
            times: [0, 0.5, 1],
          } satisfies Transition
        }
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 origin-top pointer-events-none"
          style={{
            left: `${p.leftPct}%`,
            width: '1px',
            height: `${p.length}px`,
            background: 'rgba(175,169,159,0.55)',
          }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={
            inView
              ? {
                  opacity: [0, 1, 1, 0],
                  y: [0, 4, 36, 70],
                  x: [0, p.drift * 0.3, p.drift, p.drift * 1.2],
                  rotate: [0, p.rotate * 0.4, p.rotate, p.rotate * 1.2],
                }
              : { opacity: 0, y: 0, x: 0, rotate: 0 }
          }
          transition={
            {
              duration: 1.4,
              delay: p.delay,
              times: [0, 0.1, 0.6, 1],
              ease: 'easeIn',
            } satisfies Transition
          }
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-left h-px w-1/2 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${lineColor} 0%, transparent 100%)`,
        }}
        initial={{ opacity: 0, rotate: 0, y: 0 }}
        animate={inView ? { opacity: [0, 0.6, 0], rotate: 8, y: 24 } : { opacity: 0 }}
        transition={
          { duration: T.lineFall, delay: T.lineFallDelay, ease: 'easeIn' } satisfies Transition
        }
      />
    </div>
  );
}
