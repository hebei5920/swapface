import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, SupportedLanguage } from '../utils/translations';

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 获取浏览器的首选语言，如果支持的话
const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0];
  return (browserLang as SupportedLanguage) || 'en';
};

// 从localStorage获取保存的语言设置
const getSavedLanguage = (): SupportedLanguage => {
  const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
  return savedLanguage || getBrowserLanguage();
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(getSavedLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      // Fallback to English if translation doesn't exist
      return translations.en[key] || key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};