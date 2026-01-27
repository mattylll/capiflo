'use client';

import { Clock, PoundSterling, Star } from 'lucide-react';

const LOGOS = ['Barclays', 'Starling', 'Funding Circle', 'Iwoca', 'HSBC', 'NatWest', 'Metro Bank', 'Tide'];

const STATS = [
    {
        icon: Star,
        value: '4.9/5',
        label: 'Client satisfaction',
        sublabel: 'Trustpilot rating'
    },
    {
        icon: Clock,
        value: '12 hrs',
        label: 'Median response',
        sublabel: 'Enquiry to lender intro'
    },
    {
        icon: PoundSterling,
        value: '£50k – £5m',
        label: 'Funding range',
        sublabel: 'Most common amounts'
    }
];

const TrustPanel = () => {
    return (
        <section className='px-4 lg:px-8'>
            {/* Marquee animation styles */}
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes icon-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>

            <div className='mx-auto max-w-6xl'>
                <div className='rounded-3xl border border-border/50 bg-card/80 p-8 shadow-card backdrop-blur-xl md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    {/* Header */}
                    <p className='text-center text-sm font-medium uppercase tracking-widest text-muted-foreground'>
                        Trusted by leading UK lenders
                    </p>

                    {/* Logo marquee */}
                    <div className='relative mt-8 overflow-hidden'>
                        {/* Gradient masks */}
                        <div className='absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-card to-transparent' />
                        <div className='absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-card to-transparent' />
                        
                        {/* Scrolling logos */}
                        <div 
                            className='flex gap-4'
                            style={{ 
                                animation: 'marquee 25s linear infinite',
                                width: 'max-content'
                            }}>
                            {/* Double the logos for seamless loop */}
                            {[...LOGOS, ...LOGOS].map((logo, index) => (
                                <span
                                    key={`${logo}-${index}`}
                                    className='flex-shrink-0 rounded-full border border-border/50 bg-muted/50 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground cursor-pointer'>
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent' />

                    {/* Stats */}
                    <div className='grid gap-8 sm:grid-cols-3'>
                        {STATS.map((stat, index) => (
                            <div
                                key={stat.label}
                                className='group text-center animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer'
                                style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                <div 
                                    className='mx-auto mb-4 inline-flex rounded-xl bg-primary/15 p-3 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110'
                                    style={{ animation: `icon-pulse 3s ease-in-out infinite`, animationDelay: `${index * 0.3}s` }}>
                                    <stat.icon className='h-5 w-5 text-primary' />
                                </div>
                                <p 
                                    className='text-3xl font-semibold text-foreground md:text-4xl tabular-nums'
                                    style={{ 
                                        textShadow: '0 0 20px rgba(255, 77, 184, 0.2)'
                                    }}>
                                    {stat.value}
                                </p>
                                <p className='mt-1 text-sm font-medium text-foreground'>
                                    {stat.label}
                                </p>
                                <p className='text-xs text-muted-foreground'>{stat.sublabel}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustPanel;
