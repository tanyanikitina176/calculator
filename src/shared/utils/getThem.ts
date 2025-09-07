import type { Themes } from "../../ThemeContext";

export const StorageKey = 'features-color-theme';

export const getTheme = (): Themes => {
  let theme = localStorage.getItem(StorageKey);

  if (!theme) {
    localStorage.setItem(StorageKey, 'light');
    theme = 'light';
  }

  return theme as Themes;
};