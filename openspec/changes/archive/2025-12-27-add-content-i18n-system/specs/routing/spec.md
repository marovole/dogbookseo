## ADDED Requirements

### Requirement: Localized URL Structure
The system SHALL use language codes as URL prefixes for all pages.

#### Scenario: URL format
- **WHEN** generating URLs for pages
- **THEN** the format SHALL be `/[lang]/[path]`
- **AND** examples include:
  - `/en/` for English homepage
  - `/zh-TW/topics/` for Traditional Chinese topic list
  - `/hi/topics/india-t20-series` for Hindi topic detail

### Requirement: Homepage Route
The system SHALL provide a localized homepage for each language.

#### Scenario: Homepage content
- **WHEN** visiting `/[lang]/`
- **THEN** the page SHALL display:
  - Game introduction in the current language
  - Featured topics relevant to that locale
  - CTA to launch the app

#### Scenario: Static path generation
- **WHEN** building the site
- **THEN** homepage routes SHALL be generated for all 5 supported languages

### Requirement: Topic List Route
The system SHALL provide a topic listing page with filtering.

#### Scenario: Topic listing
- **WHEN** visiting `/[lang]/topics/`
- **THEN** the page SHALL display:
  - List of topics available in that language
  - Category filter options
  - Topic cards with preview information

#### Scenario: Language-filtered topics
- **WHEN** listing topics for a language
- **THEN** only topics with content in that language SHALL be shown

### Requirement: Topic Detail Route
The system SHALL provide a detail page for each topic.

#### Scenario: Topic detail content
- **WHEN** visiting `/[lang]/topics/[slug]`
- **THEN** the page SHALL display:
  - Topic title and question in the current language
  - Prediction options
  - Topic description
  - CTA to play on the app

#### Scenario: Dynamic path generation
- **WHEN** building the site
- **THEN** paths SHALL be generated for each topic-language combination

#### Scenario: Missing language fallback
- **WHEN** a topic is accessed in a language without content
- **THEN** the user SHALL be redirected to the topic list or shown an error

### Requirement: Language Switcher Component
The system SHALL provide a language switcher component in the header.

#### Scenario: Current language display
- **WHEN** the switcher is rendered
- **THEN** the current language name and/or flag SHALL be displayed

#### Scenario: Language options
- **WHEN** the switcher is expanded
- **THEN** all supported languages SHALL be shown as options

#### Scenario: Preserve page context
- **WHEN** switching language on a topic page
- **THEN** the URL SHALL change to the same topic in the new language if available
- **OR** redirect to topic list if not available

### Requirement: Topic Card Component
The system SHALL provide a topic card component for displaying topic previews.

#### Scenario: Card content
- **WHEN** a topic card is rendered
- **THEN** it SHALL display:
  - Topic title in current language
  - Category label
  - Status indicator (active/closed)
  - Link to topic detail page

#### Scenario: Frontend design
- **WHEN** implementing topic card
- **THEN** the `modern-frontend-design` Skill MUST be used for design guidance
