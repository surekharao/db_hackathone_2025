import React, { createContext, useContext, useState, useEffect } from 'react';

type Persona = 'genz' | 'elderly' | 'default';

interface StyleSettings {
  persona: Persona;
  fontSize: 'normal' | 'large' | 'extra-large';
  colorScheme: 'light' | 'dark';
}

interface StyleContextType {
  settings: StyleSettings;
  updateSettings: (newSettings: Partial<StyleSettings>) => void;
}

const defaultSettings: StyleSettings = {
  persona: 'default',
  fontSize: 'normal',
  colorScheme: 'light'
};

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StyleSettings>(() => {
    const savedSettings = localStorage.getItem('styleSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('styleSettings', JSON.stringify(settings));
    
    // Apply persona class
    document.body.classList.remove('persona-genz', 'persona-elderly', 'persona-default');
    document.body.classList.add(`persona-${settings.persona}`);
    
    // Apply font size class
    document.body.classList.remove('font-normal', 'font-large', 'font-extra-large');
    document.body.classList.add(`font-${settings.fontSize}`);
    
    // Apply color scheme
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${settings.colorScheme}`);
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
