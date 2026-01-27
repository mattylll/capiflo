import BentoGrid from '@/components/home/bento-grid';
import CalculatorEntries from '@/components/home/calculator-entries';
import FinalCTA from '@/components/home/final-cta';
import Hero from '@/components/home/hero';
import HowItWorks from '@/components/home/how-it-works';
import ImpactStats from '@/components/home/impact-stats';
import MobileMockup from '@/components/home/mobile-mockup';
import FundingTeamSection from '@/components/home/team';
import TestimonialsSection from '@/components/home/testimonials';
import TrustPanel from '@/components/home/trust-panel';
import WhyCapifloSection from '@/components/home/why-capiflo';

const Page = () => {
    return (
        <div className='space-y-20 md:space-y-24 lg:space-y-32 pb-24'>
            <Hero />
            <ImpactStats />
            <BentoGrid />
            <HowItWorks />
            <MobileMockup />
            <TrustPanel />
            <TestimonialsSection />
            <FundingTeamSection />
            <WhyCapifloSection />
            <CalculatorEntries />
            <FinalCTA />
        </div>
    );
};

export default Page;
