import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight, CheckCircle2, Clock, Mail, Phone } from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Thank You | Capiflo',
    description: 'Thank you for your submission. We will be in touch shortly.',
    robots: 'noindex, nofollow'
};

interface ThankYouPageProps {
    searchParams: Promise<{ type?: string }>;
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
    const params = await searchParams;
    const isIntroducer = params.type === 'introducer';

    const NEXT_STEPS = isIntroducer
        ? [
              'We review your application within 2 working days',
              'A partner manager will reach out to discuss terms',
              'Once approved, you can start referring deals immediately',
              'You\'ll receive access to our partner portal and resources'
          ]
        : [
              'We review your details against lender criteria',
              'Eligible cases are matched to suitable lenders',
              'You\'ll receive a funding roadmap within 24 hours',
              'A specialist will call if we need any clarification'
          ];

    return (
        <div className='space-y-20 md:space-y-24 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-3xl text-center'>
                    <div className='mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 animate-in fade-in zoom-in duration-500'>
                        <CheckCircle2 className='h-10 w-10 text-primary' />
                    </div>

                    <h1 className='text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        {isIntroducer ? 'Application received' : 'Enquiry received'}
                    </h1>

                    <p className='mt-6 text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-6 delay-100 duration-700'>
                        {isIntroducer
                            ? 'Thank you for applying to become a Capiflo introducer. We\'ll review your application and be in touch within 2 working days.'
                            : 'Thank you for your funding enquiry. Our team is already reviewing your details and will be in touch shortly.'}
                    </p>
                </div>
            </section>

            {/* What Happens Next */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-3xl'>
                    <Card className='rounded-3xl border-border/50 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 delay-200 duration-700'>
                        <div className='mb-6 flex items-center gap-3'>
                            <div className='rounded-xl bg-primary/15 p-2.5'>
                                <Clock className='h-5 w-5 text-primary' />
                            </div>
                            <h2 className='text-2xl font-semibold text-foreground'>What happens next</h2>
                        </div>

                        <ul className='space-y-4'>
                            {NEXT_STEPS.map((step, index) => (
                                <li
                                    key={index}
                                    className='flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                    style={{ animationDelay: `${index * 100 + 300}ms` }}>
                                    <div className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground'>
                                        {index + 1}
                                    </div>
                                    <span className='text-muted-foreground'>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </section>

            {/* Contact Info */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-3xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 delay-300 duration-700'>
                        <h2 className='text-2xl font-semibold text-foreground'>Need to get in touch sooner?</h2>
                        <p className='mt-3 text-muted-foreground'>
                            If you have urgent questions or need to add information to your{' '}
                            {isIntroducer ? 'application' : 'enquiry'}, feel free to contact us directly.
                        </p>

                        <div className='mt-6 flex flex-wrap gap-6 text-sm'>
                            <a
                                href={isIntroducer ? 'mailto:partners@capiflo.co.uk' : 'mailto:hello@capiflo.co.uk'}
                                className='flex items-center gap-2 text-foreground transition-colors hover:text-primary'>
                                <Mail className='h-4 w-4' />
                                {isIntroducer ? 'partners@capiflo.co.uk' : 'hello@capiflo.co.uk'}
                            </a>
                            <a
                                href='tel:+442012345678'
                                className='flex items-center gap-2 text-foreground transition-colors hover:text-primary'>
                                <Phone className='h-4 w-4' />
                                020 1234 5678
                            </a>
                        </div>

                        <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <Link href='/'>
                                    Back to Home
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Link>
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/calculators'>Explore Calculators</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ThankYouPage;
