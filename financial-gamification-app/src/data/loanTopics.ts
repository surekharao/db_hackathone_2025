export interface LoanTopic {
  id: number;
  name: string;
  category: 'basics' | 'types' | 'terms' | 'calculation' | 'risks';
  question: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  points: number;
}

export const loanTopics: LoanTopic[] = [
  {
    id: 1,
    name: 'APR',
    category: 'basics',
    question: 'What is APR in a loan context?',
    explanation: 'Annual Percentage Rate (APR) represents the total yearly cost of a loan including fees and interest, expressed as a percentage.',
    difficulty: 1,
    points: 100
  },
  {
    id: 11,
    name: 'Credit Score Impact',
    category: 'basics',
    question: 'How does your credit score affect loan terms?',
    explanation: 'A higher credit score typically leads to lower interest rates and better loan terms, as it demonstrates creditworthiness to lenders.',
    difficulty: 1,
    points: 100
  },
  {
    id: 12,
    name: 'Collateral Basics',
    category: 'basics',
    question: 'What role does collateral play in secured loans?',
    explanation: 'Collateral is an asset that serves as security for a loan. If you default, the lender can seize the collateral to recover their money.',
    difficulty: 1,
    points: 100
  },
  {
    id: 13,
    name: 'Home Equity',
    category: 'types',
    question: 'What is a Home Equity Line of Credit (HELOC)?',
    explanation: 'A HELOC is a revolving credit line secured by your home\'s equity, allowing you to borrow and repay repeatedly up to a certain limit.',
    difficulty: 2,
    points: 200
  },
  {
    id: 14,
    name: 'Bridge Loans',
    category: 'types',
    question: 'When would someone use a bridge loan?',
    explanation: 'Bridge loans are short-term loans used to "bridge" the gap between buying a new property and selling an existing one, providing temporary financing.',
    difficulty: 3,
    points: 300
  },
  {
    id: 15,
    name: 'Interest Calculation',
    category: 'calculation',
    question: 'What\'s the difference between simple and compound interest?',
    explanation: 'Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and previously accumulated interest.',
    difficulty: 2,
    points: 200
  },
  {
    id: 16,
    name: 'Risk Assessment',
    category: 'risks',
    question: 'What factors do lenders consider in risk assessment?',
    explanation: 'Lenders evaluate credit score, income, debt-to-income ratio, employment history, and collateral value to assess lending risk.',
    difficulty: 2,
    points: 200
  },
  {
    id: 17,
    name: 'Loan Consolidation',
    category: 'terms',
    question: 'What are the benefits of loan consolidation?',
    explanation: 'Loan consolidation combines multiple loans into one, potentially offering lower interest rates, simplified payments, and better terms.',
    difficulty: 2,
    points: 200
  },
  {
    id: 18,
    name: 'Balloon Payments',
    category: 'terms',
    question: 'What is a balloon payment in a loan?',
    explanation: 'A balloon payment is a large, lump-sum payment required at the end of some loans, often after a series of smaller regular payments.',
    difficulty: 3,
    points: 300
  },
  {
    id: 19,
    name: 'Loan Modification',
    category: 'basics',
    question: 'What is loan modification and when might you need it?',
    explanation: 'Loan modification changes the original terms of your loan, often used when borrowers face financial hardship to make payments more manageable.',
    difficulty: 2,
    points: 200
  },
  {
    id: 2,
    name: 'Loan Types',
    category: 'types',
    question: 'What\'s the difference between secured and unsecured loans?',
    explanation: 'Secured loans require collateral (like a house or car) while unsecured loans don\'t need collateral but typically have higher interest rates.',
    difficulty: 1,
    points: 100
  },
  {
    id: 3,
    name: 'Amortization',
    category: 'calculation',
    question: 'How does loan amortization work?',
    explanation: 'Loan amortization is the gradual repayment of a loan through regular payments of principal and interest over time.',
    difficulty: 2,
    points: 200
  },
  {
    id: 4,
    name: 'Default Risk',
    category: 'risks',
    question: 'What happens when you default on a loan?',
    explanation: 'Loan default occurs when you fail to repay as agreed. It can result in penalties, legal action, and damage to your credit score.',
    difficulty: 2,
    points: 200
  },
  {
    id: 5,
    name: 'Prepayment',
    category: 'terms',
    question: 'What is a loan prepayment penalty?',
    explanation: 'A prepayment penalty is a fee charged by some lenders if you pay off your loan earlier than the agreed term.',
    difficulty: 2,
    points: 200
  },
  {
    id: 6,
    name: 'Fixed vs Variable',
    category: 'types',
    question: 'What\'s the main difference between fixed and variable rate loans?',
    explanation: 'Fixed rate loans maintain the same interest rate throughout the term, while variable rates can change based on market conditions.',
    difficulty: 1,
    points: 100
  },
  {
    id: 7,
    name: 'Loan-to-Value',
    category: 'calculation',
    question: 'What is the Loan-to-Value (LTV) ratio?',
    explanation: 'LTV is the ratio between the loan amount and the appraised value of the asset being financed, expressed as a percentage.',
    difficulty: 3,
    points: 300
  },
  {
    id: 8,
    name: 'Debt-to-Income',
    category: 'calculation',
    question: 'How is the Debt-to-Income ratio calculated?',
    explanation: 'DTI is calculated by dividing your total monthly debt payments by your gross monthly income, helping lenders assess your ability to repay.',
    difficulty: 3,
    points: 300
  },
  {
    id: 9,
    name: 'Loan Terms',
    category: 'terms',
    question: 'What factors affect loan terms?',
    explanation: 'Loan terms are affected by credit score, income, loan amount, collateral, market conditions, and the lender\'s policies.',
    difficulty: 2,
    points: 200
  },
  {
    id: 10,
    name: 'Refinancing',
    category: 'basics',
    question: 'What is loan refinancing?',
    explanation: 'Refinancing means replacing an existing loan with a new one, usually to get better terms like a lower interest rate or different payment period.',
    difficulty: 2,
    points: 200
  }
];
