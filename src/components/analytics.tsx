'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

import { useCookieConsent } from '@/components/cookie-consent/cookie-consent-provider';

export function Analytics() {
    const { consent } = useCookieConsent();

    // Only load analytics if user has accepted cookies
    if (consent !== 'accepted') {
        return null;
    }

    return <VercelAnalytics />;
}
