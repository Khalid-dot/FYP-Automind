// ThemeContext.js
import React, {createContext, useContext, useState} from 'react';
import {lightTheme, darkTheme} from '../../constants/colors';

const ThemeContext = createContext(); // Create the context

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Choose the current theme based on the isDarkMode state
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
