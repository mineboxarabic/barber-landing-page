import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const en = {
  description:
    'Premium Toronto barbershop for sharp cuts, fades, beard trims, and hot towel shaves.',
  ogTitle: 'The Chair Barbershop | Toronto Cuts & Shaves',
  ogDescription:
    'Book a chair for classic cuts, skin fades, beard trims, and straight-razor shaves in downtown Toronto.',
  title: 'The Chair Barbershop | Toronto Cuts & Shaves',
} as const;

const fr = {
  description:
    'Salon de barbier premium à Toronto pour coupes nettes, dégradés, tailles de barbe et rasages au fil chaud.',
  ogTitle: 'The Chair Barbershop | Coupes & Rasages à Toronto',
  ogDescription:
    'Réservez une chaise pour des coupes classiques, dégradés, tailles de barbe et rasages au fil droit dans le centre-ville de Toronto.',
  title: 'The Chair Barbershop | Coupes & Rasages à Toronto',
} as const;

export default function HtmlUpdater() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const meta = i18n.language === 'fr' ? fr : en;

    document.documentElement.lang = i18n.language;

    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const titleTag = document.querySelector('title');

    metaDesc?.setAttribute('content', meta.description);
    ogTitle?.setAttribute('content', meta.ogTitle);
    ogDesc?.setAttribute('content', meta.ogDescription);
    if (titleTag) titleTag.textContent = meta.title;
  }, [i18n.language]);

  return null;
}
