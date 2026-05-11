import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-dark/85 backdrop-blur-md py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            : 'py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            className="font-script text-2xl md:text-3xl text-brand-cream tracking-wide cursor-pointer"
            aria-label="Go to top"
          >
            The Chair
          </a>
          <ul className="hidden md:flex items-center gap-9">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <a
                  href={link.href}
                  className="font-sans text-[11px] tracking-[0.3em] uppercase text-brand-gray hover:text-brand-cream transition-colors duration-200 cursor-pointer relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              </motion.li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden md:inline-block font-sans text-[11px] tracking-[0.3em] uppercase bg-brand-green text-white px-6 py-3 cursor-pointer hover:shadow-[0_8px_24px_rgba(112,132,114,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            aria-label="Book an appointment"
          >
            Book Now
          </a>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-brand-burgundy origin-left"
          style={{ scaleX: progress }}
        />
      </motion.nav>
    </>
  );
}
