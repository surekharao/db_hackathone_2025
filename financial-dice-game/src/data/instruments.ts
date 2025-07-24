import { FinancialInstrument } from '../types';

export const financialInstruments: FinancialInstrument[] = [
  {
    id: 1,
    name: 'Stocks',
    type: 'Equity',
    description: 'Represents ownership in a company, allowing investors to participate in the company\'s growth and profits.',
    difficulty: 1
  },
  {
    id: 2,
    name: 'Bonds',
    type: 'Fixed Income',
    description: 'Debt instruments where investors lend money to an entity for a fixed period in return for regular interest payments.',
    difficulty: 2
  },
  {
    id: 3,
    name: 'ETFs',
    type: 'Fund',
    description: 'Exchange-Traded Funds that track indexes, sectors, or commodities, trading like stocks on exchanges.',
    difficulty: 2
  },
  {
    id: 4,
    name: 'Options',
    type: 'Derivative',
    description: 'Contracts giving the right, but not obligation, to buy or sell an asset at a specific price within a set time period.',
    difficulty: 3
  },
  {
    id: 5,
    name: 'Futures',
    type: 'Derivative',
    description: 'Standardized contracts to buy or sell an asset at a predetermined future date and price.',
    difficulty: 3
  }
];
