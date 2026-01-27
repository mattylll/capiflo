# AI SEO Writer Skill for Local Search Optimization

## Overview

This skill enables Claude to create highly optimized, long-form content for local search results. It incorporates semantic SEO principles, structured data markup, and comprehensive content requirements designed to maximize search visibility and user engagement.

---

## Pre-Writing Research Phase

Before writing ANY content, Claude MUST:

1. **Identify the Target Keyword**: Extract or confirm `[YOUR PRODUCT NAME HERE]` and the `[TARGET LOCATION]`
2. **Understand Search Intent**: Determine if the intent is informational, transactional, or navigational
3. **Gather LSI Keywords**: Generate a list of Latent Semantic Indexing (LSI) and NLP-related terms
4. **Review "People Also Ask" Questions**: If web search is available, research actual PAA questions for the topic
5. **Identify Local Competitors**: Understand what's ranking locally for similar terms

---

## Content Structure Requirements

### Document Hierarchy

Every piece of content MUST follow this hierarchical structure:

```
H1: [Single, Primary Keyword-Rich Title] - ONE PER PAGE ONLY
│
├── H2: Major Section Headings (5-10 per article)
│   ├── H3: Subsection Headings (2-4 per H2)
│   │   └── H4: Detail Headings (optional, for complex topics)
│   └── H3: Subsection Headings
│
├── H2: Major Section Headings
│   └── H3: Subsection Headings
│
└── [Continue pattern...]
```

### Heading Rules

- **H1**: Use ONCE per page. Include primary keyword and location (for local SEO). Maximum 60 characters.
- **H2**: Use for major content sections. Include keyword variations and LSI terms.
- **H3**: Use for subsections within H2 blocks. Maintain high keyword density with natural variations.
- **ALL headings below H1 must be H2 or H3** - Do not use H1 multiple times.

---

## Mandatory Content Sections

Claude MUST include ALL of the following sections. Each paragraph section requires a MINIMUM of 200 words. No exceptions.

### 1. Introduction Section (150-250 words)

Write a compelling introduction that:
- Introduces `[YOUR PRODUCT NAME HERE]` within the first 100 words
- Includes the target location for local SEO
- Establishes the page topic and user benefit
- Contains a semantic triple (Subject → Predicate → Object)
- Example semantic triple: "[Product Name] provides [service/benefit] to [location/audience]"

### 2. Materials, Durability & Workmanship (MINIMUM 200 words)

Write detailed information covering:
- Specific materials used in the product/service
- Durability specifications and testing standards
- Workmanship practices and quality control measures
- Industry certifications or standards met
- Longevity expectations and maintenance requirements

### 3. Ease of Use (MINIMUM 200 words)

Discuss:
- User-friendliness and accessibility
- Installation or setup process
- Learning curve and training requirements
- Accessibility features
- Customer support during onboarding
- Common user scenarios and workflows

### 4. Comparison with Similar Products (MINIMUM 200 words)

Provide:
- Honest comparison with 2-3 competing products/services
- Feature-by-feature analysis
- Price-point comparisons
- Unique differentiators of `[YOUR PRODUCT NAME HERE]`
- Why customers choose this option over alternatives

### 5. Quality Assessment (MINIMUM 200 words)

Detail:
- Quality standards and benchmarks
- Third-party certifications or testing
- Quality control processes
- Customer satisfaction metrics
- Industry recognition or awards
- Quality guarantees offered

### 6. Features and Specifications (MINIMUM 200 words)

Include:
- Complete technical specifications
- Key features with benefits explained
- Customization options available
- Integration capabilities
- Performance metrics
- Version or model variations

### 7. Cost and Value - Price Range (MINIMUM 200 words)

Cover:
- Transparent pricing structure
- Price ranges for different options/tiers
- Financing options available
- Payment plans or subscription models
- Price comparison with market alternatives
- Hidden costs or additional fees (or lack thereof)

### 8. Return on Investment (MINIMUM 200 words)

Explain:
- Expected ROI timeline
- Cost savings over time
- Productivity improvements
- Case studies with specific numbers where possible
- Long-term value proposition
- Payback period calculations

