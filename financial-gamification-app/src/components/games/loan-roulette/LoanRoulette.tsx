import React, { useState, useMemo } from 'react';
import { loanQuestions, LoanQuestion } from '../../../data/loanQuestions';
import './LoanRoulette.css';

const LoanRoulette: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const questions = useMemo(() => [...loanQuestions], []);
  const currentQuestion = selectedNumber ? questions[selectedNumber - 1] : null;

  const animateRouletteSelection = (finalNumber: number) => {
    setIsAnimating(true);
    let currentRotation = 0;
    const animationDuration = 4000; // 4 seconds
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth deceleration
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      
      // Calculate current rotation including multiple spins
      const totalSpins = 5; // Number of full rotations
      const targetRotation = (360 * totalSpins) + ((finalNumber - 1) * (360 / 7));
      currentRotation = targetRotation * easeOut(progress);
      
      setRotationDegree(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setSelectedNumber(finalNumber);
        setScore(prev => prev + finalNumber * 10);
        setSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setAnsweredCorrectly(isCorrect);
    
    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points);
    }
  };

  const spinRoulette = () => {
    if (spinning) return;

    setSpinning(true);

    setSelectedNumber(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredCorrectly(false);

    // Random number selection (1-7)
    const number = Math.floor(Math.random() * 7) + 1;
    animateRouletteSelection(number);
  };

  return (
    <div className="loan-roulette">
      <div className="game-header">
        <h2>Lucky Number Roulette</h2>
        <div className="score">Score: {score}</div>
      </div>

      <div className="roulette-container">
        <div className="roulette-pointer"></div>
        <div
          className="roulette-wheel"
          style={{ transform: `rotate(${rotationDegree}deg)` }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((number) => (
            <div
              key={number}
              className={`roulette-segment ${selectedNumber === number ? 'active' : ''}`}
            >
              <span className="segment-number">{number}</span>
            </div>
          ))}
          <div className="roulette-center"></div>
        </div>
      </div>

      {currentQuestion && !spinning && (
        <div className="question-container">
          <h3 className="question">{currentQuestion.question}</h3>
          
          <div className="answers-grid">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${
                  selectedAnswer === index
                    ? answeredCorrectly
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${selectedAnswer !== null ? 'disabled' : ''} ${
                  showResult && currentQuestion.correctAnswer === index ? 'show-correct' : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`answer-result ${answeredCorrectly ? 'correct' : 'incorrect'}`}>
              <h4>{answeredCorrectly ? 'Correct!' : 'Incorrect!'}</h4>
              {answeredCorrectly && <div className="points">+{currentQuestion.points} points</div>}
              <p className="explanation">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      <button
        className={`spin-button ${spinning ? "disabled" : ""}`}
        onClick={spinRoulette}
        disabled={spinning || isAnimating}
      >
        {spinning ? 'Spinning...' : showResult ? 'Next Question' : 'Spin the Wheel'}
      </button>
    </div>
  );
};

export default LoanRoulette;
