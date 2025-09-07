import React from 'react';

export const supportedThemes = {
  light: 'light',
  dark: 'dark'
};
export type Themes = keyof typeof supportedThemes;

export interface ThemeContextValue {
  theme: Themes;
  setTheme: (theme: Themes) => void;
  supportedThemes: { [key: string]: string };
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);