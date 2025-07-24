import React, { useState, useEffect } from 'react';
import { financialInstruments } from '../../data/instruments';
import './FinancialDictionary.css';

interface Term {
  term: string;
  definition: string;
}

const FinancialDictionary = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [gameMode, setGameMode] = useState<'learn' | 'play'>('learn');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Collect all glossary terms from all instruments
    const allTerms = financialInstruments.flatMap(
      instrument => instrument.glossaryTerms
    );
    setTerms(allTerms);
  }, []);

  const startGame = () => {
    setGameMode('play');
    setScore(0);
    shuffleTerms();
  };

  const shuffleTerms = () => {
    const shuffled = [...terms].sort(() => Math.random() - 0.5);
    setTerms(shuffled);
    setSelectedTerm(shuffled[0]);
  };

  const renderLearnMode = () => (
    <div className="dictionary-learn">
      <h2>Financial Dictionary</h2>
      <button onClick={startGame} className="start-game-button">
        Play Word Match Game
      </button>
      <div className="terms-grid">
        {terms.map((term, index) => (
          <div key={index} className="term-card">
            <h3>{term.term}</h3>
            <p>{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlayMode = () => (
    <div className="dictionary-game">
      <h2>Match the Definition</h2>
      <div className="game-score">Score: {score}</div>
      {selectedTerm && (
        <div className="game-area">
          <div className="term-display">
            <h3>{selectedTerm.term}</h3>
          </div>
          <div className="definitions-grid">
            {generateOptions().map((definition, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(definition)}
                className="definition-option"
              >
                {definition}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const generateOptions = () => {
    if (!selectedTerm) return [];
    
    const options = [selectedTerm.definition];
    const otherDefinitions = terms
      .filter(t => t.term !== selectedTerm.term)
      .map(t => t.definition);
    
    while (options.length < 4 && otherDefinitions.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherDefinitions.length);
      options.push(otherDefinitions.splice(randomIndex, 1)[0]);
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = (selectedDefinition: string) => {
    if (selectedTerm && selectedDefinition === selectedTerm.definition) {
      setScore(prev => prev + 10);
    }
    
    const nextIndex = terms.findIndex(t => t.term === selectedTerm?.term) + 1;
    if (nextIndex < terms.length) {
      setSelectedTerm(terms[nextIndex]);
    } else {
      // Game completed
      setGameMode('learn');
    }
  };

  return (
    <div className="financial-dictionary">
      {gameMode === 'learn' ? renderLearnMode() : renderPlayMode()}
    </div>
  );
};

export default FinancialDictionary;
