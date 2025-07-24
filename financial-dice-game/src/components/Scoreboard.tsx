import React from 'react';
import './Scoreboard.css';

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
    </div>
  );
};

export default Scoreboard;
