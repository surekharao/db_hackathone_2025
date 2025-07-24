import React, { useState } from "react";
import { loanTopics } from "../../../data/loanTopics";
import "./LoanRoulette.css";
import SpinWheel from "./SpinWheel";
import { RouletteTerm } from "./types";

const LoanRoulette: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<RouletteTerm | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Select random terms from loanTopics for the roulette
  const rouletteTerms: RouletteTerm[] = React.useMemo(() => {
    const shuffled = [...loanTopics].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8).map((topic) => ({
      id: topic.id,
      term: topic.name,
      explanation: topic.explanation,
      points: topic.points,
      category: topic.category,
    }));
  }, []); // Reshuffle terms each round

  const spinRoulette = () => {
    if (spinning) return;

    setSpinning(true);
    setSelectedTerm(null);
    setShowExplanation(false);
  };

  const onSpinEnd = (finalIndex: number) => {
    const selected = rouletteTerms[finalIndex];
    setSelectedTerm(selected);
    setScore((prev) => prev + selected.points);
    setTimeout(() => setShowExplanation(true), 300);
    setSpinning(false);
  };

  return (
    <div className="loan-roulette">
      <div className="game-header">
        <h2>Financial Terms Roulette</h2>
        <div className="score">Score: {score}</div>
      </div>

      <SpinWheel
        isSpinning={spinning}
        onSpinEnd={onSpinEnd}
        segments={rouletteTerms}
        selectedTerm={selectedTerm}
      />

      {selectedTerm && (
        <div className={`result ${showExplanation ? "show" : ""}`}>
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
        className={`spin-button ${spinning ? "disabled" : ""}`}
        onClick={spinRoulette}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin the Wheel"}
      </button>
    </div>
  );
};

export default LoanRoulette;
