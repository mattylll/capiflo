'use client';

import { FileText, Route, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

const STEPS = [
    {
        icon: FileText,
        step: '01',
        title: 'Share your brief',
        description:
            'Tell us about your business, funding needs, and timeline. Takes under 5 minutes.'
    },
    {
        icon: Route,
        step: '02',
        title: 'Get matched',
        description:
            'Our system analyses 120+ lenders to find your best routes. Instant results, no credit impact.'
    },
    {
        icon: Users,
        step: '03',
        title: 'Expert guidance',
        description:
            'A UK-based specialist reviews your options and prepares lender-ready documentation.'
    }
];

const HowItWorks = () => {
    return (
        <section className='px-4 lg:px-8'>
            {/* Animation styles */}
            <style jsx global>{`
                @keyframes pulse-ring {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.1); opacity: 0.6; }
                }
                @keyframes draw-line {
                    0% { stroke-dashoffset: 100; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

            <div className='mx-auto max-w-6xl'>
                {/* Header */}
                <div className='mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                        How it works
                    </p>
                    <h2 className='mt-4 text-3xl font-semibold text-foreground sm:text-4xl'>
                        Your funding concierge team.
                    </h2>
                    <p className='mt-4 text-lg text-muted-foreground'>
                        Share a brief and a human specialist replies within two hours with options,
                        paperwork checklists, and lender-ready talking points.
                    </p>
                </div>

                {/* Steps with connecting lines */}
                <div className='relative'>
                    {/* Connecting line (desktop only) */}
                    <div className='absolute left-0 right-0 top-[4.5rem] hidden h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block'>
                        <div 
                            className='h-full w-full bg-gradient-to-r from-primary via-primary to-primary'
                            style={{
                                maskImage: 'linear-gradient(90deg, transparent 5%, black 15%, black 85%, transparent 95%)',
                                WebkitMaskImage: 'linear-gradient(90deg, transparent 5%, black 15%, black 85%, transparent 95%)'
                            }}
                        />
                    </div>

                    <div className='grid gap-6 md:grid-cols-3'>
                        {STEPS.map((item, index) => (
                            <Card
                                key={item.step}
                                className='group relative overflow-hidden rounded-3xl border-border/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover cursor-pointer animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                {/* Step number with pulsing ring */}
                                <div className='absolute right-6 top-6'>
                                    <span className='relative text-6xl font-bold text-muted/30'>
                                        {item.step}
                                        <span 
                                            className='absolute inset-0 rounded-full'
                                            style={{
                                                background: 'radial-gradient(circle, rgba(255,77,184,0.15) 0%, transparent 70%)',
                                                animation: 'pulse-ring 3s ease-in-out infinite',
                                                animationDelay: `${index * 0.5}s`
                                            }}
                                        />
                                    </span>
                                </div>

                                {/* Icon with enhanced animation */}
                                <div className='relative mb-6 inline-flex rounded-2xl bg-primary/15 p-4 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110'>
                                    <item.icon className='h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110' />
                                </div>

                                {/* Content */}
                                <h3 className='text-xl font-semibold text-foreground'>{item.title}</h3>
                                <p className='mt-3 text-muted-foreground'>{item.description}</p>

                                {/* Progress indicator on hover */}
                                <div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full' />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Bottom note with enhanced styling */}
                <div className='mt-12 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-6 py-4 text-center animate-in fade-in slide-in-from-bottom-4 delay-500 duration-500'>
                    <p className='text-sm text-muted-foreground'>
                        <span className='font-medium text-foreground'>No hard credit checks.</span>{' '}
                        Your enquiry won&apos;t affect your credit score.
                    </p>
                </div>

                {/* CTA */}
                <div className='mt-10 text-center animate-in fade-in slide-in-from-bottom-4 delay-700 duration-500'>
                    <Button
                        size='lg'
                        className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                        asChild>
                        <Link href='/contact'>Start Your Application</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
