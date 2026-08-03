import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SectorPage from '@/components/sectors/sector-page';
import { sectors, sectorMap } from '@/data/sectors';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export const generateStaticParams = () => sectors.map((sector) => ({ slug: sector.slug }));

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { slug } = await params;
    const sector = sectorMap.get(slug);
    if (!sector) {
        return {};
    }

    return {
        title: sector.metaTitle || `${sector.title} | UK Business Funding | Capiflo`,
        description: sector.metaDescription || sector.description,
        keywords: sector.keywords,
        alternates: { canonical: `/sectors/${sector.slug}` },
        openGraph: {
            title: sector.metaTitle || sector.title,
            description: sector.metaDescription || sector.description,
            type: 'website',
            url: `https://capiflo.co.uk/sectors/${sector.slug}`,
            images: sector.image ? [{ url: `https://capiflo.co.uk${sector.image}`, alt: sector.title }] : undefined
        },
        twitter: {
            card: 'summary_large_image',
            title: sector.metaTitle || sector.title,
            description: sector.metaDescription || sector.description
        }
    };
};

const SectorPageRoute = async ({ params }: { params: Params }) => {
    const { slug } = await params;
    const sector = sectorMap.get(slug);
    if (!sector) {
        notFound();
    }

    return <SectorPage sector={sector} />;
};

export default SectorPageRoute;
