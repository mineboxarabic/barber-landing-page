import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';

export default function Reviews() {
  const { t } = useTranslation();

  const reviews = t('reviews.items', { returnObjects: true }) as {
    quote: string;
    name: string;
  }[];

  return (
    <SectionWrapper id="reviews" dark={true} className="py-24 md:py-28 relative">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-16 items-start">
        <div>
          <FadeUp>
            <p className="font-script text-3xl text-brand-brown mb-2">{t('reviews.pretitle')}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-light leading-tight">
              {t('reviews.heading1')}
              <br />
              <em className="text-brand-burgundy not-italic font-normal italic">
                {t('reviews.heading2')}
              </em>
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
                  {t('reviews.statGoogle')}
                </p>
              </div>
              <div className="border border-brand-charcoal bg-brand-footer/50 p-5">
                <p className="font-display text-4xl text-brand-green leading-none">15+</p>
                <p className="mt-3 font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gray">
                  {t('reviews.statYears')}
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
                  &ldquo;{review.quote}&rdquo;
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
