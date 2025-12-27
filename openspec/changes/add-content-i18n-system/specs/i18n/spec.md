## ADDED Requirements

### Requirement: Supported Languages
The system SHALL support 5 languages with their respective locales.

#### Scenario: Language configuration
- **WHEN** the i18n system is configured
- **THEN** the following languages SHALL be supported:
  - `en` (English) - default
  - `zh-TW` (繁體中文)
  - `hi` (हिन्दी)
  - `pt` (Português)
  - `es` (Español)

### Requirement: UI Translations
The system SHALL provide UI translations for all supported languages.

#### Scenario: Translation keys
- **WHEN** UI elements are rendered
- **THEN** translations SHALL be available for:
  - Navigation labels
  - Button text (e.g., "Launch App", "View Topic")
  - Common labels (e.g., "Topics", "Categories")
  - Status indicators (e.g., "Active", "Closed")
  - Prediction options (e.g., "Yes", "No")

#### Scenario: Translation function
- **WHEN** a translation is requested with `t(key, lang)`
- **THEN** the translated string for that language SHALL be returned
- **AND** if no translation exists, the English fallback SHALL be used

### Requirement: Language Helper Functions
The system SHALL provide helper functions for i18n operations.

#### Scenario: Get current language
- **WHEN** processing a request with lang parameter
- **THEN** a helper function SHALL return the current language code

#### Scenario: Get language name
- **WHEN** displaying language in switcher
- **THEN** the native language name SHALL be available (e.g., "繁體中文" for zh-TW)

#### Scenario: Validate language code
- **WHEN** a language code is provided
- **THEN** a helper function SHALL validate if it's a supported locale

### Requirement: Region-Language Mapping
The system SHALL define which languages are available for each region.

#### Scenario: Region language mapping
- **WHEN** determining available languages for a topic
- **THEN** the mapping SHALL be:
  - `global` → `en`
  - `india` → `hi`
  - `taiwan_hk` → `zh-TW`
  - `latam` → `pt`, `es`
