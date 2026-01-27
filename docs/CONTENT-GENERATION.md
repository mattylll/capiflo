# Content Generation System

Automated content generation for programmatic SEO location pages.

## Overview

This system generates high-quality, location-specific content for 270+ town pages across the UK, including:

- **Extended Overviews** (400-600 words)
- **FAQs** (8 location-customized questions)
- **Funding Scenarios** (4 business-type specific scenarios)
- **Case Studies** (1 anonymized success story)

## Quick Start

### Generate Content for Specific Regions

```bash
# Generate for one region
npm run generate-content -- --regions=south-east

# Generate for multiple regions
npm run generate-content -- --regions=south-east,east-of-england,east-midlands
```

### Generate for Specific Counties

```bash
# Single county
npm run generate-content -- --counties=kent

# Multiple counties
npm run generate-content -- --counties=kent,surrey,essex
```

### Preview Without Saving (Dry Run)

```bash
npm run generate-content -- --regions=south-east --dry-run
```

### Generate Only Missing Content

```bash
# Only generate for towns that lack complete content
npm run generate-content -- --missing-only
```

### Overwrite Existing Content

```bash
# Replace existing generated content
npm run generate-content -- --overwrite --regions=south-east
```

### Validate Existing Content

```bash
# Check content quality without generating
npm run generate-content -- --validate-only
```

## Architecture

### Directory Structure

```
src/lib/content-generation/
├── index.ts                    # Main orchestrator
├── templates.ts                # Content templates
├── utils.ts                    # Helper functions
├── validators.ts               # Quality checks
└── generators/
    ├── extended-overview.ts    # 400-600 word overviews
    ├── faqs.ts                 # Location FAQs
    ├── funding-scenarios.ts    # Business scenarios
    └── case-studies.ts         # Success stories
```

### Content Generation Flow

1. **Templates** - Define structure and patterns
2. **Generators** - Create location-specific content
3. **Validators** - Quality assurance checks
4. **CLI** - Batch processing and output

## Templates

### Extended Overview Template

Generates 5-6 paragraphs covering:

1. **Introduction** - Town characteristics and positioning
2. **Business Landscape** - Sector diversity and demographics
3. **Sector Analysis** - Industry-specific funding needs
4. **Funding Patterns** - Popular products and local trends
5. **Operating Context** - Costs, rates, local factors
6. **Conclusion** - Regional advantages and opportunities

### FAQ Templates

8 standard questions with location customization:

- What business loans are available in [Town]?
- How quickly can [Town] businesses get funding?
- Eligibility requirements
- Security requirements
- Startup funding availability
- Required documentation
- Rate comparisons
- Service costs

### Funding Scenario Templates

Mapped to business types:

- **Retail & E-commerce** - Stock finance
- **Hospitality** - Equipment and refurbishment
- **Professional Services** - Growth capital
- **Manufacturing** - Equipment finance
- **Construction** - Project finance
- **Technology** - Development funding
- **Healthcare** - Equipment and expansion

### Case Study Templates

Anonymous success stories per sector showing:

- Challenge faced
- Solution implemented
- Funding type and amount
- Results achieved
- Timeframe

## Validation

### Quality Checks

**Extended Overview:**
- Word count: 400-700 words
- Town mentions: 5-8 times
- Keyword density: 1-2%
- No duplicate phrases
- Minimum 4 paragraphs

**FAQs:**
- Minimum 8 questions
- Questions 20+ characters
- Answers 100+ characters
- Location mentions in answers

**Funding Scenarios:**
- Minimum 4 scenarios
- Title includes town name
- Description 50+ characters
- Valid amount format
- Minimum 2 common uses

**Case Studies:**
- All required fields present
- Descriptions 50+ characters
- Location mentions town

## Customization

### Adding Generation Context

For better content quality, add generation context to town data:

