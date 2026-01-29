import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, countryToLanguage } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const detectLanguage = async (): Promise<Language> => {
  // First, try to get from localStorage
  const saved = localStorage.getItem('gfocus-language');
  if (saved && ['en', 'vi', 'fr', 'es', 'zh', 'ko'].includes(saved)) {
    return saved as Language;
  }

  // Try to detect from browser language
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'vi', 'fr', 'es', 'zh', 'ko'].includes(browserLang)) {
    return browserLang as Language;
  }

  // Try to detect from IP geolocation (free API)
  try {
    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) 
    });
    if (response.ok) {
      const data = await response.json();
      const countryCode = data.country_code;
      if (countryCode && countryToLanguage[countryCode]) {
        return countryToLanguage[countryCode];
      }
    }
  } catch {
    // Silently fail and default to English
  }

  return 'vi';
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    detectLanguage().then((detectedLang) => {
      setLanguageState(detectedLang);
      setIsInitialized(true);
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gfocus-language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['en'][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return text;
  };

  // Show nothing until language is detected to prevent flash
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
