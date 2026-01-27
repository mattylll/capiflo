'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';

export function ContactForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            formType: 'contact' as const,
            company: formData.get('company') as string,
            sector: formData.get('sector') as string,
            turnover: formData.get('turnover') as string,
            amount: formData.get('amount') as string,
            timeline: formData.get('timeline') as string,
            purpose: formData.get('purpose') as string,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }

            router.push('/thank-you?type=contact');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
                <Label htmlFor='company'>Company name</Label>
                <Input
                    id='company'
                    name='company'
                    placeholder='e.g. Northstar Manufacturing Ltd'
                    className='mt-1.5'
                    required
                />
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                    <Label htmlFor='sector'>Sector</Label>
                    <Input
                        id='sector'
                        name='sector'
                        placeholder='Manufacturing, retail, SaaS…'
                        className='mt-1.5'
                    />
                </div>
                <div>
                    <Label htmlFor='turnover'>Annual turnover</Label>
                    <Input id='turnover' name='turnover' placeholder='£1.2m' className='mt-1.5' />
                </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                    <Label htmlFor='amount'>Funding amount required</Label>
                    <Input id='amount' name='amount' placeholder='£250k' className='mt-1.5' required />
                </div>
                <div>
                    <Label htmlFor='timeline'>Timeline</Label>
                    <Input id='timeline' name='timeline' placeholder='Within 30 days' className='mt-1.5' />
                </div>
            </div>

            <div>
                <Label htmlFor='purpose'>Funding purpose</Label>
                <Textarea
                    id='purpose'
                    name='purpose'
                    placeholder='Working capital, equipment, VAT bill…'
                    rows={3}
                    className='mt-1.5'
                />
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                    <Label htmlFor='name'>Your name</Label>
                    <Input id='name' name='name' placeholder='Full name' className='mt-1.5' required />
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='you@company.com'
                        className='mt-1.5'
                        required
                    />
                </div>
            </div>

            <div>
                <Label htmlFor='phone'>Mobile / phone</Label>
                <Input id='phone' name='phone' placeholder='+44 7000 000000' className='mt-1.5' />
            </div>

            <p className='text-xs text-muted-foreground'>
                By submitting you consent to Capiflo contacting you about UK business funding via email or
                phone. Review our{' '}
                <Link href='/legal/privacy' className='text-primary hover:underline'>
                    privacy policy
                </Link>
                .
            </p>

            {error && (
                <div className='rounded-lg bg-destructive/10 p-3 text-sm text-destructive'>{error}</div>
            )}

            <Button
                type='submit'
                size='lg'
                disabled={isSubmitting}
                className='w-full h-12 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50'>
                {isSubmitting ? (
                    <>
                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                        Submitting...
                    </>
                ) : (
                    'Submit Enquiry'
                )}
            </Button>
        </form>
    );
}
