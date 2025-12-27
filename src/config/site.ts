/**
 * Site configuration - single source of truth for locales and regions
 */
export const siteConfig = {
  name: 'Dogbooks',
  url: 'https://dogbooks.co',
  appUrl: 'https://dogbooks.io',
  defaultLocale: 'en',
  locales: ['en', 'zh-TW', 'hi', 'pt', 'es'] as const,
} as const;

/** Supported locale type */
export type Locale = (typeof siteConfig.locales)[number];

/** Region to languages mapping */
export const regionLanguages = {
  global: ['en'],
  india: ['hi'],
  taiwan_hk: ['zh-TW'],
  latam: ['pt', 'es'],
} as const;

/** Supported region type */
export type Region = keyof typeof regionLanguages;

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
  return siteConfig.locales.includes(value as Locale);
}
