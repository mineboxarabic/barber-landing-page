import React from 'react';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';
import { images } from 'assets/images';

export default function Story() {
  return (
    <SectionWrapper id="story" dark={false} className="py-28 md:py-36 relative">
      <FadeUp className="absolute top-10 right-8 md:right-14">
        <div className="flex flex-col items-end gap-2 opacity-60">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-charcoal">
            02 - Our Story
          </span>
          <div className="w-10 h-px bg-brand-charcoal/40" />
        </div>
      </FadeUp>

      <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-center">
        <FadeUp className="md:col-span-2">
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-burgundy z-0" />
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-brand-charcoal z-10">
              <img
                src={images.storyPortrait}
                alt="Barber shaping a client haircut"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-brand-dark/40" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-brand-brown z-20" />
          </div>
        </FadeUp>

        <div className="md:col-span-3 flex flex-col gap-6">
          <FadeUp delay={0.1}>
            <p className="font-script text-4xl text-brand-brown">About Us</p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-charcoal leading-[1.05]">
              The Craft Behind
              <br />
              <em className="text-brand-burgundy not-italic font-normal italic">the Cut</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="w-14 h-0.5 bg-brand-green" />
          </FadeUp>

          <FadeUp delay={0.35}>
            <p className="font-sans text-base md:text-lg leading-relaxed text-brand-charcoal/80">
              Rooted in the timeless tradition of the neighbourhood barbershop, we believe a great
              cut is more than a service. It is a ritual of precision, conversation, and leaving
              sharper than you arrived.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="font-sans text-base leading-relaxed text-brand-charcoal/70">
              Since 2009, our barbers have honed their craft through thousands of cuts, fades, and
              straight-razor shaves with the same attention to detail that made us a downtown
              regular for clients who care about the finish.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="grid grid-cols-3 gap-6 mt-6 pt-8 border-t border-brand-charcoal/15">
              {[
                { value: '15+', label: 'Years of craft' },
                { value: '2K+', label: 'Happy clients' },
                { value: '4', label: 'Master chairs' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <span className="font-display text-4xl md:text-5xl font-semibold text-brand-burgundy leading-none">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-brand-charcoal/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </SectionWrapper>
  );
}
