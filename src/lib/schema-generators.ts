/**
 * Schema Markup Generators
 *
 * Centralized utilities for generating JSON-LD schema markup.
 * All schema generation logic is extracted here for consistency and maintainability.
 */

import type { County, Town } from '@/data/locations';
import { businessConfig, hasAggregateRating, hasRealAddress, hasRealPhone } from '@/data/business-config';

/**
 * Generate Organization Schema (company-level)
 * Place this in the root layout for site-wide organization information
 */
export const generateOrganizationSchema = () => {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: businessConfig.name,
    legalName: businessConfig.legalName,
    url: businessConfig.website,
    logo: businessConfig.logo,
    description: businessConfig.description,
    email: businessConfig.email,
    foundingDate: businessConfig.foundingDate,
    priceRange: businessConfig.priceRange,
    serviceType: businessConfig.serviceType
  };

  // Only emit NAP details once the real values are in business-config —
  // placeholder structured data on every page is worse than none.
  if (hasRealPhone()) {
    schema.telephone = businessConfig.telephone;
  }
  if (hasRealAddress()) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: businessConfig.address.streetAddress,
      addressLocality: businessConfig.address.addressLocality,
      addressRegion: businessConfig.address.addressRegion,
      postalCode: businessConfig.address.postalCode,
      addressCountry: businessConfig.address.addressCountry
    };
  }

  // Add geographic coordinates if available
  if (businessConfig.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: businessConfig.geo.latitude,
      longitude: businessConfig.geo.longitude
    };
  }

  // Add social media profiles if available
  if (businessConfig.sameAs && businessConfig.sameAs.length > 0) {
    schema.sameAs = businessConfig.sameAs;
  }

  // Add aggregate rating only if real data is available
  if (hasAggregateRating() && businessConfig.aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: businessConfig.aggregateRating.ratingValue.toString(),
      reviewCount: businessConfig.aggregateRating.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1'
    };
  }

  return schema;
};

/**
 * Generate BreadcrumbList Schema
 * Helps search engines understand site navigation hierarchy
 *
 * @param county - County object
 * @param town - Optional town object for town-level pages
 */
export const generateBreadcrumbSchema = (county: County, town?: Town) => {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: businessConfig.website
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Locations',
      item: `${businessConfig.website}/locations`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: county.name,
      item: `${businessConfig.website}/locations/${county.slug}`
    }
  ];

  // Add town level if this is a town page
  if (town) {
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: town.name,
      item: `${businessConfig.website}/locations/${county.slug}/${town.slug}`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
};

/**
 * Generate LocalBusiness Schema (location-specific)
 * FinancialService type with area served information
 *
 * @param town - Town object
 * @param county - County object
 */
export const generateLocalBusinessSchema = (town: Town, county: County) => {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: `${businessConfig.name} Business Finance - ${town.name}`,
    description: town.description,
    url: `${businessConfig.website}/locations/${county.slug}/${town.slug}`,
    ...(hasRealPhone() ? { telephone: businessConfig.telephone } : {}),
    areaServed: {
      '@type': 'City',
      name: town.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: county.name
      }
    },
    serviceType: businessConfig.serviceType,
    priceRange: businessConfig.priceRange,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Finance Products',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Unsecured Business Loans',
            description: 'Business loans from £5,000 to £500,000 without requiring property as security'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Merchant Cash Advance',
            description: 'Flexible funding repaid as a percentage of card sales'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Asset Finance',
            description: 'Finance for equipment, vehicles, and machinery'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Invoice Finance',
            description: 'Release cash from unpaid invoices'
          }
        }
      ]
    }
  };

  // Add business hours if available for this location
  if (town.businessHours) {
    schema.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: town.businessHours.dayOfWeek,
      opens: town.businessHours.opens,
      closes: town.businessHours.closes
    };
  }

  // Add location-specific rating if available
  // Only use real, verifiable ratings - never fake data
  if (town.localRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: town.localRating.ratingValue.toString(),
      reviewCount: town.localRating.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1'
    };
  } else if (hasAggregateRating() && businessConfig.aggregateRating) {
    // Fallback to company-wide rating if no location-specific rating
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: businessConfig.aggregateRating.ratingValue.toString(),
      reviewCount: businessConfig.aggregateRating.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1'
    };
  }

  return schema;
};

/**
 * Generate FAQ Schema
 * Creates FAQPage schema from an array of FAQ objects
 *
 * @param faqs - Array of FAQ objects with question and answer
 */
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
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
};

/**
 * Generate Service Schema
 * Describes the business financing service for a specific location
 *
 * @param town - Town object
 * @param county - County object
 */
export const generateServiceSchema = (town: Town, county: County) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Business Loans in ${town.name}`,
    provider: {
      '@type': 'FinancialService',
      name: businessConfig.name,
      url: businessConfig.website
    },
    areaServed: {
      '@type': 'City',
      name: town.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: county.name
      }
    },
    description: town.description,
    serviceType: 'Business Finance Brokerage'
  };
};

/**
 * Generate Article Schema (for extended content sections)
 * Use this for rich content sections like extended overviews
 *
 * @param title - Article title
 * @param content - Article content
 * @param town - Town object
 * @param datePublished - Publication date (optional)
 */
export const generateArticleSchema = (
  title: string,
  content: string,
  town: Town,
  datePublished?: string
) => {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    articleBody: content,
    author: {
      '@type': 'Organization',
      name: businessConfig.name,
      url: businessConfig.website
    },
    publisher: {
      '@type': 'Organization',
      name: businessConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: businessConfig.logo
      }
    },
    about: {
      '@type': 'City',
      name: town.name
    }
  };

  if (datePublished) {
    schema.datePublished = datePublished;
    schema.dateModified = datePublished;
  }

  return schema;
};
