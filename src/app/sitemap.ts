/**
 * Enhanced Sitemap Generator
 *
 * Priority-based sitemap for optimal SEO crawling
 */

import type { MetadataRoute } from 'next';
import { counties } from '@/data/locations/counties';
import { towns } from '@/data/locations/towns';
import { sectors } from '@/data/sectors';
import { fundingSectors } from '@/data/funding';
import { calculators } from '@/data/calculators';
import { guides } from '@/data/guides';
import { seoConfig } from '@/config/seo';
import { townTier, townTierPriority } from '@/lib/seo/tiering';

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

    // Static company pages (/thank-you deliberately excluded: noindex).
    for (const path of ['/about', '/contact', '/introducers', '/sectors', '/legal/privacy', '/legal/terms']) {
        sitemap.push({
            url: `${baseUrl}${path}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: path.startsWith('/legal') ? 0.3 : 0.6
        });
    }

    // County pages
    counties.forEach((county) => {
        sitemap.push({
            url: `${baseUrl}/locations/${county.slug}`,
            lastModified: now,
            changeFrequency: seoConfig.sitemap.changeFrequency.counties,
            priority: seoConfig.sitemap.priority.counties
        });
    });

    // Town pages - priority by publishing-gate tier (A/B/C) on data richness.
    // Manually-written content is boosted above its tier baseline.
    towns.forEach((town) => {
        const tier = townTier(town);
        let priority = townTierPriority(tier);
        if (town._generated?.extendedOverview === false) {
            priority = seoConfig.sitemap.priority.townsRichContent; // hand-written
        }

        const lastModified = town._generated?.generatedAt
            ? new Date(town._generated.generatedAt)
            : now;

        sitemap.push({
            url: `${baseUrl}/locations/${town.countySlug}/${town.slug}`,
            lastModified,
            changeFrequency: seoConfig.sitemap.changeFrequency.towns,
            priority: Math.max(0.1, Math.min(1.0, priority))
        });
    });

    // Sector guide pages
    sectors.forEach((sector) => {
        sitemap.push({
            url: `${baseUrl}/sectors/${sector.slug}`,
            lastModified: now,
            changeFrequency: seoConfig.sitemap.changeFrequency.products,
            priority: seoConfig.sitemap.priority.products
        });
    });

    // Funding product pages
    sitemap.push({
        url: `${baseUrl}/funding`,
        lastModified: now,
        changeFrequency: seoConfig.sitemap.changeFrequency.products,
        priority: seoConfig.sitemap.priority.products
    });
    fundingSectors.forEach((sector) => {
        sitemap.push({
            url: `${baseUrl}/funding/${sector.slug}`,
            lastModified: now,
            changeFrequency: seoConfig.sitemap.changeFrequency.products,
            priority: seoConfig.sitemap.priority.products
        });
    });

    // Calculators (interactive tools + hub)
    sitemap.push({
        url: `${baseUrl}/calculators`,
        lastModified: now,
        changeFrequency: seoConfig.sitemap.changeFrequency.products,
        priority: seoConfig.sitemap.priority.products
    });
    calculators.forEach((calc) => {
        sitemap.push({
            url: `${baseUrl}/calculators/${calc.slug}`,
            lastModified: now,
            changeFrequency: seoConfig.sitemap.changeFrequency.products,
            priority: seoConfig.sitemap.priority.products
        });
    });

    // Guides (knowledge hub + articles)
    sitemap.push({
        url: `${baseUrl}/guides`,
        lastModified: now,
        changeFrequency: seoConfig.sitemap.changeFrequency.guides,
        priority: seoConfig.sitemap.priority.mainLocations
    });
    guides.forEach((guide) => {
        sitemap.push({
            url: `${baseUrl}/guides/${guide.slug}`,
            lastModified: new Date(guide.updatedAt),
            changeFrequency: seoConfig.sitemap.changeFrequency.guides,
            priority: seoConfig.sitemap.priority.guides
        });
    });

    // Sort by priority (highest first) for better crawl efficiency
    sitemap.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return sitemap;
}
