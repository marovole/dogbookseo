# Prediction Market Topics Research

This skill provides expertise in researching, collecting, and formatting topics suitable for prediction markets. Use this skill when the user asks about "collecting prediction market topics", "gathering news for prediction markets", "creating prediction market questions", "researching regional news for betting markets", or "formatting topics in multiple languages for prediction platforms".

## Overview

Prediction markets are platforms where users bet on the outcomes of future events. Good prediction market topics must be:
- **Binary or clearly resolvable**: Questions must have definitive yes/no answers or measurable outcomes
- **Time-bounded**: Must have a clear resolution date AND expiration date
- **Fresh and timely**: Topics must be based on news from the last 24-48 hours
- **Verifiable**: Outcomes must be objectively verifiable from public sources
- **Engaging**: Topics should be interesting and attract user participation

## CRITICAL: Real-Time Search Requirement

**MUST use Exa MCP tools for all searches.** This ensures access to the freshest, most up-to-date news content.

### Required Exa MCP Tools

1. **`mcp__exa__web_search_exa`** - Primary search tool
   - Always set `livecrawl: "preferred"` for real-time results
   - Use `numResults: 10-15` for comprehensive coverage
   - Use `type: "auto"` or `type: "deep"` for thorough searches

2. **`mcp__exa__crawling_exa`** - For detailed content extraction
   - Use when you need full article content
   - Extract specific details for topic formulation

3. **`mcp__exa__deep_researcher_start`** - For complex research
   - Use for multi-faceted topics requiring deep analysis
   - Follow up with `mcp__exa__deep_researcher_check`

### Freshness Requirements

- **Only include news from the last 24-48 hours**
- **Reject stale or outdated information**
- **Set appropriate expiration dates based on topic type**

## Research Methodology

### Step 1: Identify Target Region and Categories

Define the geographic focus and topic categories to research:

**Common Categories:**
- Sports (cricket, football, tennis matches and tournaments)
- Movies/Entertainment (box office, awards, releases)
- Politics/Elections (election results, policy changes)
- Economy/Finance (stock indices, IPOs, company performance)
- Technology (product launches, company milestones)
- Space/Science (mission launches, discoveries)
- Social Events (controversies, cultural events)
- Weather/Climate (extreme weather, policy changes)

### Step 2: Use Exa MCP for Real-Time Search

**MANDATORY: Use Exa MCP tools for all searches to ensure freshness.**

Search for recent news using multiple queries per category:

```javascript
// Example Exa MCP search call
mcp__exa__web_search_exa({
  query: "India cricket match December 2025 results upcoming",
  numResults: 12,
  livecrawl: "preferred",  // CRITICAL: Always use preferred for real-time
  type: "auto"
})
```

**Example search queries for India:**
- `"India cricket match [current month] [year] results upcoming"`
- `"Bollywood box office collection [current month] [year]"`
- `"India elections [year] BJP Congress predictions"`
- `"Indian startup IPO funding [year] unicorn"`
- `"ISRO Gaganyaan mission [year] launch"`

**Required Exa MCP parameters:**
- `livecrawl: "preferred"` - ALWAYS use this for real-time results
- `numResults: 10-15` per query
- `type: "auto"` or `"deep"` for comprehensive results
- Run multiple parallel searches for efficiency

**Freshness validation:**
- Check `Published Date` in search results
- Only use articles from last 24-48 hours
- Discard any results older than 72 hours

### Step 3: Extract Prediction-Worthy Topics

For each news item, evaluate:

1. **Can it be a yes/no question?**
   - Bad: "How will India perform in cricket?"
   - Good: "Will India win the T20 series against Australia?"

2. **Is there a clear resolution date?**
   - Bad: "Will the movie be successful?"
   - Good: "Will the movie cross Rs 500 crore by January 31, 2026?"

3. **Is the outcome verifiable?**
   - Must have official sources (scorecards, box office trackers, election commissions)

### Step 4: Format Topics

Create structured topics with:

| Field | Description | Example |
|-------|-------------|---------|
| ID | Unique identifier | 1, 2, 3... |
| Category | Topic classification | Sports/Cricket, Movies/Box Office |
| Topic | The prediction question | Will India win...? |
| Resolution_Date | When outcome is known | 2026-01-31 |
| Expiration_Date | When topic becomes stale for betting | 2026-01-25 |
| Source | Verification source | ESPN Cricinfo, Box Office India |
| News_Date | Original news publication date | 2025-12-25 |

### Expiration Date Guidelines

The `Expiration_Date` indicates when a topic is no longer suitable for new bets (typically before the resolution date):

| Topic Type | Expiration Rule | Example |
|------------|-----------------|---------|
| Sports Match | When match/series ends | Match ends Jan 15 18:00 → Expires Jan 15 18:00 |
| Box Office Weekly | End of tracking week | Weekly target → Expires Sunday midnight |
| Election | When results announced | Election Jan 20 → Expires when counting completes |
| Stock/Index Target | Market close on deadline | Q1 target → Expires Mar 31 15:30 (market close) |
| Policy/Bill | Vote/announcement time | Vote on Jan 15 → Expires Jan 15 (vote time) |
| Award Shows | Award announcement time | Ceremony Jan 10 → Expires when winner announced |
| Mission Launch | Launch outcome confirmed | Launch Jan 5 → Expires when success/failure confirmed |

