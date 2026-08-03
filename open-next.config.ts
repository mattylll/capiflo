import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// The site is fully prerendered (~516 pages) with deterministic content, so
// the incremental cache is the read-only static-assets one: prerendered pages
// (including the 460 location pages) are served straight from Workers assets.
// No revalidation happens at runtime; deploys replace the whole cache.
export default defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache
});
