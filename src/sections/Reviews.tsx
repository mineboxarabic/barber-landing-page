import React from 'react';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';

const reviews = [
  {
    quote:
      'The cleanest fade I have had downtown. The appointment started on time and the finish was flawless.',
    name: 'Daniel P.',
  },
  {
    quote:
      'Warm towel, sharp beard line, no rush. It feels like a proper neighborhood shop with premium standards.',
    name: 'Mateo R.',
  },
  {
    quote:
      'Booked before a client dinner and walked out camera-ready. This is my regular chair now.',
    name: 'Chris L.',
  },
];

export default function Reviews() {
  return (
    <SectionWrapper id="reviews" dark={true} className="py-24 md:py-28 relative">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-16 items-start">
        <div>
          <FadeUp>
            <p className="font-script text-3xl text-brand-brown mb-2">Reputation</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-light leading-tight">
              Trusted for
              <br />
              <em className="text-brand-burgundy not-italic font-normal italic">Sharp Work</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="w-12 h-px bg-brand-green mt-6" />
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
              <div className="border border-brand-charcoal bg-brand-footer/50 p-5">
                <p className="font-display text-4xl text-brand-green leading-none">4.9</p>
                <p className="mt-3 font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gray">
                  Google rating
                </p>
              </div>
              <div className="border border-brand-charcoal bg-brand-footer/50 p-5">
                <p className="font-display text-4xl text-brand-green leading-none">15+</p>
                <p className="mt-3 font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gray">
                  Years serving Toronto
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        <div className="grid gap-px bg-brand-charcoal/70">
          {reviews.map((review, i) => (
            <FadeUp key={review.name} delay={0.08 * i}>
              <figure className="bg-brand-dark p-7 md:p-8 border-l-2 border-brand-burgundy hover:border-brand-green transition-colors duration-300">
                <blockquote className="font-display text-xl md:text-2xl leading-snug text-brand-light">
                  "{review.quote}"
                </blockquote>
                <figcaption className="mt-5 font-sans text-[10px] tracking-[0.3em] uppercase text-brand-brown">
                  {review.name}
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
