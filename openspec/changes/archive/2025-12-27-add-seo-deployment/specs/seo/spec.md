## ADDED Requirements

### Requirement: SEO Head Component
The system SHALL provide a reusable SEO head component for all pages.

#### Scenario: Title tag
- **WHEN** a page is rendered
- **THEN** the title tag SHALL be formatted as `{page_title} | Dogbooks`
- **AND** the title SHALL be unique per page

#### Scenario: Meta description
- **WHEN** a page is rendered
- **THEN** a meta description tag SHALL be included
- **AND** the description SHALL be limited to 160 characters

#### Scenario: Canonical URL
- **WHEN** a page is rendered
- **THEN** a canonical link tag SHALL point to the full URL of that page

### Requirement: Open Graph Meta Tags
The system SHALL include Open Graph meta tags for social sharing.

#### Scenario: Required OG tags
- **WHEN** a page is rendered
- **THEN** these OG tags SHALL be included:
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:type` (website or article)
  - `og:image` (if available)

#### Scenario: Twitter Card tags
- **WHEN** a page is rendered
- **THEN** Twitter Card meta tags SHALL be included:
  - `twitter:card` (summary_large_image)
  - `twitter:title`
  - `twitter:description`

### Requirement: Hreflang Tags
The system SHALL generate hreflang tags for multi-language pages.

#### Scenario: Language alternates
- **WHEN** a topic page is rendered
- **THEN** hreflang tags SHALL be generated for all available language versions

#### Scenario: x-default hreflang
- **WHEN** hreflang tags are generated
- **THEN** an x-default hreflang SHALL point to the English version

#### Scenario: Region-specific topics
- **WHEN** a topic only exists in certain languages
- **THEN** hreflang tags SHALL only include those available languages

### Requirement: Sitemap Generation
The system SHALL automatically generate XML sitemaps.

#### Scenario: Per-language sitemaps
- **WHEN** the site is built
- **THEN** separate sitemaps SHALL be generated for each language:
  - sitemap-en.xml
  - sitemap-zh-TW.xml
  - sitemap-hi.xml
  - sitemap-pt.xml
  - sitemap-es.xml

#### Scenario: Sitemap index
- **WHEN** the site is built
- **THEN** a sitemap-index.xml SHALL reference all language sitemaps

#### Scenario: All pages included
- **WHEN** sitemaps are generated
- **THEN** all topic pages and static pages SHALL be included

### Requirement: Robots.txt
The system SHALL provide a robots.txt file for crawler guidance.

#### Scenario: Sitemap reference
- **WHEN** robots.txt is served
- **THEN** it SHALL include a reference to sitemap-index.xml

#### Scenario: Crawler access
- **WHEN** robots.txt is served
- **THEN** it SHALL allow all major search engine crawlers

### Requirement: Performance Standards
All pages SHALL meet minimum performance standards.

#### Scenario: Lighthouse score
- **WHEN** a page is audited with Lighthouse
- **THEN** the performance score SHALL be >= 95

#### Scenario: Page size
- **WHEN** a page is loaded
- **THEN** the total page size SHALL be < 50KB

#### Scenario: Zero JavaScript
- **WHEN** the site is built for production
- **THEN** no client-side JavaScript bundles SHALL be included
