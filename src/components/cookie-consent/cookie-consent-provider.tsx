'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

interface CookieConsentContextType {
    consent: ConsentStatus;
    acceptCookies: () => void;
    rejectCookies: () => void;
    resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const CONSENT_COOKIE_NAME = 'capiflo_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}

interface CookieConsentProviderProps {
    children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
    const [consent, setConsent] = useState<ConsentStatus>('pending');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Check for existing consent on mount
        const savedConsent = getCookie(CONSENT_COOKIE_NAME);
        if (savedConsent === 'accepted') {
            setConsent('accepted');
        } else if (savedConsent === 'rejected') {
            setConsent('rejected');
        }
        setIsLoaded(true);
    }, []);

    const acceptCookies = () => {
        setCookie(CONSENT_COOKIE_NAME, 'accepted', CONSENT_EXPIRY_DAYS);
        setConsent('accepted');
    };

    const rejectCookies = () => {
        setCookie(CONSENT_COOKIE_NAME, 'rejected', CONSENT_EXPIRY_DAYS);
        setConsent('rejected');
        // Clear any analytics cookies that might have been set
        // Add cookie names to clear here as needed
    };

    const resetConsent = () => {
        deleteCookie(CONSENT_COOKIE_NAME);
        setConsent('pending');
    };

    // Don't render children until we've checked for existing consent
    // This prevents flash of content
    if (!isLoaded) {
        return null;
    }

    return (
        <CookieConsentContext.Provider value={{ consent, acceptCookies, rejectCookies, resetConsent }}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (context === undefined) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
}
