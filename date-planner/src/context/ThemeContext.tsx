"use client";

import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(
  null
);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] =
    useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "theme"
    ) as Theme | null;

    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme: Theme = prefersDark
      ? "dark"
      : "light";

    setThemeState(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      prefersDark
    );
  }, []);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};