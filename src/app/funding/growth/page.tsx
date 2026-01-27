import type { Metadata } from 'next';

import SectorPage from '@/components/funding/sector-page';
import { fundingSectorMap } from '@/data/funding';

const sector = fundingSectorMap['growth'];

if (!sector) {
    throw new Error('Growth finance sector data missing.');
}

export const metadata: Metadata = {
    title: `${sector.title} | Capiflo`,
    description: sector.description,
    keywords: sector.keywords
};

export default function Page() {
    return <SectorPage sector={sector} />;
}
