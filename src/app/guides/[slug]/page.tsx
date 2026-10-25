import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleBody } from '@/components/content/article-body';
import { FaqSection } from '@/components/content/faq-section';
import { RichText } from '@/components/content/rich-text';
import { BreadcrumbJsonLd, FAQJsonLd, GuideArticleJsonLd } from '@/components/seo/json-ld';
import { editorialAuthor } from '@/data/authors';
import { calculatorBySlug } from '@/data/calculators';
import { fundingSectorMap } from '@/data/funding';
import { getGuideContent, guideBySlug, guides } from '@/data/guides';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

import { ArrowLeft, ArrowRight, CalendarCheck, ChevronRight } from 'lucide-react';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { slug } = await params;
    const guide = guideBySlug(slug);
    if (!guide) return {};

    return {
        title: guide.metaTitle,
        description: guide.metaDescription,
        keywords: guide.keywords,
        alternates: { canonical: `/guides/${guide.slug}` },
        openGraph: {
            type: 'article',
            title: guide.metaTitle,
            description: guide.metaDescription,
            url: `/guides/${guide.slug}`,
            publishedTime: guide.publishedAt,
            modifiedTime: guide.updatedAt
        }
    };
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const GuideDetailPage = async ({ params }: { params: Params }) => {
    const { slug } = await params;
    const guide = guideBySlug(slug);
    if (!guide) notFound();

    const content = getGuideContent(slug);
    if (!content) notFound();

    const calc = guide.relatedCalculator ? calculatorBySlug(guide.relatedCalculator) : undefined;
    const funding = guide.relatedFunding ? fundingSectorMap[guide.relatedFunding] : undefined;
    const related = (guide.relatedGuides ?? []).map(guideBySlug).filter(Boolean);

    const wordCount = content.intro
        .concat(content.sections.flatMap((s) => [...s.body, ...(s.subsections ?? []).flatMap((sub) => sub.body)]))
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const breadcrumb = [
        { name: 'Home', href: '/' },
        { name: 'Guides', href: '/guides' },
        { name: guide.h1, href: `/guides/${guide.slug}` }
    ];

    return (
        <div className='space-y-16 pb-24 md:space-y-20'>
            <GuideArticleJsonLd
                id={guide.slug}
                title={guide.h1}
                description={guide.metaDescription}
                url={`/guides/${guide.slug}`}
                datePublished={guide.publishedAt}
                dateModified={guide.updatedAt}
                keywords={guide.keywords}
            />
            <BreadcrumbJsonLd items={breadcrumb} />
            {content.faqs.length ? (
                <FAQJsonLd faqs={content.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
            ) : null}

            {/* Header */}
            <section className='px-4 pt-12 lg:px-8 lg:pt-16'>
                <article className='mx-auto max-w-3xl'>
                    <nav className='text-muted-foreground flex items-center gap-1.5 text-sm' aria-label='Breadcrumb'>
                        {breadcrumb.map((item, i) => (
                            <span key={item.href} className='flex items-center gap-1.5'>
                                {i > 0 && <ChevronRight className='h-3.5 w-3.5' />}
                                {i < breadcrumb.length - 1 ? (
                                    <Link href={item.href} className='hover:text-primary transition-colors'>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className='text-foreground truncate'>{item.name}</span>
                                )}
                            </span>
                        ))}
                    </nav>

                    <h1 className='text-foreground mt-6 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl'>
                        {guide.h1}
                    </h1>
                    <p className='text-muted-foreground mt-5 text-lg leading-relaxed'>{guide.excerpt}</p>

                    <div className='text-muted-foreground mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm'>
                        <span>By {editorialAuthor.name}</span>
                        <span className='flex items-center gap-1.5'>
                            <CalendarCheck className='h-4 w-4' />
                            Updated {formatDate(guide.updatedAt)}
                        </span>
                        <span>{readingTime} min read</span>
                    </div>
                </article>
            </section>

            {/* Body */}
            <section className='px-4 lg:px-8'>
                <article className='mx-auto max-w-3xl'>
                    <div className='space-y-4'>
                        {content.intro.map((p, i) => (
                            <p key={i} className='text-muted-foreground text-lg leading-relaxed'>
                                <RichText text={p} />
                            </p>
                        ))}
                    </div>

                    {calc && (
                        <div className='border-primary/20 bg-primary/5 my-10 rounded-2xl border p-5'>
                            <p className='text-muted-foreground text-sm'>
                                Prefer to run the numbers?{' '}
                                <Link
                                    href={`/calculators/${calc.slug}`}
                                    className='text-primary font-medium hover:underline'>
                                    Try the {calc.shortName.toLowerCase()} calculator
                                </Link>
                                .
                            </p>
                        </div>
                    )}

                    <div className='mt-12'>
                        <ArticleBody sections={content.sections} />
                    </div>

                    <div className='mt-16'>
                        <FaqSection faqs={content.faqs} />
                    </div>
                </article>
            </section>

            {/* Related + CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-3xl space-y-12'>
                    <Card className='border-primary/20 from-primary/10 via-primary/5 rounded-3xl bg-gradient-to-br to-transparent p-8 md:p-10'>
                        <h2 className='text-foreground text-2xl font-semibold'>Talk it through with a specialist</h2>
                        <p className='text-muted-foreground mt-4'>
                            We compare options from 120+ UK lenders to find a fit for your business. No obligation, and
                            it will not affect your credit score.
                        </p>
                        <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                            <Button size='lg' className='shadow-primary/25 h-12 px-8 text-base shadow-lg' asChild>
                                <Link href='/contact'>Book a Funding Call</Link>
                            </Button>
                            {funding && (
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <Link href={`/funding/${guide.relatedFunding}`}>About {funding.title}</Link>
                                </Button>
                            )}
                        </div>
                        {guide.platformDisclaimer ? (
                            <p className='text-muted-foreground mt-4 text-xs leading-relaxed'>
                                Capiflo is an independent third party and is not endorsed by or associated with Airbnb,
                                Inc. or its affiliates.
                            </p>
                        ) : null}
                    </Card>

                    {related.length > 0 && (
                        <div>
                            <h2 className='text-muted-foreground text-sm font-semibold tracking-wider uppercase'>
                                Related guides
                            </h2>
                            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                                {related.map((g) => (
                                    <Link key={g!.slug} href={`/guides/${g!.slug}`} className='group'>
                                        <Card className='border-border/50 hover:border-primary/30 hover:shadow-card-hover h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1'>
                                            <p className='text-foreground font-semibold'>{g!.h1}</p>
                                            <p className='text-muted-foreground mt-2 text-sm'>{g!.excerpt}</p>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <Link
                        href='/guides'
                        className='text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors'>
                        <ArrowLeft className='h-4 w-4' />
                        All guides
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GuideDetailPage;
