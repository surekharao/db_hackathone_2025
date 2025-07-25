import { Link } from "react-router-dom";

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
