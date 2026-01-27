import Script from 'next/script';
import { generateOrganizationSchema } from '@/lib/schema-generators';

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

// LocalBusiness Schema - for local SEO
export function LocalBusinessJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: 'Capiflo',
        image: 'https://capiflo.co.uk/logo.png',
        '@id': 'https://capiflo.co.uk',
        url: 'https://capiflo.co.uk',
        telephone: '+442012345678',
        email: 'hello@capiflo.co.uk',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'London',
            addressCountry: 'GB'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 51.5074,
            longitude: -0.1278
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:30'
        },
        priceRange: '$$'
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
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Capiflo',
        url: 'https://capiflo.co.uk',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://capiflo.co.uk/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        }
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
