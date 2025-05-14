import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'purple' | 'blue' | 'bright';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 从localStorage获取保存的主题设置
const getSavedTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme');
  return (savedTheme as Theme) || 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = getSavedTheme();
    console.log('Initializing theme from localStorage:', savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Update theme when it changes
  useEffect(() => {
    console.log('Theme changed to:', theme);
    applyTheme(theme);
  }, [theme]);

  // Helper function to apply theme changes
  const applyTheme = (currentTheme: Theme) => {
    localStorage.setItem('theme', currentTheme);
    
    // Remove previous theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-purple', 'theme-blue', 'theme-bright');
    
    // Add current theme class
    document.documentElement.classList.add(`theme-${currentTheme}`);
    
    // Handle dark mode for Tailwind
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};