import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion';

interface ClipperDividerProps {
  revealColor?: string;
  fromBg?: string;
  toBg?: string;
  direction?: 'ltr' | 'rtl';
}

const EASE_CINE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function ClipperDivider({
  revealColor = '#161616',
  fromBg = '#f4e4de',
  toBg = '#161616',
  direction = 'ltr',
}: ClipperDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const prefersReduced = useReducedMotion();
  const isRtl = direction === 'rtl';

  if (prefersReduced) {
    return <div className="w-full h-8" style={{ background: revealColor }} />;
  }

  const T = {
    travel: 2.35,
    travelDelay: 0.45,
    glowDelay: 0.36,
  };

  const startX = isRtl ? 'calc(100vw + 110px)' : '-110px';
  const peekX = isRtl ? 'calc(100vw - 30px)' : '30px';
  const endX = isRtl ? '-110px' : 'calc(100vw + 110px)';
  const hiddenClip = isRtl ? 'inset(0 0 0 100% round 0)' : 'inset(0 100% 0 0 round 0)';
  const revealedClip = 'inset(0 0 0 0 round 0)';

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    leftPct: isRtl ? 88 - i * 5.5 : 6 + i * 5.5,
    delay: T.travelDelay + 0.25 + (i / 16) * T.travel * 0.78,
    drift: (isRtl ? -1 : 1) * (6 + (i % 4) * 3),
    rotate: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 15),
    length: 5 + (i % 3) * 2,
  }));

  const travelTransition = {
    duration: T.travel,
    delay: T.travelDelay,
    ease: EASE_CINE,
    times: [0, 0.12, 0.88, 1],
  } satisfies Transition;

  return (
    <div
      ref={ref}
      className="relative w-full h-32 md:h-40 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fromBg} 0%, ${fromBg} 50%, ${toBg} 50%, ${toBg} 100%)`,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: revealColor }}
        initial={{ clipPath: hiddenClip }}
        animate={inView ? { clipPath: revealedClip } : { clipPath: hiddenClip }}
        transition={
          { duration: T.travel, delay: T.travelDelay, ease: EASE_CINE } satisfies Transition
        }
      />

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-32 h-24 pointer-events-none"
        initial={{ x: startX, opacity: 0 }}
        animate={
          inView
            ? { x: [startX, peekX, endX, endX], opacity: [0, 0.45, 0.45, 0] }
            : { x: startX, opacity: 0 }
        }
        transition={{ ...travelTransition, delay: T.glowDelay }}
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(112,132,114,0.25) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="absolute top-1/2 pointer-events-none"
        initial={{ x: startX, opacity: 0, scale: 0.9 }}
        animate={
          inView
            ? {
                x: [startX, peekX, endX, endX],
                opacity: [0, 0.35, 0.35, 0],
                scale: [0.9, 1, 1, 1],
              }
            : { x: startX, opacity: 0, scale: 0.9 }
        }
        transition={travelTransition}
        style={{ filter: 'blur(8px)' }}
      >
        <div className={`-translate-y-1/2 ${isRtl ? '-scale-x-100' : ''}`}>
          <ClipperSVG dim />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 pointer-events-none"
        initial={{ x: startX, opacity: 0, scale: 0.92 }}
        animate={
          inView
            ? {
                x: [startX, peekX, endX, endX],
                opacity: [0, 1, 1, 0],
                scale: [0.92, 1, 1, 1],
              }
            : { x: startX, opacity: 0, scale: 0.92 }
        }
        transition={travelTransition}
      >
        <div className={`-translate-y-1/2 ${isRtl ? '-scale-x-100' : ''}`}>
          <ClipperSVG />
        </div>
      </motion.div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 origin-top pointer-events-none"
          style={{
            left: `${p.leftPct}%`,
            width: '1px',
            height: `${p.length}px`,
            background: 'rgba(50,40,35,0.6)',
          }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={
            inView
              ? {
                  opacity: [0, 1, 0.8, 0],
                  y: [0, 4, 24, 38],
                  x: [0, p.drift * 0.3, p.drift, p.drift * 1.1],
                  rotate: [0, p.rotate * 0.35, p.rotate, p.rotate * 1.15],
                }
              : { opacity: 0, y: 0, x: 0, rotate: 0 }
          }
          transition={
            {
              duration: 1.1,
              delay: p.delay,
              times: [0, 0.15, 0.65, 1],
              ease: 'easeIn',
            } satisfies Transition
          }
        />
      ))}
    </div>
  );
}

function ClipperSVG({ dim = false }: { dim?: boolean }) {
  const o = dim ? 0.6 : 1;
  return (
    <svg
      width="90"
      height="48"
      viewBox="0 0 90 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        filter: dim ? 'none' : 'drop-shadow(0 6px 14px rgba(0,0,0,0.5))',
      }}
    >
      <defs>
        <linearGradient id="clipperBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a4a4a" stopOpacity={o} />
          <stop offset="50%" stopColor="#2a2a2a" stopOpacity={o} />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity={o} />
        </linearGradient>
        <linearGradient id="clipperHead" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5a5a5a" stopOpacity={o} />
          <stop offset="100%" stopColor="#3a3a3a" stopOpacity={o} />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="58" height="28" rx="8" fill="url(#clipperBody)" />
      <rect x="14" y="13" width="50" height="2" rx="1" fill="#6a6a6a" opacity={o * 0.6} />

      {[18, 23, 28, 33, 38].map((x) => (
        <rect
          key={x}
          x={x}
          y="18"
          width="1.5"
          height="14"
          rx="0.5"
          fill="#1a1a1a"
          opacity={o * 0.8}
        />
      ))}

      <rect x="44" y="20" width="16" height="8" rx="1" fill="#1a1a1a" opacity={o * 0.9} />
      <rect x="46" y="23" width="12" height="2" rx="0.3" fill="#a16a38" opacity={o * 0.85} />
      <rect x="62" y="12" width="16" height="24" rx="3" fill="url(#clipperHead)" />

      {[0, 2.4, 4.8, 7.2, 9.6, 12].map((offset, i) => (
        <rect
          key={i}
          x={64 + offset}
          y="34"
          width="1.6"
          height="7"
          rx="0.5"
          fill="#e2e1df"
          opacity={o}
        />
      ))}

      <rect x="63" y="33" width="14" height="1.5" rx="0.5" fill="#afa99f" opacity={o} />
      <circle cx="20" cy="14" r="1.5" fill="#708472" opacity={o} />
      <circle cx="20" cy="14" r="0.6" fill="#a8c4aa" opacity={o} />
      <path
        d="M10 24 Q4 24 2 28 Q0 32 2 36"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity={o * 0.85}
      />
    </svg>
  );
}
