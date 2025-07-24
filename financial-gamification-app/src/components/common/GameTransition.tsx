import React from 'react';
import './GameTransition.css';

interface GameTransitionProps {
  children: React.ReactNode;
}

const GameTransition: React.FC<GameTransitionProps> = ({ children }) => {
  return (
    <div className="game-transition">
      <div className="game-transition-content">
        {children}
      </div>
    </div>
  );
};

export default GameTransition;
