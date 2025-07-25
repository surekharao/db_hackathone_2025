import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { StyleProvider } from "./contexts/StyleContext";
import { ChatProvider } from "./contexts/ChatContext";
import { StyleSelector } from "./components/style/StyleSelector";
import GameTransition from "./components/common/GameTransition";
import "./App.css";
import Footer from "./components/common/Footer";
const HomePage = React.lazy(() => import("./components/HomePage"));
const TermMatchingGame = React.lazy(
  () => import("./components/games/TermMatchingGame"),
);
const LoanDiceGame = React.lazy(
  () => import("./components/games/loan-dice-game/LoanDiceGame"),
);
const LoanRoulette = React.lazy(
  () => import("./components/games/loan-roulette/LoanRoulette"),
);
const ChatUI = React.lazy(() => import("./components/chat/ChatUI"));

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
                {/*<nav>*/}
                {/*  <ul>*/}
                {/*    <li><Link to="/">Home</Link></li>*/}
                {/*    <li><Link to="/term-matching">Matching</Link></li>*/}
                {/*    <li><Link to="/loan-dice">Dice</Link></li>*/}
                {/*    <li><Link to="/loan-roulette">Roulette</Link></li>*/}
                {/*    <li><Link to="/chat-assistant">Chat Assistant</Link></li>*/}
                {/*  </ul>*/}
                {/*</nav>*/}
              </header>

              <main className="app-content">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/term-matching"
                      element={
                        <GameTransition>
                          <TermMatchingGame />
                        </GameTransition>
                      }
                    />
                    <Route
                      path="/loan-dice"
                      element={
                        <GameTransition>
                          <LoanDiceGame />
                        </GameTransition>
                      }
                    />
                    <Route
                      path="/loan-roulette"
                      element={
                        <GameTransition>
                          <LoanRoulette />
                        </GameTransition>
                      }
                    />
                    <Route
                      path="/chat-assistant"
                      element={
                        <GameTransition>
                          <ChatUI />
                        </GameTransition>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ChatProvider>
        </AccessibilityProvider>
      </StyleProvider>
    </Router>
  );
};

export default App;