### 9. Warranty and Customer Support (MINIMUM 200 words)

Detail:
- Warranty terms and duration
- What the warranty covers and excludes
- Customer support channels (phone, email, chat)
- Support hours and response times
- Guarantee policies
- Return or refund procedures

### 10. Design (MINIMUM 200 words)

Describe:
- Aesthetic considerations
- Ergonomic features
- Space requirements
- Color and style options
- Design philosophy
- How design enhances functionality

### 11. Technology (MINIMUM 200 words)

Explain:
- Core technology used
- Innovation and patents
- Technical advantages
- Future-proofing considerations
- Integration with other technologies
- Updates and improvement roadmap

### 12. User Reviews Summary (MINIMUM 200 words)

Include:
- Summary of positive customer feedback
- Common praise points from verified users
- Specific testimonial quotes (if available)
- Star ratings or satisfaction scores
- How the company responds to feedback
- Social proof elements

### 13. Service Offerings Section

Be extremely specific about:
- Exact services provided for `[YOUR PRODUCT NAME HERE]`
- Service area (specific towns, cities, regions)
- Service variations and packages
- Turnaround times
- Customization availability

### 14. Pricing and Financing Section

Include:
- Clear pricing information (or "request quote" guidance)
- Financing options available
- Payment methods accepted
- Bulk or volume discounts
- Seasonal promotions (if applicable)

### 15. Customer Service & Warranty Assurance

Emphasize:
- Commitment to customer satisfaction
- Warranty and guarantee details
- Post-purchase support
- Problem resolution process

### 16. Advantages Section (Bullet Points)

Create a bulleted list of advantages:
```markdown
## Advantages of [YOUR PRODUCT NAME HERE]

- **[Advantage 1]**: Brief explanation
- **[Advantage 2]**: Brief explanation
- **[Advantage 3]**: Brief explanation
[Continue for 8-12 advantages minimum]
```

### 17. FAQ Section (Based on "People Also Ask")

Structure as:
```markdown
## Frequently Asked Questions About [YOUR PRODUCT NAME HERE]

### [Question 1 from PAA]?
[Answer in 50-150 words with semantic completeness]

### [Question 2 from PAA]?
[Answer in 50-150 words with semantic completeness]

[Include 8-12 questions minimum]
```

---

## Semantic Triple Syntax Requirements

Incorporate semantic triples throughout the content to enhance search engine understanding:

### What is a Semantic Triple?

A semantic triple consists of: **Subject → Predicate → Object**

### Examples to Include:

1. **Entity Definition**: "[Product Name] is a [category] that [primary function]"
2. **Location Relevance**: "[Business Name] serves [Location] with [service]"
3. **Attribute Statement**: "[Product Name] features [specific attribute]"
4. **Relationship Statement**: "[Product Name] helps [audience] achieve [outcome]"

### Implementation:

Include at least ONE semantic triple in:
- The introduction
- Each H2 section opening paragraph
- The conclusion
- Alt text for images

---

## Local SEO Requirements

### NAP Consistency

Include Name, Address, Phone in a consistent format:
```
[Business Name]
[Street Address]
[City], [State/Province] [Postal Code]
[Phone Number]
```

### Local Keywords to Incorporate:

- "[Product/Service] in [City]"
- "[City] [Product/Service] provider"
- "Best [Product/Service] near [Location]"
- "[Product/Service] [Neighborhood/District]"
- "Local [Product/Service] in [Region]"

### Geographic Modifiers:

Include mentions of:
- City and town names
- Neighborhoods and districts
- Nearby landmarks
- Service area boundaries
- Regional identifiers

### Local Business Information:

- Operating hours
- Service areas covered
- Local phone number (area code matching location)
- Directions or proximity to known landmarks
- Local payment methods accepted

---

## Image Optimization Requirements

### Alt Text Format:

Every image MUST have optimized alt text following this structure:

```html
<img src="[image-file]" alt="[Keyword-rich description] | [Business Name] [Location]">
```

### Alt Text Rules:

