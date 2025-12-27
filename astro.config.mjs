import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dogbooks.org',
  output: 'static',
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
});
