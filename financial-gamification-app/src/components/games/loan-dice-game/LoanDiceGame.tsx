import React, { useState, useEffect } from 'react';
import { LoanTopic, loanTopics } from '../../../data/loanTopics';
import './LoanDiceGame.css';

const LoanDiceGame: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<LoanTopic | null>(null);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('loanDiceHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const getRandomTopic = (): LoanTopic => {
    const index = Math.floor(Math.random() * loanTopics.length);
    return loanTopics[index];
  };

  const rollDice = () => {
    setIsRolling(true);
    setShowAnswer(false);
    setMessage('');

    // Reset streak and multiplier if previous question wasn't answered
    if (currentTopic && !showAnswer) {
      setStreak(0);
      setMultiplier(1);
    }

    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Stop rolling after 1 second and set final value
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setIsRolling(false);

      // If roll is 4 or higher, show a question
      if (finalValue >= 4) {
        const topic = getRandomTopic();
        setCurrentTopic(topic);
        const streakMsg = streak > 0 ? ` Current streak: ${streak}` : '';
        const multiplierMsg = multiplier > 1 ? ` (${multiplier}x multiplier!)` : '';
        setMessage(`Great roll! Answer the question to earn points!${streakMsg}${multiplierMsg}`);
      } else {
        setCurrentTopic(null);
        setStreak(0);
        setMultiplier(1);
        setMessage('Roll 4 or higher to get a question!');
      }
    }, 1000);
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    if (currentTopic) {
      const pointsEarned = currentTopic.points * multiplier;
      const newScore = score + pointsEarned;
      setScore(newScore);
      
      // Update streak and multiplier
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Increase multiplier every 3 correct answers
      if (newStreak % 3 === 0) {
        setMultiplier(prev => Math.min(prev + 0.5, 3)); // Cap multiplier at 3x
      }

      // Update high score
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('loanDiceHighScore', newScore.toString());
      }

      setMessage(`+${pointsEarned} points! ${newStreak > 1 ? `${newStreak} streak! ` : ''}${multiplier > 1 ? `${multiplier}x multiplier!` : ''}`);
    }
  };

  return (
    <div className="loan-dice-game">
      <div className="game-header">
        <h2>Loan Learning Dice Game</h2>
        <div className="score">Score: {score}</div>
      </div>

      <div className="dice-container">
        <div className={`dice ${isRolling ? 'rolling' : ''}`}>
          {[...Array(diceValue)].map((_, i) => (
            <div key={i} className="dot" />
          ))}
        </div>
      </div>

      <button 
        className="roll-button game-button"
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      {message && (
        <div className={`message ${currentTopic ? 'success' : 'info'}`}>
          {message}
        </div>
      )}

      {currentTopic && (
        <div className="topic-card game-card">
          <div className="topic-header">
            <h3>{currentTopic.name}</h3>
            <span className="topic-category game-badge">
              {currentTopic.category}
            </span>
          </div>
          
          <p className="question">{currentTopic.question}</p>
          
          {!showAnswer && (
            <button 
              className="show-answer-button game-button"
              onClick={revealAnswer}
            >
              Show Answer
            </button>
          )}
          
          {showAnswer && (
            <div className="answer">
              <h4>Explanation:</h4>
              <p>{currentTopic.explanation}</p>
              <div className="points">+{currentTopic.points} points!</div>
            </div>
          )}
        </div>
      )}

      <div className="instructions">
        <p>Roll the dice to learn about loans! Get 4 or higher to reveal a question.</p>
        <p>Answer questions correctly to earn points and master loan concepts.</p>
      </div>
    </div>
  );
};

export default LoanDiceGame;
