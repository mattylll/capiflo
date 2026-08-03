import type { Metadata } from 'next';

import SectorPage from '@/components/funding/sector-page';
import { fundingSectorMap } from '@/data/funding';

const sector = fundingSectorMap['business-loans'];

if (!sector) {
    throw new Error('Business loans sector data missing.');
}

export const metadata: Metadata = {
    title: `${sector.title} | Capiflo`,
    description: sector.description,
    keywords: sector.keywords,
    alternates: { canonical: '/funding/business-loans' }
};

const Page = () => {
    return <SectorPage sector={sector} />;
};

export default Page;
