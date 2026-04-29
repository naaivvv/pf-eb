import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "pf-eb-theme";

function getInitialTheme(): Theme {
  // 1. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;

  // 2. Respect OS preference
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";

  // 3. Default to dark
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply data-theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
}
