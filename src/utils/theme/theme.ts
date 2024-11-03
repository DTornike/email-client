import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F6AE2D",
    },
    secondary: {
      main: "#33658A",
    },
    grey: {
      50: "#F7F7F8",
      100: "#EBEBEF",
      200: "#D8D8DF",
      300: "#B9B9C6",
      400: "#8F8FA3",
      500: "#73738C",
      600: "#5A5A72",
      700: "#434356",
      800: "#25252D",
      900: "#131318",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1a1919",
    },
    secondary: {
      main: "#312d2d",
    },
    grey: {
      900: "#F7F7F8",
      800: "#EBEBEF",
      700: "#D8D8DF",
      600: "#B9B9C6",
      500: "#8F8FA3",
      400: "#73738C",
      300: "#5A5A72",
      200: "#434356",
      100: "#25252D",
      50: "#131318",
    },
    text: {
      secondary: "#fff",
    },
  },
});

export { lightTheme, darkTheme };
