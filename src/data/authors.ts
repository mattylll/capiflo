/**
 * Editorial author for E-E-A-T schema (author / reviewedBy bylines).
 *
 * Default is the organisation's funding team, which is accurate without
 * inventing a named individual. To strengthen experience and authority signals,
 * replace `editorialAuthor` with a named, credentialed specialist, e.g.:
 *
 *   export const editorialAuthor: EditorialAuthor = {
 *     type: 'Person',
 *     name: 'Jane Doe',
 *     jobTitle: 'Commercial Finance Specialist',
 *     url: 'https://capiflo.co.uk/about'
 *   };
 */

export type EditorialAuthor = {
    type: 'Organization' | 'Person';
    name: string;
    jobTitle?: string;
    url: string;
};

export const editorialAuthor: EditorialAuthor = {
    type: 'Organization',
    name: 'Capiflo Funding Team',
    url: 'https://capiflo.co.uk/about'
};

/** Build a schema.org author/reviewer node from the editorial author config. */
export const authorSchemaNode = (author: EditorialAuthor = editorialAuthor) => {
    const node: Record<string, unknown> = {
        '@type': author.type,
        name: author.name,
        url: author.url
    };
    if (author.jobTitle) node.jobTitle = author.jobTitle;

    return node;
};
