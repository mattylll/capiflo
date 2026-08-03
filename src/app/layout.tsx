import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Archivo, Caveat } from 'next/font/google';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import SiteFooter from '@/components/layout/site-footer';
import SiteHeader from '@/components/layout/site-header';
import { Analytics } from '@/components/analytics';
import { CookieConsentProvider } from '@/components/cookie-consent/cookie-consent-provider';
import { CookieConsentBanner } from '@/components/cookie-consent/cookie-consent-banner';
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld';
import { seoConfig } from '@/config/seo';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const archivo = Archivo({
    variable: '--font-archivo',
    subsets: ['latin'],
    display: 'swap',
    axes: ['wdth']
});
const caveat = Caveat({
    variable: '--font-hand',
    subsets: ['latin'],
    display: 'swap',
    weight: ['500', '600']
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    // No title.template: every page already appends "| Capiflo" to its own
    // title — a template here would double the suffix.
    title: seoConfig.defaultTitle,
    description:
        'Capiflo is a UK business finance broker. We compare 120+ lenders to arrange business loans, asset finance, invoice finance and commercial mortgages for SMEs.',
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        siteName: seoConfig.siteName,
        url: seoConfig.siteUrl,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Capiflo — UK business finance broker' }]
    },
    twitter: {
        card: 'summary_large_image'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${caveat.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class'>
                    <CookieConsentProvider>
                        <OrganizationJsonLd />
                        <LocalBusinessJsonLd />
                        <WebSiteJsonLd />
                        <SiteHeader />
                        <main className='min-h-screen bg-background/80'>{children}</main>
                        <SiteFooter />
                        <Analytics />
                        <CookieConsentBanner />
                        <Toaster />
                    </CookieConsentProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
