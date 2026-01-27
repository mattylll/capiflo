'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';

export type CalculatorVariant =
    | 'loan'
    | 'invoice'
    | 'mca'
    | 'asset'
    | 'vat'
    | 'corp'
    | 'property'
    | 'default';

type Props = {
    title: string;
    description: string;
    variant?: CalculatorVariant;
};

const FundingCalculatorCard = ({ title, description, variant = 'default' }: Props) => {
    return (
        <Card className='rounded-3xl border border-white/15 bg-card/85 p-6'>
            <div className='space-y-1'>
                <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>Calculator</p>
                <h3 className='text-2xl font-semibold text-foreground'>{title}</h3>
                <p className='text-sm text-muted-foreground'>{description}</p>
            </div>
            <div className='mt-6 space-y-4'>
                {renderForm(variant)}
                <Button variant='outline' className='w-full' asChild>
                    <a href='/calculators'>Open advanced calculator</a>
                </Button>
            </div>
        </Card>
    );
};

const renderForm = (variant: CalculatorVariant) => {
    switch (variant) {
        case 'invoice':
            return <InvoiceCalculator />;
        case 'mca':
            return <McaCalculator />;
        case 'asset':
            return <AssetCalculator />;
        case 'vat':
            return <TaxCalculator label='VAT' />;
        case 'corp':
            return <TaxCalculator label='Corporation tax' />;
        case 'property':
            return <PropertyCalculator />;
        case 'loan':
        case 'default':
        default:
            return <LoanCalculator />;
    }
};

const LoanCalculator = () => {
    const [amount, setAmount] = useState(250000);
    const [rate, setRate] = useState(11);
    const [term, setTerm] = useState(36);

    const monthlyRepayment = useMemo(() => {
        const monthlyRate = rate / 100 / 12;
        if (monthlyRate === 0) {
            return amount / term;
        }
        const factor = (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
        return amount * factor;
    }, [amount, rate, term]);

    const totalRepayable = useMemo(() => monthlyRepayment * term, [monthlyRepayment, term]);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-3'>
                <NumberInput id='loan-amount' label='Amount (£)' value={amount} onChange={setAmount} min={10000} />
                <NumberInput id='loan-rate' label='Rate % (APR)' value={rate} onChange={setRate} step={0.1} />
                <NumberInput id='loan-term' label='Term (months)' value={term} onChange={setTerm} min={3} />
            </div>
            <ResultCard
                items={[
                    { label: 'Estimated monthly repayment', value: `£${monthlyRepayment.toFixed(0)}` },
                    { label: 'Total repayable', value: `£${totalRepayable.toFixed(0)}` }
                ]}
            />
        </>
    );
};

const InvoiceCalculator = () => {
    const [invoiceValue, setInvoiceValue] = useState(50000);
    const [advancePercent, setAdvancePercent] = useState(85);
    const [feePercent, setFeePercent] = useState(2.5);

    const advance = useMemo(() => (invoiceValue * advancePercent) / 100, [invoiceValue, advancePercent]);
    const fees = useMemo(() => (invoiceValue * feePercent) / 100, [invoiceValue, feePercent]);
    const cashToday = useMemo(() => advance - fees, [advance, fees]);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-3'>
                <NumberInput id='invoice-amount' label='Invoice (£)' value={invoiceValue} onChange={setInvoiceValue} min={5000} />
                <NumberInput id='invoice-advance' label='Advance %' value={advancePercent} onChange={setAdvancePercent} />
                <NumberInput id='invoice-fees' label='Service fee %' value={feePercent} onChange={setFeePercent} step={0.1} />
            </div>
            <ResultCard
                items={[
                    { label: 'Upfront cash released', value: `£${cashToday.toFixed(0)}` },
                    { label: 'Total advance', value: `£${advance.toFixed(0)}` },
                    { label: 'Fees/reserve', value: `£${fees.toFixed(0)}` }
                ]}
            />
        </>
    );
};

const McaCalculator = () => {
    const [advance, setAdvance] = useState(75000);
    const [factorRate, setFactorRate] = useState(1.25);
    const [monthlyCard, setMonthlyCard] = useState(60000);
    const [holdback, setHoldback] = useState(12);

    const totalPayback = useMemo(() => advance * factorRate, [advance, factorRate]);
    const monthlyHoldback = useMemo(() => (monthlyCard * holdback) / 100, [monthlyCard, holdback]);
    const estimatedMonths = useMemo(() => (monthlyHoldback === 0 ? 0 : totalPayback / monthlyHoldback), [totalPayback, monthlyHoldback]);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-4'>
                <NumberInput id='mca-advance' label='Advance (£)' value={advance} onChange={setAdvance} min={5000} />
                <NumberInput id='mca-factor' label='Factor rate (e.g. 1.25)' value={factorRate} onChange={setFactorRate} step={0.01} min={1} />
                <NumberInput id='mca-card' label='Monthly card sales (£)' value={monthlyCard} onChange={setMonthlyCard} min={1000} />
                <NumberInput id='mca-holdback' label='Holdback %' value={holdback} onChange={setHoldback} />
            </div>
            <ResultCard
                items={[
                    { label: 'Total to repay', value: `£${totalPayback.toFixed(0)}` },
                    { label: 'Monthly deduction', value: `£${monthlyHoldback.toFixed(0)}` },
                    { label: 'Estimated duration', value: `${estimatedMonths.toFixed(1)} months` }
                ]}
            />
        </>
    );
};

