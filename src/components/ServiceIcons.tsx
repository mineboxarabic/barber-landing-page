import React from 'react';

type IconProps = { className?: string };

const stroke = 'currentColor';
const sw = 1.4;

export const ScissorsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="8" cy="9" r="3.5" stroke={stroke} strokeWidth={sw} />
    <circle cx="8" cy="23" r="3.5" stroke={stroke} strokeWidth={sw} />
    <path d="M11 11l16 12M11 21l16-12" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

export const FadeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M6 22h20M5 25h22M4 28h24" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    <path
      d="M16 4c-4 0-7 3-7 8v6h14v-6c0-5-3-8-7-8z"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  </svg>
);

export const RazorIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect x="4" y="14" width="14" height="3" rx="0.5" stroke={stroke} strokeWidth={sw} />
    <path d="M18 15.5L26 8M26 8l2 2M26 8l-2-2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    <path d="M4 17v3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

export const BeardIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path
      d="M10 10c0 4 2 8 6 8s6-4 6-8"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
    />
    <path
      d="M8 14c0 8 4 14 8 14s8-6 8-14"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
    />
    <circle cx="13" cy="13" r="0.8" fill={stroke} />
    <circle cx="19" cy="13" r="0.8" fill={stroke} />
  </svg>
);

export const ComboIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="6" cy="10" r="2.5" stroke={stroke} strokeWidth={sw} />
    <circle cx="6" cy="22" r="2.5" stroke={stroke} strokeWidth={sw} />
    <path d="M8 11l10 7M8 21l10-7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    <path d="M20 9v14M23 11v10M26 13v6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

export const KidIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="16" cy="12" r="6" stroke={stroke} strokeWidth={sw} />
    <path d="M6 28c0-5 4-9 10-9s10 4 10 9" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    <circle cx="13" cy="11" r="0.8" fill={stroke} />
    <circle cx="19" cy="11" r="0.8" fill={stroke} />
    <path d="M13.5 14.5c.8.8 4.2.8 5 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);
