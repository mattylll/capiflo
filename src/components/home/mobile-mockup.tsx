'use client';

import { CheckCircle, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

const FUNDING_AMOUNTS = ['£350,000', '£420,000', '£285,000', '£510,000'];
const ROUTES = ['Invoice Finance + VAT Bridge', 'Business Loan + Asset Finance', 'MCA + Working Capital'];

const MobileMockup = () => {
    const [amountIndex, setAmountIndex] = useState(0);
    const [routeIndex, setRouteIndex] = useState(0);

    // Animate through different values
    useEffect(() => {
        const amountInterval = setInterval(() => {
            setAmountIndex((prev) => (prev + 1) % FUNDING_AMOUNTS.length);
        }, 3000);
        
        const routeInterval = setInterval(() => {
            setRouteIndex((prev) => (prev + 1) % ROUTES.length);
        }, 4000);
        
        return () => {
            clearInterval(amountInterval);
            clearInterval(routeInterval);
        };
    }, []);

    return (
        <section className='px-4 lg:px-8'>
            {/* Animation styles */}
            <style jsx global>{`
                @keyframes phone-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes value-fade {
                    0%, 100% { opacity: 1; }
                    45%, 55% { opacity: 0; }
                }
            `}</style>

            <div className='mx-auto max-w-6xl'>
                <div className='overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 shadow-card backdrop-blur-xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    {/* Left: Content */}
                    <div className='space-y-6'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
                            <Smartphone className='h-4 w-4' />
                            Mobile experience
                        </div>
                        <h2 className='text-3xl font-semibold text-foreground sm:text-4xl'>
                            See your funding range on mobile.
                        </h2>
                        <p className='text-muted-foreground'>
                            Each calculator renders beautifully on mobile so busy founders can compare
                            routes on the go. The UI mirrors what lenders need, so you can share
                            screenshots or export summaries directly into meetings.
                        </p>
                        <ul className='space-y-3'>
                            {[
                                'Clear funding range: £350,000 – £420,000',
                                'Suggested routes (business loan, invoice finance)',
                                'Smart routing notes and instant sharing'
                            ].map((item) => (
                                <li key={item} className='flex items-start gap-3 text-muted-foreground'>
                                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Phone mockup with floating animation */}
                    <div className='mt-10 flex items-center justify-center lg:mt-0'>
                        <div 
                            className='relative'
                            style={{ animation: 'phone-float 6s ease-in-out infinite' }}>
                            {/* Phone frame */}
                            <div className='relative h-[440px] w-[220px] overflow-hidden rounded-[40px] border-4 border-foreground/10 bg-foreground shadow-elevated'>
                                {/* Notch */}
                                <div className='absolute inset-x-16 top-2 h-6 rounded-full bg-foreground' />

                                {/* Screen content */}
                                <div className='absolute inset-2 top-8 overflow-hidden rounded-[32px] bg-background'>
                                    <div className='h-full space-y-4 p-4'>
                                        {/* Header with animated value */}
                                        <div className='rounded-2xl border border-border bg-card p-4'>
                                            <p className='text-xs font-medium uppercase tracking-wider text-primary'>
                                                Live summary
                                            </p>
                                            <p 
                                                className='mt-1 text-3xl font-bold text-foreground tabular-nums transition-opacity duration-300'
                                                key={amountIndex}>
                                                {FUNDING_AMOUNTS[amountIndex]}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                Estimated funding range
                                            </p>
                                        </div>

                                        {/* Routes with animated value */}
                                        <div className='rounded-2xl border border-border bg-card/50 p-4'>
                                            <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                                                Suggested routes
                                            </p>
                                            <p 
                                                className='mt-1 text-sm font-medium text-foreground transition-opacity duration-300'
                                                key={routeIndex}>
                                                {ROUTES[routeIndex]}
                                            </p>
                                            <div className='mt-2 flex items-center gap-2'>
                                                <div className='h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse' />
                                                <span className='text-xs text-muted-foreground'>
                                                    High confidence
                                                </span>
                                            </div>
                                        </div>

                                        {/* AI note */}
                                        <div className='rounded-2xl border border-primary/30 bg-primary/5 p-4'>
                                            <p className='text-xs font-medium uppercase tracking-wider text-primary'>
                                                AI routing note
                                            </p>
                                            <p className='mt-1 text-xs text-muted-foreground'>
                                                "£2.4m turnover, 4 yrs trading. Invoice line + VAT loan
                                                recommended."
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <button className='w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30'>
                                            Share with broker
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative glow - enhanced */}
                            <div 
                                className='absolute -inset-6 -z-10 rounded-[60px] blur-3xl'
                                style={{
                                    background: 'radial-gradient(ellipse at center, rgba(255,77,184,0.3) 0%, transparent 70%)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileMockup;
