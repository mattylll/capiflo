import Link from 'next/link';

const PRIMARY_LINKS = [
    { label: 'Business Loans', href: '/funding/business-loans' },
    { label: 'Invoice Finance', href: '/funding/invoice-finance' },
    { label: 'Merchant Cash Advance', href: '/funding/merchant-cash-advance' },
    { label: 'Asset Finance', href: '/funding/asset-finance' }
];

const SECTOR_LINKS = [
    { label: 'Construction', href: '/sectors/construction' },
    { label: 'Retail', href: '/sectors/retail' },
    { label: 'Hospitality', href: '/sectors/hospitality' },
    { label: 'Manufacturing', href: '/sectors/manufacturing' },
    { label: 'All Sectors', href: '/sectors' }
];

const SUPPORT_LINKS = [
    { label: 'Calculators', href: '/calculators' },
    { label: 'Knowledge Centre', href: '/blog' },
    { label: 'Introducers', href: '/introducers' },
    { label: 'Privacy', href: '/legal/privacy' },
    { label: 'Terms', href: '/legal/terms' }
];

const SiteFooter = () => {
    return (
        <footer className='border-t border-white/10 bg-card/70 text-sm text-muted-foreground backdrop-blur-xl'>
            <div className='mx-auto max-w-6xl px-4 py-12 lg:px-8'>
                <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4'>
                    <div>
                        <p className='text-lg font-semibold text-foreground'>Capiflo</p>
                        <p className='mt-4 max-w-sm'>
                            UK SME funding platform connecting businesses with 120+ lenders for fast, flexible finance.
                        </p>
                        <p className='mt-4 text-xs'>
                            hello@capiflo.co · +44 (0)20 1234 5678
                        </p>
                        <p className='mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground'>London · UK</p>
                    </div>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>Funding</p>
                        <ul className='mt-4 space-y-2'>
                            {PRIMARY_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className='transition hover:text-foreground'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>Sectors</p>
                        <ul className='mt-4 space-y-2'>
                            {SECTOR_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className='transition hover:text-foreground'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>Resources</p>
                        <ul className='mt-4 space-y-2'>
                            {SUPPORT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className='transition hover:text-foreground'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
                    <p>© {new Date().getFullYear()} Capiflo. All rights reserved.</p>
                    <p>Built with Next.js 16 · ShadCN UI · Agent-led sprints.</p>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
