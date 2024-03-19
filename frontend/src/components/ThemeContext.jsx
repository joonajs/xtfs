import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initialize the isDark state from localStorage
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('dark');
    return savedTheme === null ? window.matchMedia("(prefers-color-scheme: dark)").matches : savedTheme === 'true';
  });

  // Effect hook to save the current theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark); // This will automatically trigger the effect above
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
