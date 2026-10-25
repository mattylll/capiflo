import { Fragment } from 'react';

import Link from 'next/link';

const ALLOWED_EXTERNAL_PREFIXES = [
    'https://www.gov.uk/',
    'https://www.fca.org.uk/',
    'https://www.british-business-bank.co.uk/'
];

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');

const isAllowedExternal = (href: string) => ALLOWED_EXTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix));

/**
 * Renders a paragraph that may contain markdown links.
 * Internal paths use Next's Link. External links are limited to cited public sources.
 */
export function RichText({ text }: { text: string }) {
    const nodes = [];
    let last = 0;
    let key = 0;
    const linkRe = /\[([^\]]+)\]\(([^)\s]+)\)/g;

    for (const match of text.matchAll(linkRe)) {
        const index = match.index ?? 0;
        if (index > last) {
            nodes.push(<Fragment key={key}>{text.slice(last, index)}</Fragment>);
            key += 1;
        }

        const label = match[1];
        const href = match[2];
        if (isInternal(href)) {
            nodes.push(
                <Link key={key} href={href} className='font-medium text-primary hover:underline'>
                    {label}
                </Link>
            );
        } else if (isAllowedExternal(href)) {
            nodes.push(
                <a key={key} href={href} className='font-medium text-primary hover:underline'>
                    {label}
                </a>
            );
        } else {
            nodes.push(<Fragment key={key}>{label}</Fragment>);
        }
        key += 1;
        last = index + match[0].length;
    }

    if (last < text.length) {
        nodes.push(<Fragment key={key}>{text.slice(last)}</Fragment>);
    }

    return <>{nodes}</>;
}
