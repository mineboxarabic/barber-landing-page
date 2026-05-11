import React from 'react';
import Navbar from 'components/Navbar';
import ScissorsDivider from 'components/ScissorsDivider';
import ClipperDivider from 'components/ClipperDivider';
import Hero from 'sections/Hero';
import Story from 'sections/Story';
import Services from 'sections/Services';
import Gallery from 'sections/Gallery';
import Team from 'sections/Team';
import Contact from 'sections/Contact';

function Footer() {
  return (
    <footer className="bg-brand-footer py-16 px-6 text-center border-t border-brand-charcoal relative overflow-hidden">
      {/* Decorative ornament */}
      <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
        <span className="w-12 h-px bg-brand-brown" />
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 1l1.5 5.5L15 8l-5.5 1.5L8 15l-1.5-5.5L1 8l5.5-1.5L8 1z"
            fill="#a16a38"
          />
        </svg>
        <span className="w-12 h-px bg-brand-brown" />
      </div>

      <p className="font-script text-5xl text-brand-cream mb-2">The Chair</p>
      <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray mb-8">
        Barbershop · Est. 2009
      </p>

      <div className="flex justify-center gap-10 mb-10">
        {[
          { label: 'Instagram', href: 'https://instagram.com' },
          { label: 'Facebook', href: 'https://facebook.com' },
          { label: 'Google', href: 'https://google.com' },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-brown hover:text-brand-cream transition-colors cursor-pointer"
            aria-label={`Visit our ${social.label} page`}
          >
            {social.label}
          </a>
        ))}
      </div>

      <div className="w-16 h-px bg-brand-charcoal mx-auto mb-6" />

      <p className="font-sans text-xs text-brand-gray">
        © {new Date().getFullYear()} The Chair Barbershop. All rights reserved.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <main className="bg-brand-dark">
      <Navbar />

      <Hero />

      {/* Hero (dark) → Story (cream) */}
      <ScissorsDivider
        lineColor="rgba(175,169,159,0.4)"
        fromBg="#161616"
        toBg="#f4e4de"
      />

      <Story />

      {/* Story (cream) → Services (dark) */}
      <ClipperDivider
        revealColor="#161616"
        fromBg="#f4e4de"
        toBg="#161616"
        direction="ltr"
      />

      <Services />

      {/* Services (dark) → Gallery (cream) */}
      <ScissorsDivider
        lineColor="rgba(103,47,37,0.4)"
        fromBg="#161616"
        toBg="#f4e4de"
      />

      <Gallery />
      <Team />

      {/* Team (cream) → Contact (dark) */}
      <ClipperDivider
        revealColor="#161616"
        fromBg="#f4e4de"
        toBg="#161616"
        direction="rtl"
      />

      <Contact />

      <Footer />
    </main>
  );
}
