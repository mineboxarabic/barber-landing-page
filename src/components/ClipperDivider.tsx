import React, { useRef, useEffect } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
  type Transition,
} from 'framer-motion';

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

  // 0 = hidden, 100 = fully revealed (clipper-swept reveal)
  const progress = useMotionValue(0);
  const vibY = useMotionValue(0);

  // Soft reveal: not a hard clip-path, but a wide gradient mask
  const clipPath = useTransform(progress, (v) => {
    const edge = v;
    const soft = Math.min(edge + 8, 100);
    return direction === 'rtl'
      ? `inset(0 0 0 ${100 - soft}% round 0)`
      : `inset(0 ${100 - soft}% 0 0 round 0)`;
  });

  const maskImage = useTransform(progress, (v) => {
    if (direction === 'rtl') {
      return `linear-gradient(270deg, black 0%, black ${v}%, transparent ${v + 6}%)`;
    }
    return `linear-gradient(90deg, black 0%, black ${v}%, transparent ${v + 6}%)`;
  });

  const clipperX = useTransform(progress, [0, 100], ['-90px', 'calc(100vw + 90px)']);
  const clipperXRtl = useTransform(progress, [0, 100], ['calc(100vw + 90px)', '-90px']);
  const clipperPos = direction === 'rtl' ? clipperXRtl : clipperX;
  const clipperY = useTransform(vibY, (v) => `calc(-50% + ${v}px)`);
  const ghostOpacity = useTransform(progress, [0, 8, 92, 100], [0, 0.4, 0.4, 0]);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      progress.set(100);
      return;
    }

    // Cinematic phased animation
    const phase1 = setTimeout(() => {
      // Phase 1: brief pause for entry (handled via clipper opacity below)
    }, 0);

    const phase2 = setTimeout(() => {
      // Phase 2: clipper sweep — slower, deliberate, with cinematic easing
      animate(progress, 100, { duration: 2.0, ease: EASE_CINE });
    }, 700);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
    };
  }, [inView, prefersReduced, progress]);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const start = setTimeout(() => {
      const ctrl = animate(vibY, [0, 1.5, -1.5, 1, -1, 0.5, -0.5, 0], {
        duration: 0.08,
        repeat: 30,
        repeatType: 'loop',
        ease: 'linear',
      });
      return () => ctrl.stop();
    }, 700);
    return () => clearTimeout(start);
  }, [inView, prefersReduced, vibY]);

  if (prefersReduced) {
    return <div className="w-full h-8" style={{ background: revealColor }} />;
  }

  // Dust/hair particles trailing behind clipper
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    triggerPct: 6 + i * 5.5, // when on the bar (0-100) to spawn
    drift: (i % 2 === 0 ? 1 : -1) * (4 + (i % 4) * 3),
    rotate: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 15),
    length: 5 + (i % 3) * 2,
  }));

  return (
    <div
      ref={ref}
      className="relative w-full h-32 md:h-40 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fromBg} 0%, ${fromBg} 50%, ${toBg} 50%, ${toBg} 100%)`,
      }}
    >
      {/* Reveal layer with soft gradient mask edge (not hard clip) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: revealColor,
          clipPath,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      {/* Soft glow trailing the clipper */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-32 h-24"
        style={{
          x: clipperPos,
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(112,132,114,0.25) 0%, transparent 70%)',
          marginLeft: direction === 'ltr' ? '-90px' : '0',
        }}
      />

      {/* Motion-blur ghost trailing */}
      <motion.div
        className="absolute top-1/2"
        style={{
          x: clipperPos,
          y: clipperY,
          opacity: ghostOpacity,
          filter: 'blur(8px)',
          scaleX: direction === 'rtl' ? -1 : 1,
        }}
      >
        <ClipperSVG dim />
      </motion.div>

      {/* Clipper SVG — sharp, in focus */}
      <motion.div
        className="absolute top-1/2"
        style={{
          x: clipperPos,
          y: clipperY,
          scaleX: direction === 'rtl' ? -1 : 1,
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' } satisfies Transition}
      >
        <ClipperSVG />
      </motion.div>

      {/* Hair particles trailing the clipper */}
      {particles.map((p) => (
        <HairParticle key={p.id} progress={progress} particle={p} />
      ))}
    </div>
  );
}

// Single hair particle — own component so useTransform isn't inside a map callback
function HairParticle({
  progress,
  particle: p,
}: {
  progress: ReturnType<typeof useMotionValue<number>>;
  particle: {
    id: number;
    triggerPct: number;
    drift: number;
    rotate: number;
    length: number;
  };
}) {
  const opacity = useTransform(
    progress,
    [p.triggerPct - 2, p.triggerPct, p.triggerPct + 4, p.triggerPct + 12],
    [0, 1, 0.8, 0],
  );
  const y = useTransform(progress, [p.triggerPct, p.triggerPct + 12], [0, 36]);
  const x = useTransform(progress, [p.triggerPct, p.triggerPct + 12], [0, p.drift]);
  const rotate = useTransform(progress, [p.triggerPct, p.triggerPct + 12], [0, p.rotate]);

  return (
    <motion.div
      className="absolute top-1/2 origin-top"
      style={{
        left: `${p.triggerPct}%`,
        width: '1px',
        height: `${p.length}px`,
        background: 'rgba(50,40,35,0.6)',
        opacity,
        y,
        x,
        rotate,
      }}
    />
  );
}

// Detailed clipper SVG
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

      {/* Body */}
      <rect x="10" y="10" width="58" height="28" rx="8" fill="url(#clipperBody)" />

      {/* Top highlight */}
      <rect x="14" y="13" width="50" height="2" rx="1" fill="#6a6a6a" opacity={o * 0.6} />

      {/* Grip texture lines */}
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

      {/* Brand plate */}
      <rect
        x="44"
        y="20"
        width="16"
        height="8"
        rx="1"
        fill="#1a1a1a"
        opacity={o * 0.9}
      />
      <rect x="46" y="23" width="12" height="2" rx="0.3" fill="#a16a38" opacity={o * 0.85} />

      {/* Head */}
      <rect x="62" y="12" width="16" height="24" rx="3" fill="url(#clipperHead)" />

      {/* Blade teeth — detailed */}
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

      {/* Lower blade plate */}
      <rect x="63" y="33" width="14" height="1.5" rx="0.5" fill="#afa99f" opacity={o} />

      {/* Power LED indicator (green dot) */}
      <circle cx="20" cy="14" r="1.5" fill="#708472" opacity={o} />
      <circle cx="20" cy="14" r="0.6" fill="#a8c4aa" opacity={o} />

      {/* Cord at back */}
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
