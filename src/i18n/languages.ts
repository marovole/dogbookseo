import type { Locale } from '@/config/site';

export const languages: Record<Locale, {
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}> = {
  'en': {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  'zh-TW': {
    name: 'Traditional Chinese',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    dir: 'ltr',
  },
  'hi': {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
  },
  'pt': {
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    dir: 'ltr',
  },
  'es': {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
  },
};

export const regionToLanguages: Record<string, Locale[]> = {
  global: ['en'],
  india: ['hi'],
  taiwan_hk: ['zh-TW'],
  latam: ['pt', 'es'],
};

export const languageToRegions: Record<Locale, string[]> = {
  'en': ['global'],
  'hi': ['india'],
  'zh-TW': ['taiwan_hk'],
  'pt': ['latam'],
  'es': ['latam'],
};

export function getLanguageInfo(locale: Locale) {
  return languages[locale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locale in languages;
}
