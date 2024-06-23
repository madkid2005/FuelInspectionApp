import React from 'react';

export const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    buttonBackground: '#000000',
    buttonText: '#ffffff',
    headerBackground: '#ffffff',
    headerText: '#000000',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    buttonBackground: '#ffffff',
    buttonText: '#000000',
    headerBackground: '#1e1e1e',
    headerText: '#ffffff',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
