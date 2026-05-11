import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = '',
  dark = true,
}: SectionWrapperProps) {
  const bg = dark ? 'bg-brand-dark' : 'bg-brand-cream';
  const text = dark ? 'text-brand-light' : 'text-brand-charcoal';

  return (
    <section id={id} className={`${bg} ${text} py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
