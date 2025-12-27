export const siteConfig = {
  name: 'Dogbooks',
  url: 'https://dogbooks.co',
  appUrl: 'https://dogbooks.io',
  defaultLocale: 'en',
  locales: ['en', 'zh-TW', 'hi', 'pt', 'es'] as const,
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export const regionLanguages = {
  global: ['en'],
  india: ['hi'],
  taiwan_hk: ['zh-TW'],
  latam: ['pt', 'es'],
} as const;

export type Region = keyof typeof regionLanguages;
