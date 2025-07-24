export interface FinancialInstrument {
  id: number;
  name: string;
  type: string;
  description: string;
  difficulty: number;
}

export type GameState = 'rolling' | 'learning' | 'failed';
