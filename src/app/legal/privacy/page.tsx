import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Privacy Policy | Capiflo',
    description: 'Read how Capiflo handles personal data for business funding enquiries in the UK.'
};

const sections = [
    {
        title: 'Data we collect',
        body: 'Contact names, company information, financial summaries, funding requirements, and site analytics. We only request data needed to assess business funding options.'
    },
    {
        title: 'How data is used',
        body: 'Information is shared with vetted lenders, brokers, and CRM platforms to progress your application. We also use anonymised data for performance tracking and SEO improvements.'
    },
    {
        title: 'Retention & rights',
        body: 'Records are stored for up to six years in line with HMRC record-keeping guidelines. Email hello@capiflo.co.uk to request deletion or updates.'
    },
    {
        title: 'Cookies',
        body: 'We use essential cookies to maintain sessions and analytics cookies to understand site usage. You can manage preferences through your browser settings.'
    },
    {
        title: 'Third parties',
        body: 'We may share your data with the lenders and funding providers on our panel, credit reference agencies (soft searches only at enquiry stage), and technology partners who help us deliver our services.'
    }
];

const PrivacyPage = () => {
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
                            Privacy Policy
                        </h1>
                        <p className='mt-4 text-muted-foreground'>Effective date: 15 November 2025</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-4xl space-y-8'>
                    {sections.map((section, index) => (
                        <Card
                            key={section.title}
                            className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'
                            style={{ animationDelay: `${index * 100}ms` }}>
                            <h2 className='text-xl font-semibold text-foreground'>{section.title}</h2>
                            <p className='mt-4 leading-relaxed text-muted-foreground'>{section.body}</p>
                        </Card>
                    ))}

                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 animate-in fade-in slide-in-from-bottom-6 delay-500 duration-500'>
                        <p className='text-muted-foreground'>
                            Capiflo is a trading style of Capiflo Ltd, registered in England & Wales. For
                            any concerns about how we handle your data, contact{' '}
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

export default PrivacyPage;
