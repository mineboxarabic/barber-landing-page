import React from 'react';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';
import { images } from 'assets/images';

const barbers = [
  {
    name: 'Marcus Reid',
    title: 'Master Barber',
    years: '12 yrs',
    bio: 'Specializes in classic gentleman cuts and straight-razor work.',
  },
  {
    name: 'Jonah West',
    title: 'Senior Barber',
    years: '8 yrs',
    bio: 'Fade specialist with a sharp eye for modern texture work.',
  },
  {
    name: 'Leo Santos',
    title: 'Barber',
    years: '5 yrs',
    bio: 'Beard sculptor and the resident expert on long hair styling.',
  },
];

export default function Team() {
  return (
    <SectionWrapper id="team" dark={false} className="pt-0 pb-32 relative">
      <div className="text-center mb-16">
        <FadeUp>
          <p className="font-script text-3xl text-brand-brown mb-2">The Crew</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-charcoal">
            Meet Your <em className="text-brand-burgundy not-italic font-normal italic">Barbers</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="w-12 h-px bg-brand-green mx-auto mt-6" />
        </FadeUp>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
        {barbers.map((barber, i) => (
          <FadeUp key={barber.name} delay={0.1 * i}>
            <div className="group flex flex-col">
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal mb-6">
                <img
                  src={images.team[i]}
                  alt={`Portrait of ${barber.name}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Bottom gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 50%, rgba(22,22,22,0.8) 100%)',
                  }}
                />

                {/* Years badge */}
                <div className="absolute top-4 right-4 bg-brand-cream/95 backdrop-blur-sm px-3 py-1.5">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-brand-charcoal">
                    {barber.years}
                  </span>
                </div>

                {/* Hover book button */}
                <div className="absolute inset-x-0 bottom-0 h-14 flex items-center justify-center bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <a
                    href="#contact"
                    className="font-sans text-xs tracking-[0.3em] uppercase text-white cursor-pointer"
                    aria-label={`Book with ${barber.name}`}
                  >
                    Book with {barber.name.split(' ')[0]} →
                  </a>
                </div>
              </div>

              <h3 className="font-display text-2xl font-medium text-brand-charcoal">
                {barber.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 mb-3">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-brown">
                  {barber.title}
                </span>
              </div>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                {barber.bio}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
