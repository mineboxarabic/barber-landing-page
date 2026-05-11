import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion';

interface ScissorsDividerProps {
  lineColor?: string;
  fromBg?: string;
  toBg?: string;
}

// Cinematic easing curves
const EASE_CINE = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function ScissorsDivider({
  lineColor = 'rgba(175,169,159,0.35)',
  fromBg = '#161616',
  toBg = '#161616',
}: ScissorsDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className="w-full h-8" style={{ background: lineColor }} />;
  }

  // Timing map (seconds) — total ~2.8s for cinematic pacing
  const T = {
    bgFade: 0.8,
    lineEnter: 0.7,
    lineEnterDelay: 0.2,
    scissorsEnter: 0.5,
    scissorsEnterDelay: 0.9,
    snipPause: 0.4,
    travel: 1.4,
    travelDelay: 1.6,
    lineFall: 0.6,
    lineFallDelay: 2.6,
  };

  // Hair particle positions across the line
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    leftPct: 12 + i * 6,
    delay: T.travelDelay + 0.15 + (i / 14) * T.travel * 0.85,
    drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 4),
    rotate: (i % 2 === 0 ? 1 : -1) * (40 + (i % 5) * 20),
    length: 8 + (i % 4) * 3,
  }));

  // Three soft-glow accent dots along the line
  const accentDots = [0.1, 0.5, 0.9];

  return (
    <div
      ref={ref}
      className="relative w-full h-32 md:h-40 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fromBg} 0%, ${fromBg} 45%, ${toBg} 55%, ${toBg} 100%)`,
      }}
    >
      {/* Subtle gradient bridge fade-in */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(103,47,37,0.08) 0%, transparent 60%)`,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: T.bgFade, ease: EASE_OUT } satisfies Transition}
      />

      {/* The line — draws across with soft glow */}
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
            {
              duration: 0.4,
              delay: T.lineEnterDelay + 0.3 + i * 0.1,
            } satisfies Transition
          }
        />
      ))}

      {/* Scissors — enters, pauses, then travels */}
      <motion.div
        className="absolute top-1/2"
        style={{ transform: 'translateY(-50%)' }}
        initial={{ x: -100, opacity: 0 }}
        animate={
          inView
            ? {
                x: ['-100px', '-100px', '8vw', 'calc(100vw + 80px)'],
                opacity: [0, 1, 1, 1],
              }
            : {}
        }
        transition={
          {
            duration: T.scissorsEnter + T.snipPause + T.travel,
            delay: T.scissorsEnterDelay,
            times: [0, 0.2, 0.35, 1],
            ease: ['easeOut', 'linear', EASE_CINE, EASE_CINE],
          } satisfies Transition
        }
      >
        <ScissorsSVG inView={inView} totalDelay={T.scissorsEnterDelay} travelDelay={T.travelDelay} travelDur={T.travel} />
      </motion.div>

      {/* Falling hair particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 origin-top"
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

      {/* Line falling away — bottom half drops with rotation */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-left h-px w-1/2"
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

// Detailed scissors SVG with blade animation
function ScissorsSVG({
  inView,
  totalDelay,
  travelDelay,
  travelDur,
}: {
  inView: boolean;
  totalDelay: number;
  travelDelay: number;
  travelDur: number;
}) {
  // Blades cycle open/closed multiple times during travel
  const snipCount = 6;
  const snipKeyframes = Array.from({ length: snipCount * 2 + 1 }, (_, i) =>
    i % 2 === 0 ? 0 : 1,
  );
  const snipTimes = snipKeyframes.map((_, i) => i / (snipCount * 2));

  return (
    <svg
      width="80"
      height="64"
      viewBox="0 0 80 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
      }}
    >
      <defs>
        <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e1df" />
          <stop offset="50%" stopColor="#afa99f" />
          <stop offset="100%" stopColor="#6b6862" />
        </linearGradient>
        <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a16a38" />
          <stop offset="100%" stopColor="#672f25" />
        </linearGradient>
      </defs>

      {/* One initial dramatic snip, then rhythmic snipping during travel */}
      <motion.g
        style={{ transformOrigin: '40px 32px' }}
        initial={{ rotate: 0 }}
        animate={
          inView
            ? {
                rotate: [
                  0, // enter
                  -22, // dramatic snip open
                  0, // close
                  -22, // open again
                  0, // close
                  ...snipKeyframes.slice(1).map((v) => v * -18), // travel snips
                ],
              }
            : {}
        }
        transition={
          {
            duration: 0.9 + travelDur,
            delay: totalDelay + 0.15,
            times: [
              0,
              0.06,
              0.12,
              0.18,
              0.24,
              ...snipTimes.slice(1).map((t) => 0.3 + t * 0.7),
            ],
            ease: 'easeInOut',
          } satisfies Transition
        }
      >
        {/* Top blade */}
        <path
          d="M40 32 L8 14 Q5 13 5 10 Q5 7 8 6 Q11 5 13 7 L40 28"
          fill="url(#bladeGrad)"
          stroke="#3a3a3a"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        {/* Top handle ring */}
        <circle
          cx="9"
          cy="9"
          r="5"
          fill="none"
          stroke="url(#handleGrad)"
          strokeWidth="2.5"
        />
      </motion.g>

      <motion.g
        style={{ transformOrigin: '40px 32px' }}
        initial={{ rotate: 0 }}
        animate={
          inView
            ? {
                rotate: [
                  0,
                  22,
                  0,
                  22,
                  0,
                  ...snipKeyframes.slice(1).map((v) => v * 18),
                ],
              }
            : {}
        }
        transition={
          {
            duration: 0.9 + travelDur,
            delay: totalDelay + 0.15,
            times: [
              0,
              0.06,
              0.12,
              0.18,
              0.24,
              ...snipTimes.slice(1).map((t) => 0.3 + t * 0.7),
            ],
            ease: 'easeInOut',
          } satisfies Transition
        }
      >
        {/* Bottom blade */}
        <path
          d="M40 32 L8 50 Q5 51 5 54 Q5 57 8 58 Q11 59 13 57 L40 36"
          fill="url(#bladeGrad)"
          stroke="#3a3a3a"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        {/* Bottom handle ring */}
        <circle
          cx="9"
          cy="55"
          r="5"
          fill="none"
          stroke="url(#handleGrad)"
          strokeWidth="2.5"
        />
      </motion.g>

      {/* Pivot screw */}
      <circle cx="40" cy="32" r="3" fill="#3a3a3a" />
      <circle cx="40" cy="32" r="1.2" fill="#afa99f" />

      {/* Glint at the blade tip — flashes at the moment of cut */}
      <motion.circle
        cx="72"
        cy="32"
        r="2"
        fill="#fff"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0, 1, 0] } : {}}
        transition={
          {
            duration: 0.4,
            delay: totalDelay + 0.5,
            times: [0, 0.3, 0.5, 1],
          } satisfies Transition
        }
      />
    </svg>
  );
}
