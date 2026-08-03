import type { Metadata } from 'next';
import Link from 'next/link';

import {
    ArrowRight,
    Banknote,
    BookOpen,
    Briefcase,
    Calculator,
    CheckCircle2,
    Clock,
    FileText,
    Handshake,
    HeadphonesIcon,
    Mail,
    Phone,
    Scale,
    Send,
    Users,
    Zap
} from 'lucide-react';

import { IntroducerForm } from '@/components/forms/introducer-form';
import { getFormattedPhone, getTelHref, hasRealPhone } from '@/data/business-config';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Become an Introducer | Partner with Capiflo',
    description:
        'Partner with Capiflo to refer SME funding opportunities. Access 120+ lenders, competitive commission, and dedicated partner support. Join our introducer network today.',
    keywords: [
        'finance introducer',
        'broker partner programme',
        'commercial finance referrals',
        'SME funding partner',
        'finance introducer UK'
    ]
};

const STATS = [
    { value: '120+', label: 'Lender panel' },
    { value: '24-48h', label: 'Typical decisions' },
    { value: '85%', label: 'Approval rate' },
    { value: 'Dedicated', label: 'Partner support' }
];

const BENEFITS = [
    {
        icon: Users,
        title: 'Wide lender panel',
        description: 'Access 120+ lenders through one relationship. More options means more approvals for your clients.'
    },
    {
        icon: Zap,
        title: 'Fast turnaround',
        description: 'Decisions in 24-48 hours. No waiting weeks for answers while your clients grow frustrated.'
    },
    {
        icon: Banknote,
        title: 'Competitive commission',
        description: 'Transparent, timely payments on completed deals. No chasing, no delays.'
    },
    {
        icon: HeadphonesIcon,
        title: 'White-glove support',
        description: 'Dedicated partner manager handles the heavy lifting. You stay focused on your core business.'
    }
];

const AUDIENCE = [
    { icon: Calculator, title: 'Accountants' },
    { icon: Briefcase, title: 'Commercial finance brokers' },
    { icon: BookOpen, title: 'Business consultants' },
    { icon: Scale, title: 'IFAs & wealth managers' },
    { icon: FileText, title: 'Solicitors & legal professionals' },
    { icon: Users, title: 'Business coaches' }
];

const PROCESS = [
    {
        step: '01',
        title: 'Register',
        description: 'Complete our simple introducer application form below.'
    },
    {
        step: '02',
        title: 'Refer',
        description: 'Send us your client\'s funding requirement with basic details.'
    },
    {
        step: '03',
        title: 'We package',
        description: 'We match to lenders, handle applications, and chase decisions.'
    },
    {
        step: '04',
        title: 'Get paid',
        description: 'Commission paid promptly on completion. No delays.'
    }
];

const FUNDING_TYPES = [
    { name: 'Business Loans', href: '/funding/business-loans' },
    { name: 'Invoice Finance', href: '/funding/invoice-finance' },
    { name: 'Merchant Cash Advance', href: '/funding/merchant-cash-advance' },
    { name: 'Asset Finance', href: '/funding/asset-finance' },
    { name: 'VAT & Tax Loans', href: '/funding/vat-loans' },
    { name: 'Property-Backed / Bridging', href: '/funding/property-backed' },
    { name: 'Recovery Finance', href: '/funding/recovery' }
];

const FAQS = [
    {
        question: 'How do I get paid?',
        answer: 'Commission is paid directly to you upon deal completion. We process payments promptly with full transparency on calculations.'
    },
    {
        question: 'What information do I need to refer a deal?',
        answer: 'Basic client details, funding amount required, purpose, and timeline. We handle the rest and will reach out if we need anything else.'
    },
    {
        question: 'Is there a minimum deal size?',
        answer: 'We work with funding requirements from £10,000 upwards. There\'s no maximum — we have lenders for deals of all sizes.'
    },
    {
        question: 'Can I track my referrals?',
        answer: 'Yes. You\'ll receive updates at each stage and have direct access to your partner manager for any questions.'
    }
];

