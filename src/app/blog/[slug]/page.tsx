import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';

import { blogPosts } from '@/data/posts';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export const generateStaticParams = () => blogPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);
    if (!post) {
        return {};
    }

    return {
        title: `${post.title} | Capiflo`,
        description: post.excerpt,
        keywords: post.keywords
    };
};

const FEATURED_IMAGE_MAP: Record<string, string> = {
    'what-is-invoice-finance': '/images/Book Shop Business Loans.jpeg',
    'business-loan-calculator-uk': '/images/Carpentry Business Loans.jpeg',
    'merchant-cash-advance-vs-loan': '/images/Flower Shop Finance.jpeg'
};

const BlogPostPage = async ({ params }: { params: Params }) => {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);
    if (!post) {
        notFound();
    }

    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    const readingTime = Math.ceil(
        post.content.reduce((acc, section) => acc + section.body.join(' ').split(' ').length, 0) / 200
    );

    return (
        <div className='space-y-20 md:space-y-24 pb-24'>
            {/* Hero Section */}
            <section className='relative'>
                <div className='relative h-[40vh] min-h-[300px] w-full'>
                    <Image
                        src={FEATURED_IMAGE_MAP[post.slug] || '/images/Coffee Shop Business Loans.jpeg'}
                        alt={post.title}
                        fill
                        className='object-cover'
                        priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent' />
                </div>

                <div className='relative z-10 -mt-32 px-4 lg:px-8'>
                    <article className='mx-auto max-w-3xl'>
                        <div className='animate-in fade-in slide-in-from-bottom-6 duration-700'>
                            <Link
                                href='/blog'
                                className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary'>
                                <ArrowLeft className='h-4 w-4' />
                                Back to Knowledge Centre
                            </Link>

                            <div className='mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                                <span className='flex items-center gap-1.5'>
                                    <Calendar className='h-4 w-4' />
                                    {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                                <span className='flex items-center gap-1.5'>
                                    <Clock className='h-4 w-4' />
                                    {readingTime} min read
                                </span>
                            </div>

                            <h1 className='mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl'>
                                {post.title}
                            </h1>

                            <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
                                {post.excerpt}
                            </p>

                            <div className='mt-6 flex flex-wrap gap-2'>
                                {post.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className='rounded-full border border-border px-3 py-1 text-xs text-muted-foreground'>
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Content */}
            <section className='px-4 lg:px-8'>
                <article className='mx-auto max-w-3xl'>
                    <div className='space-y-12'>
                        {post.content.map((section, index) => (
                            <div
                                key={section.heading}
                                className='animate-in fade-in slide-in-from-bottom-6 duration-500'
                                style={{ animationDelay: `${index * 100}ms` }}>
                                <h2 className='text-2xl font-semibold text-foreground'>
                                    {section.heading}
                                </h2>
                                <div className='mt-4 space-y-4'>
                                    {section.body.map((paragraph, pIndex) => (
                                        <p
                                            key={pIndex}
                                            className='text-lg leading-relaxed text-muted-foreground'>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            {/* CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-3xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                        <h2 className='text-2xl font-semibold text-foreground'>
                            Ready to act on this insight?
                        </h2>
                        <p className='mt-4 text-muted-foreground'>
                            Speak with Capiflo about business loans, invoice finance, or bridging loans
                            tailored to your sector. Our UK-based specialists are ready to help.
                        </p>
                        <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                            <Button
                                size='lg'
                                className='h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
                                asChild>
                                <Link href='/contact'>Book a Funding Call</Link>
                            </Button>
                            <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                <Link href='/calculators'>View Calculators</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Navigation */}
            {(prevPost || nextPost) && (
                <section className='px-4 lg:px-8'>
                    <div className='mx-auto max-w-3xl'>
                        <div className='grid gap-4 sm:grid-cols-2'>
                            {prevPost ? (
                                <Link href={`/blog/${prevPost.slug}`} className='group'>
                                    <Card className='h-full rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover'>
                                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                            <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
                                            Previous article
                                        </div>
                                        <p className='mt-2 font-semibold text-foreground'>
                                            {prevPost.title}
                                        </p>
                                    </Card>
                                </Link>
                            ) : (
                                <div />
                            )}
                            {nextPost && (
                                <Link href={`/blog/${nextPost.slug}`} className='group'>
                                    <Card className='h-full rounded-2xl border-border/50 p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover'>
                                        <div className='flex items-center justify-end gap-2 text-sm text-muted-foreground'>
                                            Next article
                                            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                        </div>
                                        <p className='mt-2 font-semibold text-foreground'>
                                            {nextPost.title}
                                        </p>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPostPage;
