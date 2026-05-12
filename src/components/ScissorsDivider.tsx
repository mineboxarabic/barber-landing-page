import React, { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Transition } from 'framer-motion';
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scissorsX = useTransform(scrollYProgress, [0, 1], ['-15vw', '115vw']);
  const scissorsOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0]);

  // Force-play video at slower rate when in view
  useEffect(() => {
    if (inView && videoRef.current && !prefersReduced) {
      videoRef.current.playbackRate = 0.5;
      videoRef.current.play().catch(() => {
        // Ignore autoplay rejection; the muted attribute should allow it
      });
    }
  }, [inView, prefersReduced]);

  if (prefersReduced) {
    return <div className="w-full h-8" style={{ background: lineColor }} />;
  }

  // Cinematic timing (seconds) — deliberate, slow pacing
  const T = {
    bgFade: 0.8,
    lineEnter: 0.7,
    lineEnterDelay: 0.2,
    scissorsEnterDelay: 0.9,
    travel: 3.2,
    travelDelay: 1.6,
    lineFall: 0.8,
    lineFallDelay: 4.4,
  };

  // Hair particles dropping from the line as scissors pass
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    leftPct: 12 + i * 6,
    delay: T.travelDelay + 0.15 + (i / 14) * T.travel * 0.85,
    drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 4),
    rotate: (i % 2 === 0 ? 1 : -1) * (40 + (i % 5) * 20),
    length: 8 + (i % 4) * 3,
  }));

  const accentDots = [0.1, 0.5, 0.9];

  return (
    <div
      ref={ref}
      className="relative w-full h-32 md:h-40 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fromBg} 0%, ${fromBg} 45%, ${toBg} 55%, ${toBg} 100%)`,
    
        perspective: '800px',
        height: '200px',
      }}
    >
      {/* Subtle radial glow bridging the two sections */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(103,47,37,0.08) 0%, transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: T.bgFade, ease: EASE_OUT } satisfies Transition}
      />

      {/* The line being cut — soft glow, draws across */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${lineColor} 15%, ${lineColor} 85%, transparent 100%)`,
          boxShadow: `0 0 8px ${lineColor}`,
        }}
        initial={{ scaleX: 0, transformOrigin: 'center' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={
          { duration: T.lineEnter, ease: EASE_OUT, delay: T.lineEnterDelay } satisfies Transition
        }
      />

      {/* Accent dots */}
      {accentDots.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-brown"
          style={{ left: `${pos * 100}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.7 } : {}}
          transition={
            { duration: 0.4, delay: T.lineEnterDelay + 0.3 + i * 0.1 } satisfies Transition
          }
        />
      ))}

      {/* Scissors video — fade in on screen, then travel across.
          ENTER/PAUSE are fixed seconds (not percentages) so they don't stretch with T.travel. */}
      {/* eslint-disable-next-line no-shadow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '-9%', x: scissorsX, opacity: scissorsOpacity }}
      >
        <video
          ref={videoRef}
          src={scissorsVideo}
          autoPlay
          muted
          loop
          playsInline
         
          className="block"
          style={{
            width: '440px',
            // Flip the in x 
            transform: 'scaleX(-1)',
            height: 'auto',
            //filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.45))',
            zIndex: 1000,
          }}
        />
      </motion.div>

      {/* Glint flash at the moment of the cut */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: [0, 1, 0], scale: [0, 2.5, 0] } : {}}
        transition={
          {
            duration: 0.5,
            delay: T.scissorsEnterDelay + T.travel * 0.35,
            times: [0, 0.5, 1],
          } satisfies Transition
        }
      />

      {/* Falling hair particles */}
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
              : {}
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

      {/* Line falling away after the cut */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-left h-px w-1/2 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${lineColor} 0%, transparent 100%)`,
        }}
        initial={{ opacity: 0, rotate: 0, y: 0 }}
        animate={inView ? { opacity: [0, 0.6, 0], rotate: 8, y: 24 } : {}}
        transition={
          { duration: T.lineFall, delay: T.lineFallDelay, ease: 'easeIn' } satisfies Transition
        }
      />
    </div>
  );
}
