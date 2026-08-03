import Script from 'next/script';
import { generateOrganizationSchema } from '@/lib/schema-generators';
import { authorSchemaNode } from '@/data/authors';
import { businessConfig, hasRealAddress, hasRealPhone } from '@/data/business-config';

// Organization Schema - for site-wide use
// Now uses centralized schema generator from @/lib/schema-generators
export function OrganizationJsonLd() {
    const schema = generateOrganizationSchema();

    return (
        <Script
            id='organization-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// LocalBusiness Schema - for local SEO.
// Only emitted once the real NAP is in business-config: shipping a placeholder
// address/phone as structured data on every page is worse than emitting none.
export function LocalBusinessJsonLd() {
    if (!hasRealAddress()) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: businessConfig.name,
        image: businessConfig.logo,
        '@id': businessConfig.website,
        url: businessConfig.website,
        ...(hasRealPhone() ? { telephone: businessConfig.telephone } : {}),
        email: businessConfig.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: businessConfig.address.streetAddress,
            addressLocality: businessConfig.address.addressLocality,
            addressRegion: businessConfig.address.addressRegion,
            postalCode: businessConfig.address.postalCode,
            addressCountry: businessConfig.address.addressCountry
        },
        ...(businessConfig.geo
            ? {
                  geo: {
                      '@type': 'GeoCoordinates',
                      latitude: businessConfig.geo.latitude,
                      longitude: businessConfig.geo.longitude
                  }
              }
            : {}),
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:30'
        },
        priceRange: businessConfig.priceRange
    };

    return (
        <Script
            id='localbusiness-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// WebSite Schema - for sitelinks search box
export function WebSiteJsonLd() {
    // No SearchAction: the site has no /search route. Never declare one that 404s.
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Capiflo',
        url: 'https://capiflo.co.uk'
    };

    return (
        <Script
            id='website-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema - for page-specific use
interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BreadcrumbJsonLdProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://capiflo.co.uk${item.href}`
        }))
    };

    return (
        <Script
            id='breadcrumb-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema - for pages with FAQs
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQJsonLdProps {
    faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <Script
            id='faq-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Service Schema - for funding type pages
interface ServiceJsonLdProps {
    name: string;
    description: string;
    url: string;
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name,
        description,
        url: `https://capiflo.co.uk${url}`,
        provider: {
            '@type': 'Organization',
            name: 'Capiflo',
            url: 'https://capiflo.co.uk'
        },
        areaServed: {
            '@type': 'Country',
            name: 'United Kingdom'
        }
    };

    return (
        <Script
            id='service-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Article Schema - for blog posts
interface ArticleJsonLdProps {
    title: string;
    description: string;
    url: string;
    publishedTime: string;
    modifiedTime?: string;
    image?: string;
}

export function ArticleJsonLd({
    title,
    description,
    url,
    publishedTime,
    modifiedTime,
    image
}: ArticleJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: `https://capiflo.co.uk${url}`,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        image: image || 'https://capiflo.co.uk/og-image.png',
        author: {
            '@type': 'Organization',
            name: 'Capiflo'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Capiflo',
            logo: {
                '@type': 'ImageObject',
                url: 'https://capiflo.co.uk/logo.png'
            }
        }
    };

    return (
        <Script
            id='article-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Guide Article Schema - E-E-A-T byline with author + reviewedBy + freshness
interface GuideArticleJsonLdProps {
    id: string;
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    keywords?: string[];
    image?: string;
}

export function GuideArticleJsonLd({
    id,
    title,
    description,
    url,
    datePublished,
    dateModified,
    keywords,
    image
}: GuideArticleJsonLdProps) {
    const author = authorSchemaNode();
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: `https://capiflo.co.uk${url}`,
        mainEntityOfPage: `https://capiflo.co.uk${url}`,
        datePublished,
        dateModified,
        ...(keywords && keywords.length ? { keywords: keywords.join(', ') } : {}),
        image: image || 'https://capiflo.co.uk/og-image.png',
        author,
        reviewedBy: author,
        publisher: {
            '@type': 'Organization',
            name: 'Capiflo',
            logo: {
                '@type': 'ImageObject',
                url: 'https://capiflo.co.uk/logo.png'
            }
        }
    };

    return (
        <Script
            id={`guide-jsonld-${id}`}
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// WebApplication Schema - for interactive calculator tools
interface CalculatorJsonLdProps {
    id: string;
    name: string;
    description: string;
    url: string;
}

export function CalculatorJsonLd({ id, name, description, url }: CalculatorJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        description,
        url: `https://capiflo.co.uk${url}`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web browser',
        browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'GBP'
        },
        provider: {
            '@type': 'Organization',
            name: 'Capiflo',
            url: 'https://capiflo.co.uk'
        }
    };

    return (
        <Script
            id={`calculator-jsonld-${id}`}
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
