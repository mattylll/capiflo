import { RichText } from '@/components/content/rich-text';
import type { ArticleContent } from '@/data/content-types';

/**
 * Renders the question-led H2 sections of a SERP-calibrated article. The intro
 * and FAQs are rendered separately by the page so each can sit in its own band.
 * Paragraphs may include markdown links, rendered by RichText.
 */
export function ArticleBody({ sections }: { sections: ArticleContent['sections'] }) {
    return (
        <div className='space-y-12'>
            {sections.map((section) => (
                <section key={section.h}>
                    <h2 className='text-foreground text-2xl font-semibold tracking-tight'>{section.h}</h2>
                    {section.body.length > 0 && (
                        <div className='mt-4 space-y-4'>
                            {section.body.map((paragraph, i) => (
                                <p key={i} className='text-muted-foreground text-lg leading-relaxed'>
                                    <RichText text={paragraph} />
                                </p>
                            ))}
                        </div>
                    )}
                    {section.subsections?.map((sub) => (
                        <div key={sub.h} className='mt-8'>
                            <h3 className='text-foreground text-xl font-semibold tracking-tight'>{sub.h}</h3>
                            <div className='mt-4 space-y-4'>
                                {sub.body.map((paragraph, i) => (
                                    <p key={i} className='text-muted-foreground text-lg leading-relaxed'>
                                        <RichText text={paragraph} />
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
}
