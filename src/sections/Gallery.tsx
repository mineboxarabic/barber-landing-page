import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';
import { images } from 'assets/images';

const aspects = [
  'aspect-square',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-square',
  'aspect-[4/3]',
  'aspect-[4/3]',
];

function GalleryItem({
  src,
  label,
  aspect,
  delay,
  viewLabel,
}: {
  src: string;
  label: string;
  aspect: string;
  delay: number;
  viewLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${aspect} bg-brand-charcoal overflow-hidden cursor-pointer group`}
      initial={{ opacity: 0, filter: 'brightness(0)' }}
      animate={inView ? { opacity: 1, filter: 'brightness(1)' } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[800ms] ease-out"
      />

      <div className="absolute inset-0 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-transparent via-transparent to-brand-dark/90" />

      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-brand-cream">
          {label}
        </span>
        <span className="font-display text-xs italic text-brand-cream/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {viewLabel}
        </span>
      </div>

      <div className="absolute top-0 left-0 h-0.5 bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 w-full" />
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useTranslation();

  const labels = t('gallery.labels', { returnObjects: true }) as string[];

  return (
    <SectionWrapper id="gallery" dark={false} className="py-28 md:py-36 relative">
      <FadeUp className="absolute top-10 left-8 md:left-14">
        <div className="flex flex-col items-start gap-2 opacity-60">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-charcoal">
            {t('gallery.sectionNumber')}
          </span>
          <div className="w-10 h-px bg-brand-charcoal/40" />
        </div>
      </FadeUp>

      <div className="text-center mb-16">
        <FadeUp>
          <p className="font-script text-3xl text-brand-brown mb-2">{t('gallery.pretitle')}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-charcoal">
            {t('gallery.heading1')}{' '}
            <em className="text-brand-burgundy not-italic font-normal italic">
              {t('gallery.heading2')}
            </em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="w-12 h-px bg-brand-green mx-auto mt-6" />
        </FadeUp>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {images.gallery.map((src, i) => (
          <GalleryItem
            key={src + i}
            src={src}
            label={labels[i]}
            aspect={aspects[i]}
            delay={i * 0.08}
            viewLabel={t('gallery.viewLabel')}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
