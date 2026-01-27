// Towns Index - Aggregates all regional town data
import { Town } from '../index';

// Import all regional town files
import { northWestTowns } from './north-west';
import { northEastTowns } from './north-east';
import { yorkshireHumberTowns } from './yorkshire-humber';
import { eastMidlandsTowns } from './east-midlands';
import { westMidlandsTowns } from './west-midlands';
import { eastOfEnglandTowns } from './east-of-england';
import { londonTowns } from './london';
import { southEastTowns } from './south-east';
import { southWestTowns } from './south-west';
import { walesTowns } from './wales';
import { scotlandTowns } from './scotland';
import { northernIrelandTowns } from './northern-ireland';

// Combined array of all towns
export const towns: Town[] = [
    ...northWestTowns,
    ...northEastTowns,
    ...yorkshireHumberTowns,
    ...eastMidlandsTowns,
    ...westMidlandsTowns,
    ...eastOfEnglandTowns,
    ...londonTowns,
    ...southEastTowns,
    ...southWestTowns,
    ...walesTowns,
    ...scotlandTowns,
    ...northernIrelandTowns,
];

// Create a map for efficient lookup by slug
export const townMap = new Map<string, Town>(towns.map((town) => [town.slug, town]));

// Get towns by county slug
export const getTownsByCounty = (countySlug: string): Town[] => {
    return towns.filter((town) => town.countySlug === countySlug);
};

// Get all town slugs for static generation
export const getAllTownSlugs = (): string[] => {
    return towns.map((town) => town.slug);
};

// Get town by slug
export const getTownBySlug = (slug: string): Town | undefined => {
    return townMap.get(slug);
};

// Get town count by county
export const getTownCountByCounty = (countySlug: string): number => {
    return towns.filter((town) => town.countySlug === countySlug).length;
};

// Re-export regional arrays for direct access if needed
export {
    northWestTowns,
    northEastTowns,
    yorkshireHumberTowns,
    eastMidlandsTowns,
    westMidlandsTowns,
    eastOfEnglandTowns,
    londonTowns,
    southEastTowns,
    southWestTowns,
    walesTowns,
    scotlandTowns,
    northernIrelandTowns,
};
