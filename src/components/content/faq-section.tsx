import type { FAQ } from '@/data/content-types';

/**
 * Accessible FAQ list using native disclosure so it renders without client JS.
 * The matching FAQPage JSON-LD is emitted by the page via FAQJsonLd.
 */
export function FaqSection({ faqs, heading = 'Frequently asked questions' }: { faqs: FAQ[]; heading?: string }) {
    if (!faqs.length) return null;

    return (
        <div>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{heading}</h2>
            <div className='mt-6 divide-y divide-border/60 rounded-2xl border border-border/60'>
                {faqs.map((faq) => (
                    <details key={faq.q} className='group px-5 py-4 [&_summary::-webkit-details-marker]:hidden'>
                        <summary className='flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-foreground'>
                            {faq.q}
                            <span className='shrink-0 text-muted-foreground transition-transform group-open:rotate-45'>+</span>
                        </summary>
                        <p className='mt-3 leading-relaxed text-muted-foreground'>{faq.a}</p>
                    </details>
                ))}
            </div>
        </div>
    );
}
