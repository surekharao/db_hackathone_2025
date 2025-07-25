import React, { useEffect } from 'react';
import { useStyle } from '../../contexts/StyleContext';
import './StyleSelector.css';

export const StyleSelector: React.FC = () => {
  const { settings, updateSettings } = useStyle();

  const toggleStyleMenu = () => {
    updateSettings({ isStyleMenuOpen: !settings.isStyleMenuOpen });
  };

  const handleThemeSelect = (theme: 'light' | 'dark' | 'high-contrast') => {
    updateSettings({ theme, isStyleMenuOpen: false }); // Close menu after selection
  };

  const handleFontSizeSelect = (fontSize: 'normal' | 'large' | 'extra-large') => {
    updateSettings({ fontSize, isStyleMenuOpen: false }); // Close menu after selection
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && settings.isStyleMenuOpen) {
        updateSettings({ isStyleMenuOpen: false });
      }
    };

    if (settings.isStyleMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [settings.isStyleMenuOpen, updateSettings]);

  return (
    <>
      <button 
        className="style-menu-toggle" 
        onClick={toggleStyleMenu}
        aria-label="Toggle style menu"
        aria-expanded={settings.isStyleMenuOpen}
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
        </svg>
      </button>

      {/* Overlay to close menu when clicking outside */}
      {settings.isStyleMenuOpen && (
        <div 
          className="style-menu-overlay"
          onClick={() => updateSettings({ isStyleMenuOpen: false })}
        />
      )}

      <div className={`style-selector ${settings.isStyleMenuOpen ? 'open' : ''}`}>
        <div className="style-selector-header">
          <h3>Appearance Settings</h3>
          <button 
            className="close-button" 
            onClick={toggleStyleMenu}
            aria-label="Close style menu"
          >
            ×
          </button>
        </div>

        <div className="setting-group">
          <label>Theme:</label>
          <div className="theme-options">
            <button
              className={`theme-button light ${settings.theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('light')}
              aria-label="Light theme"
            >
              <span className="theme-icon">☀️</span>
              <span>Light</span>
            </button>
            <button
              className={`theme-button dark ${settings.theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('dark')}
              aria-label="Dark theme"
            >
              <span className="theme-icon">🌙</span>
              <span>Dark</span>
            </button>
            <button
              className={`theme-button high-contrast ${settings.theme === 'high-contrast' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('high-contrast')}
              aria-label="High contrast theme"
            >
              <span className="theme-icon">🎨</span>
              <span>High Contrast</span>
            </button>
          </div>
        </div>

        <div className="setting-group">
          <label>Font Size:</label>
          <div className="font-size-options">
            <button
              className={`font-button ${settings.fontSize === 'normal' ? 'active' : ''}`}
              onClick={() => handleFontSizeSelect('normal')}
              aria-label="Normal text size"
            >
              A
            </button>
            <button
              className={`font-button ${settings.fontSize === 'large' ? 'active' : ''}`}
              onClick={() => handleFontSizeSelect('large')}
              aria-label="Large text size"
            >
              A+
            </button>
            <button
              className={`font-button ${settings.fontSize === 'extra-large' ? 'active' : ''}`}
              onClick={() => handleFontSizeSelect('extra-large')}
              aria-label="Extra large text size"
            >
              A++
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
