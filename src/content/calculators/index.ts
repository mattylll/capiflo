import type { ArticleContent } from '@/data/content-types';

import assetFinance from './asset-finance';
import bridgingDevelopment from './bridging-development';
import businessBorrowingPower from './business-borrowing-power';
import businessLoanRepayment from './business-loan-repayment';
import commercialMortgage from './commercial-mortgage';
import invoiceFinance from './invoice-finance';
import merchantCashAdvance from './merchant-cash-advance';
import vatLoan from './vat-loan';

/** Supporting article content for each calculator, keyed by calculator slug. */
export const calculatorContent: Record<string, ArticleContent> = {
    'business-loan-repayment': businessLoanRepayment,
    'business-borrowing-power': businessBorrowingPower,
    'invoice-finance': invoiceFinance,
    'asset-finance': assetFinance,
    'merchant-cash-advance': merchantCashAdvance,
    'vat-loan': vatLoan,
    'commercial-mortgage': commercialMortgage,
    'bridging-development': bridgingDevelopment
};
