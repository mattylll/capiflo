'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface StatConfig {
    value: string;
    numericValue?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    description: string;
}

const STATS: StatConfig[] = [
    {
        value: '£1bn+',
        numericValue: 1,
        prefix: '£',
        suffix: 'bn+',
        label: 'SME funding unlocked',
        description: 'Capital deployed to UK businesses'
    },
    {
        value: '< 60 mins',
        numericValue: 60,
        prefix: '< ',
        suffix: ' mins',
        label: 'Average guidance time',
        description: 'From brief to recommended route'
    },
    {
        value: '120+',
        numericValue: 120,
        prefix: '',
        suffix: '+',
        label: 'Lenders benchmarked',
        description: 'UK partners across every sector'
    },
    {
        value: 'Every region',
        label: 'Nationwide coverage',
        description: 'Regional brokers & partners'
    }
];

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (!start) return;
        
        let startTime: number;
        let animationFrame: number;
        
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function for smooth deceleration
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

// Individual stat component with counter
const StatItem = ({ stat, index, isVisible }: { stat: StatConfig; index: number; isVisible: boolean }) => {
    const count = useCountUp(stat.numericValue || 0, 2000, isVisible);
    
    const displayValue = stat.numericValue 
        ? `${stat.prefix || ''}${count}${stat.suffix || ''}`
        : stat.value;
    
    return (
        <div
            className={`text-center lg:text-left ${
                isVisible
                    ? 'animate-in fade-in slide-in-from-bottom-4 duration-500'
                    : 'opacity-0'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}>
            <p 
                className='text-3xl font-semibold text-foreground md:text-4xl tabular-nums'
                style={{ 
                    textShadow: isVisible ? '0 0 30px rgba(255, 77, 184, 0.4), 0 0 60px rgba(255, 77, 184, 0.2)' : 'none',
                    transition: 'text-shadow 0.5s ease-out'
                }}>
                {displayValue}
            </p>
            <p className='mt-2 text-sm font-medium uppercase tracking-wider text-primary'>
                {stat.label}
            </p>
            <p className='mt-1 text-sm text-muted-foreground'>
                {stat.description}
            </p>
        </div>
    );
};

const ImpactStats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <div className='rounded-3xl border border-border/50 bg-card/50 p-8 shadow-card backdrop-blur-sm md:p-12'>
                    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12'>
                        {STATS.map((stat, index) => (
                            <StatItem 
                                key={stat.label} 
                                stat={stat} 
                                index={index} 
                                isVisible={isVisible} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;
