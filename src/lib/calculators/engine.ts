/**
 * Calculator math engine
 *
 * Pure, framework-free functions that power the interactive funding calculators.
 * Each `compute` function takes a flat map of input values (keyed by the input
 * `id` declared in src/data/calculators.ts) and returns labelled result rows the
 * UI renders. All figures are indicative; rate bands reflect typical UK SME
 * lending and are not quotes.
 */

export type ResultRow = {
    label: string;
    value: string;
    /** Highlighted headline result (rendered larger). */
    primary?: boolean;
    /** Optional one-line context shown under the value. */
    hint?: string;
};

export type CalculatorEngine =
    | 'loan-repayment'
    | 'borrowing-power'
    | 'invoice-finance'
    | 'asset-finance'
    | 'merchant-cash-advance'
    | 'vat-loan'
    | 'commercial-mortgage'
    | 'bridging';

export type InputValues = Record<string, number | string>;

// ---- formatting helpers ----

const gbp0 = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
});

const gbp2 = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export const formatMoney = (n: number, decimals = false): string => {
    if (!Number.isFinite(n)) return '—';
    return decimals ? gbp2.format(n) : gbp0.format(Math.round(n));
};

const pct = (n: number, dp = 1): string => `${n.toFixed(dp)}%`;

const num = (v: number | string | undefined, fallback = 0): number => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return Number.isFinite(n as number) ? (n as number) : fallback;
};

/**
 * Standard amortising monthly repayment (annuity formula). Returns 0 for a
 * zero-rate or zero-term input so callers stay defensive.
 */
export const amortisingMonthly = (principal: number, annualRatePct: number, termMonths: number): number => {
    if (principal <= 0 || termMonths <= 0) return 0;
    const r = annualRatePct / 100 / 12;
    if (r === 0) return principal / termMonths;

    return (principal * r) / (1 - Math.pow(1 + r, -termMonths));
};

// ---- per-engine computations ----

const loanRepayment = (v: InputValues): ResultRow[] => {
    const amount = num(v.amount);
    const term = num(v.termMonths);
    const rate = num(v.rate);
    const monthly = amortisingMonthly(amount, rate, term);
    const totalRepayable = monthly * term;
    const totalInterest = totalRepayable - amount;

    return [
        { label: 'Monthly repayment', value: formatMoney(monthly, true), primary: true, hint: `over ${term} months at ${pct(rate)}` },
        { label: 'Total repayable', value: formatMoney(totalRepayable) },
        { label: 'Total interest', value: formatMoney(totalInterest) }
    ];
};

const borrowingPower = (v: InputValues): ResultRow[] => {
    const turnover = num(v.turnover);
    const years = num(v.yearsTrading);
    const monthlyProfit = num(v.monthlyProfit);

    // Indicative unsecured envelope: established firms reach a higher share of
    // turnover; younger firms and thin profit pull the range down.
    let lowShare = 0.1;
    let highShare = 0.25;
    if (years < 1) {
        lowShare = 0.04;
        highShare = 0.1;
    } else if (years < 2) {
        lowShare = 0.07;
        highShare = 0.18;
    }

    const low = turnover * lowShare;
    let high = turnover * highShare;

    // Affordability ceiling: repayments are unlikely to clear roughly half of
    // monthly profit at a typical 12.9% over 36 months.
    const affordableMonthly = monthlyProfit * 0.5;
    if (affordableMonthly > 0) {
        const r = 12.9 / 100 / 12;
        const affordablePrincipal = (affordableMonthly * (1 - Math.pow(1 + r, -36))) / r;
        high = Math.min(high, affordablePrincipal);
    }

    const midMonthly = amortisingMonthly((low + high) / 2, 12.9, 36);

    return [
        {
            label: 'Indicative borrowing range',
            value: `${formatMoney(low)} to ${formatMoney(Math.max(high, low))}`,
            primary: true,
            hint: 'unsecured, subject to underwriting'
        },
        { label: 'Likely monthly repayment', value: formatMoney(midMonthly, true), hint: 'midpoint at 12.9% over 36 months' },
        {
            label: 'Suggested product fit',
            value: years < 1 ? 'Start-up loan or MCA' : monthlyProfit <= 0 ? 'Revenue-based or invoice finance' : 'Unsecured business loan'
        }
    ];
};

const invoiceFinance = (v: InputValues): ResultRow[] => {
    const invoice = num(v.invoiceAmount);
    const advancePct = num(v.advancePct, 85);
    const serviceFeePct = num(v.serviceFeePct, 1.5);
    const discountRate = num(v.discountRate, 7.5);
    const debtorDays = num(v.debtorDays, 45);

    const upfront = invoice * (advancePct / 100);
    const serviceFee = invoice * (serviceFeePct / 100);
    const discountFee = upfront * (discountRate / 100) * (debtorDays / 365);
    const totalFee = serviceFee + discountFee;
    const reserve = invoice - upfront;
    const effectiveAnnualised = invoice > 0 ? (totalFee / invoice) * (365 / debtorDays) * 100 : 0;

    return [
        { label: 'Cash released upfront', value: formatMoney(upfront), primary: true, hint: `${pct(advancePct, 0)} advance` },
        { label: 'Reserve held back', value: formatMoney(reserve), hint: 'released when the debtor pays' },
        { label: 'Total fees this invoice', value: formatMoney(totalFee, true), hint: `service ${formatMoney(serviceFee, true)} + discount ${formatMoney(discountFee, true)}` },
        { label: 'Effective annualised cost', value: pct(effectiveAnnualised) }
    ];
};

