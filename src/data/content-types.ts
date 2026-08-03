/**
 * Shared content shapes for SERP-calibrated articles (calculator supporting copy
 * and knowledge-hub guides). Authored bodies follow this schema so a single
 * template can render any piece. See seo/briefs/<slug>.json for the per-article
 * word-count, entity-density and PAA targets each body is written against.
 */

export type ArticleSection = {
    /** Question-led, entity-distinct H2. */
    h: string;
    body: string[];
};

export type FAQ = {
    q: string;
    a: string;
};

export type ArticleContent = {
    intro: string[];
    sections: ArticleSection[];
    faqs: FAQ[];
};
