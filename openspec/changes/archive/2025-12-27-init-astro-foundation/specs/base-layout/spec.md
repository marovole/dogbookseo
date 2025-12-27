## ADDED Requirements

### Requirement: Base Layout
The project SHALL provide a single base layout (`Base.astro`) that wraps all pages with common HTML structure.

#### Scenario: HTML document structure
- **WHEN** a page uses the Base layout
- **THEN** the output SHALL include:
  - DOCTYPE declaration
  - HTML tag with lang attribute
  - Head section with charset and viewport meta tags
  - Body section with the page content slot

#### Scenario: Layout slot
- **WHEN** a page passes content to the layout
- **THEN** the content SHALL render in the designated slot area

### Requirement: Header Component
The project SHALL provide a Header component with navigation and app launch button.

#### Scenario: Logo display
- **WHEN** the header is rendered
- **THEN** the Dogbooks logo SHALL be displayed and link to the homepage

#### Scenario: Launch App button
- **WHEN** the header is rendered
- **THEN** a "Launch App" button SHALL be displayed linking to `https://dogbooks.io`

#### Scenario: Responsive header
- **WHEN** viewed on mobile devices
- **THEN** the header SHALL adapt to smaller screen sizes

### Requirement: Footer Component
The project SHALL provide a Footer component with copyright and basic links.

#### Scenario: Copyright display
- **WHEN** the footer is rendered
- **THEN** the current year and Dogbooks copyright SHALL be displayed

### Requirement: CTA Component
The project SHALL provide a reusable CTA (Call-to-Action) button component.

#### Scenario: Primary CTA styling
- **WHEN** a CTA button is rendered with primary variant
- **THEN** it SHALL display with prominent styling to attract user attention

#### Scenario: CTA link behavior
- **WHEN** the CTA button is clicked
- **THEN** it SHALL navigate to the specified href

### Requirement: Root Redirect
The root URL (`/`) SHALL redirect to the default locale (`/en/`).

#### Scenario: Root access redirect
- **WHEN** a user visits `https://dogbooks.org/`
- **THEN** they SHALL be redirected to `https://dogbooks.org/en/`

#### Scenario: Redirect method
- **WHEN** the redirect is triggered
- **THEN** it SHALL use meta refresh with JavaScript fallback for compatibility

### Requirement: Frontend Design Quality
All frontend components and pages SHALL be designed using the `modern-frontend-design` Skill to ensure production-grade, distinctive interfaces.

#### Scenario: Design implementation
- **WHEN** implementing any `.astro` component or page
- **THEN** the `modern-frontend-design` Skill MUST be invoked for design guidance
