import { Star } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

const TESTIMONIALS = [
    {
        name: 'Leila Thompson',
        role: 'Founder',
        company: 'Bristol hospitality group',
        quote: 'Capiflo mapped our VAT loan and working capital plan in a single afternoon. Felt human, calm, and accurate.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
        name: 'Marcus Allen',
        role: 'Managing Director',
        company: 'London agency',
        quote: 'They prepared lender-ready packs so we secured £420k without endless back-and-forth.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=200&q=80'
    },
    {
        name: 'Priya Kapoor',
        role: 'COO',
        company: 'Manchester e-commerce brand',
        quote: 'Invoice finance advice plus calculators meant our team finally understood every option.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
    },
    {
        name: 'James Walker',
        role: 'CFO',
        company: 'Midlands manufacturer',
        quote: 'Same-day bridge, zero jargon, and a friendly team that kept everyone looped in.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80'
    }
];

const TestimonialsSection = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto flex max-w-6xl flex-col gap-10'>
                {/* Header */}
                <div className='flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                    <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                        Testimonials
                    </p>
                    <h2 className='text-3xl font-semibold text-foreground sm:text-4xl'>
                        What UK business owners say.
                    </h2>
                    <p className='max-w-2xl text-muted-foreground'>
                        Friendly, responsive support plus transparent product guidance keeps founders,
                        brokers, and lenders aligned.
                    </p>
                </div>

                {/* Grid */}
                <div className='grid gap-6 md:grid-cols-2'>
                    {TESTIMONIALS.map((testimonial, index) => (
                        <Card
                            key={testimonial.name}
                            className='group rounded-3xl border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-500'
                            style={{ animationDelay: `${index * 100 + 100}ms` }}>
                            {/* Quote */}
                            <blockquote className='text-lg text-foreground'>
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>

                            {/* Rating */}
                            <div className='mt-4 flex items-center gap-1'>
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className='h-4 w-4 fill-primary text-primary'
                                    />
                                ))}
                            </div>

                            {/* Author */}
                            <div className='mt-6 flex items-center gap-4'>
                                <Avatar className='h-12 w-12 border-2 border-primary/20'>
                                    <AvatarImage
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                    />
                                    <AvatarFallback className='bg-primary/15 text-primary'>
                                        {testimonial.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className='font-semibold text-foreground'>
                                        {testimonial.name}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        {testimonial.role} · {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* CTA */}
                <div className='text-center animate-in fade-in slide-in-from-bottom-4 delay-500 duration-500'>
                    <Button
                        size='lg'
                        className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                        asChild>
                        <Link href='/contact'>Join 5,000+ Funded SMEs</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
