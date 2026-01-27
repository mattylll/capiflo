import { CheckCircle2 } from 'lucide-react';

import { Card } from '@/registry/new-york-v4/ui/card';

const POINTS = [
    'Real human support from UK-based funding specialists',
    'Clear funding routes mapped before you apply',
    'Same-day options for urgent VAT, payroll, or bridging gaps',
    'No jargon, no pressure — just transparent recommendations',
    'Built for UK SMEs with lenders across every sector',
    'Data-led approach reduces declines and rework'
];

const WhyCapifloSection = () => {
    return (
        <section className='px-4 lg:px-8'>
            <Card className='mx-auto max-w-6xl overflow-hidden rounded-3xl border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-10 animate-in fade-in slide-in-from-bottom-6 duration-700'>
                {/* Header */}
                <div className='flex flex-col gap-4'>
                    <p className='text-sm font-medium uppercase tracking-widest text-primary'>
                        Why business owners choose Capiflo
                    </p>
                    <h2 className='text-3xl font-semibold text-foreground sm:text-4xl'>
                        Premium tooling, human warmth.
                    </h2>
                    <p className='max-w-2xl text-muted-foreground'>
                        A single platform where clarity, trust, and data-backed guidance meet. You stay
                        in control, we handle the heavy lifting.
                    </p>
                </div>

                {/* Points grid */}
                <ul className='mt-10 grid gap-4 md:grid-cols-2'>
                    {POINTS.map((point, index) => (
                        <li
                            key={point}
                            className='flex items-start gap-3 rounded-2xl border border-primary/10 bg-card/80 px-5 py-4 transition-all duration-300 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-500'
                            style={{ animationDelay: `${index * 50 + 200}ms` }}>
                            <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                            <span className='text-foreground'>{point}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    );
};

export default WhyCapifloSection;
