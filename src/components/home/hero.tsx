'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Shield, Award, CheckCircle } from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';

const Hero = () => {
    return (
        <section className='relative flex min-h-[85vh] items-center px-4 pt-20 lg:px-8 lg:pt-24 overflow-hidden'>
            {/* Aurora mesh gradient background */}
            <div className='absolute inset-0 -z-10'>
                {/* Animated gradient orbs */}
                <div 
                    className='absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-60 blur-3xl'
                    style={{
                        background: 'radial-gradient(circle, rgba(255,77,184,0.4) 0%, transparent 70%)',
                        animation: 'aurora-float-1 12s ease-in-out infinite'
                    }}
                />
                <div 
                    className='absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full opacity-50 blur-3xl'
                    style={{
                        background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                        animation: 'aurora-float-2 15s ease-in-out infinite'
                    }}
                />
                <div 
                    className='absolute left-1/2 bottom-1/4 h-[350px] w-[350px] -translate-x-1/2 rounded-full opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(circle, rgba(47,107,255,0.25) 0%, transparent 70%)',
                        animation: 'aurora-float-3 10s ease-in-out infinite'
                    }}
                />
            </div>

            {/* Keyframe animations */}
            <style jsx>{`
                @keyframes aurora-float-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -20px) scale(1.05); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }
                @keyframes aurora-float-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-25px, 25px) scale(1.1); }
                    66% { transform: translate(25px, -15px) scale(0.9); }
                }
                @keyframes aurora-float-3 {
                    0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
                    50% { transform: translateX(-50%) translateY(-30px) scale(1.1); }
                }
            `}</style>

            <div className='mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16'>
                {/* Left: Copy */}
                <div className='flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    <p className='text-sm font-medium uppercase tracking-widest text-muted-foreground'>
                        Capiflo
                    </p>
                    {/* Gradient headline */}
                    <h1 
                        className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl'
                        style={{
                            background: 'linear-gradient(135deg, var(--foreground) 0%, var(--foreground) 50%, #ff4db8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                        We compare 120+ lenders to find your best rate in 60 minutes.
                    </h1>
                    <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl'>
                        Fast, transparent funding decisions for UK SMEs. Expert guidance, no jargon, no hard credit checks.
                    </p>

                    <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
                        <Button
                            size='lg'
                            className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                            asChild>
                            <Link href='/contact'>Get Funded Now</Link>
                        </Button>
                        <Button
                            size='lg'
                            variant='outline'
                            className='h-12 px-8 text-base transition-all hover:-translate-y-0.5'
                            asChild>
                            <Link href='/calculators'>Check Eligibility</Link>
                        </Button>
                    </div>

                    {/* Trust indicators */}
                    <div className='mt-8 flex flex-wrap items-center gap-4'>
                        <span className='inline-flex items-center gap-2 text-sm text-muted-foreground'>
                            <span className='inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse' />
                            Trustpilot 4.9/5
                        </span>
                        <span className='text-border'>·</span>
                        <span className='text-sm text-muted-foreground'>5,000+ UK SMEs funded</span>
                    </div>

                    {/* Trust badges row */}
                    <div className='mt-6 flex flex-wrap items-center gap-3'>
                        <div className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30'>
                            <Shield className='h-3.5 w-3.5 text-primary' />
                            FCA Authorised
                        </div>
                        <div className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30'>
                            <Award className='h-3.5 w-3.5 text-primary' />
                            Award Winning
                        </div>
                        <div className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30'>
                            <CheckCircle className='h-3.5 w-3.5 text-primary' />
                            No Credit Impact
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className='relative animate-in fade-in slide-in-from-bottom-8 delay-150 duration-700'>
                    <div className='relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-elevated'>
                        <div className='relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10'>
                            <Image
                                src='/images/capiflo-hero-pink.png'
                                alt='Capiflo funding advisor'
                                fill
                                className='object-cover object-top'
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
                        </div>

                        {/* Floating quote with enhanced glassmorphism */}
                        <div className='absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/50 px-5 py-4 backdrop-blur-xl shadow-xl'>
                            <p className='text-sm font-medium text-white'>
                                "We knew our funding range before the lender call."
                            </p>
                            <p className='mt-1 text-xs text-white/70'>
                                Hannah · Retail founder
                            </p>
                        </div>
                    </div>

                    {/* Decorative badge with glow */}
                    <div 
                        className='absolute -right-4 -top-4 rounded-2xl border border-primary/30 bg-card px-4 py-2 shadow-lg lg:-right-6 lg:-top-6'
                        style={{ boxShadow: '0 10px 40px -10px rgba(255, 77, 184, 0.3)' }}>
                        <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                            Decisions in
                        </p>
                        <p className='text-2xl font-semibold text-foreground'>24hrs</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
