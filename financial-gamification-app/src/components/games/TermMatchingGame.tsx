import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import './TermMatchingGame.css';

interface Term {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  example: string;
}

const TermMatchingGame = () => {
  const { settings, speak } = useAccessibility();
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);

  const sampleTerms: Term[] = [
    {
      id: '1',
      term: 'Stock',
      definition: 'A share in the ownership of a company',
      category: 'Investment',
      difficulty: 'easy',
      example: 'Buying Apple stock means you own a small part of Apple Inc.'
    },
    {
      id: '2',
      term: 'Dividend',
      definition: 'A payment made by a company to its shareholders',
      category: 'Investment',
      difficulty: 'easy',
      example: 'Getting $1 per share every quarter as dividend'
    },
    {
      id: '3',
      term: 'Interest Rate',
      definition: 'The cost of borrowing money, shown as a percentage',
      category: 'Banking',
      difficulty: 'easy',
      example: 'A 5% interest rate on your savings account'
    }
  ];

  useEffect(() => {
    setTerms(sampleTerms.sort(() => Math.random() - 0.5));
  }, []);

  const handleTermClick = (termId: string) => {
    if (matches.includes(termId)) return;
    
    setSelectedTerm(termId);
    if (settings.readAloud) {
      const term = terms.find(t => t.id === termId);
      if (term) speak(term.term);
    }
  };

  const handleDefinitionClick = (termId: string) => {
    if (matches.includes(termId)) return;
    
    setSelectedDefinition(termId);
    if (settings.readAloud) {
      const term = terms.find(t => t.id === termId);
      if (term) speak(term.definition);
    }

    // Check if we have a match
    if (selectedTerm === termId) {
      setMatches([...matches, termId]);
      setScore(score + 10);
      setSelectedTerm(null);
      setSelectedDefinition(null);
      
      const term = terms.find(t => t.id === termId);
      if (term && settings.readAloud) {
        speak(`Correct! ${term.example}`);
      }
    } else if (selectedTerm) {
      // Wrong match
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDefinition(null);
      }, 1000);
      
      if (settings.readAloud) {
        speak('Try again!');
      }
    }
  };

  return (
    <div className="term-matching-game">
      <h2>Match Financial Terms</h2>
      <p className="instructions">
        Match each financial term with its correct definition.
        Click a term on the left, then click its matching definition on the right.
      </p>

      <div className="game-score">
        Score: {score} | Matches: {matches.length}/{terms.length}
      </div>

      <div className="game-board">
        <div className="terms-column">
          <h3>Terms</h3>
          {terms.map(term => (
            <button
              key={term.id}
              className={`term-card ${
                selectedTerm === term.id ? 'selected' : ''
              } ${matches.includes(term.id) ? 'matched' : ''}`}
              onClick={() => handleTermClick(term.id)}
              disabled={matches.includes(term.id)}
              aria-pressed={selectedTerm === term.id}
            >
              {term.term}
              {term.difficulty === 'easy' && <span className="difficulty-badge">👶 Beginner</span>}
            </button>
          ))}
        </div>

        <div className="definitions-column">
          <h3>Definitions</h3>
          {terms.map(term => (
            <button
              key={term.id}
              className={`definition-card ${
                selectedDefinition === term.id ? 'selected' : ''
              } ${matches.includes(term.id) ? 'matched' : ''}`}
              onClick={() => handleDefinitionClick(term.id)}
              disabled={matches.includes(term.id)}
              aria-pressed={selectedDefinition === term.id}
            >
              {term.definition}
            </button>
          ))}
        </div>
      </div>

      {matches.length === terms.length && (
        <div className="game-complete" role="alert">
          <h3>🎉 Congratulations!</h3>
          <p>You've matched all the terms correctly!</p>
          <button 
            className="new-game-button"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TermMatchingGame;
