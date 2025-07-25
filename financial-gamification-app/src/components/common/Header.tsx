import React, { useState, useEffect, useRef } from 'react';
import { useStyle } from '../../contexts/StyleContext';
import './Header.css';

export const Header: React.FC = () => {
  const { settings, updateSettings } = useStyle();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleThemeSelect = (theme: 'light' | 'dark' | 'high-contrast') => {
    updateSettings({ theme });
    setIsThemeModalOpen(false); // Hide modal after selection
    // Return focus to the trigger button
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsThemeModalOpen(false);
      triggerRef.current?.focus();
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (isThemeModalOpen && modalRef.current) {
      // Focus the first theme option when modal opens
      const firstOption = modalRef.current.querySelector('.theme-option') as HTMLButtonElement;
      firstOption?.focus();
    }
  }, [isThemeModalOpen]);

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'light': return '🌞';
      case 'dark': return '🌙';
      case 'high-contrast': return '🔲';
      default: return '🎨';
    }
  };

  const getThemeDisplayName = (theme: string) => {
    switch (theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'high-contrast': return 'High Contrast';
      default: return 'Theme';
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <h1>Financial Learning Games</h1>
          <div className="theme-switcher">
            <button
              ref={triggerRef}
              className="theme-toggle-button"
              onClick={() => setIsThemeModalOpen(true)}
              title={`Current theme: ${getThemeDisplayName(settings.theme)}`}
              aria-expanded={isThemeModalOpen}
              aria-haspopup="dialog"
            >
              <span role="img" aria-label={`Current theme: ${getThemeDisplayName(settings.theme)}`}>
                {getThemeIcon(settings.theme)}
              </span>
              <span className="theme-label">{getThemeDisplayName(settings.theme)}</span>
            </button>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="/learning">Learning</a></li>
          </ul>
        </nav>
      </header>

      {/* Theme Modal */}
      {isThemeModalOpen && (
        <div 
          className="theme-modal-overlay" 
          onClick={() => setIsThemeModalOpen(false)}
          onKeyDown={handleKeyDown}
        >
          <div 
            ref={modalRef}
            className="theme-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="theme-modal-title"
            aria-modal="true"
          >
            <div className="theme-modal-header">
              <h3 id="theme-modal-title">Select Theme</h3>
              <button
                className="close-button"
                onClick={() => setIsThemeModalOpen(false)}
                title="Close theme selector"
                aria-label="Close theme selector"
              >
                ×
              </button>
            </div>
            <div className="theme-options" role="radiogroup" aria-labelledby="theme-modal-title">
              <button
                className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeSelect('light')}
                role="radio"
                aria-checked={settings.theme === 'light'}
              >
                <span className="theme-icon" role="img" aria-label="Light Theme">🌞</span>
                <span className="theme-text">Light</span>
              </button>
              <button
                className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeSelect('dark')}
                role="radio"
                aria-checked={settings.theme === 'dark'}
              >
                <span className="theme-icon" role="img" aria-label="Dark Theme">🌙</span>
                <span className="theme-text">Dark</span>
              </button>
              <button
                className={`theme-option ${settings.theme === 'high-contrast' ? 'active' : ''}`}
                onClick={() => handleThemeSelect('high-contrast')}
                role="radio"
                aria-checked={settings.theme === 'high-contrast'}
              >
                <span className="theme-icon" role="img" aria-label="High Contrast Theme">🔲</span>
                <span className="theme-text">High Contrast</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