**Formula:** `Expiration_Date = Resolution_Date - Buffer_Time`
- Short-term events (< 1 week): 1-24 hours buffer
- Medium-term events (1-4 weeks): 1-3 days buffer
- Long-term events (> 1 month): 3-7 days buffer

### Step 5: Multi-Language Translation

Translate topics into required languages:

**English (Base):**
- Use clear, concise question format
- Start with "Will..." for yes/no questions

**Hindi (हिंदी):**
- Translate maintaining question structure
- Use "क्या..." for yes/no questions
- Keep proper nouns in original form or transliterate

**Chinese Simplified (中文简体):**
- Use "...能否..." or "...会..." for prediction questions
- Keep brand names/proper nouns in original or use common translations
- End with "？" (Chinese question mark)

## Output Formats

### CSV Format (Recommended for bulk)

```csv
ID,Category,Topic_English,Topic_Hindi,Topic_Chinese,Resolution_Date,Expiration_Date,News_Date,Source
1,Sports/Cricket,Will India win the T20 series?,क्या भारत टी20 सीरीज जीतेगा?,印度能否赢得T20系列赛？,2025-12-28,2025-12-27T18:00:00,2025-12-25,ESPN Cricinfo
2,Movies/Box Office,Will Dhurandhar cross Rs 800 crore?,क्या धुरंधर 800 करोड़ पार करेगी?,Dhurandhar能否突破800 crore？,2026-01-15,2026-01-12,2025-12-25,Box Office India
```

**CSV Fields:**
- `ID`: Sequential identifier
- `Category`: MainCategory/SubCategory format
- `Topic_English`: Question in English
- `Topic_Hindi`: Question in Hindi (हिंदी)
- `Topic_Chinese`: Question in Chinese (中文)
- `Resolution_Date`: When outcome will be known (YYYY-MM-DD)
- `Expiration_Date`: When betting closes (YYYY-MM-DDTHH:MM:SS or YYYY-MM-DD)
- `News_Date`: When the source news was published (YYYY-MM-DD)
- `Source`: Verification source name

### JSON Format (For API integration)

```json
{
  "region": "India",
  "generated_date": "2025-12-25T10:30:00Z",
  "topics": [
    {
      "id": 1,
      "category": "Sports/Cricket",
      "topic": {
        "en": "Will India win the T20 series?",
        "hi": "क्या भारत टी20 सीरीज जीतेगा?",
        "zh": "印度能否赢得T20系列赛？"
      },
      "resolution_date": "2025-12-28",
      "expiration_date": "2025-12-27T18:00:00",
      "news_date": "2025-12-25",
      "source": "ESPN Cricinfo",
      "freshness": "24h"
    }
  ]
}
```

## Category-Specific Guidelines

### Sports
- Focus on upcoming matches, series results, individual records
- Use official sports bodies as sources (ICC, BCCI, FIFA)
- Include player-specific predictions for engagement

### Movies/Entertainment
- Box office milestones (100cr, 500cr, 1000cr)
- Award predictions (Filmfare, Oscars nominations)
- Release date confirmations
- OTT viewership records

### Politics/Elections
- Election results by party/seat count
- Policy passage predictions
- Leadership changes
- International relations changes

### Economy/Finance
- Stock index milestones (Sensex, Nifty targets)
- IPO performance
- Company profitability
- Currency/commodity prices

### Technology
- Product launches
- Company valuations
- User/revenue milestones
- Regulatory decisions

### Space/Science
- Mission launch dates
- Mission success/failure
- Discovery announcements

## Quality Checklist

Before finalizing topics, verify:

- [ ] Each topic has a clear yes/no or measurable outcome
- [ ] Resolution date is realistic and specific
- [ ] Source for verification is identified
- [ ] Topics are translated accurately in all languages
- [ ] No duplicate or near-duplicate topics
- [ ] Topics cover diverse categories
- [ ] Time-sensitive topics are prioritized

## Example Workflow

1. User: "Collect prediction market topics for India"
2. Research: Search 5-8 categories with 2-3 queries each
3. Extract: Identify 30-50 newsworthy items
4. Format: Create prediction questions
5. Translate: Add Hindi and Chinese versions
6. Output: Save as CSV with all fields
7. Summary: Present categorized overview to user

## Best Practices

1. **Cast a wide net**: Search multiple categories even if user mentions one
2. **Prioritize recency**: Focus on last 24-48 hours for timely topics
3. **Balance categories**: Aim for diverse topic mix
4. **Verify translatability**: Ensure topics make sense in all target languages
5. **Include context**: Add source URLs for verification
6. **Update regularly**: Prediction markets need fresh content
