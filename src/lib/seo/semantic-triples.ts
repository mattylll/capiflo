/**
 * Semantic-triple builders (Subject → Predicate → Object).
 *
 * Wire Capiflo and each location/sector into the entity graph. At least one
 * triple belongs in the intro, each H2 opener, the conclusion, and image alt
 * text. See seo/ENTITY-BRIEF.md §8.
 */

import type { Town, County } from '@/data/locations';
import { regionNames } from '@/data/locations';

const regionName = (town: Town, county: County): string =>
    regionNames[town.region ?? county.region];

/** Place: "{Town} sits in {county}, within the {region} economy." */
export const placeTriple = (town: Town, county: County): string =>
    `${town.name} sits in ${county.name}, within ${regionName(town, county)}'s economy.`;

/** Brand: "Capiflo arranges business finance for SMEs across {county}." */
export const brandTriple = (county: County): string =>
    `Capiflo arranges business finance for SMEs across ${county.name}.`;

/** Brand (town-scoped). */
export const brandTownTriple = (town: Town): string =>
    `Capiflo matches ${town.name} businesses to funding from 120+ UK lenders.`;

/** Product: predicate ties a facility to its use. */
export const productTriple = (product: string, use: string): string =>
    `${product} funds ${use}.`;

/** Sector: "Capiflo provides {product} to {sector} firms in {town}." */
export const sectorTriple = (product: string, sector: string, town: string): string =>
    `Capiflo provides ${product} to ${sector} firms in ${town}.`;

/** County-level brand+place triple for hub pages. */
export const countyTriple = (county: County): string =>
    `${county.name} is part of ${regionNames[county.region]}, where Capiflo arranges SME finance.`;

/** Image alt text built as a triple (Capiflo → serves → place). */
export const imageAltTriple = (town: Town, county: County): string =>
    `Capiflo arranges business loans for SMEs in ${town.name}, ${county.name}.`;
