import { IconButton, Tooltip } from "@mui/material";
import { useThemeContext } from "../../../providers/ThemeProvider.tsx";
import { DarkMode, LightMode, NightsStay } from "@mui/icons-material";

const themeIcons = {
  dark: <DarkMode />,
  light: <LightMode />,
  system: <NightsStay />,
};

export const ToggleDarkMode = () => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={themeMode}>
      <IconButton onClick={toggleTheme}>{themeIcons[themeMode]}</IconButton>
    </Tooltip>
  );
};
