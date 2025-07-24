import React from 'react';
import { useStyle } from '../../contexts/StyleContext';
import './StyleSelector.css';

const StyleSelector: React.FC = () => {
  const { settings, updateSettings } = useStyle();

  return (
    <div className="style-selector">
      <div className="style-section">
        <h3>Choose Your Style</h3>
        <div className="persona-options">
          <button
            className={`persona-button ${settings.persona === 'genz' ? 'active' : ''}`}
            onClick={() => updateSettings({ persona: 'genz' })}
          >
            <span role="img" aria-label="Gen Z">🎮</span> Gen Z
          </button>
          <button
            className={`persona-button ${settings.persona === 'elderly' ? 'active' : ''}`}
            onClick={() => updateSettings({ persona: 'elderly' })}
          >
            <span role="img" aria-label="Elderly">👴</span> Classic
          </button>
          <button
            className={`persona-button ${settings.persona === 'default' ? 'active' : ''}`}
            onClick={() => updateSettings({ persona: 'default' })}
          >
            <span role="img" aria-label="Default">🎨</span> Default
          </button>
        </div>
      </div>

      <div className="style-section">
        <h3>Accessibility Options</h3>
        <div className="font-size-options">
          <button
            className={`font-button ${settings.fontSize === 'normal' ? 'active' : ''}`}
            onClick={() => updateSettings({ fontSize: 'normal' })}
          >
            Normal Text
          </button>
          <button
            className={`font-button ${settings.fontSize === 'large' ? 'active' : ''}`}
            onClick={() => updateSettings({ fontSize: 'large' })}
          >
            Large Text
          </button>
          <button
            className={`font-button ${settings.fontSize === 'extra-large' ? 'active' : ''}`}
            onClick={() => updateSettings({ fontSize: 'extra-large' })}
          >
            Extra Large
          </button>
        </div>

        <div className="color-scheme-options">
          <button
            className={`theme-button ${settings.colorScheme === 'light' ? 'active' : ''}`}
            onClick={() => updateSettings({ colorScheme: 'light' })}
          >
            <span role="img" aria-label="Light theme">☀️</span> Light Mode
          </button>
          <button
            className={`theme-button ${settings.colorScheme === 'dark' ? 'active' : ''}`}
            onClick={() => updateSettings({ colorScheme: 'dark' })}
          >
            <span role="img" aria-label="Dark theme">🌙</span> Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;
