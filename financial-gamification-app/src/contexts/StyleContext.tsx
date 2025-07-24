import React, { createContext, useContext, useState, useEffect } from 'react';

interface StyleSettings {
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'normal' | 'large' | 'extra-large';
  isStyleMenuOpen: boolean;
}

interface StyleContextType {
  settings: StyleSettings;
  updateSettings: (newSettings: Partial<StyleSettings>) => void;
}

const defaultSettings: StyleSettings = {
  theme: 'light',
  fontSize: 'normal',
  isStyleMenuOpen: false
};

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StyleSettings>(() => {
    const savedSettings = localStorage.getItem('styleSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('styleSettings', JSON.stringify(settings));
    
    // Apply font size class
    document.body.classList.remove('font-normal', 'font-large', 'font-extra-large');
    document.body.classList.add(`font-${settings.fontSize}`);
    
    // Apply theme
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    document.body.classList.add(`theme-${settings.theme}`);

    // Set CSS variables based on theme
    const root = document.documentElement;
    switch (settings.theme) {
      case 'light':
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f5f7fa');
        root.style.setProperty('--text-primary', '#2c3e50');
        root.style.setProperty('--text-secondary', '#34495e');
        root.style.setProperty('--game-primary', '#6C5CE7');
        root.style.setProperty('--game-secondary', '#A3A1FF');
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.2)');
        break;
      case 'dark':
        root.style.setProperty('--bg-primary', '#1a1a2e');
        root.style.setProperty('--bg-secondary', '#16213e');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e2e8f0');
        root.style.setProperty('--game-primary', '#A3A1FF');
        root.style.setProperty('--game-secondary', '#6C5CE7');
        root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.2)');
        root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.1)');
        break;
      case 'high-contrast':
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#1a1a1a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#ffffff');
        root.style.setProperty('--game-primary', '#ffffff');
        root.style.setProperty('--game-secondary', '#ffffff');
        root.style.setProperty('--card-bg', '#000000');
        root.style.setProperty('--card-border', '#ffffff');
        break;
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<StyleSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <StyleContext.Provider value={{ settings, updateSettings }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};
