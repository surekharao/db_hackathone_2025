export interface LoanQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  points: number;
  explanation: string;
}

export const loanQuestions: LoanQuestion[] = [
  {
    id: 1,
    question: "What is APR in a loan context?",
    answers: [
      "Annual Payment Rate",
      "Annual Percentage Rate",
      "Applied Principal Rate",
      "Automatic Payment Return"
    ],
    correctAnswer: 1, // 0-based index
    points: 100,
    explanation: "APR (Annual Percentage Rate) represents the total cost of borrowing, including interest and fees, expressed as a yearly rate."
  },
  {
    id: 2,
    question: "What is a mortgage down payment?",
    answers: [
      "Monthly loan payment",
      "Initial upfront payment",
      "Final loan payment",
      "Interest payment"
    ],
    correctAnswer: 1,
    points: 100,
    explanation: "A down payment is the initial upfront portion of the total property purchase price that you pay when buying a home."
  },
  {
    id: 3,
    question: "What is loan amortization?",
    answers: [
      "Loan forgiveness",
      "Interest-only payments",
      "Gradual loan repayment",
      "Late payment fees"
    ],
    correctAnswer: 2,
    points: 150,
    explanation: "Loan amortization is the process of gradually paying off a debt through regular payments of principal and interest over time."
  },
  {
    id: 4,
    question: "What is collateral in a loan?",
    answers: [
      "Monthly payment",
      "Asset securing the loan",
      "Loan interest rate",
      "Loan duration"
    ],
    correctAnswer: 1,
    points: 100,
    explanation: "Collateral is an asset that a borrower offers to secure a loan, which can be seized by the lender if the borrower defaults."
  },
  {
    id: 5,
    question: "What is a fixed-rate loan?",
    answers: [
      "Loan with changing rates",
      "Interest-free loan",
      "Short-term loan",
      "Loan with constant rate"
    ],
    correctAnswer: 3,
    points: 100,
    explanation: "A fixed-rate loan maintains the same interest rate throughout the entire loan term, providing consistent monthly payments."
  },
  {
    id: 6,
    question: "What is loan refinancing?",
    answers: [
      "Replacing existing loan",
      "Adding more debt",
      "Paying off early",
      "Missing payments"
    ],
    correctAnswer: 0,
    points: 150,
    explanation: "Refinancing involves replacing an existing loan with a new one, typically with better terms or lower interest rates."
  },
  {
    id: 7,
    question: "What is a loan default?",
    answers: [
      "On-time payment",
      "Extra payment",
      "Failure to repay",
      "Interest reduction"
    ],
    correctAnswer: 2,
    points: 100,
    explanation: "A loan default occurs when a borrower fails to make required loan payments according to the agreed schedule."
  }
];
