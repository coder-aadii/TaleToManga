import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Check for user preference on initial load
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(isDarkMode || prefersDarkMode);
  }, []);

  // Update document class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 