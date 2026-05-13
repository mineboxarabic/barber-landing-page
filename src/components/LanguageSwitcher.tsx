import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => i18n.changeLanguage('fr')}
        className={`font-sans text-[10px] tracking-[0.2em] uppercase px-2 py-1 transition-colors duration-200 cursor-pointer ${
          current === 'fr'
            ? 'text-brand-green font-semibold'
            : 'text-brand-gray/50 hover:text-brand-gray'
        }`}
        aria-label="Passer au français"
      >
        FR
      </button>
      <span className="text-brand-gray/30 text-[10px]">|</span>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className={`font-sans text-[10px] tracking-[0.2em] uppercase px-2 py-1 transition-colors duration-200 cursor-pointer ${
          current === 'en'
            ? 'text-brand-green font-semibold'
            : 'text-brand-gray/50 hover:text-brand-gray'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
