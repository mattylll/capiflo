import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/registry/new-york-v4/ui/button';

// True, checkable positioning only. No ratings, no awards, no authorisation
// claims: Capiflo is a broker, not a lender, and is not FCA authorised.
const TRUST_POINTS = ['120+ lender panel', 'No hard credit checks at enquiry', 'Broker, not a lender'];

// The signature element: an indicative term sheet. Rows fill in on load like a
// broker completing a deal file. All values are ranges or service facts.
const TERM_ROWS = [
    { label: 'Coverage', value: 'Whole of market' },
    { label: 'Amount', value: '£25k to £5m' },
    { label: 'First response', value: 'Same working day' },
    { label: 'Lenders compared', value: '120+' },
    { label: 'Credit impact at enquiry', value: 'None' }
];

const Hero = () => {
    return (
        <section className='px-4 pt-24 lg:px-8 lg:pt-32'>
            <div className='mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20'>
                {/* Left: the pitch */}
                <div className='animate-in fade-in slide-in-from-bottom-4 flex flex-col justify-center duration-700'>
                    <p className='ledger-eyebrow'>Capiflo · UK SME finance</p>
                    <h1 className='font-display text-foreground mt-6 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.4rem]'>
                        The UK&apos;s specialist business finance broker. 120+ lenders, your best rate in 60 minutes.
                    </h1>
                    <p className='text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed'>
                        Tell us what the money&apos;s for. We&apos;ll put the whole market on one page, tell
                        you what each route really costs, and if borrowing&apos;s a bad idea we&apos;ll say
                        that too.
                    </p>

                    <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
                        <Button size='lg' className='h-12 px-8 text-base' asChild>
                            <Link href='/contact'>Start an eligibility check</Link>
                        </Button>
                        <Button size='lg' variant='outline' className='h-12 px-8 text-base' asChild>
                            <Link href='/calculators'>Run the numbers first</Link>
                        </Button>
                    </div>

                    <ul className='mt-10 flex flex-wrap gap-x-6 gap-y-2'>
                        {TRUST_POINTS.map((point) => (
                            <li
                                key={point}
                                className='text-muted-foreground flex items-center gap-2 font-mono text-xs tracking-wider uppercase'>
                                <span className='bg-primary inline-block h-1.5 w-1.5' aria-hidden />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: the deal file. One document: photo band on top, terms beneath. */}
                <div className='animate-in fade-in slide-in-from-bottom-6 flex flex-col justify-center delay-150 duration-700'>
                    <div className='border-border bg-card shadow-elevated relative w-full border'>
                        {/* Decorative portrait band, part of the file itself */}
                        <div className='border-border relative aspect-[16/8] w-full overflow-hidden border-b'>
                            <Image
                                src='/images/capiflo-hero-sage.png'
                                alt=''
                                fill
                                priority
                                className='object-cover object-top'
                            />
                        </div>
                        {/* Document header */}
                        <div className='border-border flex items-center justify-between border-b px-6 py-4'>
                            <p className='text-foreground font-mono text-xs font-medium tracking-[0.22em] uppercase'>
                                Indicative terms
                            </p>
                            <p className='text-muted-foreground font-mono text-xs tracking-wider uppercase'>Draft</p>
                        </div>

                        {/* Ruled rows */}
                        <dl className='px-6 pt-2 pb-6'>
                            {TERM_ROWS.map((row, index) => (
                                <div
                                    key={row.label}
                                    className='ledger-row animate-in fade-in slide-in-from-bottom-2 fill-mode-both last:border-b-0'
                                    style={{ animationDelay: `${index * 120 + 300}ms`, animationDuration: '500ms' }}>
                                    <dt className='text-muted-foreground text-sm'>{row.label}</dt>
                                    <dd className='text-foreground font-mono text-sm font-medium tabular-nums'>
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* Handwritten margin note: the one hand-touched thing on the page */}
                        <p
                            className='font-hand animate-in fade-in fill-mode-both absolute -bottom-12 left-4 hidden -rotate-2 text-xl leading-snug text-primary sm:block'
                            style={{ animationDelay: '1300ms', animationDuration: '500ms' }}
                            aria-hidden>
                            checked against the whole panel, not just the banks
                        </p>

                        {/* Perforated foot with the disclosure that matters */}
                        <div className='border-border border-t border-dashed px-6 py-4 pr-24'>
                            <p className='text-muted-foreground text-xs leading-relaxed'>
                                Unregulated business lending, arranged for business purposes only and subject to status.
                                Capiflo is a broker, not a lender.
                            </p>
                        </div>

                        {/* Brass seal, stamped at the document's foot */}
                        <div
                            className='border-brass bg-background animate-in fade-in zoom-in-75 fill-mode-both absolute -right-5 -bottom-6 flex h-20 w-20 rotate-6 items-center justify-center rounded-full border-2 text-center'
                            style={{ animationDelay: '1100ms', animationDuration: '400ms' }}
                            aria-hidden>
                            <p className='text-brass font-mono text-[9px] leading-tight font-semibold tracking-[0.18em] uppercase'>
                                Broker
                                <br />
                                arranged
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
