/**
 * Capiflo Business Configuration
 *
 * Centralized configuration for all business information used across the site.
 * This ensures consistency in schema markup, contact information, and branding.
 */

export type BusinessConfig = {
  name: string;
  legalName: string;
  telephone: string;
  email: string;
  website: string;
  logo: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  foundingDate: string;
  priceRange: string;
  serviceType: string[];
  sameAs: string[]; // Social media profiles
  description: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    ratingSource: string;
  };
};

/**
 * Main business configuration
 *
 * TODO: Update with real Capiflo contact details before deployment
 */
export const businessConfig: BusinessConfig = {
  name: 'Capiflo',
  legalName: 'Capiflo Ltd',

  // Contact Information
  // TODO: Replace with real phone number
  telephone: '+44 20 XXXX XXXX',
  email: 'enquiries@capiflo.co.uk',
  website: 'https://capiflo.co.uk',

  // Brand Assets
  logo: 'https://capiflo.co.uk/logo.png',

  // Address
  // TODO: Update with real business address
  address: {
    streetAddress: 'Business Address Line 1',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    postalCode: 'XXX XXX',
    addressCountry: 'GB'
  },

  // Geographic coordinates (optional, for enhanced local SEO)
  // TODO: Add real coordinates when address is finalized
  geo: undefined,

  // Business Information
  foundingDate: '2020', // Update with actual founding year
  priceRange: '££',

  // Services Offered
  serviceType: [
    'Business Loans',
    'Merchant Cash Advance',
    'Asset Finance',
    'Invoice Finance',
    'Business Finance Brokerage'
  ],

  // Social Media Profiles
  // TODO: Add real social media profiles
  sameAs: [
    // 'https://twitter.com/capiflo',
    // 'https://linkedin.com/company/capiflo',
    // 'https://facebook.com/capiflo'
  ],

  // Business Description
  description: 'UK business finance broker helping SMEs secure funding from £5,000 to £500,000. We compare options from 120+ lenders to find the best rates for your business.',

  // Aggregate Rating
  // NOTE: Only include when you have real, verifiable reviews
  // Remove or set to undefined if you don't have genuine review data
  aggregateRating: undefined

  // Example when you have real reviews:
  // aggregateRating: {
  //   ratingValue: 4.8,
  //   reviewCount: 250,
  //   ratingSource: 'google' // or 'trustpilot', 'reviews.io', etc.
  // }
};

/**
 * Helper function to get formatted phone number for display
 */
export const getFormattedPhone = (): string => {
  return businessConfig.telephone;
};

/**
 * Helper function to get full business address as string
 */
export const getFullAddress = (): string => {
  const { streetAddress, addressLocality, addressRegion, postalCode } = businessConfig.address;
  return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
};

/**
 * Helper function to check if aggregate rating should be displayed
 */
export const hasAggregateRating = (): boolean => {
  return businessConfig.aggregateRating !== undefined;
};
