import React from 'react';
import Navbar from 'components/Navbar';
import ScissorsDivider from 'components/ScissorsDivider';
import ClipperDivider from 'components/ClipperDivider';
import Hero from 'sections/Hero';
import Story from 'sections/Story';
import Services from 'sections/Services';
import Reviews from 'sections/Reviews';
import Gallery from 'sections/Gallery';
import Team from 'sections/Team';
import Contact from 'sections/Contact';
import Footer from 'sections/Footer';

export default function App() {
  return (
    <main className="bg-brand-dark">
      <Navbar />

      <Hero />

      <ScissorsDivider lineColor="rgba(175,169,159,0.4)" fromBg="#161616" toBg="#f4e4de" />

      <Story />

      <ClipperDivider revealColor="#161616" fromBg="#f4e4de" toBg="#161616" direction="ltr" />

      <Services />
      <Reviews />

      <ScissorsDivider lineColor="rgba(103,47,37,0.4)" fromBg="#161616" toBg="#f4e4de" />

      <Gallery />
      <Team />

      <ClipperDivider revealColor="#161616" fromBg="#f4e4de" toBg="#161616" direction="rtl" />

      <Contact />

      <Footer />
    </main>
  );
}
