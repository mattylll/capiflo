'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';

export function IntroducerForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            formType: 'introducer' as const,
            name: formData.get('name') as string,
            company: formData.get('company') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            profession: formData.get('profession') as string,
            deals: formData.get('deals') as string,
            source: formData.get('source') as string,
            message: formData.get('message') as string
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

            router.push('/thank-you?type=introducer');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                    <Label htmlFor='name'>Full name</Label>
                    <Input id='name' name='name' placeholder='Your full name' className='mt-1.5' required />
                </div>
                <div>
                    <Label htmlFor='company'>Company name</Label>
                    <Input id='company' name='company' placeholder='Your company' className='mt-1.5' />
                </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
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
                <div>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input id='phone' name='phone' placeholder='+44 7000 000000' className='mt-1.5' />
                </div>
            </div>

            <div>
                <Label htmlFor='profession'>Your profession</Label>
                <Input
                    id='profession'
                    name='profession'
                    placeholder='e.g. Accountant, IFA, Business Consultant'
                    className='mt-1.5'
                />
            </div>

            <div>
                <Label htmlFor='deals'>Estimated deals per month</Label>
                <Input id='deals' name='deals' placeholder='e.g. 1-2, 3-5, 5-10, 10+' className='mt-1.5' />
            </div>

            <div>
                <Label htmlFor='source'>How did you hear about us?</Label>
                <Input id='source' name='source' placeholder='Google, referral, LinkedIn…' className='mt-1.5' />
            </div>

            <div>
                <Label htmlFor='message'>Anything else? (optional)</Label>
                <Textarea
                    id='message'
                    name='message'
                    placeholder='Tell us about your client base or any questions you have…'
                    rows={3}
                    className='mt-1.5'
                />
            </div>

            <p className='text-xs text-muted-foreground'>
                By submitting you consent to Capiflo contacting you about our introducer programme. Review
                our{' '}
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
                    'Apply to Become an Introducer'
                )}
            </Button>
        </form>
    );
}