1. **Be Descriptive**: Describe what's IN the image
2. **Include Keywords**: Natural keyword placement
3. **Add Location**: Include city/region for local SEO
4. **Keep Concise**: 125 characters maximum
5. **Avoid Keyword Stuffing**: Natural language only

### Example Alt Texts:

```
alt="Professional roof installation using premium materials | ABC Roofing Manchester"
alt="Customer reviewing product warranty documentation | XYZ Company Birmingham"
alt="Before and after comparison of kitchen renovation | Home Improvements Leeds"
```

### Image Placement Guidelines:

- Include at least 1 image per 500 words of content
- Place images near relevant content
- Use descriptive file names: `product-name-city-service.jpg`
- Include image captions where appropriate

---

## Schema Markup Requirements

### Required Schema Types:

Include appropriate schema markup in JSON-LD format:

#### 1. LocalBusiness Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "description": "[Brief description with keywords]",
  "url": "[Website URL]",
  "telephone": "[Phone Number]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State/County]",
    "postalCode": "[Postal Code]",
    "addressCountry": "[Country Code]"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[Latitude]",
    "longitude": "[Longitude]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "[Price Range e.g., ££]",
  "areaServed": "[Service Areas]"
}
```

#### 2. Product Schema (if applicable):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Name]",
  "description": "[Product Description]",
  "brand": {
    "@type": "Brand",
    "name": "[Brand Name]"
  },
  "offers": {
    "@type": "Offer",
    "price": "[Price]",
    "priceCurrency": "[Currency Code]",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "[Date]"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[Rating]",
    "reviewCount": "[Number of Reviews]"
  }
}
```

#### 3. FAQ Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question Text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer Text]"
      }
    }
  ]
}
```

#### 4. Service Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "provider": {
    "@type": "LocalBusiness",
    "name": "[Business Name]"
  },
  "areaServed": {
    "@type": "City",
    "name": "[City Name]"
  },
  "description": "[Service Description]",
  "serviceType": "[Service Category]"
}
```

---

## Keyword Optimization Guidelines

### Keyword Density Targets:

| Keyword Type | Target Density | Placement Priority |
|--------------|---------------|-------------------|
| Primary Keyword | 1-2% | H1, First paragraph, H2s, Conclusion |
| Secondary Keywords | 0.5-1% | H3s, Body paragraphs |
| LSI Keywords | Natural occurrence | Throughout body content |
| Location Keywords | 0.5-1% | NAP, Service areas, Local sections |

### Keyword Variation Requirements:

For every 500 words, include:
- 2-3 exact match keyword uses
- 3-4 partial match variations
- 2-3 semantic variations
- 1-2 location-modified keywords

### LSI and NLP Word Integration:

Generate and incorporate:
- **Synonyms**: Alternative terms for the main keyword
- **Related Concepts**: Associated topics and ideas
- **Industry Terminology**: Technical terms and jargon
- **Action Words**: Verbs associated with the product/service
- **Descriptive Modifiers**: Adjectives commonly paired with the keyword

### Example LSI Word Cloud for "Roofing Services":

```
Primary: roofing services
LSI Terms: roof repair, shingle replacement, roof installation,
roofing contractor, roof inspection, guttering, flashing,
underlayment, ventilation, waterproofing, roof maintenance,
storm damage, leak repair, roof replacement, residential roofing,
commercial roofing, flat roof, pitched roof, tiles, slate
```

---

## Readability Requirements

### Writing Style:

- **Flesch Reading Ease**: Target 60-70 (easily understood)
- **Sentence Length**: Average 15-20 words
- **Paragraph Length**: 3-5 sentences maximum
- **Active Voice**: Use 80%+ active voice
- **Transition Words**: Include in 30%+ of sentences

### Engagement Techniques:

1. **Use Questions**: Engage readers with rhetorical questions
2. **Include Statistics**: Add credibility with data
3. **Tell Stories**: Use brief anecdotes or case studies
4. **Direct Address**: Use "you" and "your" to connect with readers
5. **Break Up Text**: Use subheadings every 200-300 words

### Avoid:

