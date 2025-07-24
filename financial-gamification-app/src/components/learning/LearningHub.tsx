import React from 'react';
import { Link } from 'react-router-dom';
import './LearningHub.css';

const LearningHub: React.FC = () => {
  const learningModes = [
    {
      title: 'Interactive Lessons',
      description: 'Learn financial concepts through interactive lessons with real-world examples',
      icon: '📚',
      path: '/learn/lessons'
    },
    {
      title: 'Financial Dictionary',
      description: 'Master financial terms through fun word games and flashcards',
      icon: '📖',
      path: '/learn/dictionary'
    },
    {
      title: 'Market Simulator',
      description: 'Practice trading with virtual money in a risk-free environment',
      icon: '📈',
      path: '/learn/simulator'
    },
    {
      title: 'Quiz Challenge',
      description: 'Test your knowledge and earn badges through quizzes',
      icon: '🎯',
      path: '/learn/quiz'
    },
    {
      title: 'Financial Games',
      description: 'Learn while playing various financial games',
      icon: '🎮',
      path: '/learn/games'
    }
  ];

  return (
    <div className="learning-hub">
      <h1>Financial Learning Hub</h1>
      <p className="subtitle">Choose your learning adventure!</p>
      
      <div className="learning-modes-grid">
        {learningModes.map((mode) => (
          <Link to={mode.path} key={mode.title} className="learning-mode-card">
            <div className="mode-icon">{mode.icon}</div>
            <h3>{mode.title}</h3>
            <p>{mode.description}</p>
          </Link>
        ))}
      </div>

      <div className="progress-section">
        <h2>Your Learning Progress</h2>
        <div className="progress-stats">
          <div className="stat">
            <span className="label">Lessons Completed</span>
            <span className="value">3/10</span>
          </div>
          <div className="stat">
            <span className="label">Quiz Score</span>
            <span className="value">85%</span>
          </div>
          <div className="stat">
            <span className="label">Terms Mastered</span>
            <span className="value">24</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
