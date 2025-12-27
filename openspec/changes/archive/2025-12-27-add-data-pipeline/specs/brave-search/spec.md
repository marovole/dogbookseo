## ADDED Requirements

### Requirement: Brave Search API Client
The system SHALL provide a client for the Brave Search API to fetch news and trending topics.

#### Scenario: Search execution
- **WHEN** a search query is submitted
- **THEN** the client SHALL call the Brave Search API with the query
- **AND** return structured search results including title, URL, and description

#### Scenario: Rate limiting
- **WHEN** multiple searches are executed
- **THEN** the client SHALL respect API rate limits with appropriate delays

#### Scenario: Error handling
- **WHEN** an API error occurs
- **THEN** the client SHALL retry up to 3 times with exponential backoff
- **AND** throw a descriptive error if all retries fail

#### Scenario: API key configuration
- **WHEN** the client is initialized
- **THEN** it SHALL read the API key from `BRAVE_API_KEY` environment variable

### Requirement: Search Result Structure
The system SHALL return search results in a consistent structure.

#### Scenario: Result fields
- **WHEN** search results are returned
- **THEN** each result SHALL include:
  - `title`: article title
  - `url`: article URL
  - `description`: article summary
  - `publishedDate`: publication date if available

### Requirement: Usage Tracking
The system SHALL track API usage to monitor free tier limits.

#### Scenario: Usage counter
- **WHEN** a search is executed
- **THEN** the usage counter SHALL be incremented

#### Scenario: Usage warning
- **WHEN** usage exceeds 80% of monthly limit (1600/2000)
- **THEN** a warning SHALL be logged
