import React, { useState } from 'react';
import { financialInstruments } from '../../data/instruments';
import './QuizChallenge.css';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizChallenge: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // Collect all quiz questions from all instruments
  const allQuestions: Question[] = financialInstruments.flatMap(
    instrument => instrument.quizQuestions
  );

  const currentQuestion = allQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionIndex(prev => (prev + 1) % allQuestions.length);
  };

  return (
    <div className="quiz-challenge">
      <div className="quiz-header">
        <h2>Financial Knowledge Quiz</h2>
        <div className="score">Score: {score}</div>
      </div>

      <div className="quiz-card">
        <div className="question">
          <h3>Question {currentQuestionIndex + 1}:</h3>
          <p>{currentQuestion.question}</p>
        </div>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`option-button ${
                selectedAnswer !== null
                  ? index === currentQuestion.correctAnswer
                    ? 'correct'
                    : selectedAnswer === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation">
            <p>{currentQuestion.explanation}</p>
            <button onClick={handleNextQuestion} className="next-button">
              Next Question
            </button>
          </div>
        )}
      </div>

      <div className="quiz-progress">
        Question {currentQuestionIndex + 1} of {allQuestions.length}
      </div>
    </div>
  );
};

export default QuizChallenge;
