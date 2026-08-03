import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowRight, ChevronRight } from 'lucide-react';

import { calculatorContent } from '@/content/calculators';
import { calculators, calculatorBySlug } from '@/data/calculators';
import { fundingSectorMap } from '@/data/funding';
import { guideBySlug } from '@/data/guides';
import { CalculatorTool } from '@/components/calculators/calculator-tool';
import { ArticleBody } from '@/components/content/article-body';
import { FaqSection } from '@/components/content/faq-section';
import { BreadcrumbJsonLd, CalculatorJsonLd, FAQJsonLd } from '@/components/seo/json-ld';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export const generateStaticParams = () => calculators.map((c) => ({ slug: c.slug }));

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const { slug } = await params;
    const calc = calculatorBySlug(slug);
    if (!calc) return {};

    return {
        title: calc.metaTitle,
        description: calc.metaDescription,
        keywords: calc.keywords,
        alternates: { canonical: `/calculators/${calc.slug}` },
        openGraph: { title: calc.metaTitle, description: calc.metaDescription, url: `/calculators/${calc.slug}` }
    };
};

const CalculatorDetailPage = async ({ params }: { params: Params }) => {
    const { slug } = await params;
    const calc = calculatorBySlug(slug);
    if (!calc) notFound();

    const content = calculatorContent[slug];
    const funding = calc.relatedFunding ? fundingSectorMap[calc.relatedFunding] : undefined;
    const guide = calc.relatedGuide ? guideBySlug(calc.relatedGuide) : undefined;

    const breadcrumb = [
        { name: 'Home', href: '/' },
        { name: 'Calculators', href: '/calculators' },
        { name: calc.shortName, href: `/calculators/${calc.slug}` }
    ];

    return (
        <div className='space-y-16 pb-24 md:space-y-20'>
            <CalculatorJsonLd id={calc.slug} name={calc.title} description={calc.metaDescription} url={`/calculators/${calc.slug}`} />
            <BreadcrumbJsonLd items={breadcrumb} />
            {content?.faqs?.length ? <FAQJsonLd faqs={content.faqs.map((f) => ({ question: f.q, answer: f.a }))} /> : null}

            {/* Hero + tool */}
            <section className='px-4 pt-12 lg:px-8 lg:pt-16'>
                <div className='mx-auto max-w-5xl'>
                    <nav className='flex items-center gap-1.5 text-sm text-muted-foreground' aria-label='Breadcrumb'>
                        {breadcrumb.map((item, i) => (
                            <span key={item.href} className='flex items-center gap-1.5'>
                                {i > 0 && <ChevronRight className='h-3.5 w-3.5' />}
                                {i < breadcrumb.length - 1 ? (
                                    <Link href={item.href} className='transition-colors hover:text-primary'>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className='text-foreground'>{item.name}</span>
                                )}
                            </span>
                        ))}
                    </nav>

                    <h1 className='mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl'>
                        {calc.h1}
                    </h1>
                    <p className='mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground'>{calc.description}</p>

                    <div className='mt-10'>
                        <CalculatorTool calculator={calc} />
                    </div>
                </div>
            </section>

            {/* Supporting content */}
            {content && (
                <section className='px-4 lg:px-8'>
                    <div className='mx-auto max-w-3xl'>
                        <div className='space-y-4'>
                            {content.intro.map((p, i) => (
                                <p key={i} className='text-lg leading-relaxed text-muted-foreground'>
                                    {p}
                                </p>
                            ))}
                        </div>
                        <div className='mt-12'>
                            <ArticleBody sections={content.sections} />
                        </div>
                        <div className='mt-16'>
                            <FaqSection faqs={content.faqs} />
                        </div>
                    </div>
                </section>
            )}

            {/* Related + CTA */}
            <section className='px-4 lg:px-8'>
                <div className='mx-auto max-w-5xl'>
                    <Card className='rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12'>
                        <h2 className='text-3xl font-semibold text-foreground'>Ready for real numbers?</h2>
                        <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                            We benchmark your figures against 120+ UK lenders and come back with terms you can act on, not just
                            estimates.
                        </p>
                        <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                            <Button size='lg' className='h-12 px-8 text-base shadow-lg shadow-primary/25' asChild>
                                <Link href='/contact'>
                                    Get Real Quotes
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Link>
                            </Button>
                            {funding && (
                                <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                                    <Link href={`/funding/${calc.relatedFunding}`}>About {funding.title}</Link>
                                </Button>
                            )}
                            {guide && (
                                <Button size='lg' variant='ghost' className='h-12 px-8 text-base' asChild>
                                    <Link href={`/guides/${guide.slug}`}>Read: {guide.h1}</Link>
                                </Button>
                            )}
                        </div>
                    </Card>

                    {/* Other calculators */}
                    <div className='mt-12'>
                        <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                            Other calculators
                        </h2>
                        <div className='mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                            {calculators
                                .filter((c) => c.slug !== calc.slug)
                                .map((c) => (
                                    <Link
                                        key={c.slug}
                                        href={`/calculators/${c.slug}`}
                                        className='group rounded-2xl border border-border/50 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover'>
                                        <p className='font-medium text-foreground'>{c.shortName}</p>
                                        <p className='mt-1 inline-flex items-center gap-1 text-sm text-primary'>
                                            Open
                                            <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
                                        </p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CalculatorDetailPage;
