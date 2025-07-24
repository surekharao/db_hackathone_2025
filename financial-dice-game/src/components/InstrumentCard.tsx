import React from 'react';
import { GameState, FinancialInstrument } from '../types';
import { financialInstruments } from '../data/instruments';
import './InstrumentCard.css';

interface InstrumentCardProps {
  gameState: GameState;
  onNext: () => void;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({ gameState, onNext }) => {
  const getRandomInstrument = (): FinancialInstrument => {
    const index = Math.floor(Math.random() * financialInstruments.length);
    return financialInstruments[index];
  };

  const instrument = getRandomInstrument();

  return (
    <div className={`instrument-card ${gameState}`}>
      <h2>{instrument.name}</h2>
      <p className="type">Type: {instrument.type}</p>
      <p className="description">{instrument.description}</p>
      
      {gameState === 'learning' && (
        <>
          <div className="success-message">
            Congratulations! You're learning about this instrument!
          </div>
          <button onClick={onNext} className="next-button">
            Next Instrument
          </button>
        </>
      )}
      
      {gameState === 'failed' && (
        <>
          <div className="failed-message">
            Try again! You need to roll 4 or higher.
          </div>
          <button onClick={onNext} className="retry-button">
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default InstrumentCard;
