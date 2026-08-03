import Link from 'next/link';

import { Button } from '@/registry/new-york-v4/ui/button';

// A genuine sequence, so the numbering carries information: this is the order
// a deal file moves across the desk.
const STEPS = [
    {
        step: '01',
        title: 'Tell us what you need',
        description:
            'Five minutes, on the phone or the form. What the money is for, how fast you need it, and anything you would rather avoid.'
    },
    {
        step: '02',
        title: 'We work the panel',
        description:
            'We benchmark 120+ lenders and come back with the routes actually worth your time. Still no footprint on your credit file.'
    },
    {
        step: '03',
        title: 'You walk in prepared',
        description:
            'You will know the likely rate, the paperwork and the awkward questions before the lender asks them.'
    }
];

const HowItWorks = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <p className='ledger-eyebrow'>How it works</p>
                <h2 className='font-display text-foreground mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl'>
                    Three steps, and only the last one involves a lender
                </h2>

                <ol className='border-border bg-border mt-10 grid gap-px overflow-hidden border md:grid-cols-3'>
                    {STEPS.map((item) => (
                        <li key={item.step} className='bg-card p-8'>
                            <p className='text-brass font-mono text-sm font-medium tabular-nums'>{item.step}</p>
                            <h3 className='text-foreground mt-4 text-xl font-semibold'>{item.title}</h3>
                            <p className='text-muted-foreground mt-3 leading-relaxed'>{item.description}</p>
                        </li>
                    ))}
                </ol>

                <div className='border-primary bg-accent mt-8 flex flex-col items-start justify-between gap-4 border-l-2 px-6 py-4 sm:flex-row sm:items-center'>
                    <p className='text-muted-foreground text-sm'>
                        <span className='text-foreground font-medium'>And sometimes the answer is: don&apos;t
                        borrow.</span>{' '}
                        If the numbers don&apos;t work, we&apos;ll tell you that too. It costs nothing to ask.
                    </p>
                    <Button asChild>
                        <Link href='/contact'>Ask us</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
