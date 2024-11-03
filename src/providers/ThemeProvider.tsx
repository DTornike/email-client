import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../utils/theme/theme.ts";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  themeMode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const savedTheme = (localStorage.getItem("theme") as ThemeMode) || "system";
  const [themeMode, setThemeMode] = useState<ThemeMode>(savedTheme);

  const resolvedThemeMode =
    themeMode === "system" ? (systemPrefersDark ? "dark" : "light") : themeMode;

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      if (prevMode === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      }

      if (prevMode === "dark") {
        localStorage.setItem("theme", "system");
        return "system";
      }

      localStorage.setItem("theme", "light");
      return "light";
    });
  };

  const theme = useMemo(
    () => (resolvedThemeMode === "light" ? lightTheme : darkTheme),
    [resolvedThemeMode],
  );

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (themeMode === "system") {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a CustomThemeProvider",
    );
  }
  return context;
};
