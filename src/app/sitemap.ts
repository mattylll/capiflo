/**
 * Enhanced Sitemap Generator
 *
 * Priority-based sitemap for optimal SEO crawling
 */

import type { MetadataRoute } from 'next';
import { counties } from '@/data/locations/counties';
import { towns } from '@/data/locations/towns';
import { seoConfig } from '@/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = seoConfig.siteUrl;
    const now = new Date();

    const sitemap: MetadataRoute.Sitemap = [];

    // Homepage
    sitemap.push({
        url: baseUrl,
        lastModified: now,
        changeFrequency: seoConfig.sitemap.changeFrequency.homepage,
        priority: seoConfig.sitemap.priority.homepage
    });

    // Main locations page
    sitemap.push({
        url: `${baseUrl}/locations`,
        lastModified: now,
        changeFrequency: seoConfig.sitemap.changeFrequency.locations,
        priority: seoConfig.sitemap.priority.mainLocations
    });

    // County pages
    counties.forEach((county) => {
        sitemap.push({
            url: `${baseUrl}/locations/${county.slug}`,
            lastModified: now,
            changeFrequency: seoConfig.sitemap.changeFrequency.counties,
            priority: seoConfig.sitemap.priority.counties
        });
    });

    // Town pages - with priority based on content richness
    towns.forEach((town) => {
        // Determine priority based on content quality
        const hasRichContent =
            town.extendedOverview &&
            town.extendedOverview.length >= 400 &&
            town.faqs &&
            town.faqs.length >= 8 &&
            town.fundingScenarios &&
            town.fundingScenarios.length >= 4 &&
            town.caseStudy;

        // Check if content was generated vs manually written
        const isManuallyWritten = town._generated?.extendedOverview === false;

        // Determine priority
        let priority: number;
        if (isManuallyWritten || (hasRichContent && !town._generated)) {
            // Manually written or rich content without generation tracking
            priority = seoConfig.sitemap.priority.townsRichContent;
        } else if (hasRichContent) {
            // Generated but complete content
            priority = seoConfig.sitemap.priority.townsGeneratedContent;
        } else {
            // Incomplete content
            priority = seoConfig.sitemap.priority.townsGeneratedContent - 0.1;
        }

        // Use generation timestamp if available, otherwise use now
        const lastModified = town._generated?.generatedAt
            ? new Date(town._generated.generatedAt)
            : now;

        sitemap.push({
            url: `${baseUrl}/locations/${town.countySlug}/${town.slug}`,
            lastModified,
            changeFrequency: seoConfig.sitemap.changeFrequency.towns,
            priority: Math.max(0.1, Math.min(1.0, priority)) // Clamp between 0.1 and 1.0
        });
    });

    // Sort by priority (highest first) for better crawl efficiency
    sitemap.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return sitemap;
}
