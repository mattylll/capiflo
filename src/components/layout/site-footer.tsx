import Link from 'next/link';

import { businessConfig, getFormattedPhone, hasRealPhone } from '@/data/business-config';
import { livePortfolioSites } from '@/data/portfolio';

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
    { label: 'Guides', href: '/guides' },
    { label: 'Introducers', href: '/introducers' },
    { label: 'Privacy', href: '/legal/privacy' },
    { label: 'Terms', href: '/legal/terms' }
];

const SiteFooter = () => {
    return (
        <footer className='border-t border-border bg-card text-sm text-muted-foreground'>
            <div className='mx-auto max-w-6xl px-4 py-12 lg:px-8'>
                <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4'>
                    <div>
                        <p className='font-display text-lg font-semibold text-foreground'>Capiflo</p>
                        <p className='mt-4 max-w-sm'>
                            UK SME finance broker comparing 120+ lenders to arrange fast, flexible business
                            funding.
                        </p>
                        <p className='mt-4 text-xs'>
                            {businessConfig.email}
                            {hasRealPhone() && <> · {getFormattedPhone()}</>}
                        </p>
                        <p className='mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground'>London · UK</p>
                    </div>
                    <div>
                        <p className='font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>Funding</p>
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
                        <p className='font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>Sectors</p>
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
                        <p className='font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>Resources</p>
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
                {livePortfolioSites.length > 0 && (
                    <div className='mt-10 border-t border-border pt-6'>
                        <p className='font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>
                            Portfolio
                        </p>
                        <ul className='mt-4 flex flex-wrap gap-x-6 gap-y-2'>
                            {livePortfolioSites.map((site) => (
                                <li key={site.url}>
                                    <a
                                        href={site.url}
                                        rel='noopener'
                                        className='transition hover:text-foreground'>
                                        {site.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className='mt-10 space-y-3 border-t border-border pt-6 text-xs text-muted-foreground'>
                    <p>
                        {businessConfig.legalName} is a commercial finance broker, not a lender. We introduce
                        businesses seeking finance to a panel of lenders and funding providers and may receive a
                        commission from the lender if a facility completes. All finance is unregulated business
                        lending, arranged for business purposes only and subject to status; it is not regulated by
                        the Financial Conduct Authority, and Financial Ombudsman Service and FSCS protections do not
                        apply.
                    </p>
                    <p>
                        {businessConfig.legalName} is registered in England and Wales
                        {businessConfig.companyNumber && <>, company number {businessConfig.companyNumber}</>}.
                    </p>
                    <p>© {new Date().getFullYear()} Capiflo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
