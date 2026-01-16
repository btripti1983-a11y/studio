"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'es' | 'nl';

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
  translations: Record<string, Record<Language, string>>;
}

const defaultTranslations: Record<string, Record<Language, string>> = {
    "Dashboard": {
        "en": "Dashboard",
        "es": "Tablero",
        "hi": "डैशबोर्ड",
        "nl": "Dashboard"
    },
    "Welcome": {
        "en": "Welcome",
        "es": "Bienvenido",
        "hi": "स्वागत है",
        "nl": "Welkom"
    }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [timezone, setTimezone] = useState('Europe/London');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
        const storedLanguage = localStorage.getItem('app-language') as Language;
        const storedTimezone = localStorage.getItem('app-timezone');
        if (storedLanguage && ['en', 'hi', 'es', 'nl'].includes(storedLanguage)) {
            setLanguage(storedLanguage);
        }
        if (storedTimezone) {
            setTimezone(storedTimezone);
        }
    } catch (error) {
        console.error("Failed to load settings from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if(isInitialized) {
        try {
            localStorage.setItem('app-language', language);
        } catch (error) {
            console.error("Failed to save language to localStorage", error);
        }
    }
  }, [language, isInitialized]);

  useEffect(() => {
    if(isInitialized) {
        try {
            localStorage.setItem('app-timezone', timezone);
        } catch (error) {
            console.error("Failed to save timezone to localStorage", error);
        }
    }
  }, [timezone, isInitialized]);

  const value = { language, setLanguage, timezone, setTimezone, translations: defaultTranslations };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
