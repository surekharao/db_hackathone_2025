import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import TermMatchingGame from './components/games/TermMatchingGame';
import LoanDiceGame from './components/games/loan-dice-game/LoanDiceGame';
import LoanRoulette from './components/games/loan-roulette/LoanRoulette';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { StyleProvider } from './contexts/StyleContext';
import { ChatProvider } from './contexts/ChatContext';
import { ChatUI } from './components/chat/ChatUI';
import { StyleSelector } from './components/style/StyleSelector';
import GameTransition from './components/common/GameTransition';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <StyleProvider>
        <AccessibilityProvider>
          <ChatProvider>
            <div className="app">
              <header className="app-header">
                <h1>Financial Learning Games</h1>
                <StyleSelector />
                <nav>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/term-matching">Term Matching</Link></li>
                    <li><Link to="/loan-dice">Loan Dice</Link></li>
                    <li><Link to="/loan-roulette">Loan Roulette</Link></li>
                    <li><Link to="/chat-assistant">Chat Assistant</Link></li>
                  </ul>
                </nav>
              </header>

              <main className="app-content">
                <Routes>
                  <Route path="/" element={
                    <div className="home">
                      <h2>Welcome to Financial Learning Games</h2>
                      <p>Choose a game to start learning about finance in a fun way!</p>
                      <div className="game-options">
                        <Link to="/term-matching" className="game-option">
                          <h3>Term Matching Game</h3>
                          <p>Match financial terms with their definitions</p>
                        </Link>
                        <Link to="/loan-dice" className="game-option">
                          <h3>Loan Dice Game</h3>
                          <p>Roll the dice to learn about loans and financial terms</p>
                        </Link>
                        <Link to="/loan-roulette" className="game-option">
                          <h3>Loan Roulette</h3>
                          <p>Spin the wheel and test your loan knowledge</p>
                        </Link>
                        <Link to="/chat-assistant" className="game-option">
                          <h3>AI Chat Assistant</h3>
                          <p>Get personalized financial guidance from AI personas</p>
                        </Link>
                      </div>
                    </div>
                  } />
                  <Route path="/term-matching" element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <GameTransition>
                        <TermMatchingGame />
                      </GameTransition>
                    </Suspense>
                  } />
                  <Route path="/loan-dice" element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <GameTransition>
                        <LoanDiceGame />
                      </GameTransition>
                    </Suspense>
                  } />
                  <Route path="/loan-roulette" element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <GameTransition>
                        <LoanRoulette />
                      </GameTransition>
                    </Suspense>
                  } />
                  <Route path="/chat-assistant" element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <GameTransition>
                        <ChatUI />
                      </GameTransition>
                    </Suspense>
                  } />
                </Routes>
              </main>

              <footer className="app-footer">
                <p>&copy; 2025 Financial Learning Games. All rights reserved.</p>
              </footer>
            </div>
          </ChatProvider>
        </AccessibilityProvider>
      </StyleProvider>
    </Router>
  );
};

export default App;
