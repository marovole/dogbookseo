# Tasks: add-seo-deployment

## 1. SEO Head Component (使用 modern-frontend-design Skill)
- [x] 1.1 Create `src/components/SEOHead.astro`
- [x] 1.2 Implement dynamic title and description meta tags
- [x] 1.3 Add Open Graph (OG) meta tags for social sharing
- [x] 1.4 Add Twitter Card meta tags
- [x] 1.5 Implement canonical URL generation
- [x] 1.6 Integrate SEOHead into Base layout

## 2. Hreflang Implementation
- [x] 2.1 Generate hreflang tags for multi-language pages
- [x] 2.2 Include x-default hreflang pointing to English version
- [x] 2.3 Handle region-specific hreflang via availableLanguages prop
- [x] 2.4 Hreflang tags integrated into SEOHead component

## 3. Sitemap Configuration
- [x] 3.1 Install `@astrojs/sitemap` integration
- [x] 3.2 Configure sitemap in `astro.config.mjs` with i18n support
- [x] 3.3 Sitemap generated with all pages (sitemap-0.xml)
- [x] 3.4 Generate sitemap-index.xml
- [x] 3.5 All 16 pages included in sitemap

## 4. Robots.txt
- [x] 4.1 `public/robots.txt` already configured with sitemap reference
- [x] 4.2 Allow all crawlers by default
- [x] 4.3 No admin/draft paths to disallow

## 5. GitHub Actions Workflow
- [x] 5.1 Create `.github/workflows/daily.yml`
- [x] 5.2 Configure cron schedule (00:00 UTC daily)
- [x] 5.3 Add workflow_dispatch for manual triggers
- [x] 5.4 Set up Node.js 20 environment
- [x] 5.5 Install dependencies with `npm ci`
- [x] 5.6 Run pipeline script (`npm run pipeline`)
- [x] 5.7 Build site (`npm run build`)
- [x] 5.8 Commit and push new content (with change detection)

## 6. GitHub Secrets
- [x] 6.1 Document required secrets in workflow and .env.example:
  - BRAVE_API_KEY
  - CHUTES_API_KEY
- [ ] 6.2 Update README with secrets configuration instructions

## 7. Cloudflare Pages Setup
- [x] 7.1 Document Cloudflare Pages configuration in workflow:
  - Build command: `npm run build`
  - Output directory: `dist`
- [x] 7.2 Domain updated to `dogbooks.co`
- [ ] 7.3 Verify automatic deployment on push (requires user action)

## 8. Performance Verification
- [x] 8.1 Build succeeds in 641ms
- [x] 8.2 Zero client JS in production build (only CSS in _astro/)
- [x] 8.3 16 pages built successfully
- [ ] 8.4 Run Lighthouse audit (requires deployed site)

## 9. SEO Verification
- [x] 9.1 SEOHead component with all required meta tags
- [x] 9.2 Sitemap generated at /sitemap-index.xml
- [ ] 9.3 Submit sitemap to Google Search Console (requires user action)
- [ ] 9.4 Test OG tags with Facebook Debugger (requires deployed site)
