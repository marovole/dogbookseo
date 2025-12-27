## ADDED Requirements

### Requirement: Project Structure
The project SHALL follow Astro 5.x conventions with a clearly organized directory structure separating configuration, content, components, layouts, pages, and styles.

#### Scenario: Standard directory layout
- **WHEN** the project is initialized
- **THEN** the following directories SHALL exist:
  - `src/config/` for site configuration
  - `src/layouts/` for page layouts
  - `src/components/` for reusable components
  - `src/pages/` for route pages
  - `src/styles/` for global styles
  - `public/` for static assets

### Requirement: Astro Configuration
The project SHALL configure Astro for static site generation with zero JavaScript output.

#### Scenario: SSG build output
- **WHEN** `npm run build` is executed
- **THEN** the output SHALL be static HTML files with no client-side JavaScript bundles

#### Scenario: Development server
- **WHEN** `npm run dev` is executed
- **THEN** a local development server SHALL start on port 4321

### Requirement: Tailwind CSS Integration
The project SHALL integrate Tailwind CSS 4.x for styling with atomic utility classes.

#### Scenario: Tailwind classes available
- **WHEN** a component uses Tailwind utility classes
- **THEN** the classes SHALL be compiled into the final CSS output

#### Scenario: Purged CSS output
- **WHEN** the site is built for production
- **THEN** only used Tailwind classes SHALL be included in the output

### Requirement: Site Configuration
The project SHALL maintain centralized site configuration in `src/config/site.ts`.

#### Scenario: Configuration access
- **WHEN** any component needs site metadata
- **THEN** it SHALL import from `src/config/site.ts`

#### Scenario: Required configuration fields
- **WHEN** the configuration is loaded
- **THEN** it SHALL include:
  - `name`: "Dogbooks"
  - `url`: "https://dogbooks.org"
  - `appUrl`: "https://dogbooks.io"
  - `defaultLocale`: "en"
  - `locales`: ["en", "zh-TW", "hi", "pt", "es"]
