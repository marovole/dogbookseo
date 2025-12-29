import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dogbooks.co',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-TW': 'zh-TW',
          hi: 'hi',
          pt: 'pt',
          es: 'es',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW', 'hi', 'pt', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  prefetch: true,
});
