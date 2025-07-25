export interface GameQuestion {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
}

export interface GameQuestions {
  questions: GameQuestion[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'basics' | 'investments' | 'loans' | 'credit' | 'markets' | 'modern' | 'economics' | 'stocks' | 'trading';

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  answeredQuestions: number[];
  difficulty: Difficulty;
  selectedCategories: Category[];
}
