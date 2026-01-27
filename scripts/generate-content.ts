#!/usr/bin/env tsx
/**
 * Content Generation CLI
 *
 * Usage:
 *   npm run generate-content -- --regions=south-east,east-of-england
 *   npm run generate-content -- --counties=kent,surrey
 *   npm run generate-content -- --dry-run
 *   npm run generate-content -- --overwrite
 *   npm run generate-content -- --missing-only
 */

import { towns, counties, getCountyBySlug, type UKRegion } from '../src/data/locations';
import {
    generateBatchContent,
    getGenerationStats,
    type ContentGenerationOptions
} from '../src/lib/content-generation';

// Parse command line arguments
function parseArgs(): {
    regions?: UKRegion[];
    countySlug?: string[];
    dryRun: boolean;
    overwrite: boolean;
    missingOnly: boolean;
    validateOnly: boolean;
} {
    const args = process.argv.slice(2);
    const parsed: ReturnType<typeof parseArgs> = {
        dryRun: false,
        overwrite: false,
        missingOnly: false,
        validateOnly: false
    };

    args.forEach(arg => {
        if (arg.startsWith('--regions=')) {
            const regionStr = arg.split('=')[1];
            parsed.regions = regionStr.split(',') as UKRegion[];
        } else if (arg.startsWith('--counties=')) {
            const countyStr = arg.split('=')[1];
            parsed.countySlug = countyStr.split(',');
        } else if (arg === '--dry-run') {
            parsed.dryRun = true;
        } else if (arg === '--overwrite') {
            parsed.overwrite = true;
        } else if (arg === '--missing-only') {
            parsed.missingOnly = true;
        } else if (arg === '--validate-only') {
            parsed.validateOnly = true;
        }
    });

    return parsed;
}

// Filter towns based on criteria
function filterTowns(
    allTowns: typeof towns,
    criteria: ReturnType<typeof parseArgs>
): typeof towns {
    let filtered = [...allTowns];

    // Filter by regions
    if (criteria.regions && criteria.regions.length > 0) {
        filtered = filtered.filter(town => {
            const county = getCountyBySlug(town.countySlug);
            return county && criteria.regions!.includes(county.region);
        });
    }

    // Filter by counties
    if (criteria.countySlug && criteria.countySlug.length > 0) {
        filtered = filtered.filter(town =>
            criteria.countySlug!.includes(town.countySlug)
        );
    }

    // Filter for missing content only
    if (criteria.missingOnly) {
        filtered = filtered.filter(town => {
            return (
                !town.extendedOverview ||
                town.extendedOverview.length < 300 ||
                !town.faqs ||
                town.faqs.length < 8 ||
                !town.fundingScenarios ||
                town.fundingScenarios.length < 4 ||
                !town.caseStudy
            );
        });
    }

    return filtered;
}

// Main execution
async function main() {
    const args = parseArgs();
    const townsToProcess = filterTowns(towns, args);

    console.log('\n🚀 Content Generation Tool\n');
    console.log(`Total towns in database: ${towns.length}`);
    console.log(`Towns to process: ${townsToProcess.length}`);

    if (args.regions) {
        console.log(`Regions: ${args.regions.join(', ')}`);
    }

    if (args.countySlug) {
        console.log(`Counties: ${args.countySlug.join(', ')}`);
    }

    if (args.dryRun) {
        console.log('Mode: DRY RUN (no changes will be made)');
    }

    if (args.overwrite) {
        console.log('Mode: OVERWRITE (existing content will be replaced)');
    }

    if (args.missingOnly) {
        console.log('Mode: MISSING ONLY (only generate for incomplete towns)');
    }

    if (args.validateOnly) {
        console.log('Mode: VALIDATE ONLY (no generation, only validation)');
    }

    if (townsToProcess.length === 0) {
        console.log('\n✅ No towns need processing!');
        return;
    }

    console.log('\n📝 Generating content...\n');

    const options: ContentGenerationOptions = {
        dryRun: args.dryRun,
        overwrite: args.overwrite,
        validateOnly: args.validateOnly
    };

    // Generate content
    const results = generateBatchContent(
        townsToProcess,
        getCountyBySlug,
        options
    );

    // Get statistics
    const stats = getGenerationStats(results);

    // Display results
    console.log('\n📊 Generation Results:\n');
    console.log(`Total towns processed: ${stats.total}`);
    console.log('\nContent Generated:');
    console.log(`  Extended Overviews: ${stats.generated.extendedOverview}`);
    console.log(`  FAQs: ${stats.generated.faqs}`);
    console.log(`  Funding Scenarios: ${stats.generated.fundingScenarios}`);
    console.log(`  Case Studies: ${stats.generated.caseStudy}`);

    console.log('\n✅ Validation Results:');
    console.log(`  Valid: ${stats.validation.valid}`);
    console.log(`  Invalid: ${stats.validation.invalid}`);
    console.log(`  Total Errors: ${stats.validation.errors}`);
    console.log(`  Total Warnings: ${stats.validation.warnings}`);

    // Show sample results
    if (results.length > 0 && !args.validateOnly) {
        console.log('\n📄 Sample Generated Content (first town):\n');
        const sample = results[0];
        console.log(`Town: ${sample.town}, ${sample.county}`);

        if (sample.generated.extendedOverview && sample.updatedTown?.extendedOverview) {
            const preview = sample.updatedTown.extendedOverview.substring(0, 200);
            console.log(`\nExtended Overview Preview:\n${preview}...`);
        }

        if (sample.generated.faqs && sample.updatedTown?.faqs) {
            console.log(`\nFAQs Generated: ${sample.updatedTown.faqs.length}`);
            console.log(`First FAQ: ${sample.updatedTown.faqs[0]?.question}`);
        }
    }

    // Show validation errors/warnings for invalid towns
    if (stats.validation.invalid > 0) {
        console.log('\n⚠️  Towns with Validation Issues:\n');
        results
            .filter(r => !r.validation.overall)
            .slice(0, 5) // Show first 5
            .forEach(result => {
                console.log(`${result.town}:`);
                const allErrors = [
                    ...result.validation.extendedOverview.errors,
                    ...result.validation.faqs.errors,
                    ...result.validation.fundingScenarios.errors,
                    ...result.validation.caseStudy.errors
                ];
                allErrors.forEach(error => console.log(`  - ${error}`));
            });

        if (stats.validation.invalid > 5) {
            console.log(`\n... and ${stats.validation.invalid - 5} more towns with issues`);
        }
    }

    if (args.dryRun) {
        console.log('\n💡 This was a dry run. Re-run without --dry-run to save changes.');
    } else if (!args.validateOnly) {
        console.log('\n⚠️  IMPORTANT: The content has been generated but NOT saved to files yet.');
        console.log('You need to manually update the town data files with the generated content.');
        console.log('Consider implementing a write-to-file function to automate this step.');
    }

    console.log('\n✨ Done!\n');
}

main().catch(console.error);
