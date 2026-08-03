import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, ArrowRight, CalendarCheck, ChevronRight } from 'lucide-react';

import { calculatorBySlug } from '@/data/calculators';
import { editorialAuthor } from '@/data/authors';
import { fundingSectorMap } from '@/data/funding';
import { getGuideContent, guideBySlug, guides } from '@/data/guides';
import { ArticleBody } from '@/components/content/article-body';
import { FaqSection } from '@/components/content/faq-section';
import { BreadcrumbJsonLd, FAQJsonLd, GuideArticleJsonLd } from '@/components/seo/json-ld';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

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

    const wordCount = content.intro.concat(content.sections.flatMap((s) => s.body)).join(' ').split(/\s+/).length;
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
            {content.faqs.length ? <FAQJsonLd faqs={content.faqs.map((f) => ({ question: f.q, answer: f.a }))} /> : null}

            {/* Header */}
            <section className='px-4 pt-12 lg:px-8 lg:pt-16'>
                <article className='mx-auto max-w-3xl'>
                    <nav className='flex items-center gap-1.5 text-sm text-muted-foreground' aria-label='Breadcrumb'>
                        {breadcrumb.map((item, i) => (
                            <span key={item.href} className='flex items-center gap-1.5'>
                                {i > 0 && <ChevronRight className='h-3.5 w-3.5' />}
                                {i < breadcrumb.length - 1 ? (
                                    <Link href={item.href} className='transition-colors hover:text-primary'>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className='truncate text-foreground'>{item.name}</span>
                                )}
                            </span>
                        ))}
                    </nav>

                    <h1 className='mt-6 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
                        {guide.h1}
                    </h1>
                    <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>{guide.excerpt}</p>

                    <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground'>
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
                            <p key={i} className='text-lg leading-relaxed text-muted-foreground'>
                                {p}
                            </p>
                        ))}
                    </div>

                    {calc && (
                        <div className='my-10 rounded-2xl border border-primary/20 bg-primary/5 p-5'>
                            <p className='text-sm text-muted-foreground'>
                                Prefer to run the numbers?{' '}
                                <Link href={`/calculators/${calc.slug}`} className='font-medium text-primary hover:underline'>
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
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-10'>
                        <h2 className='text-2xl font-semibold text-foreground'>Talk it through with a specialist</h2>
                        <p className='mt-4 text-muted-foreground'>
                            We compare options from 120+ UK lenders to find a fit for your business. No obligation, and it
                            will not affect your credit score.
                        </p>
                        <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                            <Button size='lg' className='h-12 px-8 text-base shadow-lg shadow-primary/25' asChild>
                                <Link href='/contact'>Book a Funding Call</Link>
                            </Button>
                            {funding && (
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <Link href={`/funding/${guide.relatedFunding}`}>About {funding.title}</Link>
                                </Button>
                            )}
                        </div>
                    </Card>

                    {related.length > 0 && (
                        <div>
                            <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                                Related guides
                            </h2>
                            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                                {related.map((g) => (
                                    <Link key={g!.slug} href={`/guides/${g!.slug}`} className='group'>
                                        <Card className='h-full rounded-2xl border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover'>
                                            <p className='font-semibold text-foreground'>{g!.h1}</p>
                                            <p className='mt-2 text-sm text-muted-foreground'>{g!.excerpt}</p>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <Link
                        href='/guides'
                        className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary'>
                        <ArrowLeft className='h-4 w-4' />
                        All guides
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GuideDetailPage;
