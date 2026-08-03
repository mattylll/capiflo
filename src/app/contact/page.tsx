import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { CheckCircle2, Clock, Mail, Phone, Shield } from 'lucide-react';

import { ContactForm } from '@/components/forms/contact-form';
import { getFormattedPhone, getTelHref, hasRealPhone } from '@/data/business-config';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Contact Capiflo | Business Funding Support',
    description:
        'Start your UK business funding journey with Capiflo. Share your company details, amount required, and timing to receive a rapid funding roadmap.',
    keywords: ['business funding', 'business loans uk', 'commercial finance brokers uk']
};

const BENEFITS = [
    {
        icon: Clock,
        title: 'Response within 2 hours',
        description: 'Our team reviews your enquiry and responds during business hours.'
    },
    {
        icon: Shield,
        title: 'No hard credit check',
        description: 'Initial enquiries use soft searches that won\'t affect your credit score.'
    },
    {
        icon: CheckCircle2,
        title: 'Pre-qualified options',
        description: 'We match you with lenders where you meet core criteria.'
    }
];

const ContactPage = () => {
    return (
        <div className='space-y-20 md:space-y-24 lg:space-y-32 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16'>
                        {/* Left: Content */}
                        <div className='flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                            <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                Contact us
                            </p>
                            <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                                Share your brief and we'll map the right funding route.
                            </h1>
                            <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                                Typical response time is under two working hours. Where your data matches a
                                lender's criteria, the request is sent straight through via API — only
                                applicants needing clarification will hear from us directly.
                            </p>

                            {/* Benefits */}
                            <div className='mt-10 space-y-4'>
                                {BENEFITS.map((benefit, index) => (
                                    <div
                                        key={benefit.title}
                                        className='flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                        style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                        <div className='rounded-xl bg-primary/15 p-2.5'>
                                            <benefit.icon className='h-5 w-5 text-primary' />
                                        </div>
                                        <div>
                                            <p className='font-semibold text-foreground'>{benefit.title}</p>
                                            <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className='mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 delay-500 duration-500'>
                                <a
                                    href='mailto:hello@capiflo.co.uk'
                                    className='flex items-center gap-2 transition-colors hover:text-primary'>
                                    <Mail className='h-4 w-4' />
                                    hello@capiflo.co.uk
                                </a>
                                {hasRealPhone() && (
                                    <a
                                        href={getTelHref()}
                                        className='flex items-center gap-2 transition-colors hover:text-primary'>
                                        <Phone className='h-4 w-4' />
                                        {getFormattedPhone()}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Right: Form */}
                        <Card className='rounded-3xl border-border/50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700'>
                            <ContactForm />
                        </Card>
                    </div>
                </div>
            </section>

            {/* What to Expect Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='overflow-hidden rounded-3xl border-border/50 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <div className='grid lg:grid-cols-2'>
                            <div className='p-8 md:p-12'>
                                <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                    What to expect
                                </p>
                                <h2 className='mt-4 text-3xl font-semibold text-foreground'>
                                    Our process is designed for speed.
                                </h2>
                                <ul className='mt-8 space-y-4'>
                                    {[
                                        'We validate trading history, security profile, and director status against lender requirements.',
                                        'Eligible cases are pushed to lenders automatically; you receive the confirmations.',
                                        'If something\'s missing, we\'ll reach out for the exact document or answer needed.',
                                        'You\'ll receive a funding roadmap within 24 hours of initial review.'
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className='flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                            style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                            <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                            <span className='text-muted-foreground'>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='relative min-h-[300px] lg:min-h-0'>
                                <Image
                                    src='/images/Bakery Business Loans.jpeg'
                                    alt='Business consultation'
                                    fill
                                    className='object-cover'
                                />
                                <div className='absolute inset-0 bg-gradient-to-r from-card via-card/50 to-transparent lg:from-card lg:via-transparent lg:to-transparent' />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Alternative Contact */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-3xl font-semibold text-foreground'>
                            Prefer to talk first?
                        </h2>
                        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
                            Book a 15-minute call with a UK-based funding specialist. No pressure, no
                            obligation — just clear answers to your questions.
                        </p>
                        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'>
                                Book a Call
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/calculators'>Try Our Calculators</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
