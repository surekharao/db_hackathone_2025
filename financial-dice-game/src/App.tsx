import React, { useState, useEffect } from 'react';
import DiceGame from './components/DiceGame';
import InstrumentCard from './components/InstrumentCard';
import Scoreboard from './components/Scoreboard';
import { FinancialInstrument } from './types';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [currentInstrument, setCurrentInstrument] = useState<FinancialInstrument | null>(null);
  const [gameState, setGameState] = useState<'rolling' | 'learning' | 'failed'>('rolling');

  const handleDiceRoll = (value: number) => {
    if (value >= 4) {
      setScore(prev => prev + value * 10);
      setGameState('learning');
    } else {
      setGameState('failed');
    }
  };

  const handleNextInstrument = () => {
    setGameState('rolling');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Financial Instrument Dice Game</h1>
        <Scoreboard score={score} />
      </header>
      <main className="App-main">
        <DiceGame 
          onRoll={handleDiceRoll}
          gameState={gameState}
        />
        <InstrumentCard 
          gameState={gameState}
          onNext={handleNextInstrument}
        />
      </main>
    </div>
  );
}

export default App;
