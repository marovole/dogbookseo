## ADDED Requirements

### Requirement: Region Configuration
The system SHALL maintain configuration for each content region.

#### Scenario: Region definition
- **WHEN** regions are configured
- **THEN** each region SHALL specify:
  - `languages`: array of output languages
  - `searchLang`: language for search queries
  - `categories`: array of category configurations with search queries

#### Scenario: Supported regions
- **WHEN** the pipeline runs
- **THEN** it SHALL process these regions:
  - `global` (en) - North America/Global
  - `india` (hi) - India
  - `taiwan_hk` (zh-TW) - Taiwan/Hong Kong
  - `latam` (pt, es) - Latin America

### Requirement: Collection Script
The system SHALL collect topics from news sources for each region.

#### Scenario: Daily collection
- **WHEN** the collection script runs
- **THEN** it SHALL:
  - Iterate through each configured region
  - Execute search queries for each category
  - Process results with LLM
  - Output raw data to CSV files

#### Scenario: CSV output format
- **WHEN** raw data is saved
- **THEN** CSV files SHALL be saved as `data/raw/[region]_[date].csv`

#### Scenario: Topics per region
- **WHEN** collection completes
- **THEN** approximately 5 topics SHALL be generated per region

### Requirement: Generation Script
The system SHALL transform raw CSV data into Content Collection files.

#### Scenario: MDX generation
- **WHEN** the generation script runs
- **THEN** it SHALL:
  - Read CSV files from `data/raw/`
  - Transform to Content Collection format
  - Write files to `src/content/topics/[region]/[category]/`

#### Scenario: File naming
- **WHEN** content files are created
- **THEN** they SHALL be named `[slug].json` or `[slug].mdx`

### Requirement: Deduplication
The system SHALL prevent duplicate topics from being generated.

#### Scenario: Processed record storage
- **WHEN** a topic is generated
- **THEN** its slug SHALL be recorded in `data/processed.json`

#### Scenario: Duplicate check
- **WHEN** generating a new topic
- **THEN** the system SHALL check if the slug exists in `processed.json`
- **AND** skip generation if it already exists

#### Scenario: Processed.json structure
- **WHEN** the processed record is read
- **THEN** it SHALL contain:
  - `slugs`: array of all generated slugs
  - `lastUpdated`: ISO 8601 timestamp of last update

### Requirement: Pipeline Orchestration
The system SHALL provide a main pipeline script that orchestrates the full workflow.

#### Scenario: Pipeline execution
- **WHEN** `npm run pipeline` is executed
- **THEN** it SHALL run: collect → generate in sequence

#### Scenario: Progress logging
- **WHEN** the pipeline runs
- **THEN** it SHALL log progress for each step and region

#### Scenario: Error handling
- **WHEN** a region fails to process
- **THEN** the pipeline SHALL continue with other regions
- **AND** report the failure at completion

#### Scenario: Summary output
- **WHEN** the pipeline completes
- **THEN** it SHALL output a summary including:
  - Number of topics collected per region
  - Number of topics generated
  - Number of duplicates skipped

### Requirement: NPM Scripts
The system SHALL provide NPM scripts for running pipeline components.

#### Scenario: Available scripts
- **WHEN** checking package.json
- **THEN** these scripts SHALL be available:
  - `collect`: Run collection only
  - `generate`: Run generation only
  - `pipeline`: Run full pipeline
