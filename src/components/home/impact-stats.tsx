// Every figure here is checkable against the site itself: the lender panel we
// benchmark, the products we arrange, the location pages we publish, the
// calculators we host. No invented totals.
const STATS = [
    {
        value: '120+',
        label: 'Lenders on the panel',
        note: 'High-street banks down to specialists most people have never heard of'
    },
    {
        value: '10',
        label: 'Funding products',
        note: 'If it exists in UK business lending, we can probably arrange it'
    },
    {
        value: '459',
        label: 'Towns and counties covered',
        note: 'Wherever you trade, the local market is on our map'
    },
    {
        value: '8',
        label: 'Calculators',
        note: 'Check the numbers yourself before you talk to anyone'
    }
];

const ImpactStats = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <p className='ledger-eyebrow'>Where we stand</p>
                <div className='mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
                    {STATS.map((stat) => (
                        <div key={stat.label} className='border-foreground border-t-2 pt-4'>
                            <p className='text-foreground font-mono text-4xl font-medium tabular-nums'>{stat.value}</p>
                            <p className='text-foreground mt-2 text-sm font-medium'>{stat.label}</p>
                            <p className='text-muted-foreground mt-1 text-sm'>{stat.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;
