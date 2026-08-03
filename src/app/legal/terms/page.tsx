import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Terms of Use | Capiflo',
    description: "Service terms for accessing Capiflo's UK business funding platform and calculators."
};

const items = [
    {
        title: 'Information only',
        body: 'Capiflo provides indicative information, calculators, and introductions. It is not a lender. Final offers come from the lenders and funding providers we introduce you to. All finance we arrange is unregulated business lending; Capiflo is not authorised or regulated by the Financial Conduct Authority.'
    },
    {
        title: 'Accuracy',
        body: 'We aim to keep content current, but rates and criteria change frequently. Confirm details with your assigned broker before signing agreements.'
    },
    {
        title: 'Liability',
        body: 'Capiflo is not responsible for losses resulting from the use of this site. Always seek tailored financial advice before borrowing.'
    },
    {
        title: 'Intellectual property',
        body: 'All content, calculators, and branding on this site are owned by Capiflo Ltd. You may not reproduce or redistribute without permission.'
    },
    {
        title: 'Changes to terms',
        body: 'We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms.'
    }
];

const TermsPage = () => {
    return (
        <div className='space-y-16 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    <Link
                        href='/'
                        className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary'>
                        <ArrowLeft className='h-4 w-4' />
                        Back to Home
                    </Link>

                    <div className='mt-8'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>Legal</p>
                        <h1 className='mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl'>
                            Terms of Use
                        </h1>
                        <p className='mt-4 text-muted-foreground'>Effective date: 15 November 2025</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-4xl space-y-8'>
                    {items.map((item, index) => (
                        <Card
                            key={item.title}
                            className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'
                            style={{ animationDelay: `${index * 100}ms` }}>
                            <h2 className='text-xl font-semibold text-foreground'>{item.title}</h2>
                            <p className='mt-4 leading-relaxed text-muted-foreground'>{item.body}</p>
                        </Card>
                    ))}

                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 animate-in fade-in slide-in-from-bottom-6 delay-500 duration-500'>
                        <p className='text-muted-foreground'>
                            Questions about these terms? Email{' '}
                            <a
                                href='mailto:hello@capiflo.co.uk'
                                className='font-medium text-primary hover:underline'>
                                hello@capiflo.co.uk
                            </a>
                            .
                        </p>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;
