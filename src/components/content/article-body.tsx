import type { ArticleContent } from '@/data/content-types';

/**
 * Renders the question-led H2 sections of a SERP-calibrated article. The intro
 * and FAQs are rendered separately by the page so each can sit in its own band.
 */
export function ArticleBody({ sections }: { sections: ArticleContent['sections'] }) {
    return (
        <div className='space-y-12'>
            {sections.map((section) => (
                <section key={section.h}>
                    <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{section.h}</h2>
                    <div className='mt-4 space-y-4'>
                        {section.body.map((paragraph, i) => (
                            <p key={i} className='text-lg leading-relaxed text-muted-foreground'>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
