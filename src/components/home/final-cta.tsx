'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

import { Button } from '@/registry/new-york-v4/ui/button';

// Animated counter hook
const useCountUp = (end: number, duration: number = 2500, start: boolean = false) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (!start) return;
        
        let startTime: number;
        let animationFrame: number;
        
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };
        
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);
    
    return count;
};

const FinalCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const count = useCountUp(5432, 2500, isVisible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className='px-4 lg:px-8'>
            {/* Animation keyframes */}
            <style jsx global>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 10px 40px -10px rgba(0,0,0,0.3); }
                    50% { box-shadow: 0 0 40px rgba(255,255,255,0.5), 0 15px 50px -10px rgba(0,0,0,0.4); }
                }
            `}</style>

            <div className='mx-auto max-w-6xl'>
                <div 
                    className='relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-12 md:py-20 animate-in fade-in slide-in-from-bottom-6 duration-700'
                    style={{
                        background: 'linear-gradient(135deg, #ff4db8 0%, #ff6dc8 25%, #8b5cf6 50%, #ff4db8 75%, #ff6dc8 100%)',
                        backgroundSize: '300% 300%',
                        animation: 'gradient-shift 8s ease infinite'
                    }}>
                    {/* Floating particles */}
                    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className='absolute rounded-full bg-white/20'
                                style={{
                                    width: `${20 + i * 10}px`,
                                    height: `${20 + i * 10}px`,
                                    left: `${10 + i * 15}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                    animation: `float-particle ${4 + i}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.5}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Background decoration - enhanced */}
                    <div className='absolute inset-0 -z-10 opacity-40'>
                        <div className='absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/30 blur-3xl' />
                        <div className='absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/30 blur-3xl' />
                        <div className='absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl' />
                    </div>

                    {/* Content */}
                    <h2 className='relative text-3xl font-semibold text-primary-foreground sm:text-4xl lg:text-5xl'>
                        Ready to find your best funding option?
                    </h2>
                    <p className='relative mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90'>
                        Join <span className='font-semibold tabular-nums'>{count.toLocaleString()}+</span> UK SMEs who found clarity with Capiflo. No jargon, no pressure — just
                        transparent guidance.
                    </p>

                    {/* CTA Button with pulsing glow */}
                    <div className='relative mt-10'>
                        <Button
                            size='lg'
                            variant='secondary'
                            className='h-14 px-10 text-base font-semibold transition-all hover:-translate-y-0.5'
                            style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
                            asChild>
                            <Link href='/contact'>
                                Get Started
                                <ArrowRight className='ml-2 h-5 w-5' />
                            </Link>
                        </Button>
                    </div>

                    {/* Trust indicator */}
                    <p className='relative mt-8 text-sm text-primary-foreground/70'>
                        Free consultation · No hard credit check · Decisions in 24 hours
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
