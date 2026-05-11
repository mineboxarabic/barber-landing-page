import React from 'react';

// Subtle film-grain texture for premium feel. Pointer-events-none so it never blocks clicks.
export default function GrainOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
      }}
    />
  );
}
