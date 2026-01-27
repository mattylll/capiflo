'use client';

import {
    Banknote,
    Building2,
    Calculator,
    CreditCard,
    FileText,
    Receipt,
    Rocket,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Card } from '@/registry/new-york-v4/ui/card';

const BENTO_TILES = [
    {
        title: 'Business Loans',
        description: 'Unsecured & secured funding up to £5m for growth, working capital, or refinancing.',
        href: '/funding/business-loans',
        icon: Banknote,
        featured: true,
        badge: 'Popular'
    },
    {
        title: 'Merchant Cash Advance',
        description: 'Repay via card sales for retail, hospitality, and e-commerce brands.',
        href: '/funding/merchant-cash-advance',
        icon: CreditCard
    },
    {
        title: 'Invoice Finance',
        description: 'Release up to 90% of raised invoices to stabilise cash flow.',
        href: '/funding/invoice-finance',
        icon: FileText,
        featured: true,
        badge: 'Fast-Track'
    },
    {
        title: 'Asset Finance',
        description: 'Lease or hire purchase vehicles, machinery, technology, and fit-out.',
        href: '/funding/asset-finance',
        icon: Calculator
    },
    {
        title: 'VAT Loans',
        description: 'Finance VAT bills and preserve working capital during HMRC deadlines.',
        href: '/funding/vat-loans',
        icon: Receipt
    },
    {
        title: 'Corporation Tax Loans',
        description: 'Spread corporation tax over 6–12 months with predictable repayments.',
        href: '/funding/corporation-tax-loans',
        icon: Building2
    },
    {
        title: 'Property-Backed Finance',
        description: 'UK bridging loans, development finance, and commercial property funding.',
        href: '/funding/property-backed',
        icon: Building2
    },
    {
        title: 'Growth Finance',
        description: 'Working capital for scale-ups, MBOs, acquisitions, and expansion.',
        href: '/funding/growth',
        icon: Rocket
    }
];

const BentoGrid = () => {
    return (
        <section className='px-4 lg:px-8'>
            {/* Shine animation styles */}
            <style jsx global>{`
                @keyframes shine-sweep {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .bento-card-featured::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
                    transform: translateX(-100%);
                    animation: shine-sweep 4s ease-in-out infinite;
                    pointer-events: none;
                    border-radius: inherit;
                }
            `}</style>

            <div className='mx-auto flex max-w-6xl flex-col gap-10'>
                {/* Header */}
                <div className='flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                        Funding options
                    </p>
                    <div className='flex flex-wrap items-end justify-between gap-6'>
                        <h2 className='max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl'>
                            Instant clarity, across every major UK business finance product.
                        </h2>
                        <Link
                            href='/funding'
                            className='group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80'>
                            Explore all routes
                            <TrendingUp className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                        </Link>
                    </div>
                    <p className='max-w-3xl text-muted-foreground'>
                        Each page includes embedded calculators, eligibility criteria, real examples, and a
                        60-second wizard to get you started.
                    </p>
                </div>

                {/* Grid */}
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {BENTO_TILES.map((tile, index) => (
                        <Card
                            key={tile.title}
                            className={cn(
                                'group relative overflow-hidden rounded-3xl border-border/50 p-6 transition-all duration-300 cursor-pointer',
                                // Enhanced hover with glassmorphism
                                'hover:-translate-y-1 hover:border-primary/40',
                                'hover:bg-card/80 hover:backdrop-blur-xl',
                                'hover:shadow-[0_20px_60px_-20px_rgba(255,77,184,0.25),0_0_0_1px_rgba(255,77,184,0.1)]',
                                'animate-in fade-in slide-in-from-bottom-6 duration-500',
                                tile.featured && 'lg:row-span-2 lg:p-8 bento-card-featured'
                            )}
                            style={{ animationDelay: `${index * 50 + 100}ms` }}>
                            <Link href={tile.href} className='flex h-full flex-col'>
                                {/* Badge */}
                                {tile.badge && (
                                    <span className='absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25'>
                                        {tile.badge}
                                    </span>
                                )}

                                {/* Icon with enhanced hover animation */}
                                <div className='mb-4 inline-flex rounded-xl bg-primary/15 p-3 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110 group-hover:rotate-3'>
                                    <tile.icon className='h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110' />
                                </div>

                                {/* Content */}
                                <h3 className='text-xl font-semibold text-foreground'>
                                    {tile.title}
                                </h3>
                                <p className='mt-2 flex-1 text-sm text-muted-foreground'>
                                    {tile.description}
                                </p>

                                {/* Link indicator with enhanced animation */}
                                <div className='mt-4 flex items-center gap-2 text-sm font-medium text-primary'>
                                    <span>Learn more</span>
                                    <span className='transition-transform duration-300 group-hover:translate-x-2'>
                                        →
                                    </span>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
