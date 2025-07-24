import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useStyle } from '../../contexts/StyleContext';
import './AccessibleQuiz.css';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hints?: string[];
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is a stock dividend?',
    options: [
      'A cash payment from company profits',
      'A distribution of additional shares to stockholders',
      'A type of bond',
      'A stock market index'
    ],
    correctAnswer: 1,
    explanation: 'A stock dividend is when a company distributes additional shares to existing shareholders instead of cash dividends.',
    difficulty: 'easy',
    category: 'Stocks',
    hints: ['Think about how companies can reward shareholders', 'It involves receiving more of what you already own']
  },
  {
    id: '2',
    question: 'What does ROI stand for?',
    options: [
      'Return On Investment',
      'Rate Of Interest',
      'Risk Of Investment',
      'Return On Income'
    ],
    correctAnswer: 0,
    explanation: 'ROI (Return On Investment) measures the profitability of an investment relative to its cost.',
    difficulty: 'easy',
    category: 'Investment Basics',
    hints: ['This is a common metric used to evaluate investments', 'It measures how much you get back compared to what you put in']
  }
];

const AccessibleQuiz: React.FC = () => {
  const { settings, speak } = useAccessibility();
  const { settings: styleSettings } = useStyle();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    // Randomize questions order
    setQuestions([...sampleQuestions].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (settings.readAloud && questions[currentQuestionIndex]) {
      speak(questions[currentQuestionIndex].question);
    }
  }, [currentQuestionIndex, questions, settings.readAloud, speak]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (settings.readAloud) {
      speak(questions[currentQuestionIndex].options[index]);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      if (settings.readAloud) {
        speak('Correct! ' + currentQuestion.explanation);
      }
    } else {
      if (settings.readAloud) {
        speak('Incorrect. ' + currentQuestion.explanation);
      }
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setHintsUsed(0);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setQuestions([...sampleQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setHintsUsed(0);
  };

  const handleHint = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.hints && hintsUsed < currentQuestion.hints.length) {
      if (settings.readAloud) {
        speak(currentQuestion.hints[hintsUsed]);
      }
      setHintsUsed(prev => prev + 1);
    }
  };

  if (!questions.length) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizComplete = currentQuestionIndex >= questions.length;

  if (isQuizComplete) {
    return (
      <div className="quiz-complete" role="alert">
        <h2>Quiz Complete! 🎉</h2>
        <p className="final-score">Your Score: {score}/{questions.length}</p>
        <p className="score-message">
          {score === questions.length 
            ? 'Perfect score! Excellent work!' 
            : score >= questions.length / 2 
              ? 'Good job! Keep learning!'
              : 'Keep practicing to improve your score!'}
        </p>
        <button 
          className="game-button restart-button"
          onClick={handleRestart}
          aria-label="Restart quiz"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="accessible-quiz">
      <div className="quiz-progress">
        <div 
          className="progress-bar" 
          style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={(currentQuestionIndex / questions.length) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        />
      </div>

      <div className="quiz-score">
        Score: {score}/{currentQuestionIndex}
      </div>

      <div className="question-container" role="region" aria-live="polite">
        <h2 className="question">
          {currentQuestion.question}
          {currentQuestion.difficulty === 'easy' && (
            <span className="difficulty-badge">👶 Beginner</span>
          )}
        </h2>

        <div className="options-list" role="radiogroup" aria-label="Question options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswer === index ? 'selected' : ''} ${
                showExplanation
                  ? index === currentQuestion.correctAnswer
                    ? 'correct'
                    : selectedAnswer === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              aria-pressed={selectedAnswer === index}
              aria-disabled={showExplanation}
            >
              {option}
            </button>
          ))}
        </div>

        {currentQuestion.hints && (
          <button
            className="game-button hint-button"
            onClick={handleHint}
            disabled={hintsUsed >= currentQuestion.hints.length}
            aria-label={`Use hint (${currentQuestion.hints.length - hintsUsed} remaining)`}
          >
            Get Hint
          </button>
        )}

        {showExplanation && (
          <div className="explanation" role="alert">
            <p>{currentQuestion.explanation}</p>
            {currentQuestionIndex < questions.length - 1 ? (
              <button 
                className="game-button next-button"
                onClick={handleNext}
                aria-label="Next question"
              >
                Next Question
              </button>
            ) : (
              <button 
                className="game-button finish-button"
                onClick={handleNext}
                aria-label="Finish quiz"
              >
                Finish Quiz
              </button>
            )}
          </div>
        )}

        {!showExplanation && (
          <button
            className="game-button submit-button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            aria-disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default AccessibleQuiz;