const assetFinance = (v: InputValues): ResultRow[] => {
    const cost = num(v.assetCost);
    const depositPct = num(v.depositPct, 10);
    const balloon = num(v.balloon);
    const term = num(v.termMonths);
    const rate = num(v.rate, 9.5);

    const deposit = cost * (depositPct / 100);
    const financed = Math.max(cost - deposit - balloon, 0);
    const monthly = amortisingMonthly(financed, rate, term);
    const totalPaid = deposit + monthly * term + balloon;
    const totalCost = totalPaid - cost;

    return [
        { label: 'Monthly repayment', value: formatMoney(monthly, true), primary: true, hint: `over ${term} months at ${pct(rate)}` },
        { label: 'Amount financed', value: formatMoney(financed), hint: `after ${formatMoney(deposit)} deposit` },
        { label: 'Total cost of finance', value: formatMoney(totalCost) },
        ...(balloon > 0 ? [{ label: 'Balloon / final payment', value: formatMoney(balloon) }] : [])
    ];
};

const merchantCashAdvance = (v: InputValues): ResultRow[] => {
    const monthlyCardRevenue = num(v.monthlyCardRevenue);
    const advance = num(v.advanceAmount);
    const factor = num(v.factorRate, 1.2);
    const holdback = num(v.holdbackPct, 15);

    const totalRepayable = advance * factor;
    const monthlyDeduction = monthlyCardRevenue * (holdback / 100);
    const months = monthlyDeduction > 0 ? totalRepayable / monthlyDeduction : 0;
    const cost = totalRepayable - advance;
    const dailyDeduction = monthlyDeduction / 30;

    return [
        { label: 'Total repayable', value: formatMoney(totalRepayable), primary: true, hint: `${advance > 0 ? factor.toFixed(2) : '—'} factor rate` },
        { label: 'Cost of the advance', value: formatMoney(cost) },
        { label: 'Estimated payback period', value: months > 0 ? `${months.toFixed(1)} months` : '—', hint: `${pct(holdback, 0)} of card takings` },
        { label: 'Typical daily deduction', value: formatMoney(dailyDeduction, true) }
    ];
};

const vatLoan = (v: InputValues): ResultRow[] => {
    const liability = num(v.liability);
    const term = num(v.termMonths, 3);
    const rate = num(v.rate, 12);
    const monthly = amortisingMonthly(liability, rate, term);
    const totalRepayable = monthly * term;
    const cost = totalRepayable - liability;

    return [
        { label: 'Monthly repayment', value: formatMoney(monthly, true), primary: true, hint: `${term}-month term at ${pct(rate)}` },
        { label: 'Total cost of spreading', value: formatMoney(cost), hint: 'interest and fees over the term' },
        { label: 'Total repayable to lender', value: formatMoney(totalRepayable) }
    ];
};

const commercialMortgage = (v: InputValues): ResultRow[] => {
    const value = num(v.propertyValue);
    const depositPct = num(v.depositPct, 30);
    const rate = num(v.rate, 7.5);
    const termYears = num(v.termYears, 20);
    const interestOnly = String(v.repaymentType ?? 'repayment') === 'interest-only';

    const loan = value * (1 - depositPct / 100);
    const ltv = value > 0 ? (loan / value) * 100 : 0;
    const termMonths = termYears * 12;
    const monthly = interestOnly ? (loan * (rate / 100)) / 12 : amortisingMonthly(loan, rate, termMonths);
    const totalRepayable = interestOnly ? monthly * termMonths + loan : monthly * termMonths;

    return [
        { label: 'Monthly repayment', value: formatMoney(monthly, true), primary: true, hint: interestOnly ? 'interest only' : `capital and interest over ${termYears} years` },
        { label: 'Loan amount', value: formatMoney(loan), hint: `${pct(ltv, 0)} LTV after ${pct(depositPct, 0)} deposit` },
        { label: 'Deposit required', value: formatMoney(value * (depositPct / 100)) },
        { label: interestOnly ? 'Total cost (plus capital at exit)' : 'Total repayable', value: formatMoney(totalRepayable) }
    ];
};

const bridging = (v: InputValues): ResultRow[] => {
    const loan = num(v.loanAmount);
    const monthlyRate = num(v.monthlyRate, 0.85);
    const term = num(v.termMonths, 12);
    const feePct = num(v.arrangementFeePct, 2);

    const arrangementFee = loan * (feePct / 100);
    const monthlyInterest = loan * (monthlyRate / 100);
    const rolledUpInterest = monthlyInterest * term;
    const totalToRepay = loan + rolledUpInterest + arrangementFee;

    return [
        { label: 'Monthly interest', value: formatMoney(monthlyInterest, true), primary: true, hint: `${pct(monthlyRate, 2)} per month` },
        { label: 'Rolled-up interest at exit', value: formatMoney(rolledUpInterest), hint: `over ${term} months` },
        { label: 'Arrangement fee', value: formatMoney(arrangementFee), hint: `${pct(feePct, 1)} of the loan` },
        { label: 'Total to repay at exit', value: formatMoney(totalToRepay) }
    ];
};

const ENGINES: Record<CalculatorEngine, (v: InputValues) => ResultRow[]> = {
    'loan-repayment': loanRepayment,
    'borrowing-power': borrowingPower,
    'invoice-finance': invoiceFinance,
    'asset-finance': assetFinance,
    'merchant-cash-advance': merchantCashAdvance,
    'vat-loan': vatLoan,
    'commercial-mortgage': commercialMortgage,
    bridging
};

export const compute = (engine: CalculatorEngine, values: InputValues): ResultRow[] => {
    return ENGINES[engine](values);
};
