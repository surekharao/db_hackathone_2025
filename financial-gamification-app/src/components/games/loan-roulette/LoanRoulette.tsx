import React, { useState, useEffect } from 'react';
import { loanTopics, LoanTopic } from '../../../data/loanTopics';
import './LoanRoulette.css';

interface RouletteTerm {
  id: number;
  term: string;
  explanation: string;
  points: number;
  category: string;
}

const LoanRoulette: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<RouletteTerm | null>(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  // Select random terms from loanTopics for the roulette
  const rouletteTerms: RouletteTerm[] = React.useMemo(() => {
    const shuffled = [...loanTopics].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8).map(topic => ({
      id: topic.id,
      term: topic.name,
      explanation: topic.explanation,
      points: topic.points,
      category: topic.category
    }));
  }, [currentRound]); // Reshuffle terms each round

  const animateRouletteSelection = (finalIndex: number) => {
    setIsAnimating(true);
    let currentRotation = 0;
    const animationDuration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth deceleration
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      
      // Calculate current rotation including multiple spins
      const totalSpins = 5; // Number of full rotations
      const targetRotation = (360 * totalSpins) + (finalIndex * (360 / rouletteTerms.length));
      currentRotation = targetRotation * easeOut(progress);
      
      setRotationDegree(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        const selected = rouletteTerms[finalIndex];
        setSelectedTerm(selected);
        setScore(prev => prev + selected.points);
        setTimeout(() => setShowExplanation(true), 300);
        setSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const spinRoulette = () => {
    if (spinning || isAnimating) return;

    setSpinning(true);
    setSelectedTerm(null);
    setShowExplanation(false);

    // Random term selection
    const termIndex = Math.floor(Math.random() * rouletteTerms.length);
    animateRouletteSelection(termIndex);
  };

  return (
    <div className="loan-roulette">
      <div className="game-header">
        <h2>Financial Terms Roulette</h2>
        <div className="score">Score: {score}</div>
      </div>

      <div className="roulette-container">
        <div
          className="roulette-wheel"
          style={{ transform: `rotate(${rotationDegree}deg)` }}
        >
          {rouletteTerms.map((term, index) => (
            <div
              key={term.id}
              className={`roulette-segment ${selectedTerm?.id === term.id ? 'active' : ''}`}
              style={{
                transform: `rotate(${index * (360 / rouletteTerms.length)}deg)`
              }}
            >
              <span className="term-text">{term.term}</span>
            </div>
          ))}
        </div>
        <div className="roulette-pointer"></div>
      </div>

      {selectedTerm && (
        <div className={`result ${showExplanation ? 'show' : ''}`}>
          <h3>You landed on: {selectedTerm.term}</h3>
          <div className="points">+{selectedTerm.points} points!</div>
          {showExplanation && (
            <div className="explanation">
              <p>{selectedTerm.explanation}</p>
            </div>
          )}
        </div>
      )}

      <button
        className={`spin-button ${spinning ? 'disabled' : ''}`}
        onClick={spinRoulette}
        disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
    </div>
  );
};

export default LoanRoulette;
