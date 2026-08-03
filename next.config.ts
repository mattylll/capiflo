import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        // The Cloudflare Workers runtime has no Next image optimizer; serve
        // originals from static assets so images render instead of 404ing.
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ]
    },
    async redirects() {
        // The /blog cluster was removed 2026-06 in favour of /guides + /calculators.
        return [
            { source: '/blog', destination: '/guides', permanent: true },
            { source: '/blog/:slug', destination: '/guides', permanent: true },
            // Old /examples starter demo route, removed in cleanup.
            { source: '/examples', destination: '/', permanent: true }
        ];
    }
};

export default withBundleAnalyzer(nextConfig);
