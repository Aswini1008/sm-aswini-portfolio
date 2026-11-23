import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { ThemeContext, type Theme } from "@/context/ThemeContext";

const THEME_STORAGE_KEY = "aswini-portfolio-theme";

function readSavedTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  } catch (error) {
    console.error("Could not read the saved theme preference.", error);
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const transitionTimeout = useRef<number | null>(null);

  const applyTheme = useCallback((nextTheme: Theme, persist: boolean, animate: boolean) => {
    const root = document.documentElement;
    root.classList.toggle("dark", nextTheme === "dark");
    root.classList.toggle("light", nextTheme === "light");
    root.style.colorScheme = nextTheme;

    if (animate) {
      root.classList.add("theme-transition");
      if (transitionTimeout.current !== null) window.clearTimeout(transitionTimeout.current);
      transitionTimeout.current = window.setTimeout(() => {
        root.classList.remove("theme-transition");
        transitionTimeout.current = null;
      }, 350);
    }

    if (persist) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (error) {
        console.error("Could not save the theme preference.", error);
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = readSavedTheme();
    const initialTheme = savedTheme ?? getSystemTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme, false, false);

    const preference = window.matchMedia("(prefers-color-scheme: light)");
    const updateSystemTheme = (event: MediaQueryListEvent) => {
      if (readSavedTheme() !== null) return;
      const nextTheme = event.matches ? "light" : "dark";
      applyTheme(nextTheme, false, true);
      setTheme(nextTheme);
    };

    preference.addEventListener("change", updateSystemTheme);
    return () => {
      preference.removeEventListener("change", updateSystemTheme);
      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
      }
    };
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true, true);
    setTheme(nextTheme);
  }, [applyTheme, theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
