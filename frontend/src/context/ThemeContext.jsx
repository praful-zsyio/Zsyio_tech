import { createContext, useContext, useEffect, useState } from "react";

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  toggleTheme: () => { },
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.DARK;
  });

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
