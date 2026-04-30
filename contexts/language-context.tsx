'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Locale, type Translations } from '@/lib/translations';

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'th',
  t: translations['th'],
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('th');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Locale | null;
    if (saved && (saved === 'en' || saved === 'th')) {
      setLocale(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const next = locale === 'en' ? 'th' : 'en';
    setLocale(next);
    localStorage.setItem('portfolio-lang', next);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
