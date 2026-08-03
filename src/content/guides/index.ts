import type { ArticleContent } from '@/data/content-types';

import businessLoanCreditScore from './business-loan-credit-score';
import commercialMortgageDeposit from './commercial-mortgage-deposit';
import howToGetABusinessLoanUk from './how-to-get-a-business-loan-uk';
import invoiceFinanceVsFactoring from './invoice-finance-vs-factoring';
import merchantCashAdvanceVsLoan from './merchant-cash-advance-vs-loan';
import whatIsABridgingLoan from './what-is-a-bridging-loan';
import whatIsInvoiceFinance from './what-is-invoice-finance';
import whatIsWorkingCapitalFinance from './what-is-working-capital-finance';

/** Authored guide bodies, keyed by guide slug. */
export const guideContent: Record<string, ArticleContent> = {
    'how-to-get-a-business-loan-uk': howToGetABusinessLoanUk,
    'what-is-invoice-finance': whatIsInvoiceFinance,
    'invoice-finance-vs-factoring': invoiceFinanceVsFactoring,
    'business-loan-credit-score': businessLoanCreditScore,
    'what-is-a-bridging-loan': whatIsABridgingLoan,
    'commercial-mortgage-deposit': commercialMortgageDeposit,
    'what-is-working-capital-finance': whatIsWorkingCapitalFinance,
    'merchant-cash-advance-vs-loan': merchantCashAdvanceVsLoan
};
