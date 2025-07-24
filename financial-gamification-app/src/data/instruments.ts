export interface FinancialInstrument {
  id: string;
  name: string;
  type: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  beginnerFriendly: boolean;
  keyFeatures: string[];
  learningContent: {
    basicConcepts: string[];
    howItWorks: string;
    advantages: string[];
    risks: string[];
    examples: {
      scenario: string;
      explanation: string;
    }[];
  };
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  glossaryTerms: {
    term: string;
    definition: string;
  }[];
}

export const financialInstruments: FinancialInstrument[] = [
  {
    id: 'stocks-basics',
    name: 'Stocks',
    type: 'Equity',
    description: 'A stock represents ownership in a company and a claim on part of its profits and assets.',
    riskLevel: 'Medium',
    beginnerFriendly: true,
    keyFeatures: [
      'Ownership in a company',
      'Potential for dividends',
      'Voting rights',
      'Market-driven price'
    ],
    learningContent: {
      basicConcepts: [
        'What is a share?',
        'How stock markets work',
        'Types of stocks',
        'Reading stock quotes'
      ],
      howItWorks: 'When you buy a stock, you\'re purchasing a small ownership stake in a company. The stock\'s price changes based on the company\'s performance, market conditions, and investor sentiment.',
      advantages: [
        'Potential for capital appreciation',
        'Dividend income',
        'Ownership rights',
        'High liquidity'
      ],
      risks: [
        'Market volatility',
        'Company-specific risks',
        'Economic risks',
        'No guarantee of returns'
      ],
      examples: [
        {
          scenario: 'Company A\'s stock rises after strong earnings',
          explanation: 'When a company reports better-than-expected earnings, investors often buy more shares, driving the price up.'
        }
      ]
    },
    quizQuestions: [
      {
        question: 'What does owning a stock mean?',
        options: [
          'You\'ve loaned money to the company',
          'You own part of the company',
          'You\'re an employee of the company',
          'You\'re a company customer'
        ],
        correctAnswer: 1,
        explanation: 'When you own a stock, you own a small piece of the company and have a claim on its assets and earnings.'
      }
    ],
    glossaryTerms: [
      {
        term: 'Dividend',
        definition: 'A portion of company\'s earnings distributed to shareholders'
      },
      {
        term: 'Market Capitalization',
        definition: 'Total value of a company\'s shares in the market'
      }
    ]
  }
];
