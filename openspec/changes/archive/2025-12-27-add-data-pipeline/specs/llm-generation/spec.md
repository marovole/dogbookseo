## ADDED Requirements

### Requirement: Chutes LLM API Client
The system SHALL provide a client for the Chutes LLM API to generate prediction topics.

#### Scenario: API initialization
- **WHEN** the client is initialized
- **THEN** it SHALL read credentials from environment variables:
  - `CHUTES_API_KEY` for authentication
  - `CHUTES_MODEL` for model selection (default: `deepseek-ai/DeepSeek-V3-0324`)

#### Scenario: Chat completion
- **WHEN** a prompt is submitted
- **THEN** the client SHALL return the LLM-generated response

#### Scenario: Error handling
- **WHEN** an API error occurs
- **THEN** the client SHALL retry up to 3 times
- **AND** throw a descriptive error if all retries fail

### Requirement: Topic Generation Prompt
The system SHALL use a structured prompt to generate prediction topics from news.

#### Scenario: Input format
- **WHEN** generating topics
- **THEN** the prompt SHALL include:
  - News headline and summary
  - Target language for output
  - Category classification

#### Scenario: Output format
- **WHEN** the LLM generates a topic
- **THEN** the response SHALL be valid JSON with fields:
  - `slug`: URL-safe identifier
  - `title`: localized topic title
  - `question`: prediction question
  - `description`: SEO description
  - `options`: array of two prediction options
  - `keywords`: array of SEO keywords
  - `expirationDate`: ISO 8601 timestamp

#### Scenario: Multi-language output
- **WHEN** generating for `latam` region
- **THEN** the output SHALL include translations for both `pt` and `es`

### Requirement: Output Validation
The system SHALL validate LLM output against expected schema.

#### Scenario: Valid output
- **WHEN** LLM output matches expected schema
- **THEN** the topic SHALL be accepted for processing

#### Scenario: Invalid output
- **WHEN** LLM output fails validation
- **THEN** the system SHALL log the error and skip that topic
