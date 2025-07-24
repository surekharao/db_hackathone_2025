import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TermMatchingGame from './components/games/TermMatchingGame';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { StyleProvider } from './contexts/StyleContext';
import { ChatProvider } from './contexts/ChatContext';
import { ChatUI } from './components/chat/ChatUI';
import StyleSelector from './components/style/StyleSelector';
import './App.css';

const App: React.FC = () => {
  return (
    <StyleProvider>
      <AccessibilityProvider>
        <ChatProvider>
          <Router>
            <div className="app">
              <header className="app-header">
                <h1>Financial Learning Games</h1>
                <StyleSelector />
                <nav>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/term-matching">Term Matching</Link></li>
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
                        <Link to="/chat-assistant" className="game-option">
                          <h3>AI Chat Assistant</h3>
                          <p>Get personalized financial guidance from AI personas</p>
                        </Link>
                      </div>
                    </div>
                  } />
                  <Route path="/term-matching" element={<TermMatchingGame />} />
                  <Route path="/chat-assistant" element={<ChatUI />} />
                </Routes>
              </main>

              <footer className="app-footer">
                <p>&copy; 2025 Financial Learning Games. All rights reserved.</p>
              </footer>
            </div>
          </Router>
        </ChatProvider>
      </AccessibilityProvider>
    </StyleProvider>
  );
};

export default App;
