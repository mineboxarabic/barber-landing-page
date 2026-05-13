import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import LanguageSwitcher from 'components/LanguageSwitcher';

const bookingUrl = 'https://book.squareup.com/appointments/the-chair-barbershop';

const linkKeys = ['story', 'services', 'reviews', 'gallery', 'team', 'contact'] as const;

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-dark/90 backdrop-blur-md py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
          : 'py-6'
      }`}
      aria-label={t('nav.primaryNav')}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-script text-2xl md:text-3xl text-brand-cream tracking-wide cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
          aria-label={t('nav.goToTop')}
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.logo')}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {linkKeys.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.08 }}
            >
              <a
                href={`#${key}`}
                className="font-sans text-[11px] tracking-[0.28em] uppercase text-brand-gray hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green transition-colors duration-200 cursor-pointer relative group"
              >
                {t(`nav.${key}`)}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <a
            href={bookingUrl}
            className="hidden md:inline-block font-sans text-[11px] tracking-[0.3em] uppercase bg-brand-green text-white px-6 py-3 cursor-pointer hover:shadow-[0_8px_24px_rgba(112,132,114,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green transition-all duration-300 hover:-translate-y-0.5"
            aria-label={t('nav.bookAria')}
          >
            {t('nav.bookNow')}
          </a>

          <button
            type="button"
            className="md:hidden w-11 h-11 border border-brand-gray/40 flex flex-col items-center justify-center gap-1.5 text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          id="mobile-navigation"
          role="navigation"
          aria-label={t('nav.mobileNav')}
          className="md:hidden mx-6 mt-4 border border-brand-charcoal bg-brand-footer/95 backdrop-blur-md"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col divide-y divide-brand-charcoal">
            {linkKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-xs tracking-[0.3em] uppercase text-brand-light px-5 py-4 hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-green transition-colors"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
            <a
              href={bookingUrl}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-[0.3em] uppercase text-white bg-brand-green px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-light transition-colors"
              aria-label={t('nav.bookAria')}
            >
              {t('nav.bookNow')}
            </a>
          </div>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-brand-burgundy origin-left"
        style={{ scaleX: progress }}
      />
    </motion.nav>
  );
}
