## ADDED Requirements

### Requirement: Topic Schema Definition
The system SHALL define a structured schema for topic content using Zod validation.

#### Scenario: Schema fields
- **WHEN** a topic is defined
- **THEN** it SHALL include the following required fields:
  - `slug`: unique URL identifier (string)
  - `region`: one of `global`, `india`, `taiwan_hk`, `latam`
  - `category`: one of `politics`, `economy`, `tech`, `entertainment`, `sports`
  - `locale`: record of language-specific content
  - `options`: tuple of two prediction options
  - `keywords`: array of SEO keywords
  - `status`: `active` or `closed`
  - `publishedAt`: publication date
  - `expirationDate`: expiration timestamp
  - `source`: content source reference

#### Scenario: Locale content structure
- **WHEN** locale content is defined for a language
- **THEN** it SHALL include:
  - `title`: localized topic title
  - `question`: prediction question in that language
  - `description`: SEO description

#### Scenario: Schema validation
- **WHEN** content fails schema validation
- **THEN** the build SHALL fail with descriptive error messages

### Requirement: Content Directory Structure
The system SHALL organize topic content by region and category.

#### Scenario: Regional directories
- **WHEN** topics are stored
- **THEN** they SHALL be organized under `src/content/topics/[region]/[category]/`

#### Scenario: Supported regions
- **WHEN** content is organized
- **THEN** the following region directories SHALL exist:
  - `global/` for North America/Global content (en)
  - `india/` for India content (hi)
  - `taiwan_hk/` for Taiwan/Hong Kong content (zh-TW)
  - `latam/` for Latin America content (pt, es)

### Requirement: Content Collection Query
The system SHALL provide typed queries for fetching topic content.

#### Scenario: Fetch all topics
- **WHEN** querying all topics
- **THEN** a typed array of topic entries SHALL be returned

#### Scenario: Filter by region
- **WHEN** filtering topics by region
- **THEN** only topics matching that region SHALL be returned

#### Scenario: Filter by category
- **WHEN** filtering topics by category
- **THEN** only topics matching that category SHALL be returned
