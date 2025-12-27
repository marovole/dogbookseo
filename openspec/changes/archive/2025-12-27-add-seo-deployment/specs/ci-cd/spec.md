## ADDED Requirements

### Requirement: Daily Automated Pipeline
The system SHALL run an automated pipeline daily to generate new topic content.

#### Scenario: Scheduled execution
- **WHEN** the clock reaches 00:00 UTC
- **THEN** the GitHub Actions workflow SHALL trigger automatically

#### Scenario: Manual trigger
- **WHEN** a manual workflow dispatch is requested
- **THEN** the pipeline SHALL run on demand

#### Scenario: Pipeline steps
- **WHEN** the workflow runs
- **THEN** it SHALL execute in order:
  1. Checkout repository
  2. Setup Node.js 20
  3. Install dependencies (`npm ci`)
  4. Run pipeline (`npm run pipeline`)
  5. Build site (`npm run build`)
  6. Commit and push changes

### Requirement: Environment Secrets
The system SHALL securely manage API credentials.

#### Scenario: Required secrets
- **WHEN** the workflow runs
- **THEN** these secrets SHALL be available:
  - `BRAVE_API_KEY`
  - `CHUTES_API_KEY`

#### Scenario: Secret access
- **WHEN** scripts need API credentials
- **THEN** they SHALL access them via environment variables

### Requirement: Git Commit Automation
The system SHALL automatically commit generated content.

#### Scenario: Commit message format
- **WHEN** new content is generated
- **THEN** the commit message SHALL be: `chore: daily topics YYYY-MM-DD`

#### Scenario: No empty commits
- **WHEN** no content changes are detected
- **THEN** no commit SHALL be created

#### Scenario: Git configuration
- **WHEN** the workflow commits changes
- **THEN** it SHALL use:
  - Email: `action@github.com`
  - Name: `GitHub Action`

### Requirement: Cloudflare Pages Deployment
The system SHALL deploy to Cloudflare Pages on every push.

#### Scenario: Build configuration
- **WHEN** Cloudflare Pages builds the site
- **THEN** it SHALL use:
  - Build command: `npm run build`
  - Output directory: `dist`

#### Scenario: Auto deployment
- **WHEN** changes are pushed to the main branch
- **THEN** Cloudflare Pages SHALL automatically deploy

#### Scenario: Custom domain
- **WHEN** the site is deployed
- **THEN** it SHALL be accessible at `dogbooks.org`

### Requirement: Workflow Reliability
The system SHALL handle workflow failures gracefully.

#### Scenario: Partial failure
- **WHEN** a region fails to collect topics
- **THEN** the pipeline SHALL continue with other regions
- **AND** report the failure in logs

#### Scenario: Workflow status
- **WHEN** the workflow completes
- **THEN** a success or failure status SHALL be reported

### Requirement: Repository Activity
The repository SHALL remain active to prevent cron disabling.

#### Scenario: Cron reliability
- **WHEN** the repository has scheduled workflows
- **THEN** commits SHALL occur at least monthly to prevent GitHub from disabling cron