const IntroducersPage = () => {
    return (
        <div className='space-y-20 md:space-y-24 lg:space-y-32 pb-24'>
            {/* Hero Section */}
            <section className='relative px-4 pt-20 lg:px-8 lg:pt-24'>
                <div className='absolute inset-0 -z-10 opacity-60 blur-3xl'>
                    <div className='absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' />
                </div>

                <div className='mx-auto max-w-6xl'>
                    <div className='max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Partner Programme
                        </p>
                        <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                            Partner with Capiflo
                        </h1>
                        <p className='mt-6 text-xl leading-relaxed text-muted-foreground'>
                            Refer SME funding opportunities. Get paid. Keep your clients happy.
                        </p>
                        <p className='mt-4 text-lg text-muted-foreground'>
                            Join our introducer network and give your clients access to 120+ lenders through one
                            trusted relationship. We handle the complexity — you focus on what you do best.
                        </p>
                        <div className='mt-8'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <a href='#register'>
                                    Become an Introducer
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className='mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-8 delay-200 duration-700'>
                        {STATS.map((stat, index) => (
                            <Card
                                key={stat.label}
                                className='rounded-2xl border-border/50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover'
                                style={{ animationDelay: `${index * 50}ms` }}>
                                <p className='text-3xl font-semibold text-primary'>{stat.value}</p>
                                <p className='mt-1 text-sm text-muted-foreground'>{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Partner With Us */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Why partner with us
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            Built for professionals who advise SMEs.
                        </h2>
                        <p className='mt-4 text-lg text-muted-foreground'>
                            When your clients need funding, you need a partner who delivers — fast, reliably, and without
                            the runaround.
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        {BENEFITS.map((benefit, index) => (
                            <Card
                                key={benefit.title}
                                className='rounded-3xl border-border/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <div className='mb-4 inline-flex rounded-xl bg-primary/15 p-3'>
                                    <benefit.icon className='h-6 w-6 text-primary' />
                                </div>
                                <h3 className='text-xl font-semibold text-foreground'>{benefit.title}</h3>
                                <p className='mt-3 text-muted-foreground'>{benefit.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Work With */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Who we work with
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            If you advise SMEs and they need funding, we should talk.
                        </h2>
                    </div>

                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {AUDIENCE.map((item, index) => (
                            <Card
                                key={item.title}
                                className='flex items-center gap-4 rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 75}ms` }}>
                                <div className='rounded-xl bg-primary/15 p-2.5'>
                                    <item.icon className='h-5 w-5 text-primary' />
                                </div>
                                <span className='font-medium text-foreground'>{item.title}</span>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            How it works
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            Simple process. No complexity.
                        </h2>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        {PROCESS.map((item, index) => (
                            <Card
                                key={item.step}
                                className='group relative rounded-3xl border-border/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <span className='absolute right-6 top-6 text-5xl font-bold text-muted/20 transition-colors group-hover:text-primary/20'>
                                    {item.step}
                                </span>
                                <div className='mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground'>
                                    {item.step}
                                </div>
                                <h3 className='text-xl font-semibold text-foreground'>{item.title}</h3>
                                <p className='mt-3 text-muted-foreground'>{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Fund */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-border/50 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <div className='grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:items-center'>
                            <div>
                                <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                    What we fund
                                </p>
                                <h2 className='mt-4 text-3xl font-semibold text-foreground'>
                                    Full spectrum of SME finance.
                                </h2>
                                <p className='mt-4 text-muted-foreground'>
                                    Whatever your client needs — working capital, equipment, tax bills, or property —
                                    we have lenders ready to help.
                                </p>
                                <Button variant='outline' className='mt-6' asChild>
                                    <Link href='/funding'>
                                        View all funding types
                                        <ArrowRight className='ml-2 h-4 w-4' />
                                    </Link>
                                </Button>
                            </div>
                            <div className='grid gap-3 sm:grid-cols-2'>
                                {FUNDING_TYPES.map((type, index) => (
                                    <Link
                                        key={type.name}
                                        href={type.href}
                                        className='flex items-center gap-3 rounded-xl border border-border/50 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                        style={{ animationDelay: `${index * 50}ms` }}>
                                        <CheckCircle2 className='h-5 w-5 shrink-0 text-primary' />
                                        <span className='text-sm font-medium text-foreground'>{type.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Registration Form */}
            <section id='register' className='scroll-mt-24 px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16'>
                        {/* Left: Content */}
                        <div className='flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                            <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                Join our network
                            </p>
                            <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                                Apply to become an introducer.
                            </h2>
                            <p className='mt-4 text-lg text-muted-foreground'>
                                Complete the form and we'll be in touch within 2 working days to discuss partnership
                                terms and get you set up.
                            </p>

                            <div className='mt-8 space-y-4'>
                                {[
                                    { icon: Clock, text: 'Response within 2 working days' },
                                    { icon: Handshake, text: 'No minimum deal requirements' },
                                    { icon: Send, text: 'Start referring immediately after approval' }
                                ].map((item, index) => (
                                    <div
                                        key={item.text}
                                        className='flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500'
                                        style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                        <div className='rounded-lg bg-primary/15 p-2'>
                                            <item.icon className='h-4 w-4 text-primary' />
                                        </div>
                                        <span className='text-muted-foreground'>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 delay-500 duration-500'>
                                <a
                                    href='mailto:partners@capiflo.co.uk'
                                    className='flex items-center gap-2 transition-colors hover:text-primary'>
                                    <Mail className='h-4 w-4' />
                                    partners@capiflo.co.uk
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
                            <IntroducerForm />
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                            Common questions
                        </p>
                        <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                            Frequently asked questions.
                        </h2>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        {FAQS.map((faq, index) => (
                            <Card
                                key={faq.question}
                                className='rounded-3xl border-border/50 p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <h3 className='text-lg font-semibold text-foreground'>{faq.question}</h3>
                                <p className='mt-3 text-muted-foreground'>{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Alternative Contact CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-3xl font-semibold text-foreground'>
                            Prefer to talk first?
                        </h2>
                        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
                            Book a call with our partnerships team. We'll walk you through how Capiflo works,
                            answer your questions, and see if we're the right fit.
                        </p>
                        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'>
                                Book a Call
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/about'>Learn About Capiflo</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default IntroducersPage;
