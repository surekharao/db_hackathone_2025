import React, { useState } from 'react';
import { signLanguageKeyboard, SignLanguageCategory } from '../../data/signLanguageKeyboard';
import './SignLanguageKeyboard.css';

interface SignLanguageKeyboardProps {
  onSelect?: (value: string) => void;
  showDescriptions?: boolean;
}

export const SignLanguageKeyboard: React.FC<SignLanguageKeyboardProps> = ({
  onSelect,
  showDescriptions = true
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(signLanguageKeyboard[0].name);

  const handleKeySelect = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  const currentCategory = signLanguageKeyboard.find(cat => cat.name === activeCategory);

  return (
    <div className="sign-language-keyboard" role="group" aria-label="Sign Language Keyboard">
      <div className="sign-categories" role="tablist">
        {signLanguageKeyboard.map((category) => (
          <button
            key={category.name}
            className={`category-button ${category.name === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.name)}
            role="tab"
            aria-selected={category.name === activeCategory}
            aria-controls={`category-${category.name}`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      {currentCategory && (
        <div 
          className="sign-grid"
          role="tabpanel"
          id={`category-${currentCategory.name}`}
          aria-label={`${currentCategory.name} signs`}
        >
          {currentCategory.keys.map((key) => (
            <button
              key={key.value}
              className="sign-key"
              onClick={() => handleKeySelect(key.value)}
              aria-label={`${key.label} sign`}
            >
              <div className="sign-display">
                <img 
                  src={key.signUrl} 
                  alt={`${key.label} sign`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                    }
                  }}
                />
                <div className="sign-text-fallback" style={{display: 'none'}}>
                  {key.value}
                </div>
              </div>
              <span className="label">{key.label}</span>
              {showDescriptions && key.description && (
                <div className="sign-description" role="tooltip">
                  {key.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignLanguageKeyboard;
