# Tasks: init-astro-foundation

## 1. Project Initialization
- [x] 1.1 Initialize Astro 5.x project with `npm create astro@latest`
- [x] 1.2 Install dependencies: `@tailwindcss/vite`, `tailwindcss@4` (Vite plugin for Astro 5)
- [x] 1.3 Configure `astro.config.mjs` with SSG output mode
- [x] 1.4 Configure Tailwind via Vite plugin (no separate config needed for Tailwind 4)

## 2. Site Configuration
- [x] 2.1 Create `src/config/site.ts` with site metadata
- [x] 2.2 Define domain URLs (`dogbooks.org`, `dogbooks.io`)
- [x] 2.3 Configure supported locales array

## 3. Base Layout (使用 modern-frontend-design Skill)
- [x] 3.1 Create `src/layouts/Base.astro` with HTML structure
- [x] 3.2 Include viewport, charset, and base meta tags
- [x] 3.3 Add slot for page content

## 4. Core Components (使用 modern-frontend-design Skill)
- [x] 4.1 Create `src/components/Header.astro` with logo and navigation
- [x] 4.2 Add "Launch App" CTA button linking to `dogbooks.io`
- [x] 4.3 Create `src/components/Footer.astro` with copyright
- [x] 4.4 Create `src/components/CTA.astro` reusable button component

## 5. Root Redirect
- [x] 5.1 Create `src/pages/index.astro` with redirect to `/en/`
- [x] 5.2 Implement meta refresh and JS fallback redirect

## 6. Static Assets
- [x] 6.1 Add `public/favicon.svg` (SVG instead of ICO for modern browsers)
- [x] 6.2 Create `public/robots.txt` with sitemap reference

## 7. Styling
- [x] 7.1 Create `src/styles/global.css` with Tailwind imports
- [x] 7.2 Define base typography and color variables (Editorial + Retro-Futuristic style)

## 8. Verification
- [x] 8.1 Run `npm run build` and verify site builds successfully
- [x] 8.2 Verify redirect from `/` to `/en/` works
- [x] 8.3 Verify zero JS output in build (only CSS in _astro/)