- Keyword stuffing
- Duplicate content
- Thin paragraphs (under 100 words when 200 required)
- Walls of text without formatting
- Excessive jargon without explanation
- Passive voice overuse

---

## Quality Assurance Checklist

Before finalizing content, verify:

### Content Completeness:
- [ ] All 17 mandatory sections included
- [ ] Each required section meets 200-word minimum
- [ ] Introduction mentions product name within first 100 words
- [ ] FAQ section includes 8-12 questions minimum
- [ ] Advantages list includes 8-12 bullet points minimum

### SEO Elements:
- [ ] Single H1 tag with primary keyword
- [ ] All section headings are H2 or H3
- [ ] Keyword density within 1-2% range
- [ ] LSI keywords naturally incorporated
- [ ] Location keywords present throughout

### Local SEO:
- [ ] NAP information included
- [ ] Service area clearly defined
- [ ] Local landmarks or references included
- [ ] Geographic modifiers in headings and body

### Technical:
- [ ] Schema markup provided for all relevant types
- [ ] Alt text templates provided for all images
- [ ] Internal linking opportunities identified
- [ ] Meta title and description drafted

### Readability:
- [ ] Content reads naturally (not keyword-stuffed)
- [ ] Paragraphs are digestible length
- [ ] Technical terms are explained
- [ ] Active voice predominates

---

## Output Format

When generating SEO content, Claude MUST output in this order:

1. **Meta Information Block**
   - Suggested Meta Title (55-60 characters)
   - Suggested Meta Description (150-160 characters)
   - Primary Keyword
   - Secondary Keywords
   - Target Location

2. **Schema Markup Block**
   - All relevant JSON-LD schema code

3. **Main Content**
   - H1 heading
   - All content sections in proper hierarchy
   - Inline image placement suggestions with alt text

4. **Image Specifications**
   - List of recommended images
   - Alt text for each image
   - Suggested file names

5. **Word Count Verification**
   - Total word count
   - Section-by-section word count verification
   - Confirmation all minimums are met

---

## Example Content Outline

```markdown
# [Primary Keyword] in [Location] | [Business Name]

## Introduction to [Product Name]
[150-250 words introducing product, location, and semantic triple]

## Why Choose [Product Name] in [Location]
### Quality Materials and Workmanship
[200+ words on materials and durability]

### Features and Specifications
[200+ words on features]

## Understanding the Value of [Product Name]
### Cost and Price Range
[200+ words on pricing]

### Return on Investment
[200+ words on ROI]

### Financing Options Available
[Details on payment plans]

## [Product Name] Performance
### Ease of Use
[200+ words]

### Technology and Innovation
[200+ words]

### Design Excellence
[200+ words]

## How [Product Name] Compares
### Comparison with Similar Products
[200+ words]

### Quality Standards
[200+ words]

## Customer Experience
### Warranty and Support
[200+ words]

### What Our Customers Say
[200+ words on reviews]

## [Product Name] Service Offerings in [Location]
[Specific services with local focus]

## Advantages of [Product Name]
[Bullet point list]

## Frequently Asked Questions
[8-12 Q&As with schema]

## Contact Us for [Product Name] in [Location]
[NAP and call to action]
```

---

## Usage Instructions

To use this skill, provide Claude with:

1. **Product/Service Name**: The exact `[YOUR PRODUCT NAME HERE]` to use
2. **Business Name**: Company or brand name
3. **Target Location**: City, region, or service area
4. **Primary Keyword**: Main keyword to target
5. **Secondary Keywords**: Additional keywords to incorporate
6. **Any Specific Information**: Pricing, features, specifications, etc.

Claude will then generate comprehensive, SEO-optimized content following all guidelines in this skill document.

---

## Important Notes

- **Never sacrifice readability for keyword density**
- **Always verify word counts meet minimums**
- **Customize schema markup with actual business data**
- **Update PAA questions based on actual search research when possible**
- **Local SEO elements are mandatory, not optional**
- **All content must be original and provide genuine value**

---

*This skill follows Google's E-E-A-T guidelines (Experience, Expertise, Authoritativeness, Trustworthiness) and current SEO best practices as of 2024-2025.*
