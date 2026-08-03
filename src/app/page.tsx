import type { Metadata } from 'next';

import BentoGrid from '@/components/home/bento-grid';
import CalculatorEntries from '@/components/home/calculator-entries';
import FinalCTA from '@/components/home/final-cta';
import Hero from '@/components/home/hero';
import HowItWorks from '@/components/home/how-it-works';
import ImpactStats from '@/components/home/impact-stats';
import StraightAnswers from '@/components/home/straight-answers';

// Benner true-statement rule: no physical premises, so the homepage is optimised
// for the largest true area entity — the United Kingdom. Title ≠ H1 (hero.tsx).
export const metadata: Metadata = {
    title: { absolute: 'Business Loans UK | SME & Commercial Finance Broker | Capiflo' },
    description:
        'Capiflo arranges business finance for UK SMEs. Compare business loans, asset finance, invoice finance and commercial mortgages from 120+ lenders in 60 minutes.',
    alternates: { canonical: '/' }
};

const Page = () => {
    return (
        <div className='space-y-20 md:space-y-24 lg:space-y-32 pb-24'>
            <Hero />
            <ImpactStats />
            <BentoGrid />
            <HowItWorks />
            <CalculatorEntries />
            <StraightAnswers />
            <FinalCTA />
        </div>
    );
};

export default Page;
