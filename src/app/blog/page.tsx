import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, BookOpen } from 'lucide-react';

import { blogPosts } from '@/data/posts';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

export const metadata: Metadata = {
    title: 'Knowledge Centre | UK Business Finance Guides',
    description:
        'Read Capiflo articles on business loans UK, invoice finance, asset finance, bridging loans, and calculators to plan your next funding move.',
    keywords: ['business loans uk', 'invoice finance uk', 'merchant cash advance uk', 'asset finance']
};

const FEATURED_IMAGE_MAP: Record<string, string> = {
    'what-is-invoice-finance': '/images/Book Shop Business Loans.jpeg',
    'business-loan-calculator-uk': '/images/Carpentry Business Loans.jpeg',
    'merchant-cash-advance-vs-loan': '/images/Flower Shop Finance.jpeg'
};

const BlogPage = () => {
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

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
                            Knowledge Centre
                        </p>
                        <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                            Guides and funding explainers.
                        </h1>
                        <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                            Keyword-led articles so UK SMEs can understand their options before speaking
                            with lenders. New guides go live weekly across business loans, tax funding,
                            invoice finance, asset finance, and property-backed facilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='group overflow-hidden rounded-3xl border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <Link href={`/blog/${featuredPost.slug}`} className='grid lg:grid-cols-2'>
                            <div className='relative aspect-[16/10] lg:aspect-auto'>
                                <Image
                                    src={FEATURED_IMAGE_MAP[featuredPost.slug] || '/images/Coffee Shop Business Loans.jpeg'}
                                    alt={featuredPost.title}
                                    fill
                                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card' />
                            </div>
                            <div className='flex flex-col justify-center p-8 md:p-12'>
                                <div className='flex items-center gap-3'>
                                    <span className='rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary'>
                                        Featured
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <h2 className='mt-4 text-2xl font-semibold text-foreground sm:text-3xl'>
                                    {featuredPost.title}
                                </h2>
                                <p className='mt-4 text-muted-foreground'>{featuredPost.excerpt}</p>
                                <div className='mt-6 flex flex-wrap gap-2'>
                                    {featuredPost.keywords.slice(0, 3).map((keyword) => (
                                        <span
                                            key={keyword}
                                            className='rounded-full border border-border px-3 py-1 text-xs text-muted-foreground'>
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                                <div className='mt-6 flex items-center gap-2 text-sm font-medium text-primary'>
                                    <span>Read article</span>
                                    <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                </div>
                            </div>
                        </Link>
                    </Card>
                </div>
            </section>

            {/* All Posts Grid */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mb-12 flex items-center justify-between animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <div>
                            <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                                All articles
                            </p>
                            <h2 className='mt-2 text-2xl font-semibold text-foreground'>
                                Latest from the knowledge centre
                            </h2>
                        </div>
                        <div className='hidden items-center gap-2 text-sm text-muted-foreground sm:flex'>
                            <BookOpen className='h-4 w-4' />
                            <span>{blogPosts.length} articles</span>
                        </div>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {blogPosts.map((post, index) => (
                            <Card
                                key={post.slug}
                                className='group flex h-full flex-col overflow-hidden rounded-3xl border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <Link href={`/blog/${post.slug}`} className='flex h-full flex-col'>
                                    <div className='relative aspect-[16/10] overflow-hidden'>
                                        <Image
                                            src={FEATURED_IMAGE_MAP[post.slug] || '/images/IT Support Business Loans 2.jpeg'}
                                            alt={post.title}
                                            fill
                                            className='object-cover transition-transform duration-500 group-hover:scale-105'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
                                    </div>
                                    <div className='flex flex-1 flex-col p-6'>
                                        <p className='text-xs text-muted-foreground'>
                                            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <h3 className='mt-2 text-xl font-semibold text-foreground'>
                                            {post.title}
                                        </h3>
                                        <p className='mt-2 flex-1 text-sm text-muted-foreground'>
                                            {post.excerpt}
                                        </p>
                                        <div className='mt-4 flex flex-wrap gap-2'>
                                            {post.keywords.slice(0, 2).map((keyword) => (
                                                <span
                                                    key={keyword}
                                                    className='rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground'>
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                        <div className='mt-4 flex items-center gap-2 text-sm font-medium text-primary'>
                                            <span>Read more</span>
                                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-6xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-3xl font-semibold text-foreground'>
                            Ready to put this knowledge into action?
                        </h2>
                        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
                            Use our calculators to model your funding options, or speak directly with a
                            UK-based specialist.
                        </p>
                        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <Link href='/contact'>
                                    Talk to a Specialist
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

export default BlogPage;
