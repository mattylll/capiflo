import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <div className='dark:border-border relative overflow-hidden bg-[#14201a] px-8 py-16 md:px-14 md:py-20 dark:border'>
                    {/* Faint ruled-paper texture, in keeping with the ledger motif */}
                    <div
                        aria-hidden
                        className='pointer-events-none absolute inset-0 opacity-[0.07]'
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, transparent, transparent 31px, #edf1ea 31px, #edf1ea 32px)'
                        }}
                    />

                    <div className='relative max-w-2xl'>
                        <p className='flex items-center gap-3 font-mono text-xs font-medium tracking-[0.22em] text-[#c9a254] uppercase'>
                            <span className='inline-block h-2 w-2 bg-[#c9a254]' aria-hidden />
                            Open your file
                        </p>
                        <h2 className='font-display mt-6 text-3xl font-semibold text-[#edf1ea] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]'>
                            Know your options before any lender knows your name.
                        </h2>
                        <p className='mt-5 text-lg leading-relaxed text-[#edf1ea]/70'>
                            One brief, the whole panel compared, and a term sheet you can hold every offer
                            against. Including the one from your own bank. It&apos;s free, it doesn&apos;t
                            touch your credit file, and if the honest answer is &quot;wait six months&quot;,
                            that&apos;s what you&apos;ll hear.
                        </p>
                        <div className='mt-10'>
                            <Link
                                href='/contact'
                                className='inline-flex h-13 items-center gap-2 bg-[#edf1ea] px-8 text-base font-semibold text-[#14201a] transition-colors hover:bg-[#c9a254]'>
                                Start an eligibility check
                                <ArrowRight className='h-5 w-5' />
                            </Link>
                        </div>
                        <p className='mt-8 font-mono text-xs tracking-wider text-[#edf1ea]/50 uppercase'>
                            Free consultation · No hard credit check · Same working day response
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
