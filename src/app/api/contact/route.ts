import { NextRequest, NextResponse } from 'next/server';

// Environment variables (set these in .env.local):
// EMAIL_TO - Email address to receive submissions
// WEBHOOK_URL - Webhook URL for CRM integration (optional)
// RESEND_API_KEY - Resend API key for sending emails (optional, falls back to webhook only)

interface FormData {
    formType: 'contact' | 'introducer';
    company?: string;
    sector?: string;
    turnover?: string;
    amount?: string;
    timeline?: string;
    purpose?: string;
    name: string;
    email: string;
    phone?: string;
    profession?: string;
    deals?: string;
    source?: string;
    message?: string;
}

async function sendEmail(data: FormData): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO || 'hello@capiflo.co.uk';

    if (!resendApiKey) {
        console.log('No RESEND_API_KEY set, skipping email');
        return true; // Not a failure, just not configured
    }

    const subject =
        data.formType === 'introducer'
            ? `New Introducer Application: ${data.name}`
            : `New Funding Enquiry: ${data.company || data.name}`;

    const htmlContent =
        data.formType === 'introducer'
            ? `
        <h2>New Introducer Application</h2>
        <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Profession</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.profession || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Est. Deals/Month</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.deals || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Source</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.source || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.message || '-'}</td></tr>
        </table>
    `
            : `
        <h2>New Funding Enquiry</h2>
        <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Sector</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.sector || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Turnover</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.turnover || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Amount Required</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.amount || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Purpose</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.purpose || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || '-'}</td></tr>
        </table>
    `;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Capiflo <noreply@capiflo.co.uk>',
                to: emailTo,
                subject,
                html: htmlContent,
                reply_to: data.email
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Resend API error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Email send error:', error);
        return false;
    }
}

async function sendWebhook(data: FormData): Promise<boolean> {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
        console.log('No WEBHOOK_URL set, skipping webhook');
        return true; // Not a failure, just not configured
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                submittedAt: new Date().toISOString(),
                source: 'capiflo-website'
            })
        });

        if (!response.ok) {
            console.error('Webhook error:', response.status, await response.text());
            return false;
        }

        return true;
    } catch (error) {
        console.error('Webhook send error:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const data: FormData = await request.json();

        // Basic validation
        if (!data.email || !data.name) {
            return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
        }

        // Send email and webhook in parallel
        const [emailResult, webhookResult] = await Promise.all([sendEmail(data), sendWebhook(data)]);

        // At least one should succeed if configured
        const hasEmailConfig = !!process.env.RESEND_API_KEY;
        const hasWebhookConfig = !!process.env.WEBHOOK_URL;

        if (hasEmailConfig && !emailResult) {
            console.error('Email failed but webhook may have succeeded');
        }

        if (hasWebhookConfig && !webhookResult) {
            console.error('Webhook failed but email may have succeeded');
        }

        // If neither is configured, still return success (for development)
        if (!hasEmailConfig && !hasWebhookConfig) {
            console.log('No email or webhook configured - form data received:', data);
        }

        return NextResponse.json({
            success: true,
            message: 'Form submitted successfully'
        });
    } catch (error) {
        console.error('Form submission error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process submission' }, { status: 500 });
    }
}
