import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight, Home, Search } from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Page Not Found | Capiflo',
    description: 'The page you are looking for could not be found.',
    robots: 'noindex, nofollow'
};

const QUICK_LINKS = [
    { label: 'Business Loans', href: '/funding/business-loans' },
    { label: 'Invoice Finance', href: '/funding/invoice-finance' },
    { label: 'Asset Finance', href: '/funding/asset-finance' },
    { label: 'All Funding Options', href: '/funding' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Contact Us', href: '/contact' }
];

export default function NotFound() {
    return (
        <div className='flex min-h-[70vh] flex-col items-center justify-center px-4 py-20'>
            <div className='mx-auto max-w-2xl text-center'>
                {/* 404 Display */}
                <div className='relative mb-8 animate-in fade-in zoom-in duration-500'>
                    <span className='text-[150px] font-bold leading-none text-muted/20 sm:text-[200px]'>
                        404
                    </span>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='rounded-2xl bg-primary/15 p-4'>
                            <Search className='h-12 w-12 text-primary' />
                        </div>
                    </div>
                </div>

                <h1 className='text-3xl font-semibold text-foreground sm:text-4xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    Page not found
                </h1>

                <p className='mt-4 text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-6 delay-100 duration-700'>
                    The page you're looking for doesn't exist or has been moved. Let's get you back on
                    track.
                </p>

                {/* CTA Buttons */}
                <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-6 delay-200 duration-700'>
                    <Button
                        size='lg'
                        className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                        asChild>
                        <Link href='/'>
                            <Home className='mr-2 h-5 w-5' />
                            Back to Home
                        </Link>
                    </Button>
                    <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                        <Link href='/contact'>
                            Contact Support
                            <ArrowRight className='ml-2 h-5 w-5' />
                        </Link>
                    </Button>
                </div>

                {/* Quick Links */}
                <Card className='mt-12 rounded-3xl border-border/50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-6 delay-300 duration-700'>
                    <p className='mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground'>
                        Quick links
                    </p>
                    <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3'>
                        {QUICK_LINKS.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className='rounded-lg p-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary animate-in fade-in slide-in-from-bottom-4 duration-500'
                                style={{ animationDelay: `${index * 50 + 400}ms` }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
