# Tasks: add-seo-deployment

## 1. SEO Head Component (使用 modern-frontend-design Skill)
- [ ] 1.1 Create `src/components/SEOHead.astro`
- [ ] 1.2 Implement dynamic title and description meta tags
- [ ] 1.3 Add Open Graph (OG) meta tags for social sharing
- [ ] 1.4 Add Twitter Card meta tags
- [ ] 1.5 Implement canonical URL generation
- [ ] 1.6 Integrate SEOHead into Base layout

## 2. Hreflang Implementation
- [ ] 2.1 Generate hreflang tags for multi-language pages
- [ ] 2.2 Include x-default hreflang pointing to English version
- [ ] 2.3 Handle region-specific hreflang (e.g., latam pt+es)
- [ ] 2.4 Verify hreflang tags on topic detail pages

## 3. Sitemap Configuration
- [ ] 3.1 Install `@astrojs/sitemap` integration
- [ ] 3.2 Configure sitemap in `astro.config.mjs`
- [ ] 3.3 Generate per-language sitemaps:
  - sitemap-en.xml
  - sitemap-zh-TW.xml
  - sitemap-hi.xml
  - sitemap-pt.xml
  - sitemap-es.xml
- [ ] 3.4 Generate sitemap-index.xml
- [ ] 3.5 Verify all topic pages are included

## 4. Robots.txt
- [ ] 4.1 Update `public/robots.txt` with sitemap reference
- [ ] 4.2 Allow all crawlers by default
- [ ] 4.3 Disallow admin/draft paths if any

## 5. GitHub Actions Workflow
- [ ] 5.1 Create `.github/workflows/daily.yml`
- [ ] 5.2 Configure cron schedule (00:00 UTC daily)
- [ ] 5.3 Add workflow_dispatch for manual triggers
- [ ] 5.4 Set up Node.js 20 environment
- [ ] 5.5 Install dependencies with `npm ci`
- [ ] 5.6 Run pipeline script (`npm run pipeline`)
- [ ] 5.7 Build site (`npm run build`)
- [ ] 5.8 Commit and push new content

## 6. GitHub Secrets
- [ ] 6.1 Document required secrets:
  - BRAVE_API_KEY
  - CHUTES_API_KEY
- [ ] 6.2 Update README with secrets configuration instructions

## 7. Cloudflare Pages Setup
- [ ] 7.1 Document Cloudflare Pages configuration:
  - Build command: `npm run build`
  - Output directory: `dist`
- [ ] 7.2 Document custom domain setup (`dogbooks.org`)
- [ ] 7.3 Verify automatic deployment on push

## 8. Performance Verification
- [ ] 8.1 Run Lighthouse audit on sample pages
- [ ] 8.2 Verify performance score >= 95
- [ ] 8.3 Verify zero JS output in production build
- [ ] 8.4 Verify page size < 50KB

## 9. SEO Verification
- [ ] 9.1 Validate meta tags with online validators
- [ ] 9.2 Test hreflang with Google Search Console
- [ ] 9.3 Submit sitemap to Google Search Console
- [ ] 9.4 Test OG tags with Facebook Debugger
