import React from 'react';

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/thechairbarbershop' },
  { label: 'Facebook', href: 'https://facebook.com/thechairbarbershop' },
  {
    label: 'Google',
    href: 'https://www.google.com/search?q=The+Chair+Barbershop+Toronto',
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-footer py-16 px-6 text-center border-t border-brand-charcoal relative overflow-hidden">
      <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
        <span className="w-12 h-px bg-brand-brown" />
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1l1.5 5.5L15 8l-5.5 1.5L8 15l-1.5-5.5L1 8l5.5-1.5L8 1z" fill="#a16a38" />
        </svg>
        <span className="w-12 h-px bg-brand-brown" />
      </div>

      <p className="font-script text-5xl text-brand-cream mb-2">The Chair</p>
      <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray mb-8">
        Barbershop - Est. 2009
      </p>

      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-brown hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green transition-colors cursor-pointer"
            aria-label={`Visit our ${social.label} page`}
          >
            {social.label}
          </a>
        ))}
      </div>

      <div className="w-16 h-px bg-brand-charcoal mx-auto mb-6" />

      <p className="font-sans text-xs text-brand-gray">
        &copy; {new Date().getFullYear()} The Chair Barbershop. All rights reserved.
      </p>
    </footer>
  );
}