const AssetCalculator = () => {
    const [assetCost, setAssetCost] = useState(180000);
    const [depositPercent, setDepositPercent] = useState(10);
    const [term, setTerm] = useState(48);
    const [residual, setResidual] = useState(10000);

    const depositValue = useMemo(() => (assetCost * depositPercent) / 100, [assetCost, depositPercent]);
    const financeAmount = useMemo(() => Math.max(assetCost - depositValue - residual, 0), [assetCost, depositValue, residual]);
    const monthly = useMemo(() => (term === 0 ? 0 : financeAmount / term), [financeAmount, term]);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-4'>
                <NumberInput id='asset-cost' label='Asset cost (£)' value={assetCost} onChange={setAssetCost} min={10000} />
                <NumberInput id='asset-deposit' label='Deposit %' value={depositPercent} onChange={setDepositPercent} />
                <NumberInput id='asset-term' label='Term (months)' value={term} onChange={setTerm} min={12} />
                <NumberInput id='asset-residual' label='Residual (£)' value={residual} onChange={setResidual} min={0} />
            </div>
            <ResultCard
                items={[
                    { label: 'Deposit due', value: `£${depositValue.toFixed(0)}` },
                    { label: 'Financed amount', value: `£${financeAmount.toFixed(0)}` },
                    { label: 'Estimated monthly payment', value: `£${monthly.toFixed(0)}` }
                ]}
            />
        </>
    );
};

const TaxCalculator = ({ label }: { label: string }) => {
    const [liability, setLiability] = useState(150000);
    const [term, setTerm] = useState(12);
    const [feePercent, setFeePercent] = useState(3);

    const feeValue = useMemo(() => (liability * feePercent) / 100, [liability, feePercent]);
    const monthly = useMemo(() => (term === 0 ? 0 : (liability + feeValue) / term), [liability, feeValue, term]);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-3'>
                <NumberInput id='tax-liability' label={`${label} liability (£)`} value={liability} onChange={setLiability} min={10000} />
                <NumberInput id='tax-fee' label='Fee %' value={feePercent} onChange={setFeePercent} step={0.1} />
                <NumberInput id='tax-term' label='Term (months)' value={term} onChange={setTerm} min={3} />
            </div>
            <ResultCard
                items={[
                    { label: 'Fees', value: `£${feeValue.toFixed(0)}` },
                    { label: 'Monthly repayment', value: `£${monthly.toFixed(0)}` }
                ]}
            />
        </>
    );
};

const PropertyCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [monthlyRate, setMonthlyRate] = useState(0.75);
    const [term, setTerm] = useState(12);

    const monthlyInterest = useMemo(() => (loanAmount * monthlyRate) / 100, [loanAmount, monthlyRate]);
    const totalInterest = useMemo(() => monthlyInterest * term, [monthlyInterest, term]);

    return (
        <>
            <div className='grid gap-4 md:grid-cols-3'>
                <NumberInput id='property-amount' label='Loan amount (£)' value={loanAmount} onChange={setLoanAmount} min={50000} />
                <NumberInput id='property-rate' label='Rate % per month' value={monthlyRate} onChange={setMonthlyRate} step={0.05} />
                <NumberInput id='property-term' label='Term (months)' value={term} onChange={setTerm} min={3} />
            </div>
            <ResultCard
                items={[
                    { label: 'Monthly interest', value: `£${monthlyInterest.toFixed(0)}` },
                    { label: 'Interest over term', value: `£${totalInterest.toFixed(0)}` }
                ]}
            />
        </>
    );
};

type NumberInputProps = {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    step?: number;
};

const NumberInput = ({ id, label, value, onChange, min, step }: NumberInputProps) => (
    <div>
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            name={id}
            type='number'
            value={value}
            min={min}
            step={step}
            onChange={(event) => onChange(Number(event.target.value))}
        />
    </div>
);

const ResultCard = ({ items }: { items: { label: string; value: string }[] }) => (
    <div className='rounded-2xl border border-white/10 bg-background/80 p-4'>
        {items.map((item) => (
            <div key={item.label} className='py-2'>
                <p className='text-sm text-muted-foreground'>{item.label}</p>
                <p className='text-xl font-semibold text-foreground'>{item.value}</p>
            </div>
        ))}
    </div>
);

export default FundingCalculatorCard;
