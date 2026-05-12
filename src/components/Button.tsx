import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  'aria-label'?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base =
    'inline-block font-sans font-medium text-sm tracking-widest uppercase cursor-pointer transition-all duration-200 px-8 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green';

  const variants = {
    primary:
      'bg-brand-green text-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5',
    ghost: 'border border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
