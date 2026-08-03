// SME finance portfolio sites cross-linked from the footer.
// `live: false` hides a site (use for domains that are parked with no launch
// underway). Sites currently being built are listed live at Matt's request,
// ahead of their DNS pointing anywhere.

export interface PortfolioSite {
    name: string;
    url: string;
    live: boolean;
}

export const portfolioSites: PortfolioSite[] = [
    {
        name: 'Tradesman Finance',
        url: 'https://tradesmanfinance.co.uk',
        live: true
    },
    {
        name: 'Kent Business Finance',
        url: 'https://kentbusinessfinance.co.uk',
        live: true
    },
    {
        name: 'Invoice Finance Factoring',
        url: 'https://www.invoicefinancefactoring.com',
        live: true
    },
    {
        name: 'Hertfordshire Business Funding',
        url: 'https://hertfordshirebusinessfunding.co.uk',
        live: true
    },
    {
        name: 'Business Cash Advances',
        url: 'https://businesscashadvances.co.uk',
        live: true
    },
    {
        name: 'Merchant Services Cash Advances',
        url: 'https://merchantservicescashadvances.co.uk',
        live: true
    },
    {
        name: 'Merchant Loans',
        url: 'https://merchantloans.co.uk',
        live: true
    },
    {
        name: 'Revolving Credit Facilities',
        url: 'https://revolvingcreditfacilities.co.uk',
        live: false
    },
    {
        name: 'VAT Bridging Loans',
        url: 'https://vatbridgingloans.co.uk',
        live: false
    }
];

export const livePortfolioSites = portfolioSites.filter((site) => site.live);
