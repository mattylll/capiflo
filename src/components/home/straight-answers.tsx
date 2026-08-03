// Trust through candour: the questions business owners actually ask a broker,
// answered plainly. This replaces fabricated social proof.
const ANSWERS = [
    {
        question: 'How do you get paid?',
        answer: 'By the lender, in most cases. If your facility completes, the lender pays us a commission. Ask us at any point what we stand to make on your deal and we’ll tell you. Really.'
    },
    {
        question: 'Are you a lender?',
        answer: 'No. We’re brokers. We find the deal, prepare your file and make the introductions. The money is always the lender’s, and so is the final decision.'
    },
    {
        question: 'Is this FCA regulated?',
        answer: 'No, and it’s worth understanding what that means before you sign anything, with us or anyone else. Business lending of this kind isn’t regulated by the Financial Conduct Authority, and FOS and FSCS protections don’t apply. We arrange it for business purposes only, subject to status.'
    },
    {
        question: 'Will asking mark my credit file?',
        answer: 'No. Matching runs on soft checks. A hard check only happens if you pick a lender and decide to proceed, and you’ll hear it from us before it does.'
    }
];

const StraightAnswers = () => {
    return (
        <section className='px-4 lg:px-8'>
            <div className='mx-auto max-w-6xl'>
                <p className='ledger-eyebrow'>Fair questions</p>
                <h2 className='font-display text-foreground mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl'>
                    Things people ask us on the first call
                </h2>
                <p className='text-muted-foreground mt-4 max-w-2xl'>
                    You should ask any broker these. Here are our answers, in writing.
                </p>

                <dl className='mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2'>
                    {ANSWERS.map((item) => (
                        <div key={item.question} className='border-border border-t pt-5'>
                            <dt className='text-foreground text-lg font-semibold'>{item.question}</dt>
                            <dd className='text-muted-foreground mt-3 leading-relaxed'>{item.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default StraightAnswers;