```typescript
{
  slug: 'maidstone',
  name: 'Maidstone',
  // ... other fields
  generationContext: {
    keyFeatures: ['county town', 'retail hub'],
    uniqueCharacteristic: 'historic market town with modern business district',
    proximityAdvantages: ['M20 corridor access', 'London commuter belt'],
    costContext: 'moderate',
    demographicProfile: 'mixed business community',
    economicTrend: 'growing',
    landmarkReferences: ['County Hall', 'Maidstone town centre']
  }
}
```

### Customizing Templates

Edit `/src/lib/content-generation/templates.ts`:

```typescript
export const extendedOverviewTemplates = {
  intro: (town: Town, county: County): string => {
    // Your custom introduction logic
  },
  // ... other sections
};
```

## Usage Examples

### Generate for Remaining 270 Locations

```bash
# Generate all missing content (recommended approach)
npm run generate-content -- --missing-only --dry-run

# Review the output, then run for real
npm run generate-content -- --missing-only
```

### Generate by Priority

```bash
# Phase 1: High-value regions
npm run generate-content -- --regions=south-east --missing-only

# Phase 2: Mid-tier regions
npm run generate-content -- --regions=east-of-england,east-midlands --missing-only

# Phase 3: Remaining regions
npm run generate-content -- --missing-only
```

### Testing Content Quality

```bash
# Generate for one town (dry run)
npm run generate-content -- --counties=kent --dry-run

# Validate all content
npm run generate-content -- --validate-only

# Generate with quality check
npm run generate-content -- --regions=south-east --missing-only
# Review validation output for errors/warnings
```

## Output Format

The CLI provides detailed statistics:

```
📊 Generation Results:

Total towns processed: 49

Content Generated:
  Extended Overviews: 49
  FAQs: 49
  Funding Scenarios: 49
  Case Studies: 49

✅ Validation Results:
  Valid: 47
  Invalid: 2
  Total Errors: 3
  Total Warnings: 8
```

## Integration with Data Files

After generation, you need to update town data files:

```typescript
// src/data/locations/towns/south-east.ts
export const southEastTowns: Town[] = [
  {
    slug: 'maidstone',
    name: 'Maidstone',
    // ... existing fields
    extendedOverview: '...generated content...',
    faqs: [...generated FAQs...],
    fundingScenarios: [...generated scenarios...],
    caseStudy: {...generated case study...},
    _generated: {
      extendedOverview: true,
      faqs: true,
      fundingScenarios: true,
      caseStudy: true,
      generatedAt: '2025-01-26T...'
    }
  },
  // ... more towns
];
```

## Best Practices

### Before Generating

1. **Add Generation Context** - Better input = better output
2. **Test on Small Sample** - Try 5-10 towns first
3. **Review Templates** - Ensure they match your brand voice
4. **Run Dry Run** - Preview before committing

### During Generation

1. **Process in Batches** - Region by region
2. **Monitor Validation** - Check for errors/warnings
3. **Review Samples** - Spot-check quality
4. **Save Incrementally** - Don't lose work

### After Generation

1. **Manual Review** - Check 10% random sample
2. **Refine Templates** - Improve based on output
3. **Test Pages** - Verify rendering
4. **SEO Validation** - Google Rich Results Test

## Troubleshooting

### Content Too Short

Add more context to town data:
- `businessDemographics`
- `economicContext`
- `localEconomy`
- `generationContext`

### Repetitive Content

- Customize templates for variety
- Add more diverse business types
- Include unique local context

### Validation Errors

Check the validation output for specific issues:
```bash
npm run generate-content -- --validate-only
```

## Next Steps

1. **Generate Content** - Start with highest-value regions
2. **Review & Refine** - Check quality, adjust templates
3. **Save to Files** - Update town data files
4. **Deploy & Test** - Build and verify pages
5. **Monitor Performance** - Track SEO metrics

## Related Documentation

- [Implementation Plan](../.claude/plans/fluffy-imagining-deer.md)
- [Schema Generators](/src/lib/schema-generators.ts)
- [Location Types](/src/data/locations/index.ts)
