import React, { useState } from 'react';
import { GameState } from '../types';
import './DiceGame.css';
import './DiceGame.dots.css';

interface DiceGameProps {
  onRoll: (value: number) => void;
  gameState: GameState;
}

const DiceGame = ({ onRoll, gameState }: DiceGameProps): JSX.Element => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Stop rolling after 1 second and set final value
    setTimeout(() => {
      clearInterval(rollInterval);
      setIsRolling(false);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      onRoll(finalValue);
    }, 1000);
  };

  return (
    <div className="dice-game">
      <div className="dice-container">
        <div className={`dice ${isRolling ? 'rolling' : ''}`}>
          {/* Front face */}
          <div className="dice-face front" data-value={diceValue}>
            {[...Array(diceValue)].map((_, i) => (
              <div key={i} className="dot" style={{
                opacity: isRolling ? 0 : 1,
                animation: isRolling ? 'none' : 'appear 0.3s ease-out'
              }} />
            ))}
          </div>
          {/* Back face */}
          <div className="dice-face back">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="dot" />
            ))}
          </div>
          {/* Right face */}
          <div className="dice-face right">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="dot" />
            ))}
          </div>
          {/* Left face */}
          <div className="dice-face left">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="dot" />
            ))}
          </div>
          {/* Top face */}
          <div className="dice-face top">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="dot" />
            ))}
          </div>
          {/* Bottom face */}
          <div className="dice-face bottom">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="dot" />
            ))}
          </div>
        </div>
      </div>
      <button 
        onClick={rollDice}
        disabled={gameState === 'learning' || isRolling}
        className={`roll-button ${isRolling ? 'rolling' : ''}`}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      <p className="instructions">
        Roll 4 or higher to learn about the financial instrument!
      </p>
    </div>
  );
};

export default DiceGame;
