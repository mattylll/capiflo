'use client';

import Link from 'next/link';

import { Cookie, X } from 'lucide-react';

import { useCookieConsent } from './cookie-consent-provider';
import { Button } from '@/registry/new-york-v4/ui/button';

export function CookieConsentBanner() {
    const { consent, acceptCookies, rejectCookies } = useCookieConsent();

    // Don't show banner if consent has already been given
    if (consent !== 'pending') {
        return null;
    }

    return (
        <div className='fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500'>
            <div className='mx-auto max-w-4xl'>
                <div className='relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 p-6 shadow-xl backdrop-blur-xl'>
                    {/* Close button (rejects) */}
                    <button
                        onClick={rejectCookies}
                        className='absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
                        aria-label='Reject cookies'>
                        <X className='h-5 w-5' />
                    </button>

                    <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8'>
                        {/* Icon and Text */}
                        <div className='flex items-start gap-4 sm:flex-1'>
                            <div className='hidden rounded-xl bg-primary/15 p-3 sm:block'>
                                <Cookie className='h-6 w-6 text-primary' />
                            </div>
                            <div className='pr-8 sm:pr-0'>
                                <h3 className='text-lg font-semibold text-foreground'>Cookie Preferences</h3>
                                <p className='mt-1 text-sm text-muted-foreground'>
                                    We use cookies to analyse site usage and improve your experience. You can accept
                                    all cookies or reject non-essential ones. See our{' '}
                                    <Link
                                        href='/legal/privacy'
                                        className='text-primary underline-offset-4 hover:underline'>
                                        privacy policy
                                    </Link>{' '}
                                    for details.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
                            <Button
                                variant='outline'
                                onClick={rejectCookies}
                                className='order-2 sm:order-1'>
                                Reject All
                            </Button>
                            <Button
                                onClick={acceptCookies}
                                className='order-1 shadow-lg shadow-primary/25 sm:order-2'>
                                Accept All
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
