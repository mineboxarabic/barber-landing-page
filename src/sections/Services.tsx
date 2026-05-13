import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';
import {
  ScissorsIcon,
  FadeIcon,
  RazorIcon,
  BeardIcon,
  ComboIcon,
  KidIcon,
} from 'components/ServiceIcons';

const bookingUrl = 'https://book.squareup.com/appointments/the-chair-barbershop';

const iconMap = [ScissorsIcon, FadeIcon, RazorIcon, BeardIcon, ComboIcon, KidIcon] as const;

export default function Services() {
  const { t } = useTranslation();

  const services = (
    t('services.items', { returnObjects: true }) as {
      name: string;
      desc: string;
    }[]
  ).map((item, i) => ({ ...item, price: [35, 40, 45, 25, 70, 25][i], Icon: iconMap[i] }));

  return (
    <SectionWrapper id="services" dark={true} className="py-28 md:py-36 relative">
      <FadeUp className="absolute top-10 left-8 md:left-14">
        <div className="flex flex-col items-start gap-2 opacity-60">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray">
            {t('services.sectionNumber')}
          </span>
          <div className="w-10 h-px bg-brand-gray/40" />
        </div>
      </FadeUp>

      <div className="text-center mb-20">
        <FadeUp>
          <p className="font-script text-3xl text-brand-brown mb-2">{t('services.pretitle')}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-light">
            {t('services.heading1')}{' '}
            <em className="text-brand-burgundy not-italic font-normal italic">
              {t('services.heading2')}
            </em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="w-12 h-px bg-brand-green mx-auto mt-6" />
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-sans text-sm text-brand-gray max-w-md mx-auto mt-6 leading-relaxed">
            {t('services.disclaimer')}
          </p>
        </FadeUp>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-charcoal/40">
        {services.map((service, i) => {
          const Icon = service.Icon;
          return (
            <FadeUp key={service.name} delay={0.05 * i}>
              <article className="bg-brand-dark p-10 flex flex-col gap-5 h-full border-t-2 border-brand-burgundy hover:border-brand-green hover:bg-brand-charcoal transition-all duration-500 group relative overflow-hidden">
                <div className="text-brand-burgundy group-hover:text-brand-green transition-colors duration-300">
                  <Icon className="w-10 h-10" />
                </div>

                <h3 className="font-display text-2xl font-medium text-brand-light">
                  {service.name}
                </h3>

                <p className="font-sans text-sm text-brand-gray leading-relaxed flex-1">
                  {service.desc}
                </p>

                <div className="flex items-end justify-between gap-4 mt-2 pt-5 border-t border-brand-charcoal">
                  <span className="font-display text-4xl font-normal text-brand-green">
                    ${service.price}
                  </span>
                  <a
                    href={bookingUrl}
                    className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-brown hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green transition-all duration-200 cursor-pointer group-hover:translate-x-1"
                    aria-label={`${t('services.bookLabel')} ${service.name}`}
                  >
                    {t('services.bookLabel')} -&gt;
                  </a>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </article>
            </FadeUp>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
